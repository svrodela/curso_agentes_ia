from fastapi import APIRouter, HTTPException

from app.schemas import ConsultaEntrada, ConsultaSalida, Fuente
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
