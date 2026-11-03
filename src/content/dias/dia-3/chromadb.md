> **Objetivo de aprendizaje:** crear una colección en ChromaDB, indexar los documentos académicos de demostración, consultar por similitud semántica e integrar los fragmentos recuperados en una respuesta con fuentes.

## Requisitos previos

- Python 3.10 o superior.
- Los documentos de demostración en `documentos-demo/`.
- Un entorno virtual activo.
- Opcional: Ollama para generar respuestas localmente.

## Instalación

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install chromadb
```

Si vas a generar respuestas con un modelo local:

```bash
pip install ollama
ollama pull llama3.2:3b
```

ChromaDB puede usar una función de embeddings local por defecto. La primera vez descargará el modelo; necesitas conexión a internet al menos para esa descarga.

> **Alternativa:** si el equipo no permite descargar modelos, usa un proveedor de embeddings compatible o el modelo de embeddings de Ollama. Documenta cuál usaste y mantén el mismo al indexar y consultar.

## Estructura del proyecto

```text
tecbot-academico/
├── documentos-demo/
│   ├── servicio-social.md
│   ├── residencias-profesionales.md
│   ├── titulacion.md
│   └── acreditacion-academica.md
├── scripts/
│   ├── indexar.py
│   └── consultar.py
├── chroma_db/          # generado, no se versiona
└── requirements.txt
```

Agrega `chroma_db/` a `.gitignore`.

## Paso 1. Fragmentar los documentos

Crea `scripts/indexar.py`:

```python
from pathlib import Path
import re

import chromadb
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction

DOCUMENTOS = Path("documentos-demo")
COLECCION = "documentos_academicos"
TAMANO = 800
SOLAPAMIENTO = 120


def dividir_texto(texto: str, tamano: int = TAMANO, solapamiento: int = SOLAPAMIENTO):
    """Divide por párrafos y agrupa hasta alcanzar el tamaño objetivo."""
    parrafos = [p.strip() for p in re.split(r"\n\s*\n", texto) if p.strip()]
    fragmentos = []
    actual = ""

    for parrafo in parrafos:
        if len(actual) + len(parrafo) + 2 <= tamano:
            actual = f"{actual}\n\n{parrafo}".strip()
            continue

        if actual:
            fragmentos.append(actual)
            # Conserva el final del fragmento anterior como contexto.
            actual = f"{actual[-solapamiento:]}\n\n{parrafo}".strip()
        else:
            fragmentos.append(parrafo)
            actual = ""

    if actual:
        fragmentos.append(actual)

    return fragmentos


def main():
    cliente = chromadb.PersistentClient(path="chroma_db")
    embeddings = DefaultEmbeddingFunction()

    coleccion = cliente.get_or_create_collection(
        name=COLECCION,
        embedding_function=embeddings,
        metadata={"hnsw:space": "cosine"},
    )

    ids, documentos, metadatos = [], [], []

    for ruta in sorted(DOCUMENTOS.glob("*.md")):
        texto = ruta.read_text(encoding="utf-8")
        tema = ruta.stem
        fragmentos = dividir_texto(texto)

        for indice, fragmento in enumerate(fragmentos):
            ids.append(f"{tema}-{indice:03d}")
            documentos.append(fragmento)
            metadatos.append(
                {
                    "documento": ruta.name,
                    "tema": tema,
                    "fragmento": indice,
                    "tipo": "demostracion",
                }
            )

    if not ids:
        raise SystemExit("No se encontraron documentos para indexar.")

    coleccion.upsert(ids=ids, documents=documentos, metadatas=metadatos)

    print(f"Documentos indexados: {len(ids)}")
    print(f"Colección: {coleccion.name}")
    print(f"Total en la colección: {coleccion.count()}")


if __name__ == "__main__":
    main()
```

Ejecuta:

```bash
python scripts/indexar.py
```

Salida esperada:

```text
Documentos indexados: 18
Colección: documentos_academicos
Total en la colección: 18
```

El número exacto depende de cómo estén escritos los documentos.

## Paso 2. Consultar por similitud

Crea `scripts/consultar.py`:

```python
import chromadb
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction

PREGUNTA = "¿Qué necesito para iniciar el servicio social?"

cliente = chromadb.PersistentClient(path="chroma_db")
coleccion = cliente.get_collection(
    name="documentos_academicos",
    embedding_function=DefaultEmbeddingFunction(),
)

resultados = coleccion.query(
    query_texts=[PREGUNTA],
    n_results=4,
    include=["documents", "metadatas", "distances"],
)

for documento, metadata, distancia in zip(
    resultados["documents"][0],
    resultados["metadatas"][0],
    resultados["distances"][0],
):
    print(f"\n[{metadata['documento']} · distancia {distancia:.3f}]")
    print(documento[:500])
```

Ejecuta:

```bash
python scripts/consultar.py
```

Deberías ver fragmentos de `servicio-social.md` entre los primeros resultados. La distancia coseno más baja indica mayor similitud, según la métrica configurada.

## Paso 3. Filtrar por metadatos

Si la pregunta es claramente de titulación, puedes restringir la búsqueda:

```python
resultados = coleccion.query(
    query_texts=[PREGUNTA],
    n_results=4,
    where={"tema": "titulacion"},
    include=["documents", "metadatas", "distances"],
)
```

Cuidado: un filtro demasiado agresivo puede ocultar la respuesta correcta si el tema se cruza con otro documento. Úsalo solo cuando el enrutamiento sea confiable.

## Paso 4. Generar una respuesta con fuentes

El siguiente ejemplo usa Ollama. Ajusta el modelo al que tengas disponible:

```python
import chromadb
import ollama
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction

