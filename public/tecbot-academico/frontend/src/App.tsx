import { useState } from 'react'
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
