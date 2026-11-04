import { useState } from 'react'
import { consultar } from '../api'
import type { Mensaje } from '../types'

export function ChatBox() {
  const [pregunta, setPregunta] = useState('')
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function enviar() {
    if (!pregunta.trim()) return
    const texto = pregunta.trim()
    setPregunta('')
    setMensajes((prev) => [...prev, { rol: 'usuario', contenido: texto }])
    setCargando(true)
    setError(null)
    try {
      const resultado = await consultar(texto, mensajes.map((m) => m.contenido))
      setMensajes((prev) => [
        ...prev,
        { rol: 'asistente', contenido: resultado.respuesta, fuentes: resultado.fuentes },
      ])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <div className="space-y-3">
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`rounded-lg p-3 ${m.rol === 'usuario' ? 'bg-violet-900/40' : 'bg-zinc-900'}`}
          >
            <p className="text-sm font-medium mb-1">{m.rol === 'usuario' ? 'Tú' : 'TecBot'}</p>
            <p className="whitespace-pre-wrap text-sm">{m.contenido}</p>
            {m.fuentes && m.fuentes.length > 0 && (
              <ul className="mt-2 text-xs text-zinc-400 list-disc list-inside">
                {m.fuentes.map((f, j) => (
                  <li key={j}>{f.documento}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {cargando && <p className="text-sm text-zinc-400">Consultando documentos…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviar()}
          placeholder="Escribe tu pregunta…"
          aria-label="Pregunta"
        />
        <button
          onClick={enviar}
          disabled={cargando}
          className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </section>
  )
}
