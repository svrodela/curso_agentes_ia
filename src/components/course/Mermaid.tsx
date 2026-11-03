import { useEffect, useState } from 'react'

let mermaidInitialized = false

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const renderId = `mermaid-${Math.random().toString(36).slice(2, 10)}`

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'strict',
            theme: 'base',
            fontFamily: 'Geist Variable, sans-serif',
            themeVariables: {
              background: '#0c0c0f',
              primaryColor: '#18181b',
              primaryTextColor: '#fafafa',
              primaryBorderColor: '#a78bfa',
              lineColor: '#52525b',
              secondaryColor: '#27272a',
              tertiaryColor: '#0c0c0f',
              nodeBorder: '#a78bfa',
              clusterBkg: '#0c0c0f',
              clusterBorder: '#27272a',
              edgeLabelBackground: '#09090b',
              fontSize: '14px',
            },
            flowchart: {
              curve: 'basis',
              htmlLabels: true,
              padding: 12,
            },
          })
          mermaidInitialized = true
        }

        const result = await mermaid.render(renderId, chart.trim())
        if (!cancelled) {
          setSvg(result.svg)
          setError('')
        }
      } catch (renderError) {
        if (!cancelled) {
          setError(renderError instanceof Error ? renderError.message : 'Error desconocido')
        }
      }
    }

    render()

    return () => {
      cancelled = true
    }
  }, [chart])

  if (error) {
    return (
      <div className="mermaid-error">
        <p className="font-medium">No se pudo renderizar el diagrama Mermaid.</p>
        <pre className="mt-2 overflow-x-auto font-mono text-xs whitespace-pre-wrap">{chart}</pre>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="mermaid-shell flex min-h-40 items-center justify-center">
        <span className="font-mono text-xs text-faint">Generando diagrama…</span>
      </div>
    )
  }

  return <div className="mermaid-shell" dangerouslySetInnerHTML={{ __html: svg }} />
}
