const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000'

export interface Fuente {
  documento: string
  fragmento: string
}

export interface ConsultaSalida {
  respuesta: string
  fuentes: Fuente[]
  modelo: string
}

export async function consultar(pregunta: string, historial: string[] = []): Promise<ConsultaSalida> {
  const respuesta = await fetch(`${API_BASE}/api/consulta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pregunta, historial }),
  })
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`)
  }
  return respuesta.json()
}
