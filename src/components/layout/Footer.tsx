import { Link } from 'react-router-dom'
import { course, days, projectDocs, standaloneDocs } from '../../data/course'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="page-container py-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-surface-3 font-mono text-xs font-semibold text-accent">
                &gt;_
              </span>
              <span className="text-sm font-semibold">Creación de software con Agentes de IA</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Portal de contenidos, tutoriales y recursos del curso taller de {course.duration}, en el
              marco del {course.event}.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-faint">
              {course.institution}
              <br />
              {course.dates} · {course.schedule}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-wide text-ink uppercase">Curso</h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: 'Programa', path: '/programa' },
                { label: 'Días', path: '/dias' },
                { label: 'Proyecto integrador', path: '/proyecto-integrador' },
                { label: 'Recursos', path: '/recursos' },
                { label: 'Acerca del curso', path: '/acerca-del-curso' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-wide text-ink uppercase">Días</h2>
            <ul className="mt-3 space-y-2">
              {days.map((day) => (
                <li key={day.slug}>
                  <Link
                    to={`/dias/${day.slug}`}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    Día {day.id} · {day.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-wide text-ink uppercase">Proyecto</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  to="/proyecto-conductor"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  TecBot Académico
                </Link>
              </li>
              {projectDocs.slice(0, 3).map((doc) => (
                <li key={doc.slug}>
                  <Link
                    to={`/proyecto-conductor/${doc.slug}`}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {doc.navTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={standaloneDocs[2].path}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  Plantillas y descargas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            Material didáctico · {course.event} · {course.institutionShort}
          </p>
          <p>Sitio estático preparado para GitHub Pages</p>
        </div>
      </div>
    </footer>
  )
}
