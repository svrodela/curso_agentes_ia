import { getMarkdown } from '../lib/content'
import { stripMarkdown } from '../lib/markdown'
import {
  days,
  projectDocs,
  standaloneDocs,
  type CourseDay,
  type ProjectDoc,
  type StandaloneDoc,
  type Topic,
} from './course'

export interface SearchEntry {
  path: string
  title: string
  section: string
  description: string
  body: string
}

function topicEntry(day: CourseDay, topic: Topic): SearchEntry {
  return {
    path: `/dias/${day.slug}/${topic.slug}`,
    title: topic.title,
    section: `Día ${day.id} · ${day.shortTitle}`,
    description: topic.description,
    body: stripMarkdown(getMarkdown(topic.file)),
  }
}

function projectEntry(doc: ProjectDoc): SearchEntry {
  return {
    path: `/proyecto-conductor/${doc.slug}`,
    title: doc.title,
    section: 'Proyecto conductor',
    description: doc.description,
    body: stripMarkdown(getMarkdown(doc.file)),
  }
}

function standaloneEntry(doc: StandaloneDoc): SearchEntry {
  return {
    path: doc.path,
    title: doc.title,
    section: 'Curso',
    description: doc.description,
    body: stripMarkdown(getMarkdown(doc.file)),
  }
}

const dayEntries: SearchEntry[] = days.map((day) => ({
  path: `/dias/${day.slug}`,
  title: `Día ${day.id}: ${day.title}`,
  section: 'Días',
  description: day.objective,
  body: stripMarkdown(
    [day.objective, day.practice, ...day.outcomes, ...day.deliverables, ...day.topics.map((t) => t.title)].join(
      ' ',
    ),
  ),
}))

export const searchEntries: SearchEntry[] = [
  ...dayEntries,
  ...days.flatMap((day) => day.topics.map((topic) => topicEntry(day, topic))),
  ...projectDocs.map(projectEntry),
  ...standaloneDocs.map(standaloneEntry),
]

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export interface SearchResult extends SearchEntry {
  score: number
  excerpt: string
}

function makeExcerpt(body: string, terms: string[]): string {
  const normalizedBody = normalize(body)
  let index = -1
  for (const term of terms) {
    index = normalizedBody.indexOf(term)
    if (index >= 0) break
  }
  if (index < 0) return body.slice(0, 150) + (body.length > 150 ? '…' : '')
  const start = Math.max(0, index - 60)
  const end = Math.min(body.length, index + 150)
  return `${start > 0 ? '…' : ''}${body.slice(start, end).trim()}${end < body.length ? '…' : ''}`
}

export function searchContent(query: string, limit = 8): SearchResult[] {
  const cleaned = normalize(query.trim())
  if (cleaned.length < 2) return []

  const terms = cleaned.split(/\s+/).filter(Boolean)
  const results: SearchResult[] = []

  for (const entry of searchEntries) {
    const title = normalize(entry.title)
    const description = normalize(entry.description)
    const body = normalize(entry.body)

    let score = 0
    for (const term of terms) {
      if (title.includes(term)) score += 12
      if (title.startsWith(term)) score += 6
      if (description.includes(term)) score += 5
      if (body.includes(term)) score += 2
    }

    if (score === 0) continue
    if (!terms.every((term) => title.includes(term) || description.includes(term) || body.includes(term))) {
      continue
    }

    results.push({
      ...entry,
      score,
      excerpt: makeExcerpt(entry.body, terms),
    })
  }

  return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'es')).slice(0, limit)
}

export const quickLinks = [
  { path: '/dias/dia-1/introduccion-agentes', title: 'Introducción al desarrollo agéntico' },
  { path: '/dias/dia-2/agents-md', title: 'AGENTS.md' },
  { path: '/dias/dia-3/fundamentos-rag', title: 'Fundamentos de RAG' },
  { path: '/proyecto-conductor/arquitectura', title: 'Arquitectura de TecBot Académico' },
  { path: '/proyecto-integrador', title: 'Proyecto integrador y rúbrica' },
  { path: '/recursos', title: 'Recursos y plantillas' },
]
