> **Objetivo de aprendizaje:** escribir un archivo `AGENTS.md` conciso y útil que permita a cualquier sesión del agente entender la arquitectura, los comandos, las convenciones y los límites del proyecto.

## Qué es AGENTS.md

`AGENTS.md` es un archivo de instrucciones que OpenCode incluye en el contexto del proyecto. No es documentación para personas solamente: es la memoria operativa que el agente lee al comenzar.

Piensa en él como la inducción que le darías a un desarrollador nuevo:

- Qué es el proyecto.
- Cómo se ejecuta.
- Qué reglas no se negocian.
- Dónde está cada cosa.
- Cómo saber si un cambio está bien.

OpenCode puede generarlo con `/init`, pero el resultado automático es un punto de partida. Un buen `AGENTS.md` se mantiene con el equipo.

## Qué debe incluir

| Sección | Pregunta que responde |
|---|---|
| Propósito | ¿Qué problema resuelve el proyecto? |
| Alcance | ¿Qué no se va a construir? |
| Stack | ¿Con qué tecnologías se trabaja? |
| Estructura | ¿Dónde vive cada tipo de archivo? |
| Comandos | ¿Cómo se instala, ejecuta y prueba? |
| Convenciones | ¿Cómo se nombra y organiza el código? |
| Reglas de datos | ¿Qué documentos son fuente de verdad? |
| Permisos | ¿Qué acciones requieren revisión humana? |
| Definición de terminado | ¿Qué evidencia se exige? |

## Ejemplo para TecBot Académico

````markdown
# AGENTS.md — TecBot Académico

## Propósito

Asistente de información académica para estudiantes del ITS Santiago Papasquiaro.
Responde preguntas sobre servicio social, residencias, titulación y acreditación
usando únicamente los documentos de `documentos-demo/`.

## Alcance

Incluye:
- Consultas en lenguaje natural.
- Recuperación de fragmentos documentales.
- Respuestas con fuentes.
- Derivación al departamento cuando no hay evidencia.

No incluye:
- Autenticación de usuarios.
- Trámites oficiales ni firmas.
- Datos personales.
- Normativa institucional real.

## Stack

- Python 3.11+
- FastAPI + Uvicorn
- ChromaDB
- OpenCode
- Git y GitHub
- Frontend estático (HTML/CSS/JS o React)

## Estructura

- `app/` — API y lógica de recuperación.
- `app/main.py` — entrada de FastAPI.
- `app/rag.py` — indexación y consulta documental.
- `documentos-demo/` — corpus ficticio de demostración.
- `documentacion/` — requerimientos, arquitectura y pruebas.
- `prompts/` — instrucciones de subagentes.
- `tests/` — pruebas automatizadas.

