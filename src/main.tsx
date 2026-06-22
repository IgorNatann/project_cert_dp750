import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { initSync } from './store/useSync'

// Liga a sincronização com a nuvem (no-op se o Supabase não estiver configurado).
initSync()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Esconde a tela de abertura (definida em index.html) assim que o app monta.
// Não atrasa o uso — só cobre o tempo de carregamento. Respeita prefers-reduced-motion.
const splash = document.getElementById('dq-splash')
if (splash) {
  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.setTimeout(
    () => {
      splash.classList.add('dq-hide')
      window.setTimeout(() => splash.remove(), 450)
    },
    semAnimacao ? 0 : 750,
  )
}
