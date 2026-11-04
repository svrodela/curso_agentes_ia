# Auditoría inicial del repositorio

**Curso:** Creación de software con Agentes de IA
**Repositorio:** `svrodela/curso_agentes_ia`
**Fecha de auditoría:** 4 de noviembre de 2026
**Auditor:** equipo de reestructuración (ingeniería de software, arquitectura, diseño instruccional, documentación)

## 1. Tecnología del portal educativo

El portal es una aplicación estática construida con:

- **Vite 8** + **React 19** + **TypeScript 5.9**
- **Tailwind CSS 4** (plugin `@tailwindcss/vite`)
- **React Router 7** (`BrowserRouter` con `basename` derivado de `BASE_URL`)
- **react-markdown** + `remark-gfm` + `rehype-highlight` + `rehype-slug`
- **Mermaid 12** para diagramas
- **lucide-react** para iconos
- **@fontsource-variable/geist** y geist-mono
- **github-slugger** para slugs

Características funcionales relevantes:

- Carga de Markdown mediante `import.meta.glob('../content/**/*.md', { query: '?raw', eager: true })`.
- Búsqueda en cliente (`src/data/search.ts`) indexando Markdown.
- Barra lateral con navegación por días (`CourseSidebar`).
- Páginas: Home, DíasIndex, DayPage, TopicPage, ProjectIndex/ProjectDocPage, StandalonePage, NotFound.
- Fallback SPA para GitHub Pages (`public/404.html` + script en `index.html`).
- Workflow `.github/workflows/deploy.yml` (Node 22, `npm ci`, typecheck, build, upload artifact, deploy-pages).

**Conclusión:** la base técnica funciona y no debe reconstruirse. Se conserva tal cual.

## 2. Estructura de navegación actual

Rutas (en `src/App.tsx`):

- `/` — Home
- `/programa` — Programa general
- `/dias` — Índice de días
- `/dias/:daySlug` — Día
- `/dias/:daySlug/:topicSlug` — Tema
- `/proyecto-conductor` y `/proyecto-conductor/:docSlug` — Proyecto conductor
- `/proyecto-integrador`, `/recursos`, `/acerca-del-curso`
- `/jornadas/*` — redirección legacy a `/dias/*`

Días (4) y temas (15):

| Día | Temas |
|---|---|
| Día 1 (3 h) | Introducción al desarrollo agéntico, Ingeniería de requerimientos, Primeros pasos con OpenCode, Git y GitHub |
| Día 2 (4 h) | Ciclo de desarrollo agéntico, AGENTS.md, Subagentes, Pruebas y validación |
| Día 3 (4 h) | Fundamentos de RAG, ChromaDB, Fundamentos de MCP, MCP Filesystem |
| Día 4 (4 h) | Orquestación de agentes, Integración y validación, Presentación final |

Documentos standalone: programa, proyecto integrador, recursos, acerca del curso.
Documentos de proyecto conductor: descripción, requerimientos, arquitectura, RAG, MCP.

## 3. Inventario de contenido (src/content)

### Día 1
- `introduccion-agentes.md` — conceptos de agentes, chatbot vs agente, herramientas, bucle de acción. **Bueno, conservar y enriquecer.**
- `ingenieria-requerimientos.md` — problema, usuarios, RF/RNF, historias, criterios, arquitectura inicial. **Bueno, conservar y enriquecer.**
- `opencode.md` — instalación y primeros pasos con OpenCode. **Revisar: debe incluir configuración real de agentes/subagentes.**
- `git-github.md` — Git y GitHub. **Bueno, conservar.**

### Día 2
- `ciclo-agentes.md` — ciclo Plan→Build→Revisar→Probar. **Bueno.**
- `agents-md.md` — AGENTS.md. **Bueno.**
- `subagentes.md` — subagentes. **Debe ampliarse con los 4 roles (arquitecto, diseñador web, desarrollador, tester) y sintaxis real de OpenCode.**
- `pruebas.md` — pruebas y validación. **Debe incluir pytest y pruebas de frontend.**

