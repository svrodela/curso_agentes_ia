"""Esqueleto de API para TecBot Académico — curso Creación de software con Agentes de IA.

Guarda este archivo como ``app/main.py`` en la raíz del proyecto. Requiere:

    pip install fastapi uvicorn chromadb ollama
    python scripts/indexar.py

Ejecuta:

    uvicorn app.main:app --reload

El código es un punto de partida didáctico. Los documentos de ``documentos-demo/``
son ficticios y no representan normativa institucional oficial.
"""

from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path

import chromadb
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CHROMA_DIR = PROJECT_ROOT / "chroma_db"
COLLECTION_NAME = "documentos_academicos"
MODEL_NAME = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
DISTANCE_THRESHOLD = float(os.getenv("DISTANCE_THRESHOLD", "0.55"))
ADVERTENCIA = (
    "Material didáctico de demostración. Los documentos no son normativa oficial."
)
SIN_EVIDENCIA = (
    "No encontré información suficiente en los documentos disponibles. "
    "Te recomiendo acudir al departamento correspondiente para confirmar el trámite."
)

app = FastAPI(
    title="TecBot Académico",
    description="Asistente de información académica basado en RAG. Proyecto didáctico.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
        ).split(",")
        if origin.strip()
    ],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


class Consulta(BaseModel):
    pregunta: str = Field(min_length=3, max_length=500)


class Fuente(BaseModel):
    documento: str
    tema: str
    fragmento: int


class Respuesta(BaseModel):
    respuesta: str
    fuentes: list[Fuente]
    advertencia: str


@lru_cache(maxsize=1)
def get_collection():
    """Abre la colección una sola vez por proceso."""
    if not CHROMA_DIR.exists():
        raise HTTPException(
            status_code=503,
            detail="No existe chroma_db/. Ejecuta primero python scripts/indexar.py.",
        )

    client = chromadb.PersistentClient(path=str(CHROMA_DIR))
    return client.get_collection(
        name=COLLECTION_NAME,
        embedding_function=DefaultEmbeddingFunction(),
    )


def recuperar(pregunta: str, limite: int = 4) -> list[dict]:
    """Devuelve fragmentos relevantes con su documento de origen."""
    try:
        resultados = get_collection().query(
            query_texts=[pregunta],
            n_results=limite,
            include=["documents", "metadatas", "distances"],
        )
    except HTTPException:
        raise
    except Exception as exc:  # La colección puede no existir todavía.
        raise HTTPException(
            status_code=503,
            detail="No fue posible consultar la base documental. Revisa el índice.",
        ) from exc

    fragmentos: list[dict] = []
    for documento, metadata, distancia in zip(
        resultados["documents"][0],
        resultados["metadatas"][0],
        resultados["distances"][0],
    ):
        if distancia > DISTANCE_THRESHOLD:
            continue
        fragmentos.append(
            {
                "texto": documento,
                "documento": str(metadata["documento"]),
                "tema": str(metadata["tema"]),
                "fragmento": int(metadata["fragmento"]),
                "distancia": float(distancia),
            }
        )

    return fragmentos


def construir_contexto(fragmentos: list[dict]) -> str:
    return "\n\n".join(
        f"[{fragmento['documento']}]\n{fragmento['texto']}" for fragmento in fragmentos
    )


def generar_respuesta(pregunta: str, fragmentos: list[dict]) -> str:
    """Genera con Ollama. Si no está disponible, devuelve un error claro."""
    try:
        import ollama
    except ImportError as exc:
        raise HTTPException(
            status_code=503,
            detail="Falta el paquete ollama. Instálalo o implementa otro proveedor.",
        ) from exc

    prompt = f"""Eres un asistente de información académica.

Responde únicamente con la información de los FRAGMENTOS.
Si no hay información suficiente, dilo y recomienda acudir al departamento correspondiente.
No inventes requisitos, fechas, montos ni enlaces.
Cita el documento de cada afirmación con el formato [documento].
Responde en español, de forma breve y clara.

PREGUNTA:
{pregunta}

FRAGMENTOS:
{construir_contexto(fragmentos)}
"""

    try:
        respuesta = ollama.chat(
            model=MODEL_NAME,
            messages=[{"role": "user", "content": prompt}],
            options={"temperature": 0.1},
        )
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail=(
                "No fue posible generar la respuesta. Verifica que Ollama esté "
                f"ejecutándose y que el modelo {MODEL_NAME} esté descargado."
            ),
        ) from exc

    texto = str(respuesta.get("message", {}).get("content", "")).strip()
    if not texto:
        raise HTTPException(status_code=502, detail="El modelo devolvió una respuesta vacía.")

    return texto


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "servicio": "tecbot-academico"}


@app.post("/consultar", response_model=Respuesta)
def consultar(consulta: Consulta) -> Respuesta:
    pregunta = consulta.pregunta.strip()
    if not pregunta:
        raise HTTPException(status_code=422, detail="La pregunta no puede estar vacía.")

    fragmentos = recuperar(pregunta)
    if not fragmentos:
        return Respuesta(
            respuesta=SIN_EVIDENCIA,
            fuentes=[],
            advertencia=ADVERTENCIA,
        )

    respuesta = generar_respuesta(pregunta, fragmentos)

    fuentes: list[Fuente] = []
    vistos: set[tuple[str, str, int]] = set()
    for fragmento in fragmentos:
        clave = (fragmento["documento"], fragmento["tema"], fragmento["fragmento"])
        if clave in vistos:
            continue
        vistos.add(clave)
        fuentes.append(
            Fuente(
                documento=fragmento["documento"],
                tema=fragmento["tema"],
                fragmento=fragmento["fragmento"],
            )
        )

    return Respuesta(respuesta=respuesta, fuentes=fuentes, advertencia=ADVERTENCIA)
