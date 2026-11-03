import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react'
import { course, days } from '../data/course'
import { Breadcrumbs } from '../components/course/DocLayout'

export function DiasIndex() {
  return (
    <div className="page-container py-8 lg:py-12">
      <Breadcrumbs items={[{ label: 'Inicio', path: '/' }, { label: 'Días' }]} />

      <header className="max-w-3xl">
        <p className="eyebrow">{course.event} · Ruta de aprendizaje</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Cuatro días para construir con agentes
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          La ruta avanza de la definición del problema a la demostración final. Puedes seguirla en
          orden durante el curso o entrar directamente al tema que necesites repasar.
        </p>
      </header>

      <div className="mt-8 grid gap-3 border-y border-line py-4 sm:grid-cols-3">
        <div className="flex items-center gap-2.5 text-sm text-muted">
          <CalendarDays size={15} className="text-accent" aria-hidden="true" />
          9 al 12 de noviembre de 2026
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted">
          <Clock3 size={15} className="shrink-0 text-accent" aria-hidden="true" />
          {course.duration} · Lun 10:00–13:00 · Mar–Jue 08:00–12:00
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted">
          <BookOpen size={15} className="text-accent" aria-hidden="true" />
          15 temas · práctica acumulativa
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {days.map((day) => (
          <Link
            key={day.slug}
            to={`/dias/${day.slug}`}
            className="group card-interactive grid gap-5 p-5 sm:p-6 lg:grid-cols-[132px_minmax(0,1fr)_auto] lg:items-center"
          >
            <div className="flex items-center gap-4 lg:block">
              <span className="font-mono text-3xl font-medium tracking-tight text-accent">
                0{day.id}
              </span>
              <span className="mt-0 block text-xs text-faint lg:mt-1">{day.date}</span>
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-ink">
                {day.title}
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{day.objective}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {day.topics.map((topic) => (
                  <span
                    key={topic.slug}
                    className="rounded border border-line bg-surface-3 px-2 py-0.5 text-[11px] text-muted"
                  >
                    {topic.navTitle}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-line pt-4 lg:block lg:border-0 lg:pt-0 lg:text-right">
              <span className="text-[11px] text-faint">
                {day.topics.length} temas · {day.schedule}
              </span>
              <span className="mt-0 flex items-center gap-1.5 text-xs font-medium text-accent lg:mt-2">
                Ver día
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 rounded-lg border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          ¿Necesitas revisar el calendario completo y los criterios del curso?
        </p>
        <Link
          to="/programa"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80"
        >
          Consultar el programa
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
