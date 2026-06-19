import { describe, it, expect } from 'vitest'
import { BADGES, type BadgeCtx } from './badges'

function ctx(over: Partial<BadgeCtx> = {}): BadgeCtx {
  return {
    isModuloConcluido: () => false,
    isPercursoConcluido: () => false,
    modulosConcluidos: 0,
    streakRecorde: 0,
    melhorSimulado: 0,
    revisaoCompleta: false,
    ...over,
  }
}

const cond = (id: string) => BADGES.find((b) => b.id === id)!.condicao

describe('condições de badges', () => {
  it('Primeiro Commit: ao menos 1 módulo', () => {
    expect(cond('primeiro_commit')(ctx({ modulosConcluidos: 1 }))).toBe(true)
    expect(cond('primeiro_commit')(ctx())).toBe(false)
  })

  it('Trilha 100%: 15 módulos', () => {
    expect(cond('trilha_100')(ctx({ modulosConcluidos: 15 }))).toBe(true)
    expect(cond('trilha_100')(ctx({ modulosConcluidos: 14 }))).toBe(false)
  })

  it('Maratonista / Inabalável: ofensiva 7 / 21', () => {
    expect(cond('maratonista')(ctx({ streakRecorde: 7 }))).toBe(true)
    expect(cond('maratonista')(ctx({ streakRecorde: 6 }))).toBe(false)
    expect(cond('inabalavel')(ctx({ streakRecorde: 21 }))).toBe(true)
  })

  it('Acima da Linha: simulado >= 85%', () => {
    expect(cond('acima_da_linha')(ctx({ melhorSimulado: 85 }))).toBe(true)
    expect(cond('acima_da_linha')(ctx({ melhorSimulado: 84 }))).toBe(false)
  })

  it('Ambiente no Ar: percurso 1 concluído', () => {
    expect(cond('ambiente_no_ar')(ctx({ isPercursoConcluido: (p) => p === 'p1' }))).toBe(true)
    expect(cond('ambiente_no_ar')(ctx())).toBe(false)
  })

  it('Pronto para a Prova: revisão completa', () => {
    expect(cond('pronto_para_a_prova')(ctx({ revisaoCompleta: true }))).toBe(true)
  })
})
