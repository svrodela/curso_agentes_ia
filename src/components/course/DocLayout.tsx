import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, List, X } from 'lucide-react'
import type { Heading } from '../../lib/markdown'
import { PageNav, type PageLink } from './PageNav'
import { TableOfContents } from './TableOfContents'

export interface Breadcrumb {
  label: string
  path?: string
}

interface DocLayoutProps {
  eyebrow?: string
  title: string
  description?: string
  meta?: ReactNode
  breadcrumbs?: Breadcrumb[]
  sidebar?: ReactNode
  sidebarLabel?: string
  headings?: Heading[]
  prev?: PageLink
  next?: PageLink
  children: ReactNode
}

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-faint">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {item.path && !last ? (
                <Link to={item.path} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-muted' : ''}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function DocLayout({
  eyebrow,
  title,
  description,
  meta,
  breadcrumbs = [],
  sidebar,
  sidebarLabel = 'Contenido del curso',
  headings = [],
  prev,
  next,
  children,
}: DocLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [drawerOpen])

  return (
    <div className="page-container py-8 lg:py-10">
      <div
        className={
          headings.length > 0
            ? 'grid gap-10 lg:grid-cols-[232px_minmax(0,1fr)] xl:grid-cols-[232px_minmax(0,1fr)_200px]'
            : 'grid gap-10 lg:grid-cols-[232px_minmax(0,1fr)]'
        }
      >
        {sidebar && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto border-r border-line pr-5 pb-6">
              {sidebar}
            </div>
          </aside>
        )}

        <div className="min-w-0">
          {sidebar && (
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="mb-6 flex w-full items-center justify-between rounded-md border border-line bg-surface px-3.5 py-2.5 text-left text-xs font-medium text-muted transition-colors hover:border-line-strong hover:text-ink lg:hidden"
            >
              <span className="flex items-center gap-2">
                <List size={15} aria-hidden="true" />
                {sidebarLabel}
              </span>
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          )}

          {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

          <article>
            <header className="animate-rise border-b border-line pb-7">
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h1 className="mt-2 text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[2.35rem]">
                {title}
              </h1>
              {description && (
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">{description}</p>
              )}
              {meta && <div className="mt-5">{meta}</div>}
            </header>

            {headings.length > 0 && (
              <details className="mt-6 rounded-md border border-line bg-surface px-4 py-3 xl:hidden">
                <summary className="cursor-pointer text-xs font-medium text-muted">
                  En esta página
                </summary>
                <div className="mt-3">
                  <TableOfContents headings={headings} />
                </div>
              </details>
            )}

            <div className="mt-8">{children}</div>
          </article>

          <PageNav prev={prev} next={next} />
        </div>

        {headings.length > 0 && (
          <aside className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>

      {drawerOpen && sidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar contenido del curso"
            className="absolute inset-0 bg-black/75"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(20rem,86vw)] overflow-y-auto border-r border-line bg-surface">
            <div className="sticky top-0 flex h-14 items-center justify-between border-b border-line bg-surface px-4">
              <span className="text-sm font-semibold">{sidebarLabel}</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted hover:text-ink"
                aria-label="Cerrar panel"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="p-4">{sidebar}</div>
          </div>
        </div>
      )}
    </div>
  )
}