PREGUNTA = "¿Qué necesito para iniciar el servicio social?"
MODELO = "llama3.2:3b"

cliente = chromadb.PersistentClient(path="chroma_db")
coleccion = cliente.get_collection(
    name="documentos_academicos",
    embedding_function=DefaultEmbeddingFunction(),
)

resultados = coleccion.query(
    query_texts=[PREGUNTA],
    n_results=4,
    include=["documents", "metadatas", "distances"],
)

fragmentos = resultados["documents"][0]
metadatos = resultados["metadatas"][0]
contexto = "\n\n".join(
    f"[{meta['documento']}]\n{doc}" for doc, meta in zip(fragmentos, metadatos)
)

prompt = f"""Eres un asistente de información académica.

Responde únicamente con la información de los FRAGMENTOS.
Si no hay información suficiente, dilo y recomienda acudir al departamento correspondiente.
No inventes requisitos, fechas, montos ni enlaces.
Cita el documento de cada afirmación con el formato [documento].

PREGUNTA:
{PREGUNTA}

FRAGMENTOS:
{contexto}
"""

respuesta = ollama.chat(
    model=MODELO,
    messages=[{"role": "user", "content": prompt}],
)

print(respuesta["message"]["content"])
print("\nFuentes recuperadas:")
for meta in metadatos:
    print(f"- {meta['documento']}")
```

Si el modelo no está disponible, puedes probar el pipeline sin generación y evaluar solo la recuperación.

## Paso 5. Integrar con FastAPI

Estructura sugerida:

```text
app/
├── main.py
├── schemas.py
├── rag.py
└── config.py
```

`app/rag.py` encapsula la colección:

```python
import chromadb
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction

_cliente = chromadb.PersistentClient(path="chroma_db")
_embeddings = DefaultEmbeddingFunction()
_coleccion = _cliente.get_collection(
    name="documentos_academicos",
    embedding_function=_embeddings,
)


def recuperar(pregunta: str, limite: int = 4) -> list[dict]:
    resultados = _coleccion.query(
        query_texts=[pregunta],
        n_results=limite,
        include=["documents", "metadatas", "distances"],
    )

    return [
        {
            "texto": documento,
            "documento": metadata["documento"],
            "tema": metadata["tema"],
            "distancia": distancia,
        }
        for documento, metadata, distancia in zip(
            resultados["documents"][0],
            resultados["metadatas"][0],
            resultados["distances"][0],
        )
    ]
```

La ruta de FastAPI solo debe encargarse de validar, llamar a `recuperar`, generar y devolver el contrato acordado.

## Evaluar la recuperación

Antes de culpar al modelo, mide la recuperación:

| Pregunta | Documento esperado | ¿Aparece en top-3? | Distancia |
|---|---|---|---|
| Requisitos de servicio social | servicio-social.md | Sí | 0.21 |
| Modalidades de titulación | titulacion.md | Sí | 0.18 |
| Registro de residencias | residencias-profesionales.md | Sí | 0.24 |
| Horario de cafetería | ninguno | No | 0.61 |

Si el documento correcto no aparece, ajusta fragmentación, `k` o el modelo de embeddings. Si aparece pero la respuesta es incorrecta, revisa el prompt y la generación.

## Reconstruir el índice

Cada vez que cambien los documentos:

```bash
rm -rf chroma_db
python scripts/indexar.py
```

En Windows PowerShell:

```powershell
Remove-Item -Recurse -Force chroma_db
python scripts/indexar.py
```

No edites los documentos para “hacer que una pregunta funcione”. Corrige la fuente o el pipeline.

## Actividad de práctica

1. Indexa los cuatro documentos de demostración.
2. Ejecuta cinco consultas y registra documento, fragmento y distancia.
3. Identifica una pregunta que recupere el documento correcto pero un fragmento poco útil.
4. Ajusta el tamaño de fragmento o el solapamiento y vuelve a probar.
5. Integra una función `recuperar()` en la API.
6. Agrega una prueba que verifique que una pregunta de servicio social devuelve una fuente de `servicio-social.md`.

**Resultado esperado:** colección local funcional, consultas reproducibles y evidencia de la calidad de recuperación.

## Problemas frecuentes

**`ModuleNotFoundError: chromadb`.**  
Activa el entorno virtual correcto y vuelve a instalar. Verifica con `python -c "import chromadb; print(chromadb.__version__)"`.

**La primera consulta tarda mucho.**  
Se está descargando el modelo de embeddings. Ejecuta una vez con conexión y documenta el requisito.

**`Collection already exists` o datos duplicados.**  
Usa `get_or_create_collection` y `upsert` con IDs estables. Si cambió la estrategia de fragmentación, reconstruye la colección.

**Las distancias no tienen sentido.**  
Confirma la métrica (`cosine`) y que usas el mismo modelo de embeddings para indexar y consultar.

**La respuesta no cita la fuente correcta.**  
Revisa qué fragmentos se recuperaron. El modelo no puede citar lo que no recibió.

**El índice pesa demasiado para Git.**  
No lo versiones. Genera un script reproducible y documenta cómo reconstruirlo.

## Recursos complementarios

- [ChromaDB Docs](https://docs.trychroma.com/)
- [Ollama](https://ollama.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Documentación RAG de ejemplo](/descargas/documentacion-rag.md)
- [Documentos de demostración](/proyecto-conductor)

**Siguiente paso:** conectar herramientas externas con [Fundamentos de MCP](/dias/dia-3/fundamentos-mcp).
