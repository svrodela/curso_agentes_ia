> **Aviso:** los requerimientos describen un prototipo didáctico. No son requisitos oficiales de la institución ni sustituyen la normativa vigente. Los documentos fuente son ficticios y están marcados como demostración.

## Convenciones

- **RF:** requerimiento funcional.
- **RNF:** requerimiento no funcional.
- **HU:** historia de usuario.
- **CA:** criterio de aceptación.
- Prioridad: **Alta**, **Media**, **Baja**.
- Estado inicial: propuesto.

## Requerimientos funcionales

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-01 | El sistema debe recibir una pregunta en lenguaje natural desde la interfaz. | Alta |
| RF-02 | El sistema debe validar que la pregunta no esté vacía y no exceda 1,000 caracteres. | Alta |
| RF-03 | El sistema debe recuperar fragmentos relevantes del corpus de demostración antes de generar una respuesta. | Alta |
| RF-04 | El sistema debe responder en español, de forma breve y comprensible. | Alta |
| RF-05 | Cada respuesta fundamentada debe incluir al menos una fuente con nombre de documento. | Alta |
| RF-06 | El sistema debe indicar claramente cuando no encuentra evidencia suficiente. | Alta |
| RF-07 | Cuando no hay evidencia, el sistema debe recomendar acudir al departamento correspondiente. | Alta |
| RF-08 | El sistema debe distinguir entre los temas servicio social, residencias, titulación, acreditación y trámites generales. | Media |
| RF-09 | El sistema debe mostrar un estado de carga mientras procesa la consulta. | Media |
| RF-10 | El sistema debe mostrar los errores de red o de servidor con un mensaje comprensible. | Media |
| RF-11 | El sistema debe conservar el historial de la conversación durante la sesión actual. | Baja |
| RF-12 | El sistema debe mostrar un aviso de que los documentos son material didáctico. | Alta |
| RF-13 | El sistema debe permitir iniciar una nueva consulta sin recargar la página. | Media |
| RF-14 | El sistema debe exponer un endpoint de salud para verificar que la API está activa. | Media |

## Requerimientos no funcionales

| ID | Requerimiento | Criterio verificable |
|---|---|---|
| RNF-01 | Rendimiento | Una consulta típica responde en ≤ 12 s en el equipo de demostración. |
| RNF-02 | Privacidad | No se usan datos personales reales ni documentos institucionales no autorizados. |
| RNF-03 | Trazabilidad | Toda respuesta fundamentada incluye el documento de origen. |
| RNF-04 | Honestidad | En los casos sin evidencia, `fuentes` queda vacío y `advertencia` no es nulo. |
| RNF-05 | Usabilidad | La interfaz es usable a 360 px de ancho y con teclado. |
| RNF-06 | Mantenibilidad | El corpus se puede actualizar sin modificar el código de la interfaz. |
| RNF-07 | Portabilidad | La aplicación se ejecuta localmente con instrucciones documentadas. |
| RNF-08 | Seguridad | El servidor MCP solo accede a `documentos-demo/` y niega escritura. |
| RNF-09 | Reproducibilidad | El índice se reconstruye con un script versionado. |
| RNF-10 | Accesibilidad | Contraste adecuado, etiquetas en formularios y mensajes de error asociados. |
| RNF-11 | Degradación | Si el modelo falla, la API devuelve un error controlado, no una traza interna. |
| RNF-12 | Transparencia | La interfaz y los documentos muestran el aviso de material didáctico. |

## Historias de usuario

### HU-01. Consulta de servicio social

**Como** estudiante de semestres avanzados,  
**quiero** conocer los requisitos para iniciar mi servicio social,  
**para** planear mi carga académica y reunir la documentación.

**Prioridad:** Alta.

**Criterios de aceptación:**

- **CA-01.1** Dado que pregunto por los requisitos del servicio social, cuando el sistema consulta el corpus, entonces devuelve una respuesta con al menos un requisito y una fuente de `servicio-social.md`.
- **CA-01.2** Dado que la respuesta incluye pasos, cuando se muestra, entonces conserva el orden y el sentido del documento fuente.
- **CA-01.3** Dado que la pregunta está vacía, cuando la envío, entonces el sistema muestra un error de validación y no llama al modelo.

### HU-02. Consulta de residencias

**Como** estudiante que busca iniciar residencias profesionales,  
**quiero** conocer el proceso de registro y los documentos necesarios,  
**para** evitar entregas incompletas.

**Criterios de aceptación:**

- **CA-02.1** La respuesta cita `residencias-profesionales.md`.
- **CA-02.2** Si el documento no contiene el dato solicitado, el sistema no inventa fechas ni nombres de formatos.
- **CA-02.3** La fuente se muestra con un fragmento legible.

### HU-03. Comparación de modalidades de titulación

**Como** egresado,  
**quiero** conocer las modalidades de titulación disponibles,  
**para** elegir la que se ajuste a mi situación.

**Criterios de aceptación:**

- **CA-03.1** La respuesta enumera las modalidades presentes en `titulacion.md`.
- **CA-03.2** No se agregan modalidades que no estén en el documento.
- **CA-03.3** Se indica que la información es de demostración y debe confirmarse con el área correspondiente.

