import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export interface PageLink {
  title: string
  path: string
  label?: string
}

export function PageNav({ prev, next }: { prev?: PageLink; next?: PageLink }) {
  if (!prev && !next) return null

  return (
    <nav aria-label="Navegación entre páginas" className="mt-14 border-t border-line pt-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            to={prev.path}
            className="group card-interactive flex items-start gap-3 p-4 sm:mr-auto"
          >
            <ArrowLeft
              size={16}
              className="mt-1 shrink-0 text-faint transition-colors group-hover:text-accent"
              aria-hidden="true"
            />
            <span>
              <span className="block text-[10px] font-medium tracking-[0.12em] text-faint uppercase">
                {prev.label ?? 'Anterior'}
              </span>
              <span className="mt-1 block text-sm font-medium text-ink">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next && (
          <Link
            to={next.path}
            className="group card-interactive flex items-start justify-between gap-3 p-4 text-right sm:ml-auto"
          >
            <span className="flex-1">
              <span className="block text-[10px] font-medium tracking-[0.12em] text-faint uppercase">
                {next.label ?? 'Siguiente'}
              </span>
              <span className="mt-1 block text-sm font-medium text-ink">{next.title}</span>
            </span>
            <ArrowRight
              size={16}
              className="mt-1 shrink-0 text-faint transition-colors group-hover:text-accent"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </nav>
  )
}
