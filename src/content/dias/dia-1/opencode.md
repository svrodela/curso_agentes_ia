> **Objetivo de aprendizaje:** instalar OpenCode, conectar un proveedor de modelos y completar una primera sesión de trabajo usando los modos Plan y Build, con permisos y revisión de cambios.

## Requisitos previos

- Node.js 20 o superior (recomendado) o una instalación mediante gestor de paquetes.
- Terminal: PowerShell, Windows Terminal, Bash o Zsh.
- Una cuenta o clave de API de un proveedor de modelos, o un modelo local con Ollama.
- Git instalado y un proyecto vacío para practicar.

Comprueba tu entorno:

```bash
node --version
git --version
```

## Instalación

### Windows

La opción más directa es npm:

```powershell
npm install -g opencode-ai
```

También puedes usar Chocolatey o Scoop:

```powershell
choco install opencode
# o
scoop install opencode
```

Para una experiencia más cercana a Linux, la documentación oficial recomienda WSL. Si ya trabajas con WSL, instala dentro de la distribución:

```bash
curl -fsSL https://opencode.ai/install | bash
```

### macOS y Linux

```bash
curl -fsSL https://opencode.ai/install | bash
```

### Verificar

```bash
opencode --version
```

> **Nota de versión:** OpenCode 1 y OpenCode 2 comparten el comando `opencode`. La sintaxis de configuración evoluciona. En este curso usamos las opciones documentadas en [opencode.ai/docs](https://opencode.ai/docs/); si tu versión muestra diferencias, consulta la documentación correspondiente a tu instalación.

## Conectar un proveedor

Abre OpenCode en una carpeta de práctica:

```bash
mkdir tecbot-academico
cd tecbot-academico
opencode
```

Dentro de la interfaz ejecuta:

```text
/connect
```

Selecciona tu proveedor y sigue el flujo. Si usas un modelo local con Ollama, inicia el servidor antes de abrir OpenCode:

```bash
ollama serve
ollama pull qwen2.5-coder:7b
```

Después elige el proveedor y modelo desde `/models`. La disponibilidad depende de tu equipo; un modelo pequeño puede ser suficiente para practicar, aunque tendrá menos capacidad para tareas largas.

## Primera sesión: contexto antes que código

Crea un archivo README muy pequeño para que el agente tenga algo que leer:

```bash
mkdir app
printf "# TecBot Académico\n\nPrototipo del asistente académico.\n" > README.md
git init
```

Vuelve a iniciar OpenCode y ejecuta:

```text
/init
```

OpenCode analizará el proyecto y propondrá un archivo `AGENTS.md`. Revísalo, ajústalo y guárdalo. Ese archivo será el contexto persistente del proyecto.

### Plan y Build

| Modo | Propósito | Puede modificar archivos |
|---|---|---|
| **Plan** | Analizar, preguntar y proponer una estrategia | No, salvo archivos de plan |
| **Build** | Implementar cambios y ejecutar herramientas | Sí, según permisos |

Cambia con la tecla **Tab**. El indicador inferior muestra el modo activo.

Un primer ejercicio seguro en modo Plan:

```text
Analiza este proyecto.
1. Explica qué archivos existen y para qué sirven.
2. Propón la estructura mínima para una API FastAPI con una ruta /salud.
3. No escribas archivos todavía. Incluye los comandos de verificación.
```

Revisa la propuesta. Si es razonable, cambia a Build y pide:

```text
Implementa solo la ruta /salud y un archivo de pruebas.
No agregues dependencias que no estén justificadas.
Al terminar, ejecuta las pruebas y muestra el resultado.
```

### Revisar antes de aceptar

OpenCode muestra los cambios propuestos o aplicados según tu configuración de permisos. Antes de continuar:

1. Lee el diff, no solo el resumen.
2. Verifica que no se modificaron archivos fuera del alcance.
3. Ejecuta tú mismo las pruebas.
4. Si algo salió mal, usa `/undo`.

```text
/undo
/redo
```

## Configurar permisos

Un archivo `opencode.json` en la raíz del proyecto permite establecer reglas compartidas por el equipo:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "ask",
    "bash": "ask"
  }
}
```

Con esta configuración, el agente debe pedir aprobación antes de editar archivos o ejecutar comandos. Es una buena base para aprender. En el Día 2 veremos permisos por agente y subagentes.

Puedes ser más específico con comandos:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "ask",
    "bash": {
      "*": "ask",
      "git status *": "allow",
      "git diff *": "allow",
      "npm test *": "allow"
    }
  }
}
```

