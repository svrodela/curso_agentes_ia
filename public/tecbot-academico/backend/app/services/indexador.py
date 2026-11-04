"""Indexación de documentos Markdown y PDF."""

from pathlib import Path

from app.config import configuracion
from app.services.vector_store import indexar_fragmentos


def fragmentar_texto(texto: str, tamano: int = 500, solape: int = 80) -> list[str]:
    fragmentos = []
    inicio = 0
    while inicio < len(texto):
        fin = inicio + tamano
        fragmentos.append(texto[inicio:fin])
        inicio = fin - solape
        if inicio < 0:
            inicio = 0
        if fin >= len(texto):
            break
    return [f for f in fragmentos if f.strip()]


def indexar_documento(ruta: Path) -> int:
    if ruta.suffix.lower() == ".pdf":
        from pypdf import PdfReader

        lector = PdfReader(str(ruta))
        texto = "\n".join(pagina.extract_text() or "" for pagina in lector.pages)
    else:
        texto = ruta.read_text(encoding="utf-8")

    partes = fragmentar_texto(texto)
    fragmentos = [
        {"documento": ruta.name, "texto": parte, "indice": i} for i, parte in enumerate(partes)
    ]
    return indexar_fragmentos(fragmentos)


def indexar_carpeta() -> int:
    carpeta = Path(configuracion.documentos_ruta)
    total = 0
    for ruta in carpeta.rglob("*"):
        if ruta.suffix.lower() in {".md", ".pdf"}:
            total += indexar_documento(ruta)
    return total


def listar_documentos() -> list[dict]:
    carpeta = Path(configuracion.documentos_ruta)
    salida = []
    for ruta in carpeta.rglob("*"):
        if ruta.suffix.lower() in {".md", ".pdf"}:
            salida.append({"nombre": ruta.name, "fragmentos": 0})
    return salida
