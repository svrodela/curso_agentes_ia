import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Check, Copy } from 'lucide-react'

function nodeToText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeToText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeToText(node.props.children)
  return ''
}

export function extractCodeLanguage(children: ReactNode): string | undefined {
  const first = Children.toArray(children)[0]
  if (!isValidElement<{ className?: string }>(first)) return undefined
  const match = /language-([\w-]+)/.exec(first.props.className ?? '')
  return match?.[1]
}

export function isMermaid(children: ReactNode): boolean {
  const first = Children.toArray(children)[0]
  if (!isValidElement<{ className?: string }>(first)) return false
  return (first.props.className ?? '').includes('language-mermaid')
}

interface CodeBlockProps {
  children: ReactNode
  language?: string
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)
  const text = nodeToText(children).replace(/\n$/, '')
  const label = language && language !== 'text' ? language : 'código'

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    setCopied(true)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="code-shell">
      <div className="code-shell-header">
        <span className="font-mono text-[10px] font-medium tracking-[0.12em] text-faint uppercase">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded px-1.5 py-1 text-[11px] text-muted transition-colors hover:bg-surface-3 hover:text-ink"
          aria-label={copied ? 'Código copiado' : 'Copiar código'}
        >
          {copied ? (
            <Check size={13} className="text-success" aria-hidden="true" />
          ) : (
            <Copy size={13} aria-hidden="true" />
          )}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre>{children}</pre>
    </div>
  )
}
