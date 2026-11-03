import GithubSlugger from 'github-slugger'
import { getMarkdown } from './content'

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

function cleanHeading(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger()
  const headings: Heading[] = []
  let inFence = false

  for (const line of markdown.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!match) continue

    const text = cleanHeading(match[2])
    const level = match[1].length as 2 | 3
    headings.push({ id: slugger.slug(text), text, level })
  }

  return headings
}

export function headingsFor(file: string): Heading[] {
  return extractHeadings(getMarkdown(file))
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/[*_>|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
