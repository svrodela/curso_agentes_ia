# Historias de usuario — TecBot Académico

> Ejemplo didáctico del curso *Creación de software con Agentes de IA*.
> Los documentos citados son ficticios y no representan normativa institucional real.
> Adapta las historias a tu propio proyecto; no las copies sin revisar el alcance.

## HU-01. Consulta documental con fuentes

**Como** estudiante  
**Quiero** preguntar en lenguaje natural por un trámite académico  
**Para** entender qué pasos seguir y de dónde proviene la información.

**Prioridad:** Alta  
**Requerimientos:** RF-01, RF-02, RNF-03

### Criterios de aceptación

```gherkin
Escenario: La pregunta está cubierta por los documentos
  Dado que existe un documento de demostración sobre servicio social
  Cuando pregunto "¿Qué necesito para iniciar el servicio social?"
  Entonces recibo una respuesta en español
  Y la respuesta cita al menos un documento de documentos-demo/
  Y no se muestran datos que no aparezcan en la fuente

Escenario: La pregunta no está cubierta
  Dado que los documentos no contienen información sobre cafetería
  Cuando pregunto "¿Cuál es el horario de la cafetería?"
  Entonces la aplicación indica que no cuenta con esa información
  Y recomienda acudir al departamento correspondiente
  Y no inventa un horario
```

## HU-02. Consulta por tema

**Como** estudiante  
**Quiero** filtrar o identificar el tema de mi consulta  
**Para** recibir información del documento correcto sin leer resultados irrelevantes.

**Prioridad:** Media  
**Requerimientos:** RF-03

### Criterios de aceptación

```gherkin
Escenario: Consulta de titulación
  Dado que el corpus contiene titulacion.md
  Cuando pregunto por las modalidades de titulación
  Entonces los fragmentos recuperados pertenecen a titulacion.md
  Y la respuesta menciona la fuente

Escenario: Filtro demasiado restrictivo
  Dado que la pregunta cruza dos temas
  Cuando el sistema aplica un filtro por un solo tema
  Entonces debe advertir que el resultado puede ser parcial
  O buscar sin filtro antes de responder
```

## HU-03. Respuesta sin evidencia

**Como** responsable del proyecto  
**Quiero** que el asistente reconozca sus límites  
**Para** evitar que una persona tome decisiones con información inventada.

**Prioridad:** Alta  
**Requerimientos:** RF-04, RNF-03

### Criterios de aceptación

```gherkin
Escenario: Recuperación sin resultados relevantes
  Dado que la distancia de los fragmentos supera el umbral definido
  Cuando el usuario envía una pregunta
  Entonces la aplicación no genera una respuesta afirmativa
  Y explica que no encontró evidencia suficiente
  Y sugiere el canal de atención correspondiente

Escenario: Documento alterado
  Dado que alguien modificó documentos-demo/ para forzar una respuesta
  Cuando se ejecutan las pruebas
  Entonces la prueba de integridad del corpus falla
  Y el equipo revisa el cambio antes de continuar
```

## HU-04. Panel de fuentes

**Como** estudiante  
**Quiero** ver qué documentos se usaron para responder  
**Para** poder verificar la información y citarla.

**Prioridad:** Media  
**Requerimientos:** RF-02

### Criterios de aceptación

```gherkin
Escenario: Fuentes visibles
  Dado que la respuesta usó dos fragmentos
  Cuando se muestra el resultado
  Entonces se listan los nombres de los documentos
  Y se distingue claramente entre respuesta y fuentes

Escenario: Sin fuentes
  Dado que no se recuperó ningún fragmento
  Cuando se muestra el resultado
  Entonces no se presenta una lista vacía como si hubiera fuentes
  Y se muestra el mensaje de ausencia de información
```

## HU-05. Historial de la sesión

**Como** estudiante  
**Quiero** consultar las preguntas anteriores de la sesión  
**Para** continuar una conversación sin repetir contexto.

**Prioridad:** Baja  
**Requerimientos:** RF-05

### Criterios de aceptación

```gherkin
Escenario: Pregunta de seguimiento
  Dado que ya pregunté por el servicio social
  Cuando pregunto "¿Y cuántas horas son?"
  Entonces la aplicación usa el contexto de la pregunta anterior
  Y mantiene las fuentes del tema

Escenario: Nueva sesión
  Dado que cerré y abrí la aplicación
  Cuando inicio una consulta
  Entonces el historial anterior no se muestra
  Y no se conservan datos personales
```

## HU-06. Operación local reproducible

**Como** integrante del equipo  
**Quiero** ejecutar el proyecto desde cero con instrucciones claras  
**Para** poder demostrarlo y revisarlo sin depender de mi computadora.

**Prioridad:** Alta  
**Requerimientos:** RNF-04

### Criterios de aceptación

```gherkin
Escenario: Instalación limpia
  Dado un equipo con Python y Node instalados
  Cuando sigo el README en una carpeta nueva
  Entonces puedo instalar dependencias
  Y ejecutar la aplicación
  Y correr las pruebas
  Sin pasos no documentados

Escenario: Sin secretos
  Dado el repositorio clonado
  Cuando reviso el historial y los archivos
  Entonces no encuentro tokens, contraseñas ni archivos .env
```

## Matriz de trazabilidad

| Historia | Requerimiento | Prueba automatizada | Prueba manual |
|---|---|---|---|
| HU-01 | RF-01, RF-02 | `test_consulta_con_fuente` | M-01 |
| HU-02 | RF-03 | `test_filtro_tema` | M-02 |
| HU-03 | RF-04 | `test_sin_evidencia` | M-03 |
| HU-04 | RF-02 | `test_contrato_respuesta` | M-04 |
| HU-05 | RF-05 | `test_contexto_sesion` | M-05 |
| HU-06 | RNF-04 | `test_health` | M-06 |

> Ajusta los nombres de las pruebas a los reales. Una tabla de trazabilidad con pruebas inexistentes no es evidencia.
