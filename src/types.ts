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
