export const course = {
  title: 'Creación de software con Agentes de IA',
  institution: 'Instituto Tecnológico Superior de Santiago Papasquiaro',
  institutionShort: 'ITS Santiago Papasquiaro',
  event: 'Congreso Ciencias Revueltas 2026',
  dates: '9 al 12 de noviembre de 2026',
  schedule: 'Lunes 10:00–13:00 · Martes a jueves 08:00–12:00',
  duration: '15 horas',
  modality: 'Presencial · Taller práctico',
  repository: 'curso_agentes_ia',
  edition: 'Edición 2026',
} as const

export interface Topic {
  slug: string
  title: string
  navTitle: string
  description: string
  duration: string
  file: string
}

export interface CourseDay {
  id: number
  slug: string
  title: string
  shortTitle: string
  date: string
  schedule: string
  duration: string
  objective: string
  practice: string
  outcomes: string[]
  deliverables: string[]
  topics: Topic[]
}

export const days: CourseDay[] = [
  {
    id: 1,
    slug: 'dia-1',
    title: 'De la idea al proyecto de software',
    shortTitle: 'Fundamentos y definición',
    date: 'Lunes 9 de noviembre',
    schedule: '10:00 a 13:00',
    duration: '3 horas',
    objective:
      'Comprender el desarrollo de software mediante agentes de IA, identificar un problema y transformarlo en una definición inicial de proyecto.',
    practice:
      'Definir TecBot Académico, documentar sus requerimientos y crear la estructura inicial del repositorio.',
    outcomes: [
      'Distinguir un chatbot tradicional de un agente de desarrollo.',
      'Convertir una necesidad en requerimientos, historias y criterios de aceptación.',
      'Instalar y configurar OpenCode para un primer flujo de trabajo.',
      'Publicar la primera versión del proyecto en GitHub.',
    ],
    deliverables: [
      'Documento de requerimientos.',
      'Historias de usuario con criterios de aceptación.',
      'Arquitectura inicial.',
      'Repositorio en GitHub.',
      'Primera versión del proyecto.',
    ],
    topics: [
      {
        slug: 'introduccion-agentes',
        title: 'Introducción al desarrollo agéntico',
        navTitle: 'Desarrollo agéntico',
        description:
          'Qué es un agente de IA, en qué se diferencia de un chatbot y cómo cambia la forma de construir software.',
        duration: '45 min',
        file: 'dias/dia-1/introduccion-agentes.md',
      },
      {
        slug: 'ingenieria-requerimientos',
        title: 'De la idea a los requerimientos',
        navTitle: 'Ingeniería de requerimientos',
        description:
          'Identifica el problema, define usuarios, requerimientos, historias de usuario y criterios de aceptación.',
        duration: '50 min',
        file: 'dias/dia-1/ingenieria-requerimientos.md',
      },
      {
        slug: 'opencode',
        title: 'Primeros pasos con OpenCode',
        navTitle: 'OpenCode en práctica',
        description:
          'Instala OpenCode, entiende sus modos Plan y Build y realiza tu primera sesión de trabajo guiada.',
        duration: '50 min',
        file: 'dias/dia-1/opencode.md',
      },
      {
        slug: 'git-github',
        title: 'Git, GitHub y el repositorio del proyecto',
        navTitle: 'Git y GitHub',
        description:
          'Inicializa el repositorio, registra cambios, conecta con GitHub y publica la primera versión del proyecto.',
        duration: '35 min',
        file: 'dias/dia-1/git-github.md',
      },
    ],
  },
  {
    id: 2,
    slug: 'dia-2',
    title: 'Construcción de software con agentes y subagentes',
    shortTitle: 'Construcción y delegación',
    date: 'Martes 10 de noviembre',
    schedule: '08:00 a 12:00',
    duration: '4 horas',
    objective:
      'Desarrollar funcionalidades mediante agentes de IA, utilizando contexto, planificación, delegación de tareas y pruebas.',
    practice:
      'Construir la primera versión funcional de TecBot Académico y configurar un equipo de subagentes con responsabilidades diferenciadas.',
    outcomes: [
      'Aplicar el ciclo Plan → Build → Revisar → Probar.',
      'Escribir un AGENTS.md útil y mantenible.',
      'Configurar subagentes de arquitectura, desarrollo y pruebas.',
      'Validar funcionalidades con pruebas automatizadas y manuales.',
    ],
    deliverables: [
      'Aplicación con funcionalidades iniciales.',
      'Archivo AGENTS.md.',
      'Al menos dos subagentes configurados y probados.',
      'Evidencia de pruebas de funcionalidades.',
    ],
    topics: [
      {
        slug: 'ciclo-agentes',
        title: 'El ciclo de desarrollo agéntico',
        navTitle: 'Ciclo de desarrollo',
        description:
          'Planificar, construir, revisar y probar: un método repetible para trabajar con agentes sin perder el control.',
        duration: '45 min',
        file: 'dias/dia-2/ciclo-agentes.md',
      },
      {
        slug: 'agents-md',
        title: 'AGENTS.md: el contexto del proyecto',
        navTitle: 'AGENTS.md',
        description:
          'Documenta reglas, arquitectura, comandos y convenciones para que el agente trabaje con el contexto correcto.',
        duration: '55 min',
        file: 'dias/dia-2/agents-md.md',
      },
      {
        slug: 'subagentes',
        title: 'Subagentes: un equipo dentro de OpenCode',
        navTitle: 'Subagentes',
        description:
          'Diseña roles especializados, define permisos y delega tareas de arquitectura, desarrollo y pruebas.',
        duration: '60 min',
        file: 'dias/dia-2/subagentes.md',
      },
      {
        slug: 'pruebas',
        title: 'Pruebas y validación de funcionalidades',
        navTitle: 'Pruebas y validación',
        description:
          'Convierte criterios de aceptación en casos de prueba y valida la aplicación antes de integrar cambios.',
        duration: '60 min',
        file: 'dias/dia-2/pruebas.md',
      },
    ],
  },
  {
    id: 3,
    slug: 'dia-3',
    title: 'RAG y Model Context Protocol (MCP)',
    shortTitle: 'Conocimiento y herramientas',
    date: 'Miércoles 11 de noviembre',
    schedule: '08:00 a 12:00',
    duration: '4 horas',
    objective:
      'Comprender cómo los agentes pueden consultar conocimiento externo e interactuar con herramientas y recursos.',
    practice:
      'Incorporar documentos académicos de demostración a una base vectorial y conectar TecBot Académico con un servidor MCP Filesystem restringido.',
    outcomes: [
      'Explicar el flujo completo de recuperación aumentada.',
      'Fragmentar documentos y generar embeddings almacenados en ChromaDB.',
      'Recuperar fragmentos relevantes y generar respuestas fundamentadas.',
      'Configurar un servidor MCP con permisos de solo lectura.',
    ],
    deliverables: [
      'Consulta documental funcional.',
      'Base vectorial de demostración.',
      'Conexión MCP funcional.',
      'Ejemplo de interacción con documentos institucionales de ejemplo.',
    ],
    topics: [
      {
        slug: 'fundamentos-rag',
        title: 'Fundamentos de RAG',
        navTitle: 'Fundamentos de RAG',
        description:
          'Limitaciones del modelo, arquitectura de recuperación, fragmentación, embeddings y búsqueda semántica.',
        duration: '60 min',
        file: 'dias/dia-3/fundamentos-rag.md',
      },
      {
        slug: 'chromadb',
        title: 'ChromaDB y búsqueda semántica',
        navTitle: 'ChromaDB',
        description:
          'Crea una colección, indexa documentos de ejemplo, consulta por similitud y conecta el resultado con el modelo.',
        duration: '60 min',
        file: 'dias/dia-3/chromadb.md',
      },
      {
        slug: 'fundamentos-mcp',
        title: 'Fundamentos de Model Context Protocol',
        navTitle: 'Fundamentos de MCP',
        description:
          'Host, cliente y servidor; tools, resources y prompts; permisos y límites de confianza.',
        duration: '45 min',
        file: 'dias/dia-3/fundamentos-mcp.md',
      },
      {
        slug: 'filesystem',
        title: 'MCP Filesystem con acceso restringido',
        navTitle: 'MCP Filesystem',
        description:
          'Conecta un servidor de archivos a OpenCode y limita su alcance a la carpeta de documentos académicos.',
        duration: '60 min',
        file: 'dias/dia-3/filesystem.md',
      },
    ],
  },
  {
    id: 4,
    slug: 'dia-4',
    title: 'Orquestación y proyecto integrador',
    shortTitle: 'Integración y demostración',
    date: 'Jueves 12 de noviembre',
    schedule: '08:00 a 12:00',
    duration: '4 horas',
    objective:
      'Integrar los conocimientos del curso para desarrollar y presentar una solución de software mediante agentes de IA.',
    practice:
      'Integrar las piezas de TecBot Académico, ejecutar la validación de extremo a extremo y presentar el proyecto integrador del equipo.',
    outcomes: [
      'Coordinar agentes y subagentes con tareas, dependencias y puntos de revisión.',
      'Integrar frontend, API, RAG y herramientas MCP en un flujo demostrable.',
      'Ejecutar una matriz de validación y documentar resultados.',
      'Presentar una solución con evidencia del proceso y del producto.',
    ],
    deliverables: [
      'Definición del problema.',
      'Requerimientos y planeación.',
      'Repositorio en GitHub.',
      'Aplicación funcional o prototipo demostrable.',
      'Evidencia del uso de agentes y subagentes.',
      'Presentación final.',
    ],
    topics: [
      {
        slug: 'orquestacion',
        title: 'Orquestación de agentes',
        navTitle: 'Orquestación',
        description:
          'Coordina agentes, define dependencias, puntos de control y criterios para decidir cuándo intervenir.',
        duration: '45 min',
        file: 'dias/dia-4/orquestacion.md',
      },
      {
        slug: 'integracion',
        title: 'Integración y validación del proyecto',
        navTitle: 'Integración y validación',
        description:
          'Une interfaz, API, recuperación documental y MCP; valida el flujo completo con una matriz de pruebas.',
        duration: '75 min',
        file: 'dias/dia-4/integracion.md',
      },
      {
        slug: 'presentacion',
        title: 'Demostración y presentación final',
        navTitle: 'Presentación final',
        description:
          'Prepara una demostración breve, evidencia del proceso y una narrativa clara de problema a solución.',
        duration: '45 min',
        file: 'dias/dia-4/presentacion.md',
      },
    ],
  },
]

