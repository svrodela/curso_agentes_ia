import { Link } from 'react-router-dom'
import { ArrowRight, Download, FileText, ShieldAlert } from 'lucide-react'
import { projectDocs } from '../data/course'
import { assetUrl } from '../lib/assets'
import { DocLayout } from '../components/course/DocLayout'
import { ProjectSidebar } from '../components/course/CourseSidebar'

const demoDocuments = [
  { file: 'servicio-social.md', title: 'Servicio social' },
  { file: 'residencias-profesionales.md', title: 'Residencias profesionales' },
  { file: 'titulacion.md', title: 'Titulación' },
  { file: 'acreditacion-academica.md', title: 'Acreditación académica' },
]

export function ProjectIndex() {
  return (
    <DocLayout
      eyebrow="Proyecto conductor"
      title="TecBot Académico"
      description="Asistente institucional de información académica. Un caso práctico para aprender a construir software con agentes, conocimiento documental y herramientas externas."
      breadcrumbs={[{ label: 'Inicio', path: '/' }, { label: 'Proyecto conductor' }]}
      sidebar={<ProjectSidebar />}
      sidebarLabel="Documentación del proyecto"
      next={{
        title: 'Descripción del proyecto',
        path: '/proyecto-conductor/descripcion',
        label: 'Comenzar',
      }}
    >
      <div className="rounded-lg border border-line bg-surface p-5">
        <p className="eyebrow">El reto</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Los estudiantes del tecnológico necesitan orientación clara sobre servicio social,
          residencias, titulación y acreditación. La información existe, pero está dispersa en
          documentos y procedimientos. TecBot Académico propone una interfaz conversacional que
          responde con base en documentos, muestra sus fuentes y evita inventar requisitos.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-faint">
          Todos los documentos incluidos en este portal son materiales didácticos de demostración.
          No son normativa oficial del Instituto Tecnológico Superior de Santiago Papasquiaro.
        </p>
      </div>

      <section className="mt-10">
        <p className="eyebrow">Documentación</p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.02em]">
          Del problema a la implementación
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Cinco documentos recorren el proyecto: qué se construye, qué debe hacer, cómo se organiza,
          cómo recupera conocimiento y cómo se conecta con herramientas.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {projectDocs.map((doc, index) => (
            <Link key={doc.slug} to={`/proyecto-conductor/${doc.slug}`} className="group card-interactive flex flex-col p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.1em] text-faint uppercase">
                  {String(index + 1).padStart(2, '0')} · Documento
                </span>
                <ArrowRight
                  size={14}
                  className="text-faint transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-ink">{doc.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">{doc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2">
          <ShieldAlert size={16} className="text-accent" aria-hidden="true" />
          <h2 className="text-lg font-semibold tracking-[-0.02em]">Documentos de demostración</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Cuatro documentos ficticios sirven como corpus para las prácticas de RAG y MCP. Están
          marcados como material didáctico y deben sustituirse por información oficial en un
          despliegue real.
        </p>
        <div className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line">
          {demoDocuments.map((doc) => (
            <a
              key={doc.file}
              href={assetUrl(`tecbot-academico/documentos-demo/${doc.file}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-surface px-4 py-3 transition-colors hover:bg-surface-2"
            >
              <FileText size={15} className="shrink-0 text-faint" aria-hidden="true" />
              <span className="flex-1 text-sm text-muted group-hover:text-ink">{doc.title}</span>
              <span className="font-mono text-[10px] text-faint">.md</span>
              <Download size={13} className="text-faint" aria-hidden="true" />
            </a>
          ))}
        </div>
        <Link
          to="/dias/dia-3/fundamentos-rag"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80"
        >
          Ver cómo se usan en RAG
          <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </section>

      <section className="mt-10 rounded-lg border border-line bg-surface p-5">
        <p className="eyebrow">Materiales del proyecto</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link
            to="/recursos"
            className="flex items-center justify-between gap-3 rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            Plantillas y descargas
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
          <a
            href={assetUrl('tecbot-academico/documentacion/requerimientos.md')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            Documento de requerimientos
            <Download size={13} aria-hidden="true" />
          </a>
        </div>
      </section>
    </DocLayout>
  )
}
