"""Almacenamiento vectorial con ChromaDB."""

import chromadb
from chromadb.config import Settings

from app.config import configuracion
from app.services.proveedor_ia import generar_embeddings

cliente_chroma = chromadb.PersistentClient(
    path=configuracion.chroma_ruta,
    settings=Settings(anonymized_telemetry=False),
)

coleccion = cliente_chroma.get_or_create_collection(name="documentos_academicos")


def indexar_fragmentos(fragmentos: list[dict]) -> int:
    if not fragmentos:
        return 0
    textos = [f["texto"] for f in fragmentos]
    embeddings = generar_embeddings(textos)
    coleccion.add(
        ids=[f"{f['documento']}-{f['indice']}" for f in fragmentos],
        documents=textos,
        embeddings=embeddings,
        metadatas=[{"documento": f["documento"]} for f in fragmentos],
    )
    return len(fragmentos)


def buscar_fragmentos(pregunta: str, k: int = 4) -> list[dict]:
    embedding = generar_embeddings([pregunta])[0]
    resultados = coleccion.query(query_embeddings=[embedding], n_results=k)
    documentos = resultados.get("documents", [[]])[0]
    metadatos = resultados.get("metadatas", [[]])[0]
    salida = []
    for texto, meta in zip(documentos, metadatos):
        salida.append({"documento": meta.get("documento", "desconocido"), "texto": texto})
    return salida