### Día 3
- `fundamentos-rag.md`, `chromadb.md` — RAG y ChromaDB. **Buenos, enriquecer con código real.**
- `fundamentos-mcp.md`, `filesystem.md` — MCP. **Buenos.**

### Día 4
- `orquestacion.md`, `integracion.md`, `presentacion.md` — orquestación, integración, presentación. **Enriquecer con pruebas de integración, seguridad básica, README.**

### Proyecto conductor
- `descripcion.md`, `requerimientos.md`, `arquitectura.md`, `rag.md`, `mcp.md`. **Buenos, pero la arquitectura debe pasar de genérica a stack concreto FastAPI/React/TS/SQLite.**

### Standalone
- `programa.md`, `proyecto-integrador.md`, `recursos.md`, `acerca-del-curso.md`. **Buenos.**

### Descargas (`public/descargas/`)
- Plantillas y ejemplos: AGENTS.md, arquitectura.mmd, configuracion-mcp.json, documentacion-rag.md, ejemplo-fastapi-rag.py, historias-usuario.md, opencode-agents.json, plantilla-requerimientos.md, rubrica.md.

### Demo (`public/tecbot-academico/`)
- Documentación: arquitectura, pruebas, requerimientos.
- Documentos demo: acreditación, residencias, servicio social, titulación.
- Prompts: arquitecto, desarrollador, tester.

## 4. Hallazgos (auditoría)

### 4.1 Lo que funciona bien
- Portal técnico estable, build y typecheck verdes.
- Navegación por días y temas operativa.
- Fallback SPA para GitHub Pages funcionando.
- Contenido didáctico existente de buena calidad (explicaciones, tablas, diagramas Mermaid, problemas frecuentes).
- Terminología ya migrada a “días”.
- Horarios actualizados (Lun 10–13, Mar–Jue 8–12, 15 h).
- Referencia al Congreso Ciencias Revueltas 2026.
- Descargas y documentos demo disponibles.

### 4.2 Vacíos y mejoras necesarias

1. **Stack técnico concreto poco desarrollado.** El curso menciona FastAPI/React/SQLite/RAG de forma genérica pero no incluye guías paso a paso con código completo para construir TecBot Académico sobre ese stack. La mayoría de los temas son conceptuales.
2. **Sin código de aplicación real.** No hay proyecto `backend/` ni `frontend/` en el repositorio; los ejemplos son fragmentos. El alumno no tiene un esqueleto para seguir.
3. **Subagentes insuficientemente detallados.** Se mencionan 3 roles (arquitecto, desarrollador, tester). Falta el **diseñador web** como cuarto subagente. No hay configuración real de OpenCode (archivos `.opencode/agents/*.md` ni `opencode.json`).
4. **OpenCode documentado de forma superficial.** No hay sección completa de instalación, `/init`, AGENTS.md, modos, herramientas, permisos, delegación, depuración.
5. **Sin prompts operativos completos.** Los prompts existentes son genéricos. Faltan prompts listos para OpenCode con contexto, objetivo, archivos, restricciones, resultado esperado y criterios de aceptación.
6. **Sin pruebas automatizadas reales.** `pruebas.md` es conceptual; no hay ejemplos de pytest ni de pruebas de frontend.
7. **Sin seguridad básica ni manejo de errores.** No se cubre validación de entrada, CORS, gestión de variables de entorno, rate limiting básico.
8. **Sin README del proyecto TecBot.** El README del curso es del portal, no del proyecto de software.
9. **Sin integración progresiva día a día.** Aunque el proyecto conductor evoluciona conceptualmente, no hay un hilo de código que pase de Día 1 a Día 4.
10. **Plantilla de 9 pasos no aplicada de forma homogénea.** Los temas actuales tienen estructuras variadas. Se debe estandarizar.
11. **Sin referencias a OpenCode real.** Hay que verificar sintaxis real de la versión vigente y no inventar configuración.

