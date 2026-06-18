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