export interface ProjectDoc {
  slug: string
  title: string
  navTitle: string
  description: string
  file: string
}

export const projectDocs: ProjectDoc[] = [
  {
    slug: 'descripcion',
    title: 'Descripción del proyecto',
    navTitle: 'Descripción',
    description:
      'Problema, justificación, objetivos, usuarios, alcance y reglas de un asistente académico fundamentado.',
    file: 'proyecto-conductor/descripcion.md',
  },
  {
    slug: 'requerimientos',
    title: 'Requerimientos e historias de usuario',
    navTitle: 'Requerimientos',
    description:
      'Requerimientos funcionales y no funcionales, historias de usuario, criterios de aceptación y preguntas de ejemplo.',
    file: 'proyecto-conductor/requerimientos.md',
  },
  {
    slug: 'backend',
    title: 'Backend con FastAPI',
    navTitle: 'Backend',
    description:
      'Entorno virtual, dependencias, modelos, esquemas, routers, servicios y pruebas del backend.',
    file: 'proyecto-conductor/backend.md',
  },
  {
    slug: 'frontend',
    title: 'Frontend con React y TypeScript',
    navTitle: 'Frontend',
    description:
      'Proyecto Vite, componentes tipados, integración con la API y estados de la interfaz.',
    file: 'proyecto-conductor/frontend.md',
  },
  {
    slug: 'arquitectura',
    title: 'Arquitectura y tecnologías',
    navTitle: 'Arquitectura',
    description:
      'Arquitectura de referencia, flujo de datos, estructura de carpetas, configuración de OpenCode y decisiones técnicas.',
    file: 'proyecto-conductor/arquitectura.md',
  },
  {
    slug: 'rag',
    title: 'Preparación de documentos para RAG',
    navTitle: 'RAG',
    description:
      'Documentos de demostración, fragmentación, embeddings, recuperación, generación fundamentada y evaluación.',
    file: 'proyecto-conductor/rag.md',
  },
  {
    slug: 'mcp',
    title: 'Integración MCP Filesystem',
    navTitle: 'MCP',
    description:
      'Configuración del servidor, permisos restringidos, interacción con documentos y reglas de seguridad.',
    file: 'proyecto-conductor/mcp.md',
  },
]

