import { Link } from 'react-router-dom'
import { ArrowRight, Home as HomeIcon, Search } from 'lucide-react'
import { days } from '../data/course'

export function NotFound() {
  return (
    <div className="page-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Error 404</p>
      <h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
        Esta página no forma parte del curso
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Puede que el enlace haya cambiado o que la ruta esté escrita de forma incorrecta. Vuelve al
        inicio o entra directamente a un día.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary">
          <HomeIcon size={15} aria-hidden="true" />
          Ir al inicio
        </Link>
        <Link to="/dias" className="btn btn-secondary">
          <Search size={15} aria-hidden="true" />
          Ver días
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {days.map((day) => (
          <Link
            key={day.slug}
            to={`/dias/${day.slug}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            Día {day.id}
            <ArrowRight size={11} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  )
}
