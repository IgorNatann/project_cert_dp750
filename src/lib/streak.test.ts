import { describe, it, expect } from 'vitest'
import { registrarOfensiva, ehDiaPlanejado, diaPlanejadoAnterior, type StreakState } from './streak'

// Semana de referência (weekdays conhecidos):
// 2026-06-15 Seg · 16 Ter · 17 Qua(folga) · 18 Qui(folga) · 19 Sex · 20 Sáb · 21 Dom
const MON = '2026-06-15'
const TUE = '2026-06-16'
const WED = '2026-06-17'
const THU = '2026-06-18'
const FRI = '2026-06-19'
const SAT = '2026-06-20'

function s(over: Partial<StreakState> = {}): StreakState {
  return { streakAtual: 0, streakRecorde: 0, ultimoDiaAtivo: null, freezeDisponivel: true, ...over }
}

describe('dias planejados', () => {
  it('qua e qui são folga; seg/ter/sex são planejados', () => {
    expect(ehDiaPlanejado(WED)).toBe(false)
    expect(ehDiaPlanejado(THU)).toBe(false)
    expect(ehDiaPlanejado(MON)).toBe(true)
    expect(ehDiaPlanejado(FRI)).toBe(true)
  })

  it('o dia planejado anterior a sexta é terça (pula qua/qui)', () => {
    expect(diaPlanejadoAnterior(FRI)).toBe(TUE)
  })
})

describe('registrarOfensiva', () => {
  it('primeira atividade inicia a ofensiva em 1', () => {
    const r = registrarOfensiva(s(), MON)
    expect(r.streakAtual).toBe(1)
    expect(r.streakRecorde).toBe(1)
    expect(r.ultimoDiaAtivo).toBe(MON)
  })

  it('dois dias planejados seguidos incrementam', () => {
    const r = registrarOfensiva(s({ streakAtual: 1, streakRecorde: 1, ultimoDiaAtivo: MON }), TUE)
    expect(r.streakAtual).toBe(2)
  })

  it('folga (qua/qui) não quebra: terça → sexta continua sem usar freeze', () => {
    const r = registrarOfensiva(s({ streakAtual: 2, streakRecorde: 2, ultimoDiaAtivo: TUE }), FRI)
    expect(r.streakAtual).toBe(3)
    expect(r.freezeDisponivel).toBe(true)
  })

  it('pular UM dia planejado consome o freeze e mantém a sequência', () => {
    // último = seg, hoje = sex → pulou a terça (1 dia planejado)
    const r = registrarOfensiva(s({ streakAtual: 3, streakRecorde: 3, ultimoDiaAtivo: MON }), FRI)
    expect(r.streakAtual).toBe(4)
    expect(r.freezeDisponivel).toBe(false)
  })

  it('pular dois dias planejados reseta para 1 (mesmo com freeze) e preserva o recorde', () => {
    // último = seg, hoje = sáb → pulou terça e sexta (2 planejados)
    const r = registrarOfensiva(s({ streakAtual: 5, streakRecorde: 5, ultimoDiaAtivo: MON }), SAT)
    expect(r.streakAtual).toBe(1)
    expect(r.streakRecorde).toBe(5)
    expect(r.freezeDisponivel).toBe(true)
  })

  it('a mesma data não conta de novo (no-op)', () => {
    const r = registrarOfensiva(s({ streakAtual: 5, streakRecorde: 5, ultimoDiaAtivo: MON }), MON)
    expect(r.streakAtual).toBe(5)
  })
})
