import { useMemo } from 'react'
import type { StandaloneDoc } from '../data/course'
import { getMarkdown } from '../lib/content'
import { extractHeadings } from '../lib/markdown'
import { CourseSidebar } from '../components/course/CourseSidebar'
import { DocLayout } from '../components/course/DocLayout'
import { Markdown } from '../components/course/Markdown'

const nextSteps: Record<string, { title: string; path: string; label: string }> = {
  '/opencode': {
    title: 'Programa general',
    path: '/programa',
    label: 'Ver programa',
  },
  '/programa': {
    title: 'Día 1: De la idea al proyecto de software',
    path: '/dias/dia-1',
    label: 'Comenzar el curso',
  },
  '/proyecto-integrador': {
    title: 'Recursos y documentación',
    path: '/recursos',
    label: 'Preparar la entrega',
  },
  '/recursos': {
    title: 'Acerca del curso',
    path: '/acerca-del-curso',
    label: 'Más información',
  },
}

const prevSteps: Record<string, { title: string; path: string; label: string }> = {
  '/programa': {
    title: 'Guía de OpenCode',
    path: '/opencode',
    label: 'OpenCode',
  },
  '/proyecto-integrador': {
    title: 'TecBot Académico',
    path: '/proyecto-conductor',
    label: 'Proyecto conductor',
  },
  '/recursos': {
    title: 'Del problema a una solución inteligente',
    path: '/proyecto-integrador',
    label: 'Proyecto final',
  },
  '/acerca-del-curso': {
    title: 'Recursos y documentación',
    path: '/recursos',
    label: 'Materiales',
  },
}

export function StandalonePage({ doc }: { doc: StandaloneDoc }) {
  const markdown = useMemo(() => getMarkdown(doc.file), [doc.file])
  const headings = useMemo(() => extractHeadings(markdown), [markdown])

  return (
    <DocLayout
      eyebrow="Curso"
      title={doc.title}
      description={doc.description}
      breadcrumbs={[{ label: 'Inicio', path: '/' }, { label: doc.title }]}
      sidebar={<CourseSidebar />}
      headings={headings}
      prev={prevSteps[doc.path]}
      next={nextSteps[doc.path]}
    >
      <Markdown>{markdown}</Markdown>
    </DocLayout>
  )
}
