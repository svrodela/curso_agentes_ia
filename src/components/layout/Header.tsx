import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { course, days } from '../../data/course'
import { SearchDialog } from '../course/SearchDialog'

const primaryNav = [
  { label: 'Programa', path: '/programa' },
  { label: 'Días', path: '/dias' },
  { label: 'Proyecto conductor', path: '/proyecto-conductor' },
  { label: 'Proyecto integrador', path: '/proyecto-integrador' },
  { label: 'Recursos', path: '/recursos' },
]

function useIsActive() {
  const { pathname } = useLocation()
  return (path: string) => pathname === path || pathname.startsWith(`${path}/`)
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  const isActive = useIsActive()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-canvas">
        <div className="page-container flex h-16 items-center gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-md">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-md border border-line bg-surface-3 font-mono text-xs font-semibold text-accent"
            >
              &gt;_
            </span>
            <span aria-hidden="true" className="hidden sm:block">
              <span className="block text-sm font-semibold leading-tight tracking-[-0.01em]">
                Agentes de IA
              </span>
              <span className="mt-0.5 block text-[10px] leading-none tracking-[0.1em] text-faint uppercase">
                {course.institutionShort}
              </span>
            </span>
            <span className="sr-only">{`${course.title} — ${course.event} — ${course.institutionShort} — Inicio`}</span>
          </Link>

          <nav aria-label="Navegación principal" className="hidden h-16 items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={`flex h-16 items-center border-b-2 px-3 text-[13px] font-medium transition-colors ${
                  isActive(item.path)
                    ? 'border-accent text-ink'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-2.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <Search size={14} aria-hidden="true" />
              <span aria-hidden="true" className="hidden md:inline">
                Buscar
              </span>
              <span aria-hidden="true" className="kbd hidden md:inline-flex">
                Ctrl K
              </span>
              <span className="sr-only">Buscar en el curso (Ctrl K)</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-ink lg:hidden"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-navigation">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto border-l border-line bg-surface">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <span className="text-sm font-semibold">Navegación</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted hover:text-ink"
                aria-label="Cerrar menú"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Navegación móvil" className="p-3">
              <Link
                to="/"
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface-3"
              >
                Inicio
              </Link>
              {primaryNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`block rounded-md px-3 py-2.5 text-sm hover:bg-surface-3 ${
                    isActive(item.path) ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 border-t border-line pt-4">
                <p className="eyebrow px-3 pb-2">Días</p>
                {days.map((day) => (
                  <Link
                    key={day.slug}
                    to={`/dias/${day.slug}`}
                    className="flex items-baseline gap-3 rounded-md px-3 py-2.5 hover:bg-surface-3"
                  >
                    <span className="font-mono text-[10px] text-faint">0{day.id}</span>
                    <span className="text-sm leading-snug text-muted">{day.shortTitle}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 border-t border-line pt-4">
                <Link
                  to="/acerca-del-curso"
                  className="block rounded-md px-3 py-2.5 text-sm text-muted hover:bg-surface-3"
                >
                  Acerca del curso
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
