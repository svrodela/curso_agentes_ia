# Backend con FastAPI

## Objetivo

Construir el backend de TecBot Académico con FastAPI, Pydantic, SQLAlchemy y SQLite, exponiendo los endpoints `GET /salud`, `GET /api/documentos` y `POST /api/consulta`, con validación, manejo de errores y pruebas.

## Resultado esperado

Un servidor FastAPI ejecutable localmente con los endpoints anteriores, base de datos SQLite inicializada y al menos tres pruebas con pytest en verde.

## Requisitos previos

- Python 3.11+.
- PowerShell en Windows.
- Proyecto TecBot creado (Día 1).

## Conceptos fundamentales

- **FastAPI:** framework web con tipado y documentación automática.
- **Uvicorn:** servidor ASGI.
- **Pydantic:** validación de entrada/salida.
- **SQLAlchemy:** ORM para SQLite/PostgreSQL.
- **SQLite:** base de datos local sin servidor.

## Paso 1. Preparar el entorno (PowerShell)

```powershell
cd C:\proyectos\tecbot-academico
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install fastapi uvicorn[standard] pydantic pydantic-settings sqlalchemy chromadb openai python-dotenv pypdf pytest httpx
```

Guarda las dependencias:

```powershell
pip freeze > requirements.txt
```

## Paso 2. Crear la estructura

```powershell
mkdir app, app\routers, app\services, tests, data
New-Item app\__init__.py, app\routers\__init__.py, app\services\__init__.py -ItemType File
```

## Paso 3. Configuración

Crea `app/config.py`:

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Configuracion(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    proveedor_ia: str = "openai"
    modelo_chat: str = "gpt-4o-mini"
    modelo_embeddings: str = "text-embedding-3-small"
    clave_api_ia: str = ""
    url_base_ia: str = ""
    chroma_ruta: str = "./data/chroma"
    documentos_ruta: str = "./documentos-demo"
    base_datos_url: str = "sqlite:///./data/tecbot.db"


configuracion = Configuracion()
```

Crea `.env.example`:

```text
PROVEEDOR_IA=openai
MODELO_CHAT=gpt-4o-mini
MODELO_EMBEDDINGS=text-embedding-3-small
CLAVE_API_IA=
URL_BASE_IA=
CHROMA_RUTA=./data/chroma
DOCUMENTOS_RUTA=./documentos-demo
BASE_DATOS_URL=sqlite:///./data/tecbot.db
```

Agrega `.env` a `.gitignore`.

## Paso 4. Base de datos

Crea `app/database.py`:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import configuracion

engine = create_engine(
    configuracion.base_datos_url,
    connect_args={"check_same_thread": False}
    if configuracion.base_datos_url.startswith("sqlite")
    else {},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def obtener_sesion():
    sesion = SessionLocal()
    try:
        yield sesion
    finally:
        sesion.close()
```

Crea `app/models.py`:

```python
from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Consulta(Base):
    __tablename__ = "consultas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    pregunta: Mapped[str] = mapped_column(Text, nullable=False)
    respuesta: Mapped[str] = mapped_column(Text, nullable=False)
    fuentes: Mapped[str] = mapped_column(Text, nullable=False, default="[]")
    creada_en: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class Documento(Base):
    __tablename__ = "documentos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    ruta: Mapped[str] = mapped_column(String(500), nullable=False)
    fragmentos: Mapped[int] = mapped_column(Integer, default=0)
    indexado_en: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
```

## Paso 5. Esquemas (Pydantic)

Crea `app/schemas.py`:

```python
from pydantic import BaseModel, Field


class ConsultaEntrada(BaseModel):
    pregunta: str = Field(..., min_length=3, max_length=500)
    historial: list[str] = Field(default_factory=list)


class Fuente(BaseModel):
    documento: str
    fragmento: str


class ConsultaSalida(BaseModel):
    respuesta: str
    fuentes: list[Fuente]
    modelo: str


class DocumentoSalida(BaseModel):
    nombre: str
    fragmentos: int

    model_config = {"from_attributes": True}
```

## Paso 6. Routers

Crea `app/routers/salud.py`:

```python
from fastapi import APIRouter

router = APIRouter()


@router.get("/salud")
def salud():
    return {"estado": "ok"}
```

Crea `app/routers/documentos.py`:

```python
from fastapi import APIRouter

from app.schemas import DocumentoSalida
from app.services.indexador import listar_documentos

router = APIRouter()


@router.get("/documentos", response_model=list[DocumentoSalida])
def documentos():
    return listar_documentos()
```

Crea `app/routers/consulta.py`:

```python
from fastapi import APIRouter, HTTPException

from app.schemas import ConsultaEntrada, ConsultaSalida
from app.services.rag import responder_consulta

router = APIRouter()


@router.post("/consulta", response_model=ConsultaSalida)
def consultar(entrada: ConsultaEntrada):
    try:
        resultado = responder_consulta(entrada.pregunta, entrada.historial)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
    except Exception as error:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"Error al procesar la consulta: {error}")
    return resultado
```

## Paso 7. Servicios

Crea `app/services/rag.py`, `app/services/proveedor_ia.py`, `app/services/vector_store.py`, `app/services/indexador.py` con el código del esqueleto descargable en `public/tecbot-academico/backend/`. (Ver archivos de referencia.)

## Paso 8. Entrada principal

Crea `main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import consulta, documentos, salud

app = FastAPI(title="TecBot Académico API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(salud.router, tags=["salud"])
app.include_router(consulta.router, prefix="/api", tags=["consulta"])
app.include_router(documentos.router, prefix="/api", tags=["documentos"])


@app.get("/")
def raiz():
    return {"servicio": "TecBot Académico", "estado": "ok"}
```

## Paso 9. Ejecutar

```powershell
cd C:\proyectos\tecbot-academico
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

Abre `http://localhost:8000/docs` para ver la documentación automática. Prueba `GET /salud`.

## Paso 10. Pruebas

Crea `tests/test_salud.py`:

```python
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
```

Ejecuta:

```powershell
pytest -q
```

## Paso 11. Trabajar con el agente

Prompt listo para OpenCode:

```text
Contexto: proyecto TecBot Académico, backend FastAPI en backend/.
Objetivo: revisar el endpoint POST /api/consulta y proponer mejoras de manejo de errores.
Restricciones: no modifiques archivos. Solo propón. No inventes campos.
Resultado esperado: lista de mejoras con justificación.
Criterios de aceptación: cada mejora referencia un archivo y una línea.
```

## Paso 12. Errores frecuentes

- **ModuleNotFoundError:** verifica que el entorno virtual esté activo y que ejecutes desde la raíz.
- **CORS:** el frontend en 5173 debe estar en `allow_origins`.
- **SQLite locked:** cierra otras conexiones; usa `check_same_thread=False`.
- **Pydantic v1 vs v2:** usa `model_config` (v2), no `class Config`.

## Paso 13. Entregable

- Backend ejecutable con `/salud`, `/api/documentos`, `/api/consulta`.
- `requirements.txt` actualizado.
- Al menos 3 pruebas en verde.

## Paso 14. Criterios de aceptación

- `uvicorn main:app --reload` arranca sin errores.
- `http://localhost:8000/docs` muestra los endpoints.
- `pytest -q` pasa.
- La pregunta vacía devuelve 422.

## Recursos

- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://docs.sqlalchemy.org/)
- [Pydantic](https://docs.pydantic.dev/)

**Siguiente paso:** construir la interfaz en [Frontend con React](/proyecto-conductor/frontend).
