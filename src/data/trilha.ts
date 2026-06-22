import type { Modulo, Percurso, Tarefa } from '../types'

// Datas-chave do plano (PRD §6 e checklist). ISO yyyy-mm-dd.
export const DATAS = {
  inicio: '2026-06-22',
  exame: '2026-09-14',
  simulados: '2026-09-09',
} as const

// Fonte: .llm/PRD/04_checklist_progresso.md
export const PERCURSOS: Percurso[] = [
  {
    id: 'p1',
    nome: 'Set up and configure environment',
    meta: '2026-07-08',
    pesoExame: '15–20%',
    moduloIds: ['m1', 'm2', 'm3', 'm4', 'm5'],
  },
  {
    id: 'p2',
    nome: 'Prepare and process data',
    meta: '2026-08-05',
    pesoExame: '30–35%',
    moduloIds: ['m6', 'm7', 'm8', 'm9'],
  },
  {
    id: 'p3',
    nome: 'Deploy and maintain data pipelines and workloads',
    meta: '2026-08-19',
    pesoExame: '30–35%',
    moduloIds: ['m10', 'm11', 'm12', 'm13'],
  },
  {
    id: 'p4',
    nome: 'Secure and govern Unity Catalog objects',
    meta: '2026-08-26',
    pesoExame: '15–20%',
    moduloIds: ['m14', 'm15'],
  },
]

export const MODULOS: Modulo[] = [
  { id: 'm1', percursoId: 'p1', titulo: 'Explorar o Azure Databricks (workspace, lakehouse)' },
  { id: 'm2', percursoId: 'p1', titulo: 'Provisionar e configurar workspaces' },
  { id: 'm3', percursoId: 'p1', titulo: 'Configurar compute: clusters, pools e SQL warehouses' },
  { id: 'm4', percursoId: 'p1', titulo: 'Notebooks, Git folders (Repos) e CLI/APIs' },
  { id: 'm5', percursoId: 'p1', titulo: 'Introdução ao Apache Spark no Azure Databricks' },

  { id: 'm6', percursoId: 'p2', titulo: 'Processar dados com Apache Spark (DataFrames)' },
  { id: 'm7', percursoId: 'p2', titulo: 'Gerenciar dados com Delta Lake' },
  { id: 'm8', percursoId: 'p2', titulo: 'Ingestão incremental: Auto Loader e Structured Streaming' },
  { id: 'm9', percursoId: 'p2', titulo: 'Pipelines declarativos (Delta Live Tables / Lakeflow)' },

  { id: 'm10', percursoId: 'p3', titulo: 'Orquestrar workloads com Workflows / Jobs' },
  { id: 'm11', percursoId: 'p3', titulo: 'CI/CD com Databricks Asset Bundles' },
  { id: 'm12', percursoId: 'p3', titulo: 'Monitorar e fazer troubleshooting de pipelines' },
  { id: 'm13', percursoId: 'p3', titulo: 'Performance e custo (Photon, particionamento, Z-order)' },

  { id: 'm14', percursoId: 'p4', titulo: 'Governança de dados com Unity Catalog' },
  { id: 'm15', percursoId: 'p4', titulo: 'Proteger e auditar objetos do Unity Catalog' },
]

export const TAREFAS_SIMULADO: Tarefa[] = [
  { id: 's1', titulo: 'Simulado diagnóstico inicial' },
  { id: 's2', titulo: 'Practice assessment oficial da Microsoft — rodada 1' },
  { id: 's3', titulo: 'Revisar erros da rodada 1 e reforçar lacunas' },
  { id: 's4', titulo: 'Practice assessment oficial da Microsoft — rodada 2' },
  { id: 's5', titulo: 'Simulado final cronometrado (atingir ≥ 85%)' },
]

export const TAREFAS_REVISAO: Tarefa[] = [
  { id: 'r1', titulo: 'Revisar resumos dos 15 módulos' },
  { id: 'r2', titulo: 'Revisar flashcards/quizzes (NotebookLM)' },
  { id: 'r3', titulo: 'Revisão focada nas lacunas dos simulados' },
  { id: 'r4', titulo: 'Checklist do dia da prova (logística, ambiente, descanso)' },
]
