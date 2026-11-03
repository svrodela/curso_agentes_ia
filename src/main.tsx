import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import 'highlight.js/styles/github-dark-dimmed.css'
import './styles.css'
import App from './App'

const baseUrl = import.meta.env.BASE_URL
const basename = baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
