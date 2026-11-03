import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, FolderGit2, Route } from 'lucide-react'
import { days, projectDocs } from '../../data/course'

export function CourseSidebar() {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="eyebrow">Curso</p>
        <Link
          to="/dias"
          className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
        >
          <Route size={15} className="text-accent" aria-hidden="true" />
          Ruta de aprendizaje
        </Link>
      </div>

      <nav aria-label="Contenido del curso" className="space-y-5">
        {days.map((day) => {
          const dayPath = `/dias/${day.slug}`
          const dayActive = pathname === dayPath

          return (
            <div key={day.slug}>
              <Link
                to={dayPath}
                aria-current={dayActive ? 'page' : undefined}
                className="group flex items-baseline gap-2 rounded-md px-1 py-1 transition-colors hover:text-ink"
              >
                <span className="font-mono text-[10px] tracking-wide text-faint">0{day.id}</span>
                <span
                  className={`text-xs font-semibold leading-snug ${
                    dayActive ? 'text-accent' : 'text-muted group-hover:text-ink'
                  }`}
                >
                  {day.shortTitle}
                </span>
              </Link>
              <ul className="mt-1 space-y-0.5 border-l border-line">
                {day.topics.map((topic) => {
                  const topicPath = `${dayPath}/${topic.slug}`
                  const topicActive = pathname === topicPath
                  return (
                    <li key={topic.slug}>
                      <Link
                        to={topicPath}
                        aria-current={topicActive ? 'page' : undefined}
                        className="sidebar-link -ml-px"
                      >
                        {topic.navTitle}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>

      <div className="border-t border-line pt-4">
        <p className="eyebrow">Proyecto</p>
        <ul className="mt-2 space-y-0.5">
          <li>
            <Link
              to="/proyecto-conductor"
              aria-current={pathname === '/proyecto-conductor' ? 'page' : undefined}
              className="sidebar-link -ml-px"
            >
              TecBot Académico
            </Link>
          </li>
          <li>
            <Link
              to="/proyecto-integrador"
              className="sidebar-link -ml-px"
            >
              Proyecto integrador
            </Link>
          </li>
          <li>
            <Link to="/recursos" className="sidebar-link -ml-px">
              Recursos y plantillas
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function ProjectSidebar() {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="eyebrow">Proyecto conductor</p>
        <Link
          to="/proyecto-conductor"
          aria-current={pathname === '/proyecto-conductor' ? 'page' : undefined}
          className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
        >
          <FolderGit2 size={15} className="text-accent" aria-hidden="true" />
          TecBot Académico
        </Link>
      </div>

      <nav aria-label="Documentación del proyecto" className="border-l border-line">
        {projectDocs.map((doc) => {
          const path = `/proyecto-conductor/${doc.slug}`
          return (
            <Link
              key={doc.slug}
              to={path}
              aria-current={pathname === path ? 'page' : undefined}
              className="sidebar-link -ml-px"
            >
              {doc.navTitle}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-line pt-4">
        <p className="eyebrow">Materiales</p>
        <ul className="mt-2 space-y-0.5">
          <li>
            <Link to="/recursos" className="sidebar-link -ml-px">
              Recursos y descargas
            </Link>
          </li>
          <li>
            <Link to="/dias/dia-3/fundamentos-rag" className="sidebar-link -ml-px">
              Día de RAG
            </Link>
          </li>
          <li>
            <Link to="/dias/dia-3/filesystem" className="sidebar-link -ml-px">
              Día de MCP
            </Link>
          </li>
        </ul>
      </div>

      <div className="border-t border-line pt-4">
        <Link
          to="/proyecto-integrador"
          className="flex items-center justify-between gap-2 rounded-md border border-line bg-surface px-3 py-2.5 text-xs font-medium text-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          Ir al proyecto integrador
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
