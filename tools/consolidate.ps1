$out = "public\proyecto-completo.md"
$files = @(
  "src\content\programa.md",
  "src\content\opencode.md",
  "src\content\dias\dia-1\introduccion-agentes.md",
  "src\content\dias\dia-1\ingenieria-requerimientos.md",
  "src\content\dias\dia-1\opencode.md",
  "src\content\dias\dia-1\git-github.md",
  "src\content\dias\dia-1\landing-page.md",
  "src\content\dias\dia-2\ciclo-agentes.md",
  "src\content\dias\dia-2\agents-md.md",
  "src\content\dias\dia-2\subagentes.md",
  "src\content\dias\dia-2\pruebas.md",
  "src\content\dias\dia-3\fundamentos-rag.md",
  "src\content\dias\dia-3\chromadb.md",
  "src\content\dias\dia-3\fundamentos-mcp.md",
  "src\content\dias\dia-3\filesystem.md",
  "src\content\dias\dia-4\orquestacion.md",
  "src\content\dias\dia-4\integracion.md",
  "src\content\dias\dia-4\presentacion.md",
  "src\content\proyecto-conductor\descripcion.md",
  "src\content\proyecto-conductor\requerimientos.md",
  "src\content\proyecto-conductor\arquitectura.md",
  "src\content\proyecto-conductor\backend.md",
  "src\content\proyecto-conductor\frontend.md",
  "src\content\proyecto-conductor\rag.md",
  "src\content\proyecto-conductor\mcp.md",
  "src\content\proyecto-integrador.md",
  "src\content\recursos.md",
  "src\content\acerca-del-curso.md"
)
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("# Creación de software con Agentes de IA — Proyecto completo")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("> Documento consolidado. Contiene todo el contenido del curso en Markdown.")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("## Índice de archivos")
[void]$sb.AppendLine("")
foreach ($f in $files) { [void]$sb.AppendLine("- $f") }
[void]$sb.AppendLine("")
[void]$sb.AppendLine("---")
[void]$sb.AppendLine("")
foreach ($f in $files) {
  if (Test-Path $f) {
    [void]$sb.AppendLine("## Archivo: $f")
    [void]$sb.AppendLine("")
    $content = Get-Content $f -Raw
    [void]$sb.AppendLine($content)
    [void]$sb.AppendLine("")
    [void]$sb.AppendLine("---")
    [void]$sb.AppendLine("")
  }
}
$sb.ToString() | Out-File -Encoding utf8 $out
Write-Host ("Created " + $out)
(Get-Item $out).Length