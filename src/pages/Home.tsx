import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarDays,
  Check,
  Clock3,
  GitBranch,
  GraduationCap,
  Layers3,
  MapPin,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react'
import { course, days } from '../data/course'

const capabilities = [
  { title: 'Servicio social', detail: 'Requisitos, registro, reportes y liberación.' },
  { title: 'Residencias profesionales', detail: 'Inicio, proyecto, documentos y conclusión.' },
  { title: 'Titulación', detail: 'Modalidades, requisitos, etapas y formatos.' },
  { title: 'Acreditación académica', detail: 'Asignaturas, créditos y regularización.' },
  { title: 'Trámites escolares', detail: 'Calendario, constancias y solicitudes.' },
]

export function Home() {
  return (
    <>
      <section className="border-b border-line">
        <div className="page-container grid gap-12 py-14 lg:grid-cols-[1.25fr_0.85fr] lg:items-start lg:py-20">
          <div className="animate-rise">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.1em] text-accent uppercase">
                Curso taller · {course.duration}
              </span>
              <span className="text-xs text-faint">{course.dates}</span>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.5rem]">
              Creación de software con{' '}
              <span className="text-accent">Agentes de IA</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Un recorrido práctico de cuatro días para transformar un problema real en una
              aplicación funcional: definición, desarrollo guiado por agentes, recuperación de
              conocimiento y orquestación.
            </p>

            <p className="mt-3 text-sm font-medium text-accent">
              En el marco del {course.event}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/dias/dia-1" className="btn btn-primary">
                Comenzar el curso
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link to="/programa" className="btn btn-secondary">
                Ver programa
              </Link>
            </div>

            <dl className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 sm:grid-cols-4">
              {[
                { icon: CalendarDays, label: '4 días', value: '9–12 nov' },
                { icon: Clock3, label: course.duration, value: 'Lun 10–13 h · Mar–Jue 8–12 h' },
                { icon: MapPin, label: 'Modalidad', value: 'Presencial' },
                { icon: GraduationCap, label: 'Nivel', value: 'Intermedio' },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-faint uppercase">
                    <item.icon size={12} aria-hidden="true" />
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="card animate-rise overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-5 py-3">
              <span className="font-mono text-[10px] tracking-[0.12em] text-faint uppercase">
                Proyecto conductor
              </span>
              <span className="inline-flex items-center gap-1 rounded border border-success/30 bg-success/10 px-2 py-0.5 font-mono text-[10px] text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                demostración
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line bg-surface-3 text-accent">
                  <Bot size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold tracking-[-0.02em]">TecBot Académico</h2>
                  <p className="mt-0.5 text-xs text-muted">
                    Asistente institucional de información académica
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                Un asistente que responde dudas sobre procesos académicos usando documentos
                institucionales de ejemplo, cita sus fuentes y reconoce cuando no tiene información.
              </p>

              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {capabilities.slice(0, 4).map((item) => (
                  <li key={item.title} className="flex items-center gap-2 text-[13px] text-muted">
                    <Check size={13} className="shrink-0 text-success" aria-hidden="true" />
                    {item.title}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                {['OpenCode', 'FastAPI', 'ChromaDB', 'MCP', 'GitHub'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-line bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-faint"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="page-container py-14 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Ruta de aprendizaje</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
              Cuatro días, un proyecto
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Cada día agrega una capa nueva al mismo asistente. Avanza en orden o consulta el
              tema que necesites.
            </p>
          </div>
          <Link
            to="/dias"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            Ver todos los días
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {days.map((day) => (
            <Link
              key={day.slug}
              to={`/dias/${day.slug}`}
              className="group card-interactive flex flex-col p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                  Día 0{day.id}
                </span>
                <span className="text-[11px] text-faint">{day.date}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.02em] text-ink">
                {day.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{day.objective}</p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5">
                <span className="flex items-center gap-1.5 text-[11px] text-faint">
                  <BookOpen size={13} aria-hidden="true" />
                  {day.topics.length} temas · {day.duration}
                </span>
                <ArrowRight
                  size={15}
                  className="text-faint transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="page-container grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <div>
            <p className="eyebrow">Qué vas a construir</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
              De la idea a una solución inteligente
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              El hilo conductor del curso es TecBot Académico: un asistente para resolver dudas de
              servicio social, residencias, titulación y acreditación. Lo construyes por partes,
              igual que un equipo de desarrollo real.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/proyecto-conductor" className="btn btn-secondary">
                Conocer el proyecto
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/proyecto-integrador" className="btn btn-ghost">
                Ver proyecto final
              </Link>
            </div>
          </div>

          <ol className="divide-y divide-line overflow-hidden rounded-lg border border-line">
            {capabilities.map((item, index) => (
              <li key={item.title} className="flex items-start gap-4 bg-canvas px-5 py-3.5">
                <span className="mt-0.5 font-mono text-[11px] text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-container py-14 lg:py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Cómo se aprende</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            Práctica guiada, no solo teoría
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Cada tema combina explicación breve, comandos, ejemplos y una actividad verificable.
            Estos son los tres pilares técnicos del curso.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Terminal,
              title: 'Agentes en acción',
              text: 'Planifica, construye y revisa con OpenCode. Configura contexto, subagentes y permisos.',
              path: '/dias/dia-2/ciclo-agentes',
              link: 'Ver ciclo de desarrollo',
            },
            {
              icon: Layers3,
              title: 'Conocimiento con RAG',
              text: 'Fragmenta documentos, genera embeddings y recupera evidencia antes de responder.',
              path: '/dias/dia-3/fundamentos-rag',
              link: 'Entender RAG',
            },
            {
              icon: Wrench,
              title: 'Herramientas con MCP',
              text: 'Conecta recursos externos con permisos mínimos y acceso restringido a archivos.',
              path: '/dias/dia-3/fundamentos-mcp',
              link: 'Explorar MCP',
            },
          ].map((item) => (
            <div key={item.title} className="card flex flex-col p-5">
              <span className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface-3 text-accent">
                <item.icon size={17} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{item.text}</p>
              <Link
                to={item.path}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80"
              >
                {item.link}
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="page-container pb-16">
        <div className="card flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Empieza aquí</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
              Define el problema antes de escribir código
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              El primer día convierte una necesidad real en requerimientos, historias de
              usuario y una arquitectura inicial lista para construirse.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-faint">
              <span className="flex items-center gap-1.5">
                <GitBranch size={13} aria-hidden="true" />
                Repositorio desde el día 1
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} aria-hidden="true" />
                Agentes desde el día 1
              </span>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/dias/dia-1" className="btn btn-primary">
              Ir al Día 1
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link to="/programa" className="btn btn-secondary">
              Consultar horario
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
