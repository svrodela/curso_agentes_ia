# AGENTS.md — [Nombre del proyecto]

> Plantilla del curso *Creación de software con Agentes de IA*.
> Sustituye los campos entre corchetes y elimina lo que no aplique.
> Este archivo es contexto operativo para el agente, no sustituto del README.

## Propósito

[Qué problema resuelve el proyecto, para quién y en una frase.]

## Alcance

Incluye:

- [Flujo o capacidad principal 1]
- [Flujo o capacidad principal 2]
- [Límite explícito de la solución]

No incluye:

- [Función fuera de alcance]
- [Integración fuera de alcance]
- Autenticación real, pagos o trámites oficiales, salvo que el proyecto lo indique.

## Stack

- [Lenguaje y versión]
- [Framework principal]
- [Base de datos o almacenamiento]
- [Herramientas de desarrollo]
- OpenCode para asistencia con agentes.

## Estructura

- `app/` — [descripción]
- `app/main.py` — [punto de entrada]
- `documentacion/` — requerimientos, arquitectura y pruebas.
- `documentos-demo/` — corpus ficticio de demostración, si aplica.
- `prompts/` — instrucciones de subagentes.
- `tests/` — pruebas automatizadas.

## Comandos

```bash
# Instalación
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Ejecución
uvicorn app.main:app --reload

# Pruebas
pytest -q
```

Sustituye estos comandos por los reales del proyecto antes de usar el agente.

## Reglas del proyecto

1. No inventar requisitos, fechas, montos, normativa ni enlaces.
2. Toda respuesta basada en documentos debe citar la fuente recuperada.
3. Si no hay evidencia suficiente, responder que no se cuenta con información y recomendar el canal correspondiente.
4. No modificar el corpus de demostración para hacer pasar una prueba.
5. No debilitar pruebas para ocultar fallos.
6. No agregar dependencias sin justificarlas y actualizar el archivo de dependencias.
7. No incluir credenciales, tokens, datos personales ni archivos `.env`.
8. Los documentos de ejemplo son material didáctico, nunca normativa oficial.

## Convenciones

- [Convención de nombres]
- [Convención de rutas o contratos]
- [Formato de respuestas o mensajes]
- Mensajes de commit en Conventional Commits.

## Permisos y revisión humana

- Cambios de arquitectura: requieren revisión antes de implementar.
- Comandos destructivos, instalaciones y despliegues: requieren aprobación.
- Escritura en el corpus de documentos: prohibida durante el desarrollo.
- El equipo es responsable del resultado final, aunque el código haya sido asistido.

## Definición de terminado

Una tarea está terminada cuando:

- El flujo principal funciona.
- Las pruebas pasan y se muestra la salida real.
- Existe al menos una prueba para el caso feliz y una para el caso sin evidencia o error.
- La documentación afectada está actualizada.
- El diff fue revisado por una persona.
- No se agregaron secretos ni datos personales.

## Mantenimiento

Actualiza este archivo cuando cambien la arquitectura, los comandos, el alcance, las reglas de datos o los permisos. Incluye esta revisión en la checklist de cada Pull Request.
