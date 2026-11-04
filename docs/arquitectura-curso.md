# Arquitectura del curso

## Objetivo

Documentar la arquitectura pedagógica y técnica del portal educativo "Creación de software con Agentes de IA".

## Tecnología del portal

Vite 8 + React 19 + TypeScript + Tailwind 4 + React Router 7 + react-markdown + Mermaid. Desplegado en GitHub Pages (estático, sin backend).

## Estructura de contenido

```text
src/content/
├── programa.md
├── opencode.md
├── acerca-del-curso.md
├── dias/
│   ├── dia-1/ ... dia-4/
└── proyecto-conductor/
    ├── descripcion.md, requerimientos.md, arquitectura.md
    ├── backend.md, frontend.md, rag.md, mcp.md
```

## Navegación

- Rutas en `src/App.tsx`: `/`, `/programa`, `/dias`, `/dias/:slug`, `/dias/:slug/:topic`, `/proyecto-conductor`, `/proyecto-conductor/:slug`, `/proyecto-integrador`, `/recursos`, `/acerca-del-curso`, `/opencode`.
- Legacy `/jornadas/*` → redirect a `/dias/*`.
- Sidebar `CourseSidebar` lista días y proyecto conductor.
- Búsqueda en cliente indexa todos los Markdown.

## Datos

- `src/data/course.ts`: metadatos del curso, días, temas, projectDocs, standaloneDocs.
- `src/data/search.ts`: índice de búsqueda.

## Despliegue

- Workflow `.github/workflows/deploy.yml`: build con VITE_BASE_PATH=/<repo>/, upload artifact, deploy-pages.
- `public/404.html` + script en index.html para SPA fallback en GitHub Pages.

## Principios

- No reconstruir el portal; conservar tecnología base.
- Contenido en Markdown, cargado con import.meta.glob.
- Enlaces internos relativos a la base.
- Sin Docker/Kubernetes en ningún contenido.
