# Creación de software con Agentes de IA

Portal educativo del curso taller **Creación de software con Agentes de IA**, impartido en el Instituto Tecnológico Superior de Santiago Papasquiaro (ITS Santiago Papasquiaro) del **9 al 12 de noviembre de 2026**, en el marco del **Congreso Ciencias Revueltas 2026**.

El curso tiene una duración de **15 horas**: el lunes se imparte de 10:00 a 13:00 y de martes a jueves de 08:00 a 12:00. El sitio reúne el programa, cuatro días de contenido, el proyecto conductor **TecBot Académico**, el proyecto integrador con su rúbrica y recursos descargables.

> **Aviso:** todos los documentos institucionales de ejemplo (`public/tecbot-academico/documentos-demo/`) son ficticios y se incluyen únicamente con fines didácticos. No representan normativa, requisitos ni procedimientos oficiales del ITS Santiago Papasquiaro ni de ninguna otra institución.

## Tecnologías

- [Vite 8](https://vite.dev/) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router 7](https://reactrouter.com/)
- Markdown con `react-markdown`, `remark-gfm`, `rehype-highlight` y `rehype-slug`
- Diagramas con [Mermaid 12](https://mermaid.js.org/)
- Tipografía Geist mediante `@fontsource-variable`
- Iconos de `lucide-react`

El sitio es completamente estático: no requiere backend, base de datos, autenticación ni variables de entorno para mostrar el contenido.

## Requisitos

- Node.js 22 o superior
- npm 10 o superior

## Ejecución local

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

### Otros comandos

```bash
npm run typecheck   # Verificación de TypeScript
npm run build       # Compilación de producción en dist/
npm run preview     # Sirve la compilación de producción
```

En desarrollo el sitio se sirve desde la raíz (`/`). En producción, Vite usa por defecto la base `/curso-creacion-software-agentes-ia/`, pensada para GitHub Pages.

## Estructura

```text
.
├─ .github/workflows/deploy.yml   # Publicación en GitHub Pages
├─ public/
│  ├─ .nojekyll                   # Evita el procesamiento de Jekyll
│  ├─ 404.html                    # Fallback de rutas del SPA en Pages
│  ├─ favicon.svg
│  ├─ descargas/                  # Plantillas y recursos descargables
│  └─ tecbot-academico/
│     ├─ documentacion/           # Requerimientos, arquitectura y pruebas
│     ├─ documentos-demo/         # Corpus ficticio marcado como didáctico
│     └─ prompts/                 # Prompts de subagentes
├─ src/
│  ├─ components/                 # Layout, navegación, Markdown, Mermaid, búsqueda
│  ├─ content/                    # Contenido en Markdown por día y sección
│  ├─ data/                       # Registro del curso e índice de búsqueda
│  ├─ lib/                        # Utilidades de contenido y assets
│  ├─ pages/                      # Vistas del sitio
│  ├─ App.tsx                     # Rutas
│  ├─ main.tsx                    # Punto de entrada y basename del router
│  └─ styles.css                  # Tokens visuales y estilos
├─ DESIGN.md                      # Referencia visual
├─ index.html                     # HTML base y restauración de rutas
└─ vite.config.ts                 # Base configurable para Pages
```

## Contenido

El contenido vive en `src/content/`:

- `programa.md`, `proyecto-integrador.md`, `recursos.md`, `acerca-del-curso.md`
- `dias/dia-1/` a `dias/dia-4/`
- `proyecto-conductor/`

El registro de días, temas, navegación y búsqueda está en `src/data/course.ts`. Para agregar un tema:

1. Crea el archivo Markdown en `src/content/`.
2. Añade la entrada correspondiente en `days` dentro de `src/data/course.ts`.
3. Verifica que los enlaces internos empiecen con `/` y que las descargas apunten a `/descargas/...` o `/tecbot-academico/...`.
4. Ejecuta `npm run typecheck` y `npm run build`.

Los archivos Markdown admiten GFM, bloques de código resaltados, tablas, listas de tareas y diagramas Mermaid con cercas ` ```mermaid `.

## Publicación en GitHub Pages

El repositorio incluye `.github/workflows/deploy.yml`. El flujo:

1. Se ejecuta en cada push a `main` o manualmente desde **Actions**.
2. Instala con `npm ci`, verifica TypeScript y compila con la base `/<nombre-del-repositorio>/`.
3. Publica `dist/` mediante GitHub Pages.

### Preparación (una sola vez)

1. Crea un repositorio vacío en GitHub. No inicialices el repositorio con README, licencia ni `.gitignore`, porque ya existen en este proyecto.
2. Desde la raíz del proyecto:

   ```bash
   git init
   git add .
   git commit -m "feat: crea el portal del curso"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPOSITORIO.git
   git push -u origin main
   ```

3. En GitHub, abre **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona **GitHub Actions**.
5. Espera a que termine el flujo en **Actions** y abre la URL publicada.

No se incluyen credenciales en el repositorio. La autenticación se realiza con tu sesión de GitHub, un token personal o el gestor de credenciales de Git.

### Nombre del repositorio y base path

El flujo calcula la base automáticamente:

```yaml
VITE_BASE_PATH: /${{ github.event.repository.name }}/
```

Por eso el sitio funciona en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/` sin editar código.

Si usas un dominio personalizado o publicas en la raíz (`https://TU-USUARIO.github.io/`), debes:

- Configurar `VITE_BASE_PATH: /` en el flujo.
- Cambiar `pathSegmentsToKeep` a `0` en `public/404.html`.
- Ajustar `repositoryBase` en `vite.config.ts` solo si compilas manualmente.

### Rutas directas

GitHub Pages no conoce las rutas del SPA. El sitio incluye:

- `public/404.html`: convierte la ruta solicitada en una query.
- El script de `index.html`: restaura la ruta antes de montar React.
- `BrowserRouter` con `basename` derivado de `BASE_URL`.

Esto permite abrir directamente rutas como `/programa`, `/dias/dia-1/opencode` o `/proyecto-conductor/arquitectura`.

### Compilación manual para Pages

```bash
npm run build
```

El resultado queda en `dist/`. Para probar el comportamiento de Pages en local:

```bash
npm run preview
```

La vista previa de Vite sirve la base configurada. Para verificar el fallback de rutas directas conviene usar un servidor estático que devuelva `404.html` en rutas desconocidas, o probar directamente en GitHub Pages después del despliegue.

## Búsqueda

La búsqueda se ejecuta en el navegador sobre un índice generado a partir de todo el Markdown. Se abre con el botón del encabezado o con `Ctrl+K` / `Cmd+K`.

## Accesibilidad y diseño

- Tema oscuro de alto contraste según `DESIGN.md`.
- Navegación por teclado, enlace para saltar al contenido y foco visible.
- Diseño responsive con navegación móvil y tablas de contenido.
- Sin gradientes decorativos ni superficies claras.

## Estado del repositorio

Este proyecto se entrega sin repositorio remoto configurado y sin publicar. Los pasos de la sección de publicación deben ejecutarse con la cuenta y el repositorio que autorice el responsable del curso.

## Licencia y uso del material

Material didáctico del curso. Los documentos de demostración son ficticios. Antes de reutilizar el contenido fuera del curso, revisa permisos de la institución, de las fuentes citadas y de las herramientas mencionadas.
