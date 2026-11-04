from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import consulta, documentos, salud

app = FastAPI(
    title="TecBot Académico API",
    description="Asistente de información académica fundamentado en documentos de demostración.",
    version="0.1.0",
)

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
