# Frontend con React y TypeScript

## Objetivo

Construir la interfaz de TecBot Académico con React, TypeScript, Vite y Tailwind CSS: un chat que envía preguntas al backend, muestra la respuesta y lista las fuentes.

## Resultado esperado

Una aplicación React ejecutable en `http://localhost:5173` que se comunica con el backend y muestra estados de carga, error y vacío.

## Requisitos previos

- Node.js 20+.
- Backend ejecutándose en `http://localhost:8000`.
- Proyecto TecBot creado.

## Conceptos fundamentales

- **React:** biblioteca para interfaces basada en componentes.
- **TypeScript:** tipado estático para JavaScript.
- **Vite:** bundler y servidor de desarrollo rápido.
- **Tailwind CSS:** utilidades CSS para diseño responsive.
- **fetch:** API del navegador para llamar al backend.

## Paso 1. Crear el proyecto (PowerShell)

```powershell
cd C:\proyectos\tecbot-academico
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configura `tailwind.config.js`:

```js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

Agrega a `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Paso 2. Variables de entorno

Crea `.env`:

```text
VITE_API_BASE=http://localhost:8000
```

Agrega `.env` a `.gitignore`.

## Paso 3. Tipos y API

Crea `src/api.ts`:

```ts
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000'

export interface Fuente { documento: string; fragmento: string }
export interface ConsultaSalida { respuesta: string; fuentes: Fuente[]; modelo: string }

export async function consultar(pregunta: string, historial: string[] = []): Promise<ConsultaSalida> {
  const respuesta = await fetch(`${API_BASE}/api/consulta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pregunta, historial }),
  })
  if (!respuesta.ok) throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`)
  return respuesta.json()
}
```

Crea `src/types.ts`:

```ts
export interface Mensaje {
  rol: 'usuario' | 'asistente'
  contenido: string
  fuentes?: { documento: string; fragmento: string }[]
}
```

## Paso 4. Componente ChatBox

Crea `src/components/ChatBox.tsx`:

```tsx
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
          <div key={i} className={`rounded-lg p-3 ${m.rol === 'usuario' ? 'bg-violet-900/40' : 'bg-zinc-900'}`}>
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
```

## Paso 5. App principal

`src/App.tsx`:

```tsx
import { ChatBox } from './components/ChatBox'

export default function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <header className="max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold">TecBot Académico</h1>
        <p className="text-zinc-400 text-sm">
          Asistente de información académica. Las respuestas se fundamentan en documentos de demostración.
        </p>
      </header>
      <ChatBox />
    </main>
  )
}
```

## Paso 6. Ejecutar

```powershell
cd C:\proyectos\tecbot-academico\frontend
npm run dev
```

Abre `http://localhost:5173`. Asegúrate de que el backend esté corriendo.

## Paso 7. Trabajar con el agente

Prompt listo para OpenCode:

```text
Contexto: frontend React TS en frontend/, backend en http://localhost:8000.
Objetivo: agregar un componente SourceList que muestre las fuentes con nombre y fragmento.
Restricciones: no modificar la lógica de fetch. Solo componente visual. Accesible y responsive.
Resultado esperado: componente SourceList.tsx con props fuentes.
Criterios de aceptación: se renderiza en ChatBox; sin errores de TypeScript.
```

## Paso 8. Errores frecuentes

- **CORS:** el backend debe permitir `http://localhost:5173`.
- **VITE_API_BASE no definido:** crea `.env` y reinicia Vite.
- **TS errors:** verifica tipos en `api.ts` y `types.ts`.
- **Estilos no aplican:** revisa `content` en `tailwind.config.js`.

## Paso 9. Entregable

- Frontend ejecutable en 5173.
- Chat funcional con backend.
- Estados de carga, error y vacío visibles.

## Paso 10. Criterios de aceptación

- `npm run dev` arranca sin errores.
- Una pregunta devuelve respuesta y fuentes.
- Pregunta vacía no envía.
- Error de red muestra mensaje comprensible.

## Recursos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

**Siguiente paso:** incorporar conocimiento documental en [Fundamentos de RAG](/dias/dia-3/fundamentos-rag).
