"""Servicio RAG agnóstico al proveedor de modelos."""

from app.config import configuracion
from app.services.proveedor_ia import generar_respuesta, generar_embeddings
from app.services.vector_store import buscar_fragmentos


PROMPT_SISTEMA = """Eres TecBot Académico, un asistente de información académica.
Responde únicamente con base en los fragmentos proporcionados.
Si no hay evidencia suficiente, indica que no encontraste información y sugiere acudir al departamento correspondiente.
No inventes fechas, requisitos ni enlaces.
Incluye al final la lista de fuentes utilizadas."""


def responder_consulta(pregunta: str, historial: list[str]) -> dict:
    if not pregunta.strip():
        raise ValueError("La pregunta no puede estar vacía.")

    fragmentos = buscar_fragmentos(pregunta, k=4)
    if not fragmentos:
        return {
            "respuesta": "No encontré información suficiente en los documentos de demostración. "
            "Te recomiendo acudir al departamento académico correspondiente.",
            "fuentes": [],
            "modelo": configuracion.modelo_chat,
        }

    contexto = "\n\n".join(
        f"[Fuente: {f['documento']}]\n{f['texto']}" for f in fragmentos
    )
    mensajes = [
        {"role": "system", "content": PROMPT_SISTEMA},
        {"role": "user", "content": f"Contexto:\n{contexto}\n\nPregunta: {pregunta}"},
    ]
    respuesta = generar_respuesta(mensajes)

    fuentes = [{"documento": f["documento"], "fragmento": f["texto"][:200]} for f in fragmentos]
    return {"respuesta": respuesta, "fuentes": fuentes, "modelo": configuracion.modelo_chat}
