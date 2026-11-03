import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, FileText, Search, X } from 'lucide-react'
import { quickLinks, searchContent } from '../../data/search'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => searchContent(query), [query])
  const showQuickLinks = query.trim().length < 2

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open) return null

  function go(path: string) {
    onClose()
    navigate(path)
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((value) => Math.min(value + 1, Math.max(results.length - 1, 0)))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((value) => Math.max(value - 1, 0))
    }
    if (event.key === 'Enter' && results[active]) {
      event.preventDefault()
      go(results[active].path)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] pb-8">
      <button
        type="button"
        aria-label="Cerrar búsqueda"
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar en el curso"
        className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-line bg-surface"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="shrink-0 text-faint" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Busca un tema, una herramienta o una práctica…"
            className="h-14 w-full bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
            aria-label="Término de búsqueda"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-faint transition-colors hover:bg-surface-3 hover:text-ink"
            aria-label="Cerrar búsqueda"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[min(60vh,28rem)] overflow-y-auto p-2">
          {showQuickLinks && (
            <div>
              <p className="px-3 py-2 text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
                Accesos rápidos
              </p>
              {quickLinks.map((link) => (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => go(link.path)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-surface-3"
                >
                  <FileText size={15} className="shrink-0 text-faint" aria-hidden="true" />
                  <span className="flex-1 text-sm text-muted">{link.title}</span>
                  <ArrowUpRight size={14} className="text-faint" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}

          {!showQuickLinks && results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-sm font-medium text-ink">Sin resultados para «{query}»</p>
              <p className="mt-1.5 text-xs text-muted">
                Prueba con «RAG», «AGENTS.md», «subagentes» o «requerimientos».
              </p>
            </div>
          )}

          {!showQuickLinks && results.length > 0 && (
            <div>
              <p className="px-3 py-2 text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              </p>
              {results.map((result, index) => (
                <button
                  key={result.path}
                  type="button"
                  onClick={() => go(result.path)}
                  onMouseEnter={() => setActive(index)}
                  className={`block w-full rounded-md px-3 py-2.5 text-left transition-colors ${
                    index === active ? 'bg-surface-3' : 'hover:bg-surface-3'
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">{result.title}</span>
                    <span className="shrink-0 text-[10px] tracking-wide text-faint uppercase">
                      {result.section}
                    </span>
                  </span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted">
                    {result.excerpt}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line bg-surface-2 px-4 py-2.5 text-[11px] text-faint">
          <span className="hidden sm:inline">
            Escribe al menos 2 caracteres para buscar en todo el contenido
          </span>
          <span className="flex items-center gap-2">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span>
            <span>navegar</span>
            <span className="kbd">Enter</span>
            <span>abrir</span>
          </span>
        </div>
      </div>
    </div>
  )
}
