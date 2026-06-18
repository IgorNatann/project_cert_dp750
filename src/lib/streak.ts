import { addDays, weekday } from './date'

/**
 * Lógica de ofensiva (PRD §5.3) — a regra mais sutil do produto.
 * A ofensiva conta DIAS DE ESTUDO PLANEJADOS com atividade, NÃO dias corridos.
 * A agenda prevê quarta e quinta de folga, então esses dias não podem quebrar
 * a sequência. Há ainda um "freeze" que tolera UM dia planejado perdido.
 *
 * Persona: estuda seg/ter/sex à noite, sessão longa no sábado, revisão no domingo.
 */
export const DIAS_PLANEJADOS = [0, 1, 2, 5, 6] // dom, seg, ter, sex, sáb

export function ehDiaPlanejado(iso: string): boolean {
  return DIAS_PLANEJADOS.includes(weekday(iso))
}

/** O dia de estudo planejado imediatamente anterior a `iso`. */
export function diaPlanejadoAnterior(iso: string): string {
  let cur = addDays(iso, -1)
  for (let i = 0; i < 14; i++) {
    if (ehDiaPlanejado(cur)) return cur
    cur = addDays(cur, -1)
  }
  return cur
}

export interface StreakState {
  streakAtual: number
  streakRecorde: number
  ultimoDiaAtivo: string | null
  freezeDisponivel: boolean
}

/**
 * Registra atividade em `hoje` e devolve o novo estado de ofensiva.
 * - Continua a sequência se o último dia ativo for o dia planejado anterior a hoje.
 * - Tolera exatamente UM dia planejado perdido consumindo o freeze.
 * - Caso contrário, recomeça em 1.
 */
export function registrarOfensiva(s: StreakState, hoje: string): StreakState {
  if (s.ultimoDiaAtivo === hoje) return s // já contou hoje

  const anterior = diaPlanejadoAnterior(hoje)
  let streakAtual = s.streakAtual
  let freezeDisponivel = s.freezeDisponivel

  if (s.ultimoDiaAtivo === anterior) {
    streakAtual += 1
  } else if (
    s.ultimoDiaAtivo &&
    freezeDisponivel &&
    s.ultimoDiaAtivo === diaPlanejadoAnterior(anterior)
  ) {
    streakAtual += 1
    freezeDisponivel = false // freeze consumido
  } else {
    streakAtual = 1
  }

  return {
    streakAtual,
    streakRecorde: Math.max(s.streakRecorde, streakAtual),
    ultimoDiaAtivo: hoje,
    freezeDisponivel,
  }
}
