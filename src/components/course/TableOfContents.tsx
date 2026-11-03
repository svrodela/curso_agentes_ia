import { useEffect, useState } from 'react'
import type { Heading } from '../../lib/markdown'

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    if (headings.length === 0) return

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-96px 0px -68% 0px', threshold: [0, 1] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="En esta página">
      <p className="eyebrow">En esta página</p>
      <ul className="mt-3 border-l border-line">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={activeId === heading.id ? 'location' : undefined}
              className={`-ml-px block border-l py-1.5 text-[12px] leading-snug transition-colors ${
                heading.level === 3 ? 'pl-5' : 'pl-3'
              } ${
                activeId === heading.id
                  ? 'border-accent text-ink'
                  : 'border-transparent text-muted hover:border-line-strong hover:text-ink'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
