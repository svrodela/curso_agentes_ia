# Plan de reestructuración del curso

## Objetivo

Transformar el material existente en un curso práctico, progresivo y completamente guiado para desarrollar TecBot Académico con FastAPI, React, TypeScript, SQLite, RAG y cuatro subagentes especializados, sin Docker ni Kubernetes.

## Etapas

### ETAPA A — Auditoría (completada)
Ver `docs/auditoria-inicial.md`.

### ETAPA B — Diseño de la nueva estructura pedagógica

Estructura de 4 días conservada. Cada tema se reescribe con la plantilla de 9 pasos:

1. Objetivo
2. Resultado esperado
3. Requisitos previos
4. Conceptos fundamentales
5. Paso a paso (entorno, archivos, implementación, agente, ejecución, verificación)
6. Errores frecuentes
7. Entregable
8. Criterios de aceptación
9. Recursos

### ETAPA C — Reorganización del contenido existente

- Conservar explicaciones, tablas, diagramas, problemas frecuentes.
- Reorganizar en la plantilla de 9 pasos.
- Eliminar duplicación solapada (se fusionan secciones, no se borran archivos sin justificación).
- Agregar código real FastAPI/React/TS/SQLite/RAG.

### ETAPA D — Guías paso a paso

Temas con código completo:

- Día 1: instalación OpenCode, Git/GitHub, requerimientos, arquitectura inicial.
- Día 2: entorno virtual Python, FastAPI mínimo, Pydantic, SQLAlchemy+SQLite, React+TS+Vite+Tailwind, integración API REST.
- Día 3: integración con modelo de IA (agnóstica), chunking, embeddings, ChromaDB, pipeline RAG, MCP Filesystem.
- Día 4: orquestación, pruebas pytest + frontend, seguridad básica, manejo de errores, README, presentación.

### ETAPA E — Integración de agentes y subagentes

- Sección dedicada de OpenCode (instalación, /init, AGENTS.md, modos, herramientas, permisos, subagentes, delegación, depuración).
- Cuatro subagentes: arquitecto, diseñador web, desarrollador, tester.
- Archivos de configuración de ejemplo en `public/tecbot-academico/agentes/`.
- Prompts operativos por rol y por etapa.

### ETAPA F — Validación

- Enlaces internos, navegación, build, typecheck, búsqueda de Docker/K8s, revisión de código coherente, comandos Windows.

## Archivos a crear

- `docs/auditoria-inicial.md` ✅
- `docs/plan-reestructuracion.md` ✅
- `docs/arquitectura-curso.md`
- `docs/proyecto-integrador.md` (o enriquecer el existente)
- `public/tecbot-academico/backend/` — esqueleto FastAPI (archivos descargables)
- `public/tecbot-academico/frontend/` — esqueleto React TS
- `public/tecbot-academico/agentes/` — configuración OpenCode
- `public/tecbot-academico/prompts/` — prompts operativos (ampliar existentes)

## Archivos a modificar

- `src/content/dias/**/*.md` — reestructurar con plantilla 9 pasos + código real.
- `src/content/proyecto-conductor/*.md` — stack concreto.
- `src/content/programa.md`, `proyecto-integrador.md`, `recursos.md`, `acerca-del-curso.md` — ajustes.
- `src/data/course.ts` — solo si se agregan temas nuevos (evaluar).
- `README.md` — actualizar instrucciones.

## Archivos a eliminar

Ninguno en esta etapa. Si se fusiona contenido solapado, se documenta en `docs/informe-final.md`.

## Criterios de éxito

- Todos los temas siguen la plantilla de 9 pasos.
- Cada día construye sobre el anterior (hilo de código).
- Prompts operativos en cada tema.
- Sin referencias a Docker/Kubernetes/contenedores.
- Comandos para Windows/PowerShell cuando aplique.
- Build y typecheck verdes.
- Todos los enlaces internos válidos.