### HU-04. Acreditación de una asignatura

**Como** estudiante con una asignatura reprobada,  
**quiero** saber qué opciones de acreditación existen,  
**para** regularizar mi situación académica.

**Criterios de aceptación:**

- **CA-04.1** La respuesta recupera `acreditacion-academica.md`.
- **CA-04.2** Distingue entre acreditación de asignatura y actividades complementarias.
- **CA-04.3** Si no hay información sobre un caso específico, deriva al departamento.

### HU-05. Consulta sin evidencia

**Como** estudiante,  
**quiero** recibir una respuesta honesta cuando el asistente no tiene información,  
**para** no tomar decisiones con datos inventados.

**Criterios de aceptación:**

- **CA-05.1** Para una pregunta fuera del corpus, la respuesta indica que no hay información suficiente.
- **CA-05.2** `fuentes` está vacío.
- **CA-05.3** `advertencia` recomienda acudir al departamento correspondiente.
- **CA-05.4** No se inventan documentos, fechas ni enlaces.

### HU-06. Verificación de fuentes

**Como** estudiante,  
**quiero** ver qué documento respalda una respuesta,  
**para** verificar la información antes de iniciar un trámite.

**Criterios de aceptación:**

- **CA-06.1** Cada respuesta fundamentada muestra al menos un documento.
- **CA-06.2** El nombre del documento coincide con un archivo del corpus.
- **CA-06.3** El fragmento mostrado pertenece al documento citado.

### HU-07. Uso en móvil

**Como** estudiante,  
**quiero** consultar el asistente desde mi teléfono,  
**para** resolver dudas sin encender la computadora.

**Criterios de aceptación:**

- **CA-07.1** La interfaz no presenta desplazamiento horizontal a 360 px.
- **CA-07.2** El campo de pregunta y el botón son accesibles con el pulgar.
- **CA-07.3** Las fuentes se leen sin truncar información esencial.

### HU-08. Revisión del equipo

**Como** integrante del equipo,  
**quiero** ejecutar pruebas y revisar el diff antes de integrar,  
**para** asegurar que el cambio cumple el alcance.

**Criterios de aceptación:**

- **CA-08.1** Existe una suite de pruebas ejecutable con `pytest -q`.
- **CA-08.2** El repositorio incluye `AGENTS.md` actualizado.
- **CA-08.3** El commit no incluye secretos, `.env` ni la base vectorial.

## Matriz de trazabilidad

| Requerimiento | Historia | Prueba |
|---|---|---|
| RF-01, RF-04 | HU-01 | `test_consulta_servicio_social_devuelve_fuente` |
| RF-03, RF-05 | HU-01, HU-06 | Verificación de fuentes |
| RF-06, RF-07 | HU-05 | `test_consulta_sin_evidencia_no_inventa_fuentes` |
| RF-02 | HU-01 | `test_pregunta_vacia_devuelve_422` |
| RF-12 | Todas | Revisión visual del aviso |
| RNF-08 | HU-08 | Prueba de alcance MCP |
| RNF-05 | HU-07 | Prueba manual en 360 px |

## Preguntas de ejemplo para la evaluación

| Pregunta | Documento esperado | Tipo |
|---|---|---|
| ¿Qué necesito para iniciar el servicio social? | `servicio-social.md` | Respondible |
| ¿Cómo registro mi proyecto de residencias? | `residencias-profesionales.md` | Respondible |
| ¿Cuáles son las modalidades de titulación? | `titulacion.md` | Respondible |
| ¿Puedo acreditar una materia reprobada? | `acreditacion-academica.md` | Respondible |
| ¿Qué documentos pide la liberación del servicio social? | `servicio-social.md` | Respondible |
| ¿Cuál es el horario de la cafetería? | Ninguno | Sin evidencia |
| ¿Cuánto cuesta la inscripción? | Ninguno | Sin evidencia |
| ¿Quién es el director? | Ninguno | Sin evidencia |

## Fuera de alcance

- Validar la identidad del estudiante.
- Consultar expedientes o calificaciones.
- Realizar trámites.
- Enviar correos o notificaciones.
- Garantizar vigencia normativa.
- Responder preguntas médicas, legales o financieras.
- Sustituir la atención presencial.

## Pendientes antes de un uso real

- [ ] Sustituir documentos de demostración por documentos oficiales validados.
- [ ] Definir responsable de actualización del corpus.
- [ ] Revisar privacidad y protección de datos.
- [ ] Implementar autenticación si se consultan datos personales.
- [ ] Establecer un proceso de evaluación continua.
- [ ] Definir un canal de reporte de respuestas incorrectas.
- [ ] Realizar pruebas con estudiantes reales.
- [ ] Documentar el régimen de responsabilidad y los avisos legales.

## Documentos relacionados

- [Plantilla de requerimientos](/descargas/plantilla-requerimientos.md)
- [Historias de usuario de ejemplo](/descargas/historias-usuario.md)
- [Descripción del proyecto](/proyecto-conductor/descripcion)
- [Arquitectura](/proyecto-conductor/arquitectura)
- [Pruebas](/proyecto-conductor)
