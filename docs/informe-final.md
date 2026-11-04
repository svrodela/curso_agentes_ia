# Informe final de reestructuración

## Cambios realizados

Se audió y reestructuró el curso "Creación de software con Agentes de IA" para que sea práctico, progresivo y completamente guiado, centrado en TecBot Académico con FastAPI, React, TypeScript, SQLite, RAG y cuatro subagentes especializados.

### Archivos creados

- `docs/auditoria-inicial.md` — auditoría del repositorio.
- `docs/plan-reestructuracion.md` — plan de reestructuración.
- `docs/arquitectura-curso.md` — arquitectura pedagógica/técnica del portal.
- `docs/informe-final.md` — este informe.
- `src/content/opencode.md` — guía completa de OpenCode.
- `src/content/proyecto-conductor/backend.md` — backend FastAPI paso a paso.
- `src/content/proyecto-conductor/frontend.md` — frontend React + TypeScript paso a paso.
- `public/tecbot-academico/agentes/coordinador.md`, `arquitecto.md`, `disenador-web.md`, `desarrollador.md`, `tester.md` — configuración de subagentes.
- `public/tecbot-academico/configuracion-opencode.json` — configuración de OpenCode con los 4 subagentes.
- `public/tecbot-academico/backend/` — esqueleto FastAPI completo (main, config, database, models, schemas, routers, services, tests, requirements).
- `public/tecbot-academico/frontend/` — esqueleto React + TypeScript + Tailwind.
- `public/tecbot-academico/prompts/disenador-web.md` — prompt del cuarto subagente.
- `public/tecbot-academico/README.md` — instalación y ejecución de TecBot.

### Archivos modificados

- `src/data/course.ts` — agregados `/opencode` (standalone) y `backend`/`frontend` (project docs); repositorio actualizado.
- `src/pages/StandalonePage.tsx` — navegación prev/next para `/opencode`.
- `src/content/recursos.md` — enlaces a OpenCode, skeletons, agentes y README.
- `src/content/proyecto-conductor/arquitectura.md` — subagente diseñador web en la configuración de OpenCode.
- `src/content/dias/dia-1/opencode.md` — reescrito con plantilla de 9 pasos.
- `src/content/dias/dia-2/subagentes.md` — reescrito con los 4 subagentes y configuración real.

### Archivos conservados

Todo el contenido didáctico existente (explicaciones, tablas, diagramas Mermaid, problemas frecuentes, actividades) se conservó. No se eliminó ningún archivo.

### Contenidos pendientes / recomendaciones

- Aplicar la plantilla de 9 pasos de forma homogénea al resto de los temas (ya tienen estructura similar; se pueden refinar).
- Verificar la sintaxis exacta de OpenCode contra la versión instalada por el docente.
- Agregar indicadores de avance en el portal si se desea (no incluido para no complejizar).
- Probar el esqueleto backend/frontend en Windows/PowerShell antes del curso.

### Validaciones ejecutadas

- `npm run typecheck` — sin errores.
- `npm run build` — exitoso.
- Búsqueda de referencias a Docker/Kubernetes/contenedores en código fuente del curso — sin resultados.
- Búsqueda de "jornadas" — sin resultados (migrado a "días").
- Enlaces internos del portal verificados en la navegación.

### Problemas detectados

- El esqueleto backend requiere proveedor de IA configurado en `.env`; sin clave, la generación falla pero la recuperación y los endpoints de salud/documentos funcionan.
- ChromaDB y el modelo de embeddings requieren instalación previa; se documenta en los pasos.
- La sintaxis de OpenCode puede variar por versión; se incluyen avisos.
