import type { Badge } from '../types'

/** Contexto avaliado para decidir se uma badge foi desbloqueada. */
export interface BadgeCtx {
  isModuloConcluido: (id: string) => boolean
  isPercursoConcluido: (pid: string) => boolean
  modulosConcluidos: number
  streakRecorde: number
  melhorSimulado: number
  revisaoCompleta: boolean
}

export interface BadgeDef extends Badge {
  condicao: (c: BadgeCtx) => boolean
}

// Marcos reais do plano (PRD §5.2)
export const BADGES: BadgeDef[] = [
  {
    id: 'primeiro_commit',
    titulo: 'Primeiro Commit',
    descricao: 'Concluir o 1º módulo',
    condicao: (c) => c.modulosConcluidos >= 1,
  },
  {
    id: 'ambiente_no_ar',
    titulo: 'Ambiente no Ar',
    descricao: 'Concluir o Percurso 1',
    condicao: (c) => c.isPercursoConcluido('p1'),
  },
  {
    id: 'domador_de_delta',
    titulo: 'Domador de Delta',
    descricao: 'Concluir o Percurso 2',
    condicao: (c) => c.isPercursoConcluido('p2'),
  },
  {
    id: 'pipeline_master',
    titulo: 'Pipeline Master',
    descricao: 'Concluir o Percurso 3',
    condicao: (c) => c.isPercursoConcluido('p3'),
  },
  {
    id: 'guardiao_do_catalogo',
    titulo: 'Guardião do Catálogo',
    descricao: 'Concluir o Percurso 4',
    condicao: (c) => c.isPercursoConcluido('p4'),
  },
  {
    id: 'trilha_100',
    titulo: 'Trilha 100%',
    descricao: 'Concluir os 15 módulos',
    condicao: (c) => c.modulosConcluidos >= 15,
  },
  {
    id: 'maratonista',
    titulo: 'Maratonista',
    descricao: 'Atingir ofensiva de 7 dias',
    condicao: (c) => c.streakRecorde >= 7,
  },
  {
    id: 'inabalavel',
    titulo: 'Inabalável',
    descricao: 'Atingir ofensiva de 21 dias',
    condicao: (c) => c.streakRecorde >= 21,
  },
  {
    id: 'acima_da_linha',
    titulo: 'Acima da Linha',
    descricao: 'Registrar simulado ≥ 85%',
    condicao: (c) => c.melhorSimulado >= 85,
  },
  {
    id: 'pronto_para_a_prova',
    titulo: 'Pronto para a Prova',
    descricao: 'Concluir todas as tarefas de revisão final',
    condicao: (c) => c.revisaoCompleta,
  },
]
