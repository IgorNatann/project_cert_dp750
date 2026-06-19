import { describe, it, expect } from 'vitest'
import { levelFromXp, xpParaNivel, levelProgress } from './xp'

describe('curva de XP', () => {
  it('começa no nível 1 com 0 XP', () => {
    expect(levelFromXp(0)).toBe(1)
    expect(levelProgress(0).pct).toBe(0)
  })

  it('nível N exige 100*(N-1)^2 de XP acumulado', () => {
    expect(xpParaNivel(2)).toBe(100)
    expect(xpParaNivel(3)).toBe(400)
    expect(levelFromXp(100)).toBe(2)
    expect(levelFromXp(399)).toBe(2)
    expect(levelFromXp(400)).toBe(3)
  })

  it('calcula o progresso dentro do nível atual', () => {
    const p = levelProgress(50)
    expect(p.level).toBe(1)
    expect(p.pct).toBe(50)
    expect(p.restante).toBe(50)
  })
})
