const files = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const normalized = new Map<string, string>(
  Object.entries(files).map(([path, content]) => [path.replace('../content/', ''), content]),
)

export function getMarkdown(file: string): string {
  const content = normalized.get(file)
  if (!content) {
    throw new Error(`No se encontró el contenido Markdown: ${file}`)
  }
  return content
}
