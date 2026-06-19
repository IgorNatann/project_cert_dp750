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

const inputCls =
  'w-48 rounded-md border border-border bg-bg px-2 py-1 text-text placeholder:text-muted outline-none focus-visible:ring-2 focus-visible:ring-badge/60'

export function SyncBar() {
  const configured = useSync((s) => s.configured)
  const session = useSync((s) => s.session)
  const status = useSync((s) => s.status)
  const message = useSync((s) => s.message)
  const signInPassword = useSync((s) => s.signInPassword)
  const signUpPassword = useSync((s) => s.signUpPassword)
  const signOut = useSync((s) => s.signOut)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

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

  function validar(): boolean {
    if (email.trim().length === 0) {
      setErro('Informe o e-mail.')
      return false
    }
    if (password.length < 6) {
      setErro('A senha precisa ter ao menos 6 caracteres.')
      return false
    }
    setErro(null)
    return true
  }
  function entrar(e: FormEvent) {
    e.preventDefault()
    if (validar()) void signInPassword(email.trim(), password)
  }
  function criar() {
    if (validar()) void signUpPassword(email.trim(), password)
  }

  // Deslogado: e-mail + senha (entrar ou criar conta).
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
        <form onSubmit={entrar} className="flex flex-col items-end gap-2">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            aria-label="E-mail"
            className={inputCls}
          />
          <input
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="senha (mín. 6)"
            aria-label="Senha"
            className={inputCls}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={criar}
              className="rounded px-1 text-muted transition-colors hover:text-badge focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-badge/50"
            >
              criar conta
            </button>
            <button
              type="submit"
              className="rounded-md bg-badge px-3 py-1 font-semibold text-bg transition-opacity hover:opacity-90"
            >
              entrar
            </button>
          </div>
        </form>
      )}
      {erro && <p className="mt-1 text-streak">{erro}</p>}
      {message && <p className="mt-1 max-w-[18rem] text-muted">{message}</p>}
      {status === 'error' && !message && <p className="mt-1 text-streak">falha ao entrar</p>}
    </div>
  )
}
