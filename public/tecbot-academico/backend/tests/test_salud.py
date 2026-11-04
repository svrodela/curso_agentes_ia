from fastapi.testclient import TestClient

from main import app

cliente = TestClient(app)


def test_salud():
    respuesta = cliente.get("/salud")
    assert respuesta.status_code == 200
    assert respuesta.json() == {"estado": "ok"}


def test_raiz():
    respuesta = cliente.get("/")
    assert respuesta.status_code == 200
    assert respuesta.json()["servicio"] == "TecBot Académico"