## Comandos

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
pytest -q
```

## Reglas

1. No inventar requisitos, fechas, montos ni enlaces.
2. Toda respuesta debe citar al menos un documento de `documentos-demo/`.
3. Si la recuperación no encuentra evidencia suficiente, responder que no se
   cuenta con información y recomendar acudir al departamento correspondiente.
4. No modificar `documentos-demo/` para “hacer que una respuesta funcione”.
5. No agregar dependencias sin justificar el motivo y actualizar requirements.txt.
6. No incluir credenciales, tokens ni datos personales en el repositorio.
7. Los documentos son material didáctico; nunca presentarlos como normativa oficial.

## Convenciones

- Python con type hints en funciones públicas.
- Nombres de archivos en snake_case.
- Rutas de API en español y en plural cuando representan recursos.
- Respuestas JSON con las claves `respuesta`, `fuentes` y `advertencia`.
- Mensajes de commit en formato Conventional Commits.

## Definición de terminado

Una tarea está terminada cuando:
- El código compila y las pruebas pasan.
- Existe al menos una prueba para el caso feliz y una para el caso sin evidencia.
- Se actualizó la documentación afectada.
- El cambio fue revisado con `git diff`.
````

## Cómo generarlo con OpenCode

Desde la raíz del proyecto:

```text
/init
```

OpenCode analizará el repositorio y propondrá un `AGENTS.md`. Después:

1. Lee la propuesta completa.
2. Elimina generalidades que no apliquen.
3. Agrega comandos que realmente funcionen.
4. Incluye reglas de dominio que el agente no puede deducir del código.
5. Guarda y haz commit.

```bash
git add AGENTS.md
git commit -m "docs: agrega contexto operativo del proyecto"
```

## Instrucciones globales y de proyecto

OpenCode busca instrucciones en dos niveles:

- **Proyecto:** `AGENTS.md` en la raíz. Se comparte con el equipo y se versiona.
- **Global:** `~/.config/opencode/AGENTS.md`. Aplica a todos tus proyectos y no se comparte.

También puedes incluir archivos adicionales desde `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["AGENTS.md", "docs/convenciones.md", "docs/dominio.md"]
}
```

Esto es útil cuando el proyecto crece y no quieres un archivo gigante.

## Qué evitar

**Duplicar el README.**  
El README explica a personas cómo usar el proyecto. `AGENTS.md` explica al agente cómo trabajar en él. Pueden compartir comandos, pero no deben ser copias.

**Escribir una novela.**  
Un archivo de 800 líneas compite por contexto y se vuelve obsoleto. Prefiere instrucciones específicas y enlaces a documentos más detallados.

**Reglas que el agente no puede verificar.**  
“Escribe código limpio” no es accionable. “Las funciones públicas llevan type hints y las rutas tienen una prueba de contrato” sí lo es.

**Ocultar decisiones.**  
Si eligieron una búsqueda por palabra clave en lugar de embeddings, indícalo y explica cuándo se reemplazará.

## Mantenerlo actualizado

Actualiza `AGENTS.md` cuando:

- Cambie la arquitectura o la estructura de carpetas.
- Se agregue un comando de instalación o prueba.
- Se tome una decisión que afecte varias funcionalidades.
- Se descubra una restricción del entorno.
- Cambie el alcance del proyecto.

Una buena práctica es incluir la actualización de `AGENTS.md` en la checklist de cada Pull Request.

## Actividad de práctica

1. Ejecuta `/init` en tu proyecto.
2. Reescribe el resultado con las secciones de la tabla inicial.
3. Verifica que todos los comandos funcionen en tu equipo.
4. Agrega tres reglas de dominio para TecBot Académico.
5. Pide a OpenCode que resuma el proyecto usando solo `AGENTS.md`. ¿La descripción coincide con la realidad?
6. Corrige lo que falte y haz commit.

**Resultado esperado:** un `AGENTS.md` de 60 a 120 líneas que otra persona pueda seguir para ejecutar y validar el proyecto.

## Problemas frecuentes

**El agente ignora una regla.**  
Puede estar enterrada entre demasiadas instrucciones. Muévela al inicio, hazla explícita y refuerza el criterio de terminado.

**El archivo quedó desactualizado.**  
Agrega una tarea de revisión en cada día o en cada Pull Request. La documentación también se prueba.

**Hay instrucciones contradictorias.**  
Define una jerarquía: reglas de seguridad primero, luego dominio, luego estilo. Elimina duplicados.

**El agente no encuentra archivos mencionados.**  
Verifica rutas relativas a la raíz y que los archivos estén versionados. No referencies archivos locales fuera del repositorio.

## Recursos complementarios

- [OpenCode: reglas y AGENTS.md](https://opencode.ai/docs/rules/)
- [OpenCode: configuración](https://opencode.ai/docs/config/)
- [Plantilla AGENTS.md](/descargas/AGENTS.md)
- [Ejemplo de configuración de agentes](/descargas/opencode-agents.json)

**Siguiente paso:** dividir el trabajo entre agentes especializados en [Subagentes](/dias/dia-2/subagentes).
