import type { Modulo, Percurso, Tarefa } from '../types'

// Datas-chave do plano (PRD §6 e checklist). ISO yyyy-mm-dd.
export const DATAS = {
  inicio: '2026-06-22',
  exame: '2026-09-14',
  simulados: '2026-09-09',
} as const

// Estrutura alinhada ao curso oficial DP-750T00 (4 learning paths, 15 módulos):
// https://learn.microsoft.com/en-us/training/courses/dp-750t00
const LEARN = 'https://learn.microsoft.com/en-us/training/paths/'

export const PERCURSOS: Percurso[] = [
  {
    id: 'p1',
    nome: 'Set up and configure environment',
    meta: '2026-07-08',
    pesoExame: '15–20%',
    learnPathUrl: `${LEARN}azure-databricks-data-engineer-set-up-configure-environment/`,
    moduloIds: ['m1', 'm2', 'm3', 'm4', 'm5'],
  },
  {
    id: 'p2',
    nome: 'Prepare and process data',
    meta: '2026-08-05',
    pesoExame: '30–35%',
    learnPathUrl: `${LEARN}azure-databricks-data-engineer-prepare-process-data/`,
    moduloIds: ['m6', 'm7', 'm8', 'm9'],
  },
  {
    id: 'p3',
    nome: 'Deploy and maintain data pipelines and workloads',
    meta: '2026-08-19',
    pesoExame: '30–35%',
    learnPathUrl: `${LEARN}azure-databricks-data-engineer-deploy-maintain-data-pipelines-workloads/`,
    moduloIds: ['m10', 'm11', 'm12', 'm13'],
  },
  {
    id: 'p4',
    nome: 'Secure and govern Unity Catalog objects',
    meta: '2026-08-26',
    pesoExame: '15–20%',
    learnPathUrl: `${LEARN}azure-databricks-data-engineer-secure-govern-unity-catalog/`,
    moduloIds: ['m14', 'm15'],
  },
]

// Títulos em PT (fiéis aos módulos oficiais do curso); o título oficial em inglês
// e o link da aula vivem em `src/data/guia.ts`.
export const MODULOS: Modulo[] = [
  { id: 'm1', percursoId: 'p1', titulo: 'Explorar o Azure Databricks' },
  { id: 'm2', percursoId: 'p1', titulo: 'Entender a arquitetura do Azure Databricks' },
  { id: 'm3', percursoId: 'p1', titulo: 'Entender as integrações do Azure Databricks' },
  { id: 'm4', percursoId: 'p1', titulo: 'Selecionar e configurar a computação' },
  { id: 'm5', percursoId: 'p1', titulo: 'Criar e organizar objetos no Unity Catalog' },

  { id: 'm6', percursoId: 'p2', titulo: 'Projetar e implementar modelagem de dados' },
  { id: 'm7', percursoId: 'p2', titulo: 'Ingerir dados no Unity Catalog' },
  { id: 'm8', percursoId: 'p2', titulo: 'Limpar, transformar e carregar dados' },
  {
    id: 'm9',
    percursoId: 'p2',
    titulo: 'Implementar e gerenciar restrições de qualidade de dados',
  },

  { id: 'm10', percursoId: 'p3', titulo: 'Projetar e implementar pipelines de dados' },
  { id: 'm11', percursoId: 'p3', titulo: 'Implementar Lakeflow Jobs' },
  {
    id: 'm12',
    percursoId: 'p3',
    titulo: 'Implementar processos do ciclo de vida de desenvolvimento',
  },
  {
    id: 'm13',
    percursoId: 'p3',
    titulo: 'Monitorar, solucionar problemas e otimizar cargas de trabalho',
  },

  { id: 'm14', percursoId: 'p4', titulo: 'Proteger objetos do Unity Catalog' },
  { id: 'm15', percursoId: 'p4', titulo: 'Governar objetos do Unity Catalog' },
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
