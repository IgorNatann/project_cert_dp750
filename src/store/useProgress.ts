import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  MODULOS,
  PERCURSOS,
  TAREFAS_REVISAO,
  TAREFAS_SIMULADO,
} from '../data/trilha'
import { XP } from '../data/xp'
import { BADGES } from '../data/badges'
import { todayISO } from '../lib/date'
import { registrarOfensiva } from '../lib/streak'
import type { SimuladoRecord } from '../types'

export interface ProgressData {
  /** itemId (módulo/tarefa) -> data de conclusão (ISO). Ausente = não concluído. */
  concluidos: Record<string, string>
  /** badgeId -> data de desbloqueio (ISO). */
  badges: Record<string, string>
  simulados: SimuladoRecord[]
  /** Nº de dias de estudo registrados (cada um vale XP.diaDeEstudo). */
  diasDeEstudo: number
  streakAtual: number
  streakRecorde: number
  ultimoDiaAtivo: string | null
  freezeDisponivel: boolean
  /** Epoch (ms) da última mutação local — base para reconciliar com a nuvem. */
  updatedAt: number
}

interface Actions {
  toggleConcluido: (itemId: string) => void
  addSimulado: (r: Omit<SimuladoRecord, 'id'>) => void
  removeSimulado: (id: string) => void
  reset: () => void
  /** Substitui o estado local pelos dados vindos da nuvem (preserva o updatedAt remoto). */
  hydrateFromRemote: (data: ProgressData) => void
}

export type ProgressStore = ProgressData & Actions

const initial: ProgressData = {
  concluidos: {},
  badges: {},
  simulados: [],
  diasDeEstudo: 0,
  streakAtual: 0,
  streakRecorde: 0,
  ultimoDiaAtivo: null,
  freezeDisponivel: true,
  updatedAt: 0,
}

/** Reavalia as badges sobre um estado e devolve o mapa atualizado (nunca remove desbloqueios). */
function avaliarBadges(s: ProgressData): Record<string, string> {
  const hoje = todayISO()
  const next = { ...s.badges }
  const ctx = {
    isModuloConcluido: (id: string) => Boolean(s.concluidos[id]),
    isPercursoConcluido: (pid: string) =>
      PERCURSOS.find((p) => p.id === pid)?.moduloIds.every((m) => s.concluidos[m]) ?? false,
    modulosConcluidos: MODULOS.filter((m) => s.concluidos[m.id]).length,
    streakRecorde: s.streakRecorde,
    melhorSimulado: s.simulados.reduce((mx, r) => Math.max(mx, r.nota), 0),
    revisaoCompleta: TAREFAS_REVISAO.every((t) => s.concluidos[t.id]),
  }
  for (const b of BADGES) {
    if (!next[b.id] && b.condicao(ctx)) next[b.id] = hoje
  }
  return next
}

/** Aplica "registrar atividade hoje": atualiza ofensiva e conta o dia de estudo (uma vez). */
function comAtividade(s: ProgressData): ProgressData {
  const hoje = todayISO()
  const contaDia = s.ultimoDiaAtivo !== hoje
  const ofensiva = registrarOfensiva(s, hoje)
  return {
    ...s,
    ...ofensiva,
    diasDeEstudo: contaDia ? s.diasDeEstudo + 1 : s.diasDeEstudo,
  }
}

export const useProgress = create<ProgressStore>()(
  persist(
    (set) => ({
      ...initial,

      toggleConcluido: (itemId) =>
        set((s) => {
          const concluidos = { ...s.concluidos }
          let base: ProgressData
          if (concluidos[itemId]) {
            // Desmarcar não mexe na ofensiva já registrada do dia.
            delete concluidos[itemId]
            base = { ...s, concluidos }
          } else {
            concluidos[itemId] = todayISO()
            base = comAtividade({ ...s, concluidos })
          }
          return { ...base, badges: avaliarBadges(base), updatedAt: Date.now() }
        }),

      addSimulado: (r) =>
        set((s) => {
          const rec: SimuladoRecord = { ...r, id: `sim_${Date.now()}` }
          const base = comAtividade({ ...s, simulados: [...s.simulados, rec] })
          return { ...base, badges: avaliarBadges(base), updatedAt: Date.now() }
        }),

      removeSimulado: (id) =>
        set((s) => ({
          ...s,
          simulados: s.simulados.filter((r) => r.id !== id),
          updatedAt: Date.now(),
        })),

      reset: () => set(() => ({ ...initial, updatedAt: Date.now() })),

      hydrateFromRemote: (data) => set(() => ({ ...data })),
    }),
    {
      name: 'deltaquest-v1',
      partialize: (s): ProgressData => ({
        concluidos: s.concluidos,
        badges: s.badges,
        simulados: s.simulados,
        diasDeEstudo: s.diasDeEstudo,
        streakAtual: s.streakAtual,
        streakRecorde: s.streakRecorde,
        ultimoDiaAtivo: s.ultimoDiaAtivo,
        freezeDisponivel: s.freezeDisponivel,
        updatedAt: s.updatedAt,
      }),
    },
  ),
)

// ---- Selectors derivados ----

/** XP total derivado do progresso (fonte única de verdade, sem drift). */
export function selectXp(s: ProgressStore): number {
  let xp = 0
  for (const m of MODULOS) if (s.concluidos[m.id]) xp += XP.modulo
  for (const p of PERCURSOS) if (p.moduloIds.every((id) => s.concluidos[id])) xp += XP.percursoBonus
  for (const t of TAREFAS_SIMULADO) if (s.concluidos[t.id]) xp += XP.tarefaSimulado
  for (const t of TAREFAS_REVISAO) if (s.concluidos[t.id]) xp += XP.tarefaRevisao
  xp += s.diasDeEstudo * XP.diaDeEstudo
  return xp
}

/** Extrai apenas os dados persistíveis (o que vai/volta da nuvem). */
export function selectData(s: ProgressStore): ProgressData {
  return {
    concluidos: s.concluidos,
    badges: s.badges,
    simulados: s.simulados,
    diasDeEstudo: s.diasDeEstudo,
    streakAtual: s.streakAtual,
    streakRecorde: s.streakRecorde,
    ultimoDiaAtivo: s.ultimoDiaAtivo,
    freezeDisponivel: s.freezeDisponivel,
    updatedAt: s.updatedAt,
  }
}
