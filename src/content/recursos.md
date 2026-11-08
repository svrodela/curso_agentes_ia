# Recursos y documentación

> Todos los enlaces apuntan a documentación oficial o a materiales del propio curso. Si encuentras un enlace roto, repórtalo a la persona responsable de la capacitación.

## Cómo usar esta biblioteca

1. Consulta la documentación oficial cuando necesites el detalle de una herramienta.
2. Descarga las plantillas para trabajar durante los días.
3. Usa los documentos de demostración solo como corpus didáctico.
4. Revisa los ejemplos de configuración antes de adaptarlos a tu proyecto.
5. No copies rutas, credenciales ni nombres de usuario de los ejemplos.

## Documentación oficial

### Agentes y herramientas

| Recurso | Enlace | Uso |
|---|---|---|
| OpenCode Docs | [opencode.ai/docs](https://opencode.ai/docs/) | Instalación, uso, configuración |
| OpenCode: agentes | [opencode.ai/docs/agents](https://opencode.ai/docs/agents/) | Agentes primarios y subagentes |
| OpenCode: reglas | [opencode.ai/docs/rules](https://opencode.ai/docs/rules/) | `AGENTS.md` e instrucciones |
| OpenCode: MCP | [opencode.ai/docs/mcp-servers](https://opencode.ai/docs/mcp-servers/) | Servidores MCP locales y remotos |
| OpenCode: permisos | [opencode.ai/docs/permissions](https://opencode.ai/docs/permissions/) | Permisos de herramientas |
| Model Context Protocol | [modelcontextprotocol.io](https://modelcontextprotocol.io/) | Especificación y conceptos |
| Servidor Filesystem | [npm](https://www.npmjs.com/package/@modelcontextprotocol/server-filesystem) | Paquete del servidor MCP |

### Desarrollo y datos

| Recurso | Enlace | Uso |
|---|---|---|
| Git | [git-scm.com/doc](https://git-scm.com/doc) | Comandos y modelo de Git |
| GitHub Docs | [docs.github.com](https://docs.github.com/) | Repositorios, Pull Requests, Pages |
| GitHub Pages | [docs.github.com/pages](https://docs.github.com/es/pages) | Publicación de sitios estáticos |
| GitHub Actions | [docs.github.com/actions](https://docs.github.com/es/actions) | Flujos de integración y despliegue |
| Python | [docs.python.org](https://docs.python.org/3/) | Lenguaje y biblioteca estándar |
| FastAPI | [fastapi.tiangolo.com](https://fastapi.tiangolo.com/) | API y pruebas |
| Pydantic | [docs.pydantic.dev](https://docs.pydantic.dev/) | Validación de datos |
| pytest | [docs.pytest.org](https://docs.pytest.org/) | Pruebas automatizadas |
| ChromaDB | [docs.trychroma.com](https://docs.trychroma.com/) | Colecciones, embeddings y consultas |
| Ollama | [ollama.com](https://ollama.com/) | Modelos locales |

### Portal y frontend

| Recurso | Enlace | Uso |
|---|---|---|
| Vite | [vite.dev/guide](https://vite.dev/guide/) | Desarrollo y build |
| React | [react.dev](https://react.dev/) | Interfaz de usuario |
| Tailwind CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) | Estilos |
| MDN Fetch | [MDN](https://developer.mozilla.org/es/docs/Web/API/Fetch_API) | Llamadas HTTP desde el navegador |
| Node.js | [nodejs.org](https://nodejs.org/en/learn) | Entorno de ejecución |

## Plantillas y descargas

| Archivo | Descripción |
|---|---|
| [AGENTS.md](/descargas/AGENTS.md) | Plantilla de contexto del proyecto |
| [opencode-agents.json](/descargas/opencode-agents.json) | Ejemplo de configuración de subagentes |
| [plantilla-requerimientos.md](/descargas/plantilla-requerimientos.md) | Documento base de requerimientos |
| [historias-usuario.md](/descargas/historias-usuario.md) | Ejemplo de historias y criterios |
| [arquitectura.mmd](/descargas/arquitectura.mmd) | Diagrama Mermaid de referencia |
| [documentacion-rag.md](/descargas/documentacion-rag.md) | Plantilla para documentar RAG |
| [configuracion-mcp.json](/descargas/configuracion-mcp.json) | Ejemplo de servidor MCP Filesystem |
| [ejemplo-fastapi-rag.py](/descargas/ejemplo-fastapi-rag.py) | Esqueleto de API con recuperación |
| [proyectos-integradores.md](/descargas/proyectos-integradores.md) | Propuestas de proyectos integradores para el último día |

> Para descargar, abre el enlace y usa **Guardar como** o el botón de descarga del navegador. Los archivos son de texto y pueden editarse con cualquier editor.

## Documentos de demostración

Estos documentos son **ficticios** y se usan para las prácticas de RAG y MCP. No son normativa oficial.

| Documento | Tema |
|---|---|
| [servicio-social.md](/tecbot-academico/documentos-demo/servicio-social.md) | Requisitos, registro, reportes y liberación |
| [residencias-profesionales.md](/tecbot-academico/documentos-demo/residencias-profesionales.md) | Inicio, registro, documentos y cierre |
| [titulacion.md](/tecbot-academico/documentos-demo/titulacion.md) | Modalidades, requisitos y etapas |
| [acreditacion-academica.md](/tecbot-academico/documentos-demo/acreditacion-academica.md) | Asignaturas, créditos y regularización |

## Prompts de subagentes

| Prompt | Rol |
|---|---|
| [arquitecto.md](/tecbot-academico/prompts/arquitecto.md) | Analiza y propone sin modificar archivos |
| [disenador-web.md](/tecbot-academico/prompts/disenador-web.md) | Define la interfaz y el sistema de diseño |
| [desarrollador.md](/tecbot-academico/prompts/desarrollador.md) | Implementa y prueba |
| [tester.md](/tecbot-academico/prompts/tester.md) | Revisa y reporta fallos |

## Documentación de TecBot Académico

| Documento | Contenido |
|---|---|
| [Requerimientos](/tecbot-academico/documentacion/requerimientos.md) | RF, RNF, historias y criterios |
| [Arquitectura](/tecbot-academico/documentacion/arquitectura.md) | Componentes, flujo y decisiones |
| [Pruebas](/tecbot-academico/documentacion/pruebas.md) | Matriz y registro de resultados |
| [Backend (esqueleto)](/tecbot-academico/backend/main.py) | Código de referencia FastAPI |
| [Frontend (esqueleto)](/tecbot-academico/frontend/src/App.tsx) | Código de referencia React TS |
| [Agentes OpenCode](/tecbot-academico/agentes/coordinador.md) | Configuración de los 4 subagentes |
| [README de TecBot](/tecbot-academico/README.md) | Instalación y ejecución |

## Herramientas recomendadas

| Herramienta | Gratuita | Uso en el curso |
|---|---|---|
| OpenCode | Sí | Agente de desarrollo |
| Git | Sí | Control de versiones |
| GitHub | Plan gratuito | Repositorio y Pages |
| Python | Sí | Backend y scripts |
| FastAPI | Sí | API |
| ChromaDB | Sí | Base vectorial local |
| Ollama | Sí | Modelos locales |
| Node.js | Sí | Frontend y herramientas |
| Vite | Sí | Build del portal |
| React | Sí | Interfaz del portal |
| pytest | Sí | Pruebas |
| Mermaid | Sí | Diagramas |

## Glosario rápido

| Término | Definición |
|---|---|
| **Agente** | Sistema que usa un modelo y herramientas para cumplir un objetivo |
| **Subagente** | Agente especializado invocado por otro agente o por el usuario |
| **AGENTS.md** | Archivo de contexto y reglas del proyecto |
| **RAG** | Recuperación de información antes de generar una respuesta |
| **Embedding** | Representación vectorial de un texto |
| **Chunk** | Fragmento de un documento indexado |
| **Top-k** | Cantidad de resultados recuperados |
| **MCP** | Protocolo para conectar agentes con herramientas y datos |
| **Tool** | Acción que un agente puede ejecutar |
| **Resource** | Dato de solo lectura expuesto por un servidor MCP |
| **Prompt** | Instrucción o plantilla para el modelo |
| **Alucinación** | Afirmación inventada o no sustentada |
| **Grounding** | Fundamentar una respuesta en evidencia recuperada |
| **Abstención** | Reconocer que no hay información suficiente |

## Criterios para elegir recursos

- Documentación oficial o mantenida activamente.
- Licencia compatible con uso educativo.
- Sin costo obligatorio para el alcance del curso.
- Instalación local cuando sea posible.
- Ejemplos reproducibles.
- Sin dependencia de credenciales para consultar el contenido del portal.

## Reporte de enlaces

Si un enlace no abre:

1. Verifica tu conexión.
2. Copia la URL y ábrela en otra pestaña.
3. Busca el título del recurso en el sitio oficial.
4. Informa a la persona responsable de la capacitación con la URL y la fecha.

No se deben inventar enlaces de reemplazo. Es preferible retirar un recurso que enviar a un sitio incorrecto.

## Recursos del curso

- [Programa general](/programa)
- [Días](/dias)
- [Proyecto conductor](/proyecto-conductor)
- [Proyecto integrador](/proyecto-integrador)
- [Guía completa de OpenCode](/opencode)
- [Acerca del curso](/acerca-del-curso)
