import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repositoryBase = process.env.VITE_BASE_PATH || '/curso-creacion-software-agentes-ia/'

export default defineConfig(({ command, isPreview }) => ({
  // El servidor de desarrollo sirve desde la raíz. La compilación y la vista
  // previa de producción respetan el subdirectorio del repositorio en Pages.
  base: command === 'serve' && !isPreview ? '/' : repositoryBase,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}))
