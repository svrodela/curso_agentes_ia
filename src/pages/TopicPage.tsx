import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { CalendarDays, Clock3 } from 'lucide-react'
import { allTopics, getDay, getTopic } from '../data/course'
import { getMarkdown } from '../lib/content'
import { extractHeadings } from '../lib/markdown'
import { CourseSidebar } from '../components/course/CourseSidebar'
import { DocLayout } from '../components/course/DocLayout'
import { Markdown } from '../components/course/Markdown'
import { NotFound } from './NotFound'

export function TopicPage() {
  const { daySlug = '', topicSlug = '' } = useParams()
  const day = getDay(daySlug)
  const topic = getTopic(daySlug, topicSlug)

  const markdown = useMemo(() => (topic ? getMarkdown(topic.file) : ''), [topic])
  const headings = useMemo(() => extractHeadings(markdown), [markdown])

  if (!day || !topic) return <NotFound />

  const index = allTopics.findIndex((item) => item.daySlug === daySlug && item.slug === topicSlug)
  const prevTopic = allTopics[index - 1]
  const nextTopic = allTopics[index + 1]

  return (
    <DocLayout
      eyebrow={`Día 0${day.id} · Tema ${String(index + 1).padStart(2, '0')}`}
      title={topic.title}
      description={topic.description}
      breadcrumbs={[
        { label: 'Inicio', path: '/' },
        { label: 'Días', path: '/dias' },
        { label: `Día ${day.id}`, path: `/dias/${day.slug}` },
        { label: topic.navTitle },
      ]}
      sidebar={<CourseSidebar />}
      headings={headings}
      meta={
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-faint">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} aria-hidden="true" />
            {day.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 size={13} aria-hidden="true" />
            Duración estimada: {topic.duration}
          </span>
        </div>
      }
      prev={
        prevTopic
          ? {
              title: prevTopic.title,
              path: `/dias/${prevTopic.daySlug}/${prevTopic.slug}`,
              label: `Día ${prevTopic.dayId} · Anterior`,
            }
          : { title: `Día ${day.id}: ${day.shortTitle}`, path: `/dias/${day.slug}`, label: 'Día' }
      }
      next={
        nextTopic
          ? {
              title: nextTopic.title,
              path: `/dias/${nextTopic.daySlug}/${nextTopic.slug}`,
              label: `Día ${nextTopic.dayId} · Siguiente`,
            }
          : { title: 'TecBot Académico', path: '/proyecto-conductor', label: 'Siguiente paso' }
      }
    >
      <Markdown>{markdown}</Markdown>
    </DocLayout>
  )
}
