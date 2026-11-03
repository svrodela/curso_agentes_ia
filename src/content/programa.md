# Programa general

> **Curso taller:** Creación de software con Agentes de IA  
> **Marco académico:** En el marco del Congreso Ciencias Revueltas 2026  
> **Institución:** Instituto Tecnológico Superior de Santiago Papasquiaro  
> **Fechas:** 9 al 12 de noviembre de 2026  
> **Horario:** Lunes de 10:00 a 13:00 · Martes a jueves de 08:00 a 12:00  
> **Duración:** 15 horas  
> **Modalidad:** Presencial, taller práctico

## Propósito

Fortalecer la capacidad de las personas participantes para diseñar, construir y validar software con agentes de IA, usando un proyecto realista como hilo conductor y herramientas gratuitas o de código abierto.

Al finalizar, cada equipo contará con una definición de problema, un repositorio, una aplicación funcional o prototipo demostrable y evidencia del uso de agentes y subagentes.

## Objetivos de aprendizaje

Al concluir el curso, la persona participante podrá:

1. Explicar el ciclo de trabajo de un agente de desarrollo y sus límites.
2. Transformar una necesidad en requerimientos, historias y criterios de aceptación.
3. Configurar OpenCode y utilizarlo en modos Plan y Build.
4. Documentar el contexto del proyecto en `AGENTS.md`.
5. Configurar subagentes con roles y permisos diferenciados.
6. Implementar una interfaz y una API para un asistente conversacional.
7. Preparar documentos, embeddings y una base vectorial para RAG.
8. Recuperar evidencia y generar respuestas fundamentadas.
9. Configurar un servidor MCP Filesystem con acceso restringido.
10. Integrar, probar y presentar una solución de software.

## Distribución del tiempo

| Día | Fecha | Horario | Horas | Enfoque |
|---|---|---|---|---|
| Día 1 | Lunes 9 de noviembre | 10:00–13:00 | 3 | De la idea al proyecto |
| Día 2 | Martes 10 de noviembre | 08:00–12:00 | 4 | Construcción con agentes |
| Día 3 | Miércoles 11 de noviembre | 08:00–12:00 | 4 | RAG y MCP |
| Día 4 | Jueves 12 de noviembre | 08:00–12:00 | 4 | Integración y demostración |
| **Total** | | | **15** | |

## Horario del Día 1

| Bloque | Hora | Actividad |
|---|---|---|
| Apertura | 10:00–10:10 | Repaso, objetivos y organización |
| Bloque 1 | 10:10–11:20 | Conceptos y demostración guiada |
| Receso | 11:20–11:30 | Pausa |
| Bloque 2 | 11:30–12:45 | Práctica y desarrollo |
| Cierre | 12:45–13:00 | Revisión, entregables y retrospectiva |

## Horario de los Días 2 a 4

| Bloque | Hora | Actividad |
|---|---|---|
| Apertura | 08:00–08:15 | Repaso, objetivos y organización |
| Bloque 1 | 08:15–09:45 | Conceptos y demostración guiada |
| Receso | 09:45–10:00 | Pausa |
| Bloque 2 | 10:00–11:30 | Práctica y desarrollo |
| Cierre | 11:30–12:00 | Revisión, entregables y retrospectiva |

El Día 4 ajusta el cierre para incluir las presentaciones.

## Día 1. De la idea al proyecto de software

**Objetivo:** comprender el desarrollo de software mediante agentes de IA, identificar un problema y transformarlo en una definición inicial de proyecto.

| Tema | Duración |
|---|---|
| Introducción al desarrollo agéntico | 45 min |
| De la idea a los requerimientos | 50 min |
| Primeros pasos con OpenCode | 50 min |
| Git, GitHub y el repositorio | 35 min |

**Práctica:** definir TecBot Académico y crear su estructura inicial.

**Entregables:** requerimientos, historias de usuario, arquitectura inicial, repositorio y primera versión.

[Ver el día completo](/dias/dia-1)

## Día 2. Construcción con agentes y subagentes

**Objetivo:** desarrollar funcionalidades con agentes, usando contexto, planificación, delegación y pruebas.

| Tema | Duración |
|---|---|
| El ciclo de desarrollo agéntico | 45 min |
| AGENTS.md: contexto del proyecto | 55 min |
| Subagentes y delegación | 60 min |
| Pruebas y validación | 60 min |

**Práctica:** construir la primera versión funcional y configurar un equipo de subagentes.

**Entregables:** aplicación inicial, `AGENTS.md`, al menos dos subagentes probados y evidencia de pruebas.

[Ver el día completo](/dias/dia-2)

## Día 3. RAG y Model Context Protocol

**Objetivo:** comprender cómo los agentes consultan conocimiento externo e interactúan con herramientas.

### Bloque A. RAG

