export interface Mensaje {
  rol: 'usuario' | 'asistente'
  contenido: string
  fuentes?: { documento: string; fragmento: string }[]
}
