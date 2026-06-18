import { useState, type FormEvent } from 'react'
import { useSync, type SyncStatus } from '../store/useSync'

const STATUS: Record<SyncStatus, { dot: string; label: string }> = {
  unconfigured: { dot: 'bg-muted', label: 'local' },
  'signed-out': { dot: 'bg-muted', label: 'local' },
  syncing: { dot: 'bg-xp', label: 'sincronizando…' },
  synced: { dot: 'bg-done', label: 'sincronizado' },
  offline: { dot: 'bg-streak', label: 'offline' },
  error: { dot: 'bg-streak', label: 'erro' },
}

export function SyncBar() {
  const configured = useSync((s) => s.configured)
  const session = useSync((s) => s.session)
  const status = useSync((s) => s.status)
  const message = useSync((s) => s.message)
  const signIn = useSync((s) => s.signIn)
  const signOut = useSync((s) => s.signOut)

  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)

  // Sem Supabase configurado: modo local puro.
  if (!configured) {
    return <span className="text-xs text-muted">salvo neste dispositivo</span>
  }

  const info = STATUS[status]

  // Logado: status de sync + sair.
  if (session) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className={`h-2 w-2 rounded-full ${info.dot}`} aria-hidden />
        <span className="text-muted">{info.label}</span>
        <span className="hidden text-muted sm:inline">· {session.user.email}</span>
        <button
          onClick={() => void signOut()}
          className="rounded text-muted transition-colors hover:text-streak focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-streak/50"
        >
          sair
        </button>
      </div>
    )
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (value) void signIn(value)
  }

  // Deslogado: entrar com magic link.
  return (
    <div className="text-right text-xs">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded text-badge transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-badge/50"
        >
          Entrar para sincronizar
        </button>
      ) : (
        <form onSubmit={submit} className="flex items-center gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            aria-label="E-mail para login"
            className="w-44 rounded-md border border-border bg-bg px-2 py-1 text-text placeholder:text-muted outline-none focus-visible:ring-2 focus-visible:ring-badge/60"
          />
          <button
            type="submit"
            className="rounded-md bg-badge px-2 py-1 font-semibold text-bg transition-opacity hover:opacity-90"
          >
            enviar link
          </button>
        </form>
      )}
      {message && <p className="mt-1 max-w-[16rem] text-muted">{message}</p>}
      {status === 'error' && !message && <p className="mt-1 text-streak">falha ao sincronizar</p>}
    </div>
  )
}
