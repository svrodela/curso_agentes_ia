# Pruebas — TecBot Académico

> **Documento de demostración del curso.** Los resultados deben registrarse después de ejecutarlos; no se deben declarar pruebas no realizadas.

## 1. Estrategia

| Nivel | Qué valida |
|---|---|
| Unidad | Fragmentación, normalización, recuperación |
| Integración | Ruta + recuperación + formato |
| Contrato | Códigos y estructura JSON |
| Manual | Experiencia de consulta y fuentes |
| Aceptación | Historias de usuario |

## 2. Casos automatizados

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_servicio_social_devuelve_fuente():
    response = client.post(
        "/api/consulta",
        json={"pregunta": "¿Qué necesito para iniciar el servicio social?"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["respuesta"].strip()
    assert any("servicio-social" in f["documento"] for f in data["fuentes"])


def test_sin_evidencia_no_inventa_fuentes():
    response = client.post(
        "/api/consulta",
        json={"pregunta": "¿Cuál es el horario de la cafetería?"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["fuentes"] == []
    assert data["advertencia"]


def test_pregunta_vacia():
    response = client.post("/api/consulta", json={"pregunta": ""})
    assert response.status_code == 422
```

Comando:

```bash
pytest -q
```

## 3. Matriz manual

| ID | Caso | Resultado esperado | Estado |
|---|---|---|---|
| M-01 | Requisitos de servicio social | Respuesta + fuente | Pendiente |
| M-02 | Registro de residencias | Respuesta + fuente | Pendiente |
| M-03 | Modalidades de titulación | Respuesta + fuente | Pendiente |
| M-04 | Acreditación de materia | Respuesta + fuente | Pendiente |
| M-05 | Pregunta fuera del corpus | Abstención + advertencia | Pendiente |
| M-06 | Pregunta vacía | Error de validación | Pendiente |
| M-07 | Pantalla de 360 px | Sin scroll horizontal | Pendiente |
| M-08 | API caída | Mensaje comprensible | Pendiente |
| M-09 | Respuesta lenta | Indicador de carga | Pendiente |
| M-10 | Fuente visible | Documento y fragmento | Pendiente |

## 4. Pruebas MCP

| ID | Caso | Resultado esperado | Estado |
|---|---|---|---|
| MCP-01 | Listar carpeta permitida | Cuatro documentos | Pendiente |
| MCP-02 | Leer documento permitido | Contenido correcto | Pendiente |
| MCP-03 | Leer fuera de la carpeta | Rechazo | Pendiente |
| MCP-04 | Escribir en la carpeta | Denegado | Pendiente |
| MCP-05 | Deshabilitar servidor | Tools ausentes | Pendiente |

## 5. Registro de ejecución

Copia esta plantilla por cada ejecución:

```markdown
## Ejecución — [fecha]

- Comando: `pytest -q`
- Resultado: [passed/failed]
- Duración: [s]
- Entorno: [sistema operativo, Python, modelo]

### Fallos
- [caso, mensaje, acción]

### Pruebas manuales
- [ID: resultado y evidencia]

### Riesgos pendientes
- [riesgo]
```

## 6. Criterios de salida

- [ ] La suite automatizada pasa.
- [ ] Los casos de aceptación tienen evidencia.
- [ ] El caso sin evidencia no inventa fuentes.
- [ ] La aplicación funciona en una instalación limpia.
- [ ] No hay secretos en el repositorio.
- [ ] La matriz manual está completa.
- [ ] Los fallos conocidos están documentados.

## 7. Evidencias

Guarda capturas, salidas de terminal o enlaces en `documentacion/evidencias/`. No incluyas datos personales.

## 8. Limitaciones

- El corpus es pequeño y ficticio.
- La calidad de la generación depende del modelo.
- No hay pruebas de carga.
- No hay pruebas de seguridad ofensiva.
- No se valida información institucional real.
