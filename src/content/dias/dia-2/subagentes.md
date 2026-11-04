> **Objetivo de aprendizaje:** diseñar y configurar un equipo de subagentes especializados dentro de OpenCode, delegar tareas con contexto suficiente y validar los resultados. Al terminar, podrás coordinar arquitecto, diseñador web, desarrollador y tester sin que se pisen entre sí.

## Objetivo

Aprender a configurar y coordinar cuatro subagentes especializados (arquitecto, diseñador web, desarrollador, tester) dentro de OpenCode para desarrollar TecBot Académico.

## Resultado esperado

Al finalizar tendrás un archivo `opencode.json` (o equivalente) con los cuatro subagentes configurados, un `AGENTS.md` con sus responsabilidades, y al menos una tarea delegada y verificada por cada rol.

## Requisitos previos

- OpenCode instalado y proyecto inicializado (Día 1).
- `AGENTS.md` creado.
- Conocimientos básicos de YAML/JSON.

## Conceptos fundamentales

- **Agente principal (coordinador):** recibe el objetivo, descompone, delega, revisa, integra.
- **Subagente:** agente especializado con un rol acotado, invocado por el coordinador (en OpenCode con `@nombre`).
- **Delegación:** transferencia de una tarea con contexto suficiente.
- **Contexto compartido:** archivos, reglas y decisiones que todos los subagentes deben leer.
- **Aislamiento de cambios:** cada subagente trabaja sobre un conjunto acotado de archivos para evitar conflictos.

### Cuándo delegar

| Situación | Delegar a |
|---|---|
| Decidir estructura, contratos, dependencias | Arquitecto |
| Definir UI, componentes, estilos, accesibilidad | Diseñador web |
| Implementar endpoints, componentes, persistencia | Desarrollador |
| Diseñar y ejecutar pruebas, reportar defectos | Tester |

### Cuándo NO delegar

- Decisiones de producto sin contexto.
- Cambios que afectan a todos los roles a la vez (hazlo tú o coordina explícitamente).
- Tareas que no puedes verificar.

## Paso 1. Definir los cuatro roles

Crea `docs/agentes.md` (o agrégalo a `AGENTS.md`) con las responsabilidades:

```markdown
# Equipo de agentes — TecBot Académico

## Coordinador (agente principal)
- Lee requerimientos y arquitectura.
- Descompone tareas.
- Delega a subagentes.
- Revisa e integra.
- Ejecuta o solicita pruebas.

## Arquitecto
- Analiza requerimientos.
- Define estructura y contratos de API.
- Documenta decisiones.
- Revisa coherencia backend/frontend.

## Diseñador web
- Define sistema de diseño.
- Diseña componentes y pantallas.
- Garantiza accesibilidad y responsive.
- Trabaja con design.md.

## Desarrollador
- Implementa endpoints y componentes.
- Integra frontend/backend.
- Mantiene buenas prácticas.

## Tester
- Diseña y ejecuta pruebas.
- Reporta defectos.
- Verifica correcciones.
```

## Paso 2. Configurar los subagentes en OpenCode

OpenCode permite definir agentes en archivos Markdown dentro de `.opencode/agents/` (o mediante `opencode.json`, según la versión). Verifica la sintaxis con `opencode --version` y la documentación oficial.

Estructura sugerida del proyecto:

```text
.opencode/
└── agents/
    ├── coordinador.md
    ├── arquitecto.md
    ├── disenador-web.md
    ├── desarrollador.md
    └── tester.md
```

Cada archivo incluye un frontmatter con metadatos y el prompt del rol. Ejemplo (verifica los campos con tu versión):

```markdown
---
description: Subagente especializado en análisis y arquitectura.
mode: subagent
---

# Arquitecto de software
... (prompt del rol) ...
```

El repositorio incluye ejemplos descargables en `/descargas/agentes/` (si están publicados) y en `public/tecbot-academico/agentes/`.

> **Aviso de versión:** los nombres de campos (`mode`, `description`, `prompt`) pueden variar según la versión de OpenCode. Consulta https://opencode.ai/docs/ y ajusta. No inventes campos no documentados.

## Paso 3. Invocar subagentes

En OpenCode, invoca un subagente con `@nombre`:

