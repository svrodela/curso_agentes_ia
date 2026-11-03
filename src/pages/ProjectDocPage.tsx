import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectDoc, projectDocs } from '../data/course'
import { getMarkdown } from '../lib/content'
import { extractHeadings } from '../lib/markdown'
import { DocLayout } from '../components/course/DocLayout'
import { Markdown } from '../components/course/Markdown'
import { ProjectSidebar } from '../components/course/CourseSidebar'
import { NotFound } from './NotFound'

export function ProjectDocPage() {
  const { docSlug = '' } = useParams()
  const doc = getProjectDoc(docSlug)

  const markdown = useMemo(() => (doc ? getMarkdown(doc.file) : ''), [doc])
  const headings = useMemo(() => extractHeadings(markdown), [markdown])

  if (!doc) return <NotFound />

  const index = projectDocs.findIndex((item) => item.slug === doc.slug)
  const prev = projectDocs[index - 1]
  const next = projectDocs[index + 1]

  return (
    <DocLayout
      eyebrow="Proyecto conductor"
      title={doc.title}
      description={doc.description}
      breadcrumbs={[
        { label: 'Inicio', path: '/' },
        { label: 'Proyecto conductor', path: '/proyecto-conductor' },
        { label: doc.navTitle },
      ]}
      sidebar={<ProjectSidebar />}
      sidebarLabel="Documentación del proyecto"
      headings={headings}
      prev={
        prev
          ? { title: prev.title, path: `/proyecto-conductor/${prev.slug}`, label: 'Documento anterior' }
          : { title: 'TecBot Académico', path: '/proyecto-conductor', label: 'Proyecto' }
      }
      next={
        next
          ? { title: next.title, path: `/proyecto-conductor/${next.slug}`, label: 'Siguiente documento' }
          : { title: 'Del problema a una solución inteligente', path: '/proyecto-integrador', label: 'Siguiente paso' }
      }
    >
      <Markdown>{markdown}</Markdown>
    </DocLayout>
  )
}
