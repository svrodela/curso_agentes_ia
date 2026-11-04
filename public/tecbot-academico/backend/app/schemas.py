from pydantic import BaseModel, Field


class ConsultaEntrada(BaseModel):
    pregunta: str = Field(..., min_length=3, max_length=500, description="Pregunta del usuario")
    historial: list[str] = Field(default_factory=list, description="Mensajes previos de la sesión")


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
