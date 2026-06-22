export interface Percurso {
  id: string
  nome: string
  /** Data-meta (ISO yyyy-mm-dd) */
  meta: string
  moduloIds: string[]
}

export interface Modulo {
  id: string
  percursoId: string
  titulo: string
}

export interface Tarefa {
  id: string
  titulo: string
}

export interface SimuladoRecord {
  id: string
  /** Data do simulado (ISO yyyy-mm-dd) */
  data: string
  nome: string
  /** Nota em % (0–100) */
  nota: number
  observacoes?: string
}

export interface Badge {
  id: string
  titulo: string
  descricao: string
}

/** Conteúdo de apoio de um módulo, derivado do guia oficial DP-750. */
export interface GuiaModulo {
  /** Habilidades medidas (guia oficial) mapeadas a este módulo. */
  topicos: string[]
  /** URL da doc oficial do Azure Databricks (validada). */
  learnUrl: string
  /** Rótulo curto do destino no Microsoft Learn. */
  learnLabel: string
}
