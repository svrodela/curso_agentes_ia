import { Link } from 'react-router-dom'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { CodeBlock, extractCodeLanguage, isMermaid } from './CodeBlock'
import { Mermaid } from './Mermaid'

const base = import.meta.env.BASE_URL

function resolveStaticPath(href: string): string | null {
  if (href.startsWith('/descargas/') || href.startsWith('/tecbot-academico/')) {
    return `${base}${href.replace(/^\//, '')}`
  }
  return null
}

const components: Components = {
  a({ href, children }) {
    const url = href ?? ''
    const staticPath = resolveStaticPath(url)

    if (staticPath) {
      return (
        <a href={staticPath} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }

    if (url.startsWith('/')) {
      return <Link to={url}>{children}</Link>
    }

    return <a href={url}>{children}</a>
  },
  pre({ children }) {
    if (isMermaid(children)) {
      return <>{children}</>
    }
    return <CodeBlock language={extractCodeLanguage(children)}>{children}</CodeBlock>
  },
  code({ className, children, ...props }) {
    if (className?.includes('language-mermaid')) {
      return <Mermaid chart={String(children)} />
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  // El título principal ya lo renderiza DocLayout. Evitamos un segundo <h1>
  // cuando el archivo Markdown empieza con un encabezado de nivel 1.
  const content = children.replace(/^\s*#\s+[^\r\n]*(?:\r?\n)+/, '')

  return (
    <div className={`prose-course ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
