import { describe, it, expect } from 'vitest'
import { selectXp, type ProgressStore } from './useProgress'

function store(over: Partial<ProgressStore> = {}): ProgressStore {
  return {
    concluidos: {},
    badges: {},
    simulados: [],
    diasDeEstudo: 0,
    streakAtual: 0,
    streakRecorde: 0,
    ultimoDiaAtivo: null,
    freezeDisponivel: true,
    updatedAt: 0,
    ...over,
  } as unknown as ProgressStore
}

describe('selectXp', () => {
  it('zero sem progresso', () => {
    expect(selectXp(store())).toBe(0)
  })

  it('um módulo concluído vale 100 XP', () => {
    expect(selectXp(store({ concluidos: { m1: '2026-06-15' } }))).toBe(100)
  })

  it('percurso completo soma o bônus de 250', () => {
    // p4 = m14 + m15
    const xp = selectXp(store({ concluidos: { m14: 'x', m15: 'x' } }))
    expect(xp).toBe(100 + 100 + 250)
  })

  it('cada dia de estudo registrado vale 20 XP', () => {
    expect(selectXp(store({ diasDeEstudo: 3 }))).toBe(60)
  })
})
