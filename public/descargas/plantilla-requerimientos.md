# Plantilla de requerimientos

> Documento base del curso *Creación de software con Agentes de IA*.
> Completa cada sección con información verificable. No inventes normativa ni datos institucionales.

## 1. Identificación

| Campo | Valor |
|---|---|
| Proyecto | [Nombre] |
| Equipo | [Integrantes] |
| Fecha | [AAAA-MM-DD] |
| Versión | [0.1] |
| Estado | Borrador / En revisión / Aprobado |

## 2. Problema

### Usuario principal

[Quién tiene la necesidad, en qué contexto y con qué frecuencia.]

### Situación actual

[Qué hace hoy para resolver el problema y qué limitación enfrenta.]

### Evidencia

[Observaciones, entrevistas, datos o ejemplos concretos. Sin evidencia, indícalo.]

### Consecuencia

[Qué ocurre si el problema no se resuelve.]

### Problema en una frase

> [Usuario] necesita [necesidad] porque [consecuencia].

## 3. Objetivos

### Objetivo general

[Resultado esperado del proyecto.]

### Objetivos específicos

1. [Objetivo medible 1]
2. [Objetivo medible 2]
3. [Objetivo medible 3]

### Criterios de éxito

- [Métrica o condición verificable]
- [Métrica o condición verificable]

## 4. Alcance

### Incluye

- [Capacidad 1]
- [Capacidad 2]

### No incluye

- [Exclusión explícita 1]
- [Exclusión explícita 2]

### Supuestos

- [Supuesto que debe cumplirse]

### Restricciones

- [Tiempo, tecnologías, datos disponibles, entorno]

## 5. Requerimientos funcionales

| ID | Requerimiento | Prioridad | Criterio de aceptación |
|---|---|---|---|
| RF-01 | [El sistema debe…] | Alta | [Condición observable] |
| RF-02 | [El sistema debe…] | Alta | [Condición observable] |
| RF-03 | [El sistema debe…] | Media | [Condición observable] |
| RF-04 | [El sistema debe…] | Baja | [Condición observable] |

## 6. Requerimientos no funcionales

| ID | Categoría | Requerimiento | Cómo se verifica |
|---|---|---|---|
| RNF-01 | Rendimiento | [Tiempo de respuesta objetivo] | [Medición] |
| RNF-02 | Usabilidad | [Mensajes comprensibles] | [Revisión con usuario] |
| RNF-03 | Seguridad | [Acceso restringido a datos] | [Prueba de alcance] |
| RNF-04 | Mantenibilidad | [Pruebas y documentación] | [Revisión del repositorio] |
| RNF-05 | Accesibilidad | [Contraste, teclado, etiquetas] | [Revisión manual] |

## 7. Historias de usuario

| ID | Historia | Prioridad | Estimación |
|---|---|---|---|
| HU-01 | Como [rol] quiero [acción] para [beneficio] | Alta | [S / M / L] |
| HU-02 | Como [rol] quiero [acción] para [beneficio] | Alta | [S / M / L] |

Detalla cada historia con criterios de aceptación en el formato:

```gherkin
Escenario: [nombre]
  Dado [contexto]
  Cuando [acción]
  Entonces [resultado observable]
```

## 8. Reglas de negocio y datos

- [Regla que el sistema debe respetar]
- [Origen de los datos]
- [Qué hacer cuando no hay información suficiente]

## 9. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| [Riesgo] | Alta/Media/Baja | Alto/Medio/Bajo | [Acción] |

## 10. Trazabilidad

| Requerimiento | Historia | Prueba | Estado |
|---|---|---|---|
| RF-01 | HU-01 | [test_archivo.py::test_caso] | Pendiente |
| RF-02 | HU-02 | [prueba manual M-01] | Pendiente |

## 11. Preguntas abiertas

- [Pregunta que requiere decisión del equipo o del docente]

## 12. Aprobación

| Rol | Nombre | Fecha | Firma o visto bueno |
|---|---|---|---|
| Producto | | | |
| Técnico | | | |
| Docente | | | |
