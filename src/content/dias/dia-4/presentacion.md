> **Objetivo de aprendizaje:** preparar una demostración breve y convincente que explique el problema, muestre el producto funcionando y aporte evidencia del uso de agentes, subagentes y pruebas.

## La presentación no es un recorrido por el código

El jurado no necesita ver cada archivo. Necesita entender:

1. Qué problema resolvieron.
2. Para quién.
3. Qué decidieron construir y qué dejaron fuera.
4. Cómo funciona la solución.
5. Qué evidencia tienen de que funciona.
6. Qué aprendieron al trabajar con agentes.

Una demostración efectiva cuenta una historia con evidencia. El código es un medio, no el protagonista.

## Estructura sugerida: 8 minutos

| Tiempo | Bloque | Qué decir o mostrar |
|---|---|---|
| 1 min | Problema y usuario | Una situación concreta, no una definición |
| 1 min | Solución y alcance | Qué hace, qué no hace |
| 3 min | Demostración | Un caso feliz y un caso sin evidencia |
| 1 min | Arquitectura | Diagrama simple: interfaz, API, RAG/MCP |
| 1 min | Proceso con agentes | Plan, subagentes, revisión, pruebas |
| 1 min | Resultados y aprendizajes | Qué funcionó, qué limitaron, qué sigue |

Si el tiempo es menor, recorta la arquitectura, no la demostración ni la evidencia.

## Guion de demostración

### Antes de entrar

- [ ] La aplicación está en la rama `main` y funciona.
- [ ] El modelo y la base vectorial están listos.
- [ ] Hay una consulta de respaldo copiada.
- [ ] Las capturas están listas por si falla la red.
- [ ] El navegador está en zoom legible y sin pestañas innecesarias.
- [ ] El volumen y las notificaciones están desactivados.

### Durante la demo

**Paso 1. Presenta el problema con una persona, no con una abstracción.**

> “Un estudiante de octavo semestre necesita saber qué requiere para iniciar su servicio social. Hoy tendría que buscar en varios documentos o preguntar en ventanilla. TecBot Académico le permite preguntar en lenguaje natural y ver la fuente.”

**Paso 2. Haz una pregunta respondible.**

```text
¿Qué necesito para iniciar el servicio social?
```

Señala:

- La respuesta es breve.
- Los pasos se entienden.
- La fuente aparece con nombre de documento.
- La aplicación aclara que es material de demostración.

**Paso 3. Haz una pregunta sin evidencia.**

```text
¿Cuál es el horario de la cafetería?
```

Señala:

- El asistente no inventa.
- Recomienda acudir al área correspondiente.
- La aplicación no se queda en blanco.

**Paso 4. Muestra una fuente o el fragmento recuperado.**

Explica que la respuesta se generó a partir de documentos recuperados, no de memoria del modelo.

**Paso 5. Cierra con el proceso.**

Muestra en una diapositiva:

- Un plan de OpenCode.
- Un subagente configurado.
- Un diff revisado.
- Una salida de `pytest`.

No abras el repositorio completo en vivo. Ten capturas preparadas.

## Diapositivas mínimas

1. **Título:** proyecto, equipo, institución.
2. **Problema:** usuario, situación, consecuencia.
3. **Alcance:** qué incluye y qué no.
4. **Demo:** URL o instrucciones, si aplica.
5. **Arquitectura:** diagrama de cuatro a seis cajas.
6. **Agentes:** roles y un ejemplo de delegación.
7. **Evidencia:** pruebas, métricas, capturas.
8. **Aprendizajes y siguiente paso.**

Cada diapositiva debe tener una idea. Si necesita tres párrafos, divídela.

## Evidencia del uso de agentes

El jurado quiere ver que usaron agentes con criterio, no que “la IA hizo todo”. Prepara:

| Evidencia | Qué demuestra |
|---|---|
| `AGENTS.md` versionado | Contexto y reglas del proyecto |
| Captura de un plan | Planificación antes de construir |
| Configuración de subagentes | Delegación con roles |
| Diff revisado | Supervisión humana |
| Historial de commits | Trabajo incremental |
| Salida de pruebas | Verificación |
| Registro de fallos | Honestidad y mejora |
| README reproducible | Transferencia del resultado |

Una captura de pantalla con el plan y otra con la prueba ejecutada valen más que decir “usamos IA”.

## Cómo hablar de los límites

Reconocer límites genera confianza. Puedes decir:

> “El prototipo usa un corpus de demostración. No sustituye la atención oficial. La recuperación funciona con estos cuatro documentos; con un corpus real necesitaríamos validación del área responsable y un proceso de actualización.”

