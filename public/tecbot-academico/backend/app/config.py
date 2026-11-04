from pydantic_settings import BaseSettings, SettingsConfigDict


class Configuracion(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    proveedor_ia: str = "openai"  # openai | anthropic | ollama
    modelo_chat: str = "gpt-4o-mini"
    modelo_embeddings: str = "text-embedding-3-small"
    clave_api_ia: str = ""
    url_base_ia: str = ""
    chroma_ruta: str = "./data/chroma"
    documentos_ruta: str = "../documentos-demo"
    base_datos_url: str = "sqlite:///./data/tecbot.db"


configuracion = Configuracion()