> **Seguridad:** no pongas claves de API dentro de `opencode.json` ni las subas a Git. Usa las variables de entorno o el flujo de autenticación de OpenCode.

## Comandos y atajos útiles

| Acción | Cómo |
|---|---|
| Ver ayuda | `/help` |
| Inicializar contexto | `/init` |
| Cambiar de agente primario | `Tab` |
| Elegir modelo | `/models` |
| Conectar proveedor | `/connect` |
| Referenciar un archivo | `@ruta/del/archivo` |
| Deshacer el último cambio | `/undo` |
| Rehacer | `/redo` |
| Salir | `/exit` o `Ctrl+C` |

## Anatomía de una buena petición

Compara estas dos instrucciones:

```text
Hazme el backend.
```

```text
En @app/main.py crea una ruta GET /salud que devuelva
{"estado": "ok", "version": "0.1.0"}.
Agrega una prueba en @tests/test_salud.py usando TestClient.
Ejecuta pytest y no modifiques otros archivos.
```

La segunda incluye:

- Archivo de referencia.
- Contrato de entrada y salida.
- Ubicación de la prueba.
- Restricción de alcance.
- Comando de verificación.

## Resultado esperado de la práctica

Al finalizar deberías tener:

- OpenCode instalado y autenticado.
- Un proyecto con `README.md`, `AGENTS.md` y repositorio Git inicializado.
- Una ruta mínima implementada por el agente.
- Una prueba ejecutada y su salida visible.
- Configuración de permisos en `opencode.json`.

## Problemas frecuentes

**`opencode` no se reconoce como comando.**  
Cierra y abre la terminal después de instalar con npm. Verifica que la ruta global de npm esté en `PATH`.

**El agente no ve archivos.**  
Confirma que abriste OpenCode en la raíz del proyecto y que los archivos no están ignorados por `.gitignore` o por la configuración de la herramienta.

**La respuesta es demasiado larga y se pierde el foco.**  
Divide la tarea. Pide un plan, aprueba una parte y verifica antes de seguir.

**El modelo local es muy lento.**  
Prueba un modelo más pequeño, reduce el contexto o usa un proveedor en la nube para las tareas que requieren más razonamiento. Documenta la decisión.

**En Windows aparecen errores de rutas o permisos.**  
Trabaja dentro de una ruta sin espacios ni caracteres especiales y considera usar WSL si necesitas herramientas Unix.

## Actividad de práctica

1. Instala OpenCode y verifica la versión.
2. Crea una carpeta `tecbot-practica` e inicializa Git.
3. Ejecuta `/init` y revisa el `AGENTS.md` generado.
4. En modo Plan, pide la estructura de una API mínima con FastAPI.
5. En modo Build, implementa únicamente `/salud` y su prueba.
6. Ejecuta la prueba, toma una captura de la salida y guarda el commit.

**Resultado esperado:** un repositorio pequeño donde puedas explicar qué hizo el agente, qué revisaste tú y cómo verificaste el resultado.

## Recursos complementarios

- [Introducción a OpenCode](https://opencode.ai/docs/)
- [Configuración de OpenCode](https://opencode.ai/docs/config/)
- [Solución de problemas en Windows](https://opencode.ai/docs/windows-wsl)
- [Documentación de FastAPI](https://fastapi.tiangolo.com/)

**Siguiente paso:** registrar y publicar el proyecto en [Git, GitHub y el repositorio](/dias/dia-1/git-github).