No digas que el sistema “garantiza” información oficial si no lo hace.

## Preguntas frecuentes del jurado

**¿Cómo evitan que invente requisitos?**  
Recuperación restringida, prompt con abstención, citas obligatorias y pruebas de casos sin evidencia.

**¿Qué hizo el agente y qué hicieron ustedes?**  
El agente exploró, propuso e implementó incrementos. Nosotros definimos el problema, aprobamos planes, revisamos diffs, ejecutamos pruebas y decidimos el alcance.

**¿Por qué usaron RAG y no solo un prompt largo?**  
Porque el conocimiento cambia, necesitamos citar fuentes y el corpus no cabe en el contexto. RAG separa el conocimiento de la lógica.

**¿Por qué MCP?**  
Para dar acceso controlado a documentos y demostrar cómo un agente usa herramientas externas con permisos mínimos.

**¿Qué pasa si el modelo no está disponible?**  
La recuperación se puede probar por separado. La aplicación muestra un error controlado y documentamos el requisito de ejecución local.

**¿Qué mejorarían con más tiempo?**  
Elijan una mejora concreta y realista: evaluación automatizada de respuestas, más documentos, mejor interfaz o despliegue.

## Plan de contingencia

| Falla | Plan B |
|---|---|
| No hay internet | Demo local + capturas |
| El modelo no responde | Mostrar recuperación y pruebas; explicar el flujo |
| La API no inicia | Usar capturas del flujo y el video de respaldo |
| La base vectorial está vacía | Ejecutar el script de indexación o usar capturas |
| El proyector no muestra bien el tema oscuro | Aumentar contraste y tamaño de fuente con antelación |
| Se acaba el tiempo | Saltar arquitectura y cerrar con evidencia y aprendizaje |

Nunca improvises una disculpa larga. Reconoce el problema, muestra el plan B y continúa.

## Ensayo

Ensayen al menos dos veces con cronómetro:

1. Un integrante presenta el problema.
2. Otro opera la demo.
3. Otro explica arquitectura y agentes.
4. Todos responden preguntas.

El operador no debe ser la misma persona que habla todo el tiempo. Practiquen la transición entre bloques.

## Rúbrica y evidencia

| Criterio | Peso | Evidencia que debes mostrar |
|---|---:|---|
| Definición del problema | 15% | Usuario, necesidad, alcance |
| Requerimientos y planeación | 15% | Documento, historias, criterios |
| Desarrollo funcional | 25% | Demo de extremo a extremo |
| Uso de agentes y subagentes | 20% | Planes, configuración, delegación |
| Repositorio y control de versiones | 10% | Historial, README, commits |
| Presentación y demostración | 15% | Claridad, evidencia, manejo de preguntas |

La rúbrica completa está en el [Proyecto integrador](/proyecto-integrador).

## Actividad de práctica

1. Escriban el guion de 8 minutos con responsables.
2. Preparen las ocho diapositivas mínimas.
3. Ensayen la demo con el caso feliz y el caso sin evidencia.
4. Midan el tiempo y recorten lo que sobre.
5. Preparen las capturas de evidencia.
6. Hagan una prueba con otra pareja y anoten tres mejoras.
7. Ajusten y vuelvan a ensayar.

**Resultado esperado:** una presentación que se entiende sin explicaciones previas y una demo que no depende de la suerte.

## Problemas frecuentes

**Leer las diapositivas.**  
El público puede leer. Usa las diapositivas para apoyo visual y habla con tus palabras.

**Mostrar demasiado código.**  
Muestra el diff o una decisión, no archivos completos. El código está en el repositorio.

**Prometer más de lo que funciona.**  
Ajusta el discurso al prototipo real. Un alcance honesto vale más que una demo inflada.

**No ensayar.**  
La demo se rompe, el tiempo se acaba o nadie sabe quién habla. El ensayo es parte del desarrollo.

**No poder explicar una decisión.**  
Si no entiendes por qué el agente hizo algo, no lo presentes como propio. Investiga, corrige o retíralo.

## Recursos complementarios

- [Proyecto integrador y rúbrica](/proyecto-integrador)
- [Documentación de pruebas de ejemplo](/tecbot-academico/documentacion/pruebas.md)
- [Arquitectura de referencia](/proyecto-conductor/arquitectura)
- [GitHub Docs](https://docs.github.com/)

**Cierre del curso:** revisa la checklist final en [Proyecto integrador](/proyecto-integrador) y publica tu repositorio.
