import { create } from 'zustand'
import type { RealtimeChannel, Session } from '@supabase/supabase-js'
import { PROGRESS_TABLE, isSyncConfigured, supabase } from '../lib/supabase'
import { selectData, useProgress, type ProgressData } from './useProgress'

export type SyncStatus =
  | 'unconfigured' // sem env → modo local
  | 'signed-out'
  | 'syncing'
  | 'synced'
  | 'offline'
  | 'error'

interface SyncState {
  configured: boolean
  session: Session | null
  status: SyncStatus
  /** Mensagem para a UI (ex.: confirmação de envio do magic link). */
  message: string | null
  signInPassword: (email: string, password: string) => Promise<void>
  signUpPassword: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  /** uso interno do controlador */
  _set: (partial: Partial<SyncState>) => void
}

function traduzErroAuth(msg: string): string {
  if (/invalid login credentials/i.test(msg)) return 'E-mail ou senha incorretos.'
  if (/already registered|already exists/i.test(msg)) return 'Esse e-mail já tem conta — use Entrar.'
  if (/password should be at least/i.test(msg)) return 'A senha precisa ter ao menos 6 caracteres.'
  if (/email not confirmed/i.test(msg)) return 'E-mail não confirmado — desative "Confirm email" no Supabase.'
  return msg
}

export const useSync = create<SyncState>((set) => ({
  configured: isSyncConfigured,
  session: null,
  status: isSyncConfigured ? 'signed-out' : 'unconfigured',
  message: null,
  _set: (partial) => set(partial),

  signInPassword: async (email, password) => {
    if (!supabase) return
    set({ message: null })
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) set({ status: 'error', message: traduzErroAuth(error.message) })
    // sucesso → onAuthStateChange dispara o sync
  },

  signUpPassword: async (email, password) => {
    if (!supabase) return
    set({ message: null })
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      set({ status: 'error', message: traduzErroAuth(error.message) })
    } else if (!data.session) {
      set({
        message:
          'Conta criada, mas falta confirmar por e-mail. Desative "Confirm email" no Supabase para entrar direto.',
      })
    }
    // com sessão → onAuthStateChange dispara o sync
  },

  signOut: async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    // O progresso local permanece — apenas paramos de sincronizar.
  },
}))

// ---------- Controlador de sync (efeitos fora do React) ----------

let applyingRemote = false
let pushTimer: ReturnType<typeof setTimeout> | undefined
let channel: RealtimeChannel | null = null
let initialized = false

function setStatus(status: SyncStatus) {
  useSync.getState()._set({ status })
}

function applyRemote(remote: ProgressData) {
  applyingRemote = true
  useProgress.getState().hydrateFromRemote(remote)
  applyingRemote = false
}

async function push() {
  if (!supabase) return
  const session = useSync.getState().session
  if (!session) return
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    setStatus('offline')
    return
  }
  const local = selectData(useProgress.getState())
  setStatus('syncing')
  const { error } = await supabase.from(PROGRESS_TABLE).upsert(
    {
      user_id: session.user.id,
      data: local,
      updated_at: new Date(local.updatedAt || Date.now()).toISOString(),
    },
    { onConflict: 'user_id' },
  )
  setStatus(error ? 'error' : 'synced')
}

function schedulePush() {
  if (!supabase || !useSync.getState().session) return
  clearTimeout(pushTimer)
  pushTimer = setTimeout(() => void push(), 800)
}

/** Busca o estado remoto e reconcilia por last-write-wins (via updatedAt). */
async function pullAndReconcile() {
  if (!supabase) return
  const session = useSync.getState().session
  if (!session) return
  setStatus('syncing')
  const { data, error } = await supabase
    .from(PROGRESS_TABLE)
    .select('data')
    .eq('user_id', session.user.id)
    .maybeSingle()

  if (error) {
    setStatus('error')
    return
  }

  const local = selectData(useProgress.getState())
  const remote = (data?.data ?? null) as ProgressData | null
  const remoteUpdatedAt = remote ? Number(remote.updatedAt ?? 0) : -1

  if (remote && remoteUpdatedAt > local.updatedAt) {
    applyRemote(remote)
    setStatus('synced')
  } else {
    await push() // local é mais novo, ou a nuvem ainda está vazia
  }
}

function setupChannel(userId: string) {
  if (!supabase) return
  teardownChannel()
  channel = supabase
    .channel(`progress:${userId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: PROGRESS_TABLE, filter: `user_id=eq.${userId}` },
      (payload) => {
        const remote = (payload.new as { data?: ProgressData })?.data
        if (!remote) return
        // Aplica só se for mais novo que o local (evita eco do próprio push).
        if (Number(remote.updatedAt ?? 0) > useProgress.getState().updatedAt) {
          applyRemote(remote)
          setStatus('synced')
        }
      },
    )
    .subscribe()
}

function teardownChannel() {
  if (channel && supabase) {
    supabase.removeChannel(channel)
    channel = null
  }
}

function handleSession(session: Session | null) {
  const prev = useSync.getState().session
  useSync.getState()._set({ session, status: session ? 'syncing' : 'signed-out' })
  if (session) {
    setupChannel(session.user.id)
    void pullAndReconcile()
  } else if (prev) {
    teardownChannel()
  }
}

/** Liga a sincronização. No-op se o Supabase não estiver configurado. Idempotente. */
export function initSync() {
  if (!supabase || initialized) return
  initialized = true

  // INITIAL_SESSION (já loga a sessão atual), SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED…
  supabase.auth.onAuthStateChange((_event, session) => handleSession(session))

  // Empurra mudanças locais (debounce), exceto quando estamos aplicando dados remotos.
  useProgress.subscribe(() => {
    if (!applyingRemote) schedulePush()
  })

  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      if (useSync.getState().session) void push()
    })
    window.addEventListener('offline', () => setStatus('offline'))
    // Ao voltar o foco, puxa o que possa ter mudado em outro dispositivo.
    window.addEventListener('focus', () => {
      if (useSync.getState().session) void pullAndReconcile()
    })
  }
}
