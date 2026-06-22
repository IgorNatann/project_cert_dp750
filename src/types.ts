export interface Percurso {
  id: string
  nome: string
  /** Data-meta (ISO yyyy-mm-dd) */
  meta: string
  /** Peso do domínio no exame DP-750 (ex.: '15–20%'), do guia oficial. */
  pesoExame: string
  /** Learning path oficial do curso DP-750T00 no Microsoft Learn. */
  learnPathUrl: string
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

/** Conteúdo de apoio de um módulo, alinhado ao módulo do curso oficial DP-750T00. */
export interface GuiaModulo {
  /** Título oficial do módulo no curso (em inglês, como aparece no Microsoft Learn). */
  tituloOficial: string
  /** Tópicos do módulo (habilidades cobertas), do guia/curso oficial. */
  topicos: string[]
  /** URL da aula (módulo de treinamento) no Microsoft Learn. */
  learnUrl: string
}
