"""Proveedor de IA agnóstico. Implementación por defecto compatible con OpenAI."""

from openai import OpenAI

from app.config import configuracion


def _cliente() -> OpenAI:
    kwargs = {}
    if configuracion.url_base_ia:
        kwargs["base_url"] = configuracion.url_base_ia
    if configuracion.clave_api_ia:
        kwargs["api_key"] = configuracion.clave_api_ia
    else:
        kwargs["api_key"] = "sin-clave"
    return OpenAI(**kwargs)


def generar_respuesta(mensajes: list[dict]) -> str:
    cliente = _cliente()
    respuesta = cliente.chat.completions.create(
        model=configuracion.modelo_chat,
        messages=mensajes,
        temperature=0.2,
    )
    return respuesta.choices[0].message.content or ""


def generar_embeddings(textos: list[str]) -> list[list[float]]:
    cliente = _cliente()
    respuesta = cliente.embeddings.create(
        model=configuracion.modelo_embeddings,
        input=textos,
    )
    return [item.embedding for item in respuesta.data]
