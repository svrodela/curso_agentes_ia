# Proyectos integradores: propuestas para el último día

Este documento presenta las propuestas de proyecto para el último día del curso **Creación de software con Agentes de IA**. Cada equipo elegirá (o recibirá) una propuesta y construirá un MVP funcional aplicando el flujo de trabajo aprendido durante el curso.

## 1. Introducción

El propósito es desarrollar una aplicación web funcional que resuelva una necesidad concreta. Durante el proceso, los equipos aplicarán:

- Definición del problema y requerimientos.
- Planeación en modo Plan.
- Diseño de arquitectura.
- Delegación de tareas a subagentes.
- Desarrollo del backend y frontend.
- Pruebas, correcciones y validación.
- Integración del proyecto.

El resultado esperado no es un producto terminado, sino un MVP que demuestre el flujo completo de desarrollo asistido por agentes.

## 2. Propuestas de proyectos

### 1. HotelFlow – Sistema de reservaciones hoteleras

- **Descripción:** administración de habitaciones, disponibilidad, huéspedes y reservaciones.
- **Objetivo:** permitir registrar, modificar y cancelar reservaciones de un hotel.
- **Funcionalidades principales:**
  - Registro y consulta de habitaciones.
  - Control de disponibilidad por fechas.
  - Registro de huéspedes.
  - Creación, modificación y cancelación de reservaciones.
  - Listado de reservaciones activas.

### 2. ShopIA – Tienda de comercio electrónico

- **Descripción:** tienda virtual con catálogo de productos, categorías, inventario, carrito y pedidos.
- **Objetivo:** gestionar la venta de productos a través de una tienda en línea.
- **Funcionalidades principales:**
  - Catálogo de productos por categoría.
  - Control de inventario.
  - Carrito de compras.
  - Creación y consulta de pedidos.
  - Panel básico de administración de productos.

### 3. RestoApp – Administración de restaurante

- **Descripción:** sistema para gestionar menú, mesas, pedidos y estados de preparación.
- **Objetivo:** organizar la operación diaria de un restaurante.
- **Funcionalidades principales:**
  - Gestión del menú y precios.
  - Administración de mesas.
  - Registro de pedidos por mesa.
  - Estados de preparación de los alimentos.
  - Consulta de pedidos activos.

### 4. TravelGo – Plataforma de viajes

- **Descripción:** aplicación para consultar destinos, paquetes, actividades, itinerarios y reservaciones.
- **Objetivo:** facilitar la búsqueda y reserva de experiencias de viaje.
- **Funcionalidades principales:**
  - Listado de destinos y paquetes turísticos.
  - Consulta de actividades disponibles.
  - Construcción de itinerarios.
  - Registro de reservaciones.
  - Filtros por fecha, destino y tipo de actividad.

### 5. FitTrack – Gestión de entrenamiento físico

- **Descripción:** plataforma para registrar usuarios, rutinas, objetivos, actividades y progreso.
- **Objetivo:** acompañar el seguimiento del entrenamiento de los usuarios.
- **Funcionalidades principales:**
  - Registro de usuarios.
  - Definición de objetivos y rutinas.
  - Registro de actividades realizadas.
  - Seguimiento del progreso.
  - Consulta de historial de entrenamiento.

### 6. RapidGo – Sistema de entregas a domicilio

- **Descripción:** sistema para administrar pedidos, direcciones, repartidores, asignación y seguimiento.
- **Objetivo:** coordinar entregas a domicilio de manera ordenada.
- **Funcionalidades principales:**
  - Registro de pedidos.
  - Gestión de direcciones de entrega.
  - Administración de repartidores.
  - Asignación de entregas.
  - Estados de seguimiento del pedido.

### 7. MediTurn – Gestión de citas médicas

- **Descripción:** aplicación para administrar médicos, especialidades, horarios, pacientes y citas.
- **Objetivo:** organizar la agenda de citas de un consultorio o clínica.
- **Funcionalidades principales:**
  - Registro de médicos y especialidades.
  - Gestión de horarios disponibles.
  - Registro de pacientes.
  - Agendado, consulta y cancelación de citas.
  - Listado de citas por fecha y médico.

> El alcance se limita a la gestión administrativa: no incluye diagnósticos ni prescripciones.

### 8. Eventia – Gestión de eventos y asistentes

- **Descripción:** plataforma para publicar eventos, administrar fechas, lugares, capacidad, registros e inscripciones.
- **Objetivo:** facilitar la organización y el registro de asistentes a eventos.
- **Funcionalidades principales:**
  - Publicación de eventos.
  - Gestión de fechas, lugares y capacidad.
  - Registro e inscripción de asistentes.
  - Control de cupo disponible.
  - Consulta de eventos y asistentes registrados.

## 3. Alcance mínimo del MVP

Todos los proyectos deberán considerar:

- Interfaz web funcional y adaptable a dispositivos móviles.
- Backend desarrollado con FastAPI.
- Frontend desarrollado con React y TypeScript.
- Persistencia de información en una base de datos.
- Operaciones CRUD relacionadas con el problema.
- Validación de datos y manejo básico de errores.
- Datos de demostración para probar el sistema.
- Interfaz clara y fácil de utilizar.

No se requiere implementar pagos reales, aplicaciones móviles nativas, autenticación compleja ni integraciones externas.

## 4. Organización de los equipos

El grupo de 30 estudiantes se organiza en ocho equipos:

| Tipo de equipo | Integrantes | Cantidad de equipos |
|---|---|---|
| Equipo estándar | 4 | 6 |
| Equipo reducido | 3 | 2 |
| **Total** | **30 estudiantes** | **8 equipos** |

Cada equipo desarrollará un proyecto diferente. No se deben repetir propuestas.

## 5. Trabajo con agentes de IA

Los equipos deberán aprovechar los roles de subagentes trabajados durante el curso:

- **Arquitecto:** analiza requerimientos y define la estructura técnica.
- **Diseñador web:** propone la interfaz y experiencia de usuario.
- **Desarrollador:** implementa frontend y backend.
- **Tester:** verifica funcionalidades, detecta errores y valida resultados.

El agente principal coordinará el trabajo y mantendrá la integración entre los distintos componentes.

## 6. Entregables

Cada equipo deberá presentar:

- Requerimientos y alcance de su proyecto.
- Plan de trabajo y arquitectura propuesta.
- Código fuente organizado en un repositorio GitHub.
- MVP funcional.
- Evidencia de pruebas.
- Demostración breve del funcionamiento del sistema.

## 7. Recomendaciones para construir un MVP realista

- Define primero el flujo principal y deja las funciones secundarias para después.
- Limita el número de entidades y pantallas al mínimo necesario.
- Usa datos de demostración desde el inicio para validar el sistema.
- Divide el trabajo por componentes y asigna responsables claros.
- Integra backend y frontend temprano para detectar problemas.
- Reserva tiempo final para pruebas y correcciones.
- Prefiere soluciones simples y funcionales sobre características avanzadas.