```text
@arquitecto Analiza @docs/requirements.md y determina los endpoints necesarios para el módulo de consultas. No modifiques archivos. Devuelve método HTTP, ruta, parámetros, esquema de entrada, esquema de salida y criterios de aceptación.
```

El coordinador recibe el resultado y decide si delegar la implementación:

```text
@desarrollador Implementa el endpoint POST /api/consulta según el contrato de @arquitecto. Usa Pydantic. No inventes campos. Agrega un caso de prueba en pytest.
```

Y la validación:

```text
@tester Diseña y ejecuta casos de prueba para POST /api/consulta. Incluye casos positivos, pregunta vacía y sin documentos relevantes. Reporta resultados.
```

## Paso 4. Compartir contexto correctamente

Para que los subagentes trabajen con la misma verdad:

1. Mantén `AGENTS.md` actualizado con stack, comandos y convenciones.
2. Referencia archivos explícitamente con `@archivo`.
3. Incluye en el prompt los criterios de aceptación.
4. Pide que lean antes de escribir.

Ejemplo de contexto compartido en `AGENTS.md`:

```markdown
## Stack
- Backend: FastAPI + SQLAlchemy + SQLite
- Frontend: React + TypeScript + Vite + Tailwind
- IA: proveedor agnóstico (OpenAI-compatible)
- Vector store: ChromaDB

## Comandos
- Backend: `uvicorn main:app --reload` (desde backend/)
- Frontend: `npm run dev` (desde frontend/)
- Pruebas: `pytest` (desde backend/)

## Reglas
- No modificar archivos fuera del alcance.
- No inventar endpoints ni campos.
- Ejecutar pruebas antes de declarar terminado.
```

## Paso 5. Evitar conflictos entre subagentes

Reglas operativas:

- Un archivo, un dueño a la vez. El coordinador secuencia las tareas.
- El desarrollador no modifica `design.md` ni `arquitectura.md`.
- El diseñador no modifica código de backend.
- El tester no modifica código de producción, solo pruebas y reportes.
- El arquitecto no implementa; solo propone.

Si dos subagentes necesitan tocar el mismo archivo, el coordinador integra manualmente o secuencia.

## Paso 6. Validar una tarea delegada

Checklist de revisión:

- [ ] El subagente leyó los archivos indicados.
- [ ] El resultado cumple los criterios de aceptación.
- [ ] No se inventaron campos, endpoints ni dependencias.
- [ ] Se ejecutaron pruebas (o se justificó por qué no).
- [ ] El diff es pequeño y revisable.
- [ ] Se documentó lo que quedó pendiente.

## Paso 7. Errores frecuentes

- **Subagente inventa API inexistente:** falta contexto; referencia `@archivo` y pide que lea antes de escribir.
- **Conflictos de edición:** dos subagentes tocaron el mismo archivo; secuencia las tareas.
- **Resultado ambiguo:** pide formato de salida explícito (tabla, lista, diff).
- **Subagente declara “funciona” sin probar:** exige evidencia (salida de pytest, curl, captura).

## Paso 8. Entregable

- `AGENTS.md` con roles y reglas.
- Configuración de los 4 subagentes en OpenCode.
- Al menos una tarea delegada y verificada por cada rol.
- Evidencia (diff, salida de pruebas).

## Paso 9. Criterios de aceptación

- Los cuatro subagentes están configurados e invocables con `@nombre`.
- Cada rol tiene responsabilidades diferenciadas y documentadas.
- Se completó al menos un ciclo completo: plan → delegación → implementación → prueba → revisión.
- No hay conflictos de edición sin resolver.

## Prompt listo para OpenCode (coordinador)

```text
Contexto: proyecto TecBot Académico (FastAPI + React TS + SQLite + ChromaDB + RAG).
Objetivo: implementar el módulo de consultas académicas.
Restricciones: no modifiques archivos fuera de backend/app/routers/consulta.py y backend/app/services/. No inventes endpoints. Usa el contrato de @arquitecto.
Resultado esperado: endpoint POST /api/consulta funcional con pruebas.
Criterios de aceptación: pytest pasa; la respuesta incluye fuentes; pregunta vacía devuelve 400.
```

## Recursos complementarios

- [Documentación de OpenCode](https://opencode.ai/docs/)
- Archivos de ejemplo: `public/tecbot-academico/agentes/`

**Siguiente paso:** validar con pruebas en [Pruebas y validación](/dias/dia-2/pruebas).
