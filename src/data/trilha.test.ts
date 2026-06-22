import { describe, it, expect } from 'vitest'
import { PERCURSOS, MODULOS } from './trilha'

describe('trilha — percursos', () => {
  it('tem os 4 percursos e 15 módulos', () => {
    expect(PERCURSOS).toHaveLength(4)
    expect(MODULOS).toHaveLength(15)
  })

  it('todo percurso tem peso de exame no formato "N–N%"', () => {
    for (const p of PERCURSOS) {
      expect(p.pesoExame, `percurso ${p.id} sem peso`).toMatch(/^\d{1,3}–\d{1,3}%$/)
    }
  })

  it('os pesos batem com o guia oficial DP-750', () => {
    const pesos = Object.fromEntries(PERCURSOS.map((p) => [p.id, p.pesoExame]))
    expect(pesos).toEqual({
      p1: '15–20%',
      p2: '30–35%',
      p3: '30–35%',
      p4: '15–20%',
    })
  })
})
