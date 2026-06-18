import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/**
 * Cliente Supabase — ou `null` quando as variáveis de ambiente não estão configuradas.
 * Nesse caso o app roda em modo 100% local (offline-first), sem sincronização.
 * A `anon key` é pública por design; o acesso aos dados é protegido por RLS.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null

export const isSyncConfigured = supabase !== null

/** Tabela onde o progresso de cada usuário é persistido (uma linha por usuário). */
export const PROGRESS_TABLE = 'progress'
