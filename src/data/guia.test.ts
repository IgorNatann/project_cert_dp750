import { describe, it, expect } from 'vitest'
import { GUIA } from './guia'
import { MODULOS } from './trilha'

describe('guia de matéria de apoio', () => {
  it('cobre todos os 15 módulos da trilha', () => {
    for (const m of MODULOS) {
      expect(GUIA[m.id], `módulo ${m.id} sem matéria de apoio`).toBeDefined()
    }
    expect(Object.keys(GUIA)).toHaveLength(MODULOS.length)
  })

  it('não tem entradas órfãs (todo id do GUIA existe na trilha)', () => {
    const ids = new Set(MODULOS.map((m) => m.id))
    for (const id of Object.keys(GUIA)) {
      expect(ids.has(id), `GUIA tem id desconhecido: ${id}`).toBe(true)
    }
  })

  it('cada módulo tem tópicos e rótulo não vazios', () => {
    for (const [id, g] of Object.entries(GUIA)) {
      expect(g.topicos.length, `módulo ${id} sem tópicos`).toBeGreaterThan(0)
      expect(g.topicos.every((t) => t.trim().length > 0)).toBe(true)
      expect(g.learnLabel.trim().length, `módulo ${id} sem rótulo`).toBeGreaterThan(0)
    }
  })

  it('aponta para a doc oficial do Azure Databricks em pt-br', () => {
    const prefixo = 'https://learn.microsoft.com/pt-br/azure/databricks/'
    for (const [id, g] of Object.entries(GUIA)) {
      expect(g.learnUrl.startsWith(prefixo), `learnUrl inesperada em ${id}: ${g.learnUrl}`).toBe(
        true,
      )
    }
  })
})
