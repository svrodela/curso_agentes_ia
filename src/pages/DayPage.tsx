import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CalendarDays, Check, Clock3, Target } from 'lucide-react'
import { days, getDay } from '../data/course'
import { CourseSidebar } from '../components/course/CourseSidebar'
import { DocLayout } from '../components/course/DocLayout'
import { NotFound } from './NotFound'

export function DayPage() {
  const { daySlug = '' } = useParams()
  const day = getDay(daySlug)

  if (!day) return <NotFound />

  const index = days.findIndex((item) => item.slug === day.slug)
  const prevDay = days[index - 1]
  const nextDay = days[index + 1]

  return (
    <DocLayout
      eyebrow={`Día 0${day.id} · ${day.date}`}
      title={day.title}
      description={day.objective}
      breadcrumbs={[
        { label: 'Inicio', path: '/' },
        { label: 'Días', path: '/dias' },
        { label: `Día ${day.id}` },
      ]}
      sidebar={<CourseSidebar />}
      meta={
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-faint">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} aria-hidden="true" />
            {day.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 size={13} aria-hidden="true" />
            {day.schedule} · {day.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Target size={13} aria-hidden="true" />
            {day.topics.length} temas
          </span>
        </div>
      }
      prev={
        prevDay
          ? { title: `Día ${prevDay.id}: ${prevDay.shortTitle}`, path: `/dias/${prevDay.slug}`, label: 'Día anterior' }
          : undefined
      }
      next={
        nextDay
          ? { title: `Día ${nextDay.id}: ${nextDay.shortTitle}`, path: `/dias/${nextDay.slug}`, label: 'Día siguiente' }
          : { title: 'Proyecto integrador', path: '/proyecto-integrador', label: 'Siguiente paso' }
      }
    >
      <section className="rounded-lg border border-line bg-surface p-5">
        <p className="eyebrow flex items-center gap-1.5">
          <Target size={12} aria-hidden="true" />
          Al terminar el día podrás
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {day.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2 text-[13px] leading-relaxed text-muted">
              <Check size={14} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Contenidos</p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.02em]">Temas del día</h2>
          </div>
          <span className="text-[11px] text-faint">{day.topics.length} temas</span>
        </div>

        <div className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line">
          {day.topics.map((topic, topicIndex) => (
            <Link
              key={topic.slug}
              to={`/dias/${day.slug}/${topic.slug}`}
              className="group flex items-start gap-4 bg-surface p-4 transition-colors hover:bg-surface-2 sm:p-5"
            >
              <span className="mt-0.5 w-7 shrink-0 font-mono text-xs text-faint">
                {String(topicIndex + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[15px] font-semibold leading-snug text-ink">{topic.title}</h3>
                  <span className="font-mono text-[10px] tracking-wide text-faint uppercase">
                    {topic.duration}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{topic.description}</p>
              </div>
              <ArrowRight
                size={16}
                className="mt-1 shrink-0 text-faint transition-colors group-hover:text-accent"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <p className="eyebrow">Práctica principal</p>
          <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em]">Manos a la obra</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{day.practice}</p>
          <Link
            to={`/dias/${day.slug}/${day.topics[0].slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80"
          >
            Iniciar con «{day.topics[0].navTitle}»
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>

        <div className="card p-5">
          <p className="eyebrow">Entregables</p>
          <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em]">Al cierre del día</h2>
          <ul className="mt-3 space-y-2">
            {day.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </DocLayout>
  )
}
