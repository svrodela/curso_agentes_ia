import fs from 'node:fs'

const files = [
  'src/content/programa.md',
  'src/content/opencode.md',
  'src/content/dias/dia-1/introduccion-agentes.md',
  'src/content/dias/dia-1/ingenieria-requerimientos.md',
  'src/content/dias/dia-1/opencode.md',
  'src/content/dias/dia-1/git-github.md',
  'src/content/dias/dia-2/ciclo-agentes.md',
  'src/content/dias/dia-2/agents-md.md',
  'src/content/dias/dia-2/subagentes.md',
  'src/content/dias/dia-2/pruebas.md',
  'src/content/dias/dia-3/fundamentos-rag.md',
  'src/content/dias/dia-3/chromadb.md',
  'src/content/dias/dia-3/fundamentos-mcp.md',
  'src/content/dias/dia-3/filesystem.md',
  'src/content/dias/dia-4/orquestacion.md',
  'src/content/dias/dia-4/integracion.md',
  'src/content/dias/dia-4/presentacion.md',
  'src/content/proyecto-conductor/descripcion.md',
  'src/content/proyecto-conductor/requerimientos.md',
  'src/content/proyecto-conductor/arquitectura.md',
  'src/content/proyecto-conductor/backend.md',
  'src/content/proyecto-conductor/frontend.md',
  'src/content/proyecto-conductor/rag.md',
  'src/content/proyecto-conductor/mcp.md',
  'src/content/proyecto-integrador.md',
  'src/content/recursos.md',
  'src/content/acerca-del-curso.md',
]

let out = '# Creacion de software con Agentes de IA - Proyecto completo\n\n'
out += '> Documento consolidado. Contiene todo el contenido del curso en Markdown.\n\n'
out += '## Indice de archivos\n\n'
for (const f of files) out += '- ' + f + '\n'
out += '\n---\n\n'
for (const f of files) {
  if (fs.existsSync(f)) {
    out += '## Archivo: ' + f + '\n\n'
    out += fs.readFileSync(f, 'utf8') + '\n\n---\n\n'
  }
}
fs.writeFileSync('public/proyecto-completo.md', out, 'utf8')
console.log('Created public/proyecto-completo.md, size:', out.length)
