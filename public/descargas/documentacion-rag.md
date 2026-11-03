# Documentación de RAG — [Nombre del proyecto]

> Plantilla del curso *Creación de software con Agentes de IA*.
> Documenta decisiones reales, no las que te gustaría haber tomado.

## 1. Objetivo

[Qué preguntas debe responder el sistema y con qué documentos.]

## 2. Corpus

| Documento | Tema | Origen | Vigencia | Notas |
|---|---|---|---|---|
| `documentos-demo/servicio-social.md` | Servicio social | Ficticio, didáctico | Curso 2026 | No es normativa oficial |
| `documentos-demo/residencias-profesionales.md` | Residencias | Ficticio, didáctico | Curso 2026 | No es normativa oficial |
| `documentos-demo/titulacion.md` | Titulación | Ficticio, didáctico | Curso 2026 | No es normativa oficial |
| `documentos-demo/acreditacion-academica.md` | Acreditación | Ficticio, didáctico | Curso 2026 | No es normativa oficial |

### Reglas del corpus

- [Quién puede modificar los documentos]
- [Cómo se valida que no contienen datos personales]
- [Qué hacer cuando un documento se actualiza]

## 3. Fragmentación

| Parámetro | Valor | Justificación |
|---|---|---|
| Tamaño objetivo | [800 caracteres] | [Cabe en el contexto y conserva una idea] |
| Solapamiento | [120 caracteres] | [Evita cortar requisitos entre fragmentos] |
| Unidad | [Párrafos] | [Respeta la estructura del documento] |
| Metadatos | [documento, tema, fragmento] | [Permiten filtrar y citar] |

### Ejemplo de fragmento

```text
[Texto de ejemplo con inicio y final claros. Debe poder entenderse sin el resto del documento.]
```

## 4. Embeddings

| Decisión | Valor |
|---|---|
| Modelo | [Nombre y versión] |
| Dimensión | [Número] |
| Ejecución | Local / API |
| Requisito de red | [Sí/No, primera descarga] |
| Mismo modelo para indexar y consultar | Sí |

**Justificación:** [Por qué se eligió este modelo y qué alternativa se descartó.]

## 5. Recuperación

| Parámetro | Valor |
|---|---|
| Base vectorial | ChromaDB persistente |
| Métrica | Coseno |
| `n_results` | 4 |
| Filtro por metadatos | [Cuándo se usa y cuándo no] |
| Umbral de evidencia | [Distancia máxima o criterio] |

### Flujo

1. Validar la pregunta.
2. Generar el embedding de la pregunta.
3. Recuperar los fragmentos más similares.
4. Evaluar si hay evidencia suficiente.
5. Construir el contexto con nombre de documento.
6. Generar la respuesta.
7. Devolver respuesta, fuentes y advertencia.

## 6. Prompt de generación

```text
Eres un asistente de información académica.

Responde únicamente con la información de los FRAGMENTOS.
Si no hay información suficiente, dilo y recomienda acudir al departamento correspondiente.
No inventes requisitos, fechas, montos ni enlaces.
Cita el documento de cada afirmación con el formato [documento].
Responde en español, de forma breve y clara.

PREGUNTA:
{pregunta}

FRAGMENTOS:
{contexto}
```

## 7. Contrato de respuesta

```json
{
  "respuesta": "Texto en español basado en las fuentes.",
  "fuentes": [
    {
      "documento": "servicio-social.md",
      "tema": "servicio-social",
      "fragmento": 2
    }
  ],
  "advertencia": "Material didáctico de demostración; no es normativa oficial."
}
```

## 8. Evaluación

| Pregunta | Documento esperado | ¿Top-3? | Distancia | Respuesta correcta | Observaciones |
|---|---|---|---|---|---|
| ¿Qué necesito para iniciar el servicio social? | servicio-social.md | Sí | [0.00] | Sí / No | [Nota] |
| ¿Cuáles son las modalidades de titulación? | titulacion.md | Sí | [0.00] | Sí / No | [Nota] |
| ¿Cómo registro mis residencias? | residencias-profesionales.md | Sí | [0.00] | Sí / No | [Nota] |
| ¿Cuál es el horario de la cafetería? | Ninguno | No | [0.00] | No aplica | Debe negarse |

### Métricas sugeridas

- Precisión en top-3.
- Porcentaje de respuestas con fuente válida.
- Porcentaje de negativas correctas ante preguntas no cubiertas.
- Latencia de recuperación y de generación.

## 9. Limitaciones conocidas

- [Documentos incompletos o desactualizados]
- [Preguntas que cruzan varios temas]
- [Dependencia de un modelo local o de red]
- [Riesgo de alucinación pese al prompt]

## 10. Decisiones y pendientes

| Fecha | Decisión | Motivo | Alternativa descartada |
|---|---|---|---|
| [AAAA-MM-DD] | [Decisión] | [Motivo] | [Alternativa] |

## 11. Reproducibilidad

```bash
python scripts/indexar.py
python scripts/consultar.py
pytest -q
```

Registra la versión de Python, las dependencias y el modelo de embeddings. No versiones `chroma_db/`.
