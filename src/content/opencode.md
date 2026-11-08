# Uso de OpenCode: guía completa

## Objetivo

Dominar OpenCode como herramienta de desarrollo agéntico: instalación, configuración, inicialización, modos, herramientas, permisos, subagentes, delegación y depuración.

## Resultado esperado

Al terminar podrás instalar OpenCode, inicializar un proyecto, configurar agentes y subagentes, delegar tareas y depurar problemas comunes.

## Requisitos previos

- Windows 10/11 con PowerShell.
- Node.js 20+ y Git.
- Cuenta/proveedor de modelos de IA.
- Proyecto Git inicializado.

## Conceptos fundamentales

OpenCode es un agente de desarrollo en terminal. Trabaja sobre la carpeta del proyecto y puede leer, editar, ejecutar comandos y consultar documentación. Se diferencia de un chatbot porque observa el resultado de sus acciones.

### Instalación

```powershell
npm install -g opencode-ai
opencode --version
```

Si el paquete o comando cambia, consulta https://opencode.ai/docs/.

### Configuración del proveedor

```powershell
$env:OPENAI_API_KEY = "tu-clave"
# Persistir (opcional):
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "tu-clave", "User")
```

### Inicialización con /init

```powershell
cd C:\proyectos\tecbot-academico
opencode
```

Dentro de OpenCode:

```text
/init
```

Analiza el repositorio y genera `AGENTS.md`. Revísalo y ajusta.

### AGENTS.md

Archivo de instrucciones permanentes. Incluye: propósito, alcance, stack, estructura, comandos, convenciones, reglas, definición de terminado. Ver `public/descargas/AGENTS.md` (descargable) como plantilla.

### Modos de interacción

- **Plan:** propone sin modificar. Úsalo antes de cambios.
- **Build:** ejecuta y modifica.

Flujo: Plan → revisar → Build → pruebas → commit.

### Herramientas

Capacidades concretas: leer/escribir archivos, buscar, ejecutar comandos, consultar documentación, servidores MCP. Cada herramienta está sujeta a permisos.

### Permisos

Limita lo que el agente puede hacer: qué comandos ejecutar, qué archivos modificar, qué requiere aprobación humana. Configúralos en `opencode.json` o en el frontmatter de los agentes.

### Subagentes

Agentes especializados invocados con `@nombre`. Configuración en `.opencode/agents/*.md` o `opencode.json`. Ver `public/tecbot-academico/agentes/` y `configuracion-opencode.json`.

### Delegación

Transferir una tarea con contexto suficiente: archivos (`@archivo`), objetivo, restricciones, resultado esperado, criterios de aceptación.

### Revisión de cambios

Siempre revisa el diff (`git diff`) antes de integrar. El agente puede proponer cambios amplios.

### Depuración

- Si el agente inventa APIs: referencia `@archivo` y pide que lea antes de escribir.
- Si falla un comando: pide que muestre la salida completa.
- Si el contexto es insuficiente: actualiza `AGENTS.md`.

### Buenas prácticas

- Plan antes de Build.
- Cambios pequeños y verificables.
- Pruebas antes de declarar terminado.
- Mantén `AGENTS.md` actualizado.
- No compartas credenciales.

## Configuración de ejemplo

Ver `public/tecbot-academico/configuracion-opencode.json` y los archivos en `public/tecbot-academico/agentes/`.

## Recursos

- [Documentación oficial de OpenCode](https://opencode.ai/docs/)
- [OpenCode GitHub](https://github.com/opencode-ai/opencode)

**Nota de versión:** OpenCode se actualiza con frecuencia. Verifica la sintaxis y los nombres de campos con tu versión instalada.