export interface StandaloneDoc {
  path: string
  title: string
  description: string
  file: string
}

export const standaloneDocs: StandaloneDoc[] = [
  {
    path: '/opencode',
    title: 'Guía completa de OpenCode',
    description:
      'Instalación, configuración, inicialización, modos, herramientas, permisos, subagentes, delegación y depuración.',
    file: 'opencode.md',
  },
  {
    path: '/programa',
    title: 'Programa general',
    description:
      'Objetivos, calendario, contenidos por día, metodología y criterios de participación del curso.',
    file: 'programa.md',
  },
  {
    path: '/proyecto-integrador',
    title: 'Del problema a una solución inteligente',
    description:
      'Proyecto final, entregables, rúbrica de evaluación y criterios para la presentación.',
    file: 'proyecto-integrador.md',
  },
  {
    path: '/recursos',
    title: 'Recursos y documentación',
    description:
      'Documentación oficial, herramientas, plantillas descargables y materiales de consulta.',
    file: 'recursos.md',
  },
  {
    path: '/acerca-del-curso',
    title: 'Acerca del curso',
    description:
      'Institución, fechas, perfil de participación, metodología, requisitos y notas sobre el material.',
    file: 'acerca-del-curso.md',
  },
]

export const allTopics = days.flatMap((day) =>
  day.topics.map((topic) => ({ ...topic, dayId: day.id, daySlug: day.slug, dayTitle: day.title })),
)

export function getDay(daySlug: string) {
  return days.find((day) => day.slug === daySlug)
}

export function getTopic(daySlug: string, topicSlug: string) {
  return getDay(daySlug)?.topics.find((topic) => topic.slug === topicSlug)
}

export function getProjectDoc(slug: string) {
  return projectDocs.find((doc) => doc.slug === slug)
}

export function getStandaloneDoc(path: string) {
  return standaloneDocs.find((doc) => doc.path === path)
}