### 4.3 Contenido repetido / solapado

- `introduccion-agentes.md` y `ciclo-agentes.md` solapan el concepto de bucle agéntico.
- `ingenieria-requerimientos.md` y `proyecto-conductor/requerimientos.md` solapan requerimientos (uno es genérico, otro del proyecto). Se mantienen ambos pero con roles claros: genérico en Día 1, específico en proyecto conductor.
- `pruebas.md` (Día 2) y `integracion.md` (Día 4) solapan validación. Se diferencian: Día 2 pruebas unitarias/iniciales, Día 4 integración/E2E.

### 4.4 Contenido a conservar (no eliminar)

Todo el contenido didáctico existente (explicaciones, tablas, diagramas, problemas frecuentes, actividades) se conserva. Se reorganiza y enriquece, no se borra.

### 4.5 Verificación de restricciones

- Búsqueda de “Docker”, “Kubernetes”, “contenedor”, “compose”: **sin resultados** en el código fuente del curso. ✅ Cumple la restricción.
- Terminología “jornadas”: **sin resultados** en código fuente. ✅ Ya migrado a “días”.
- Referencias a “16 horas”: corregidas a 15 horas. ✅

### 4.6 Gaps frente a los nuevos requisitos

| Requisito nuevo | Estado actual | Acción |
|---|---|---|
| Backend FastAPI con código real | Solo conceptual | Crear guía paso a paso con código completo |
| Frontend React + TypeScript | Solo conceptual | Crear guía con componentes TSX |
| SQLite + SQLAlchemy | Mencionado | Agregar modelos y migraciones |
| RAG con código | Conceptual + ChromaDB | Agregar pipeline completo (chunking, embeddings, retrieval) |
| 4 subagentes (arquitecto, diseñador web, desarrollador, tester) | 3 mencionados | Agregar diseñador web y configuración OpenCode |
| OpenCode docs completas | Superficial | Nueva sección dedicada |
| Prompts operativos | Genéricos | Reescribir todos los prompts |
| Pruebas automatizadas | Conceptual | Agregar pytest y pruebas frontend |
| Seguridad básica | Ausente | Agregar sección |
| Plantilla 9 pasos homogénea | Parcial | Estandarizar todos los temas |
| Proyecto conductor evolutivo día a día | Conceptual | Hilo de código día a día |

## 5. Propuesta de reorganización (resumen)

Mantener la estructura de 4 días / 15 temas del portal. Enriquecer cada tema con la plantilla de 9 pasos y código real. Agregar:

- `docs/` con auditoría, plan, arquitectura del curso, proyecto integrador.
- `public/tecbot-academico/` con esqueleto de backend/frontend (archivos de ejemplo descargables) y configuración de agentes OpenCode.
- Nueva sección de OpenCode (instalación, /init, AGENTS.md, modos, herramientas, permisos, subagentes, delegación, depuración).
- Prompts operativos para cada rol.
- Pruebas con pytest y frontend.
- Seguridad básica y manejo de errores.
- README del proyecto TecBot.

La estructura de rutas del portal se conserva (`/dias`, `/dias/:slug`, `/dias/:slug/:topic`, `/proyecto-conductor`, etc.). Se añaden temas nuevos solo si aportan valor y se conectan a la navegación.

## 6. Riesgos y consideraciones

- El curso es presencial de 15 h; el código debe ser ejecutable en Windows/PowerShell sin Docker.
- La integración con modelos de IA debe ser agnóstica al proveedor (variables de entorno).
- Los documentos institucionales son ficticios y deben marcarse como demostración.
- La sintaxis de OpenCode debe verificarse contra la documentación oficial vigente; se incluirán avisos de versión.
- No se debe inventar funcionalidad no disponible en el portal (ej. indicadores de avance complejos) sin justificación.
