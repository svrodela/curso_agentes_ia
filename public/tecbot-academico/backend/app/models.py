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
