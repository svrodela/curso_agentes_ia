from fastapi import APIRouter

from app.schemas import DocumentoSalida
from app.services.indexador import listar_documentos

router = APIRouter()


@router.get("/documentos", response_model=list[DocumentoSalida])
def documentos():
    return listar_documentos()