| Tema | Duración |
|---|---|
| Fundamentos de RAG | 60 min |
| ChromaDB y búsqueda semántica | 60 min |

### Bloque B. MCP

| Tema | Duración |
|---|---|
| Fundamentos de MCP | 45 min |
| MCP Filesystem con acceso restringido | 60 min |

La distribución exacta puede ajustarse según el ritmo del grupo.

**Práctica:** incorporar documentos de demostración a una base vectorial y conectar un servidor MCP Filesystem restringido.

**Entregables:** consulta documental funcional, base vectorial de demostración, conexión MCP y ejemplo de interacción.

[Ver el día completo](/dias/dia-3)

## Día 4. Orquestación y proyecto integrador

**Objetivo:** integrar los conocimientos para desarrollar y presentar una solución de software mediante agentes de IA.

| Tema | Duración |
|---|---|
| Orquestación de agentes | 45 min |
| Integración y validación | 75 min |
| Demostración y presentación | 45 min |

**Práctica:** integrar TecBot Académico, ejecutar la validación de extremo a extremo y presentar el proyecto del equipo.

**Entregables:** problema, requerimientos, repositorio, aplicación o prototipo, evidencia de agentes y presentación final.

[Ver el día completo](/dias/dia-4)

## Metodología

El curso combina:

- **Explicaciones breves** con ejemplos aplicados.
- **Demostraciones guiadas** en terminal y editor.
- **Práctica por parejas o equipos** con entregables verificables.
- **Revisión entre pares** al cierre de cada día.
- **Retrospectiva** para identificar decisiones y riesgos.
- **Documentación continua** en el repositorio.

La proporción aproximada es 30% conceptos y 70% práctica.

> **Principio pedagógico:** no se evalúa memorizar comandos. Se evalúa la capacidad de definir un problema, delegar con contexto, revisar resultados y verificar con evidencia.

## Requisitos técnicos

Cada participante o equipo necesita:

- Computadora portátil con permisos de instalación.
- Node.js 20 o superior.
- Python 3.10 o superior.
- Git instalado.
- Cuenta de GitHub.
- OpenCode instalado.
- Conexión a internet para descargar dependencias y modelos.
- Un editor de código o terminal moderna.

Opcional:

- Ollama para modelos locales.
- WSL en Windows si el equipo lo permite.
- Una clave de proveedor de modelos si no se usa un modelo local.

## Materiales

- Portal del curso con contenidos y tutoriales.
- Plantillas descargables.
- Documentos académicos de demostración.
- Repositorio base sugerido.
- Prompts de subagentes.
- Matriz de pruebas.

Los materiales están en la sección de [Recursos](/recursos).

## Evaluación

La evaluación es formativa durante los días y culmina con el proyecto integrador.

| Componente | Peso |
|---|---:|
| Participación y prácticas de los días | 30% |
| Proyecto integrador | 70% |

Dentro del proyecto integrador se aplica la rúbrica:

| Criterio | Porcentaje |
|---|---:|
| Definición del problema | 15% |
| Requerimientos y planeación | 15% |
| Desarrollo funcional | 25% |
| Uso de agentes y subagentes | 20% |
| Repositorio y control de versiones | 10% |
| Presentación y demostración | 15% |
| **Total** | **100%** |

Consulta la [rúbrica completa y los entregables](/proyecto-integrador).

> La institución determina los criterios de acreditación y, en su caso, la emisión de constancias. Este portal describe la organización didáctica del taller.

## Políticas de trabajo

- Se permite y se espera el uso de agentes de IA.
- Cada equipo debe poder explicar las decisiones y el código que presenta.
- No se aceptan documentos institucionales reales ni datos personales en el repositorio.
- Los documentos de demostración deben mantenerse marcados como tales.
- Los cambios se registran con commits claros.
- Las pruebas y evidencias se documentan; no se declara un resultado sin ejecutarlo.
- Se respeta la autoría y se citan las fuentes externas.

## Accesibilidad y convivencia

- El portal tiene navegación por teclado, foco visible y contraste alto.
- Si necesitas un ajuste de accesibilidad, comunícalo a la persona responsable de la capacitación.
- El trabajo en equipos debe permitir la participación de todas las personas.
- Las decisiones técnicas se explican y se acuerdan; no se imponen.

## Después del curso

Puedes continuar con:

1. Sustituir los documentos de demostración por un corpus validado.
2. Ampliar el conjunto de evaluación.
3. Mejorar la interfaz y la accesibilidad.
4. Documentar el proceso de actualización.
5. Explorar despliegue y monitoreo en un entorno controlado.

## Recursos relacionados

- [Ruta de aprendizaje](/dias)
- [Proyecto conductor](/proyecto-conductor)
- [Proyecto integrador](/proyecto-integrador)
- [Recursos y documentación](/recursos)
- [Acerca del curso](/acerca-del-curso)
