import type { GuiaModulo } from '../types'

/**
 * Matéria de apoio por módulo, mapeada a partir do guia de estudo oficial do
 * exame DP-750 (habilidades medidas a partir de 11/03/2026).
 * Fonte: https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/dp-750
 *
 * As `topicos` são as habilidades medidas oficiais redistribuídas para o módulo
 * mais próximo da trilha. Os `learnUrl` apontam para a doc canônica do Azure
 * Databricks (todas validadas como existentes). Conteúdo de referência fixo —
 * tratado como seed/constante, não como entrada do usuário.
 *
 * Pesos do exame por domínio (para contexto de prioridade):
 *  • Configurar ambiente (m1–m5) ........ 15–20%
 *  • Preparar e processar (m6–m9) ....... 30–35%
 *  • Implantar e manter (m10–m13) ....... 30–35%
 *  • Proteger e governar UC (m14–m15) ... 15–20%
 */
export const GUIA: Record<string, GuiaModulo> = {
  // ── Percurso 1 — Configurar e ajustar o ambiente (15–20%) ──
  m1: {
    topicos: [
      'Arquitetura lakehouse e o papel do Delta Lake como formato padrão',
      'Componentes do workspace: notebooks, compute, catálogo e workflows',
      'Planos do Azure Databricks (control plane × compute plane)',
      'Integração com Microsoft Entra, ADLS e Azure Monitor',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/introduction/',
    learnLabel: 'O que é o Azure Databricks',
  },
  m2: {
    topicos: [
      'Provisionar o workspace e integrar identidades via Microsoft Entra',
      'Configurar permissões de acesso a recursos do workspace',
      'Convenções de nomenclatura por isolamento e ambiente (dev/prod)',
      'Administração de conta e de workspace',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/admin/',
    learnLabel: 'Administração',
  },
  m3: {
    topicos: [
      'Escolher o tipo de computação: job, serverless, SQL warehouse, clássica e compartilhada',
      'Ajustar desempenho: CPU, nº de nós, autoescala, término, tipo de nó, tamanho e pool',
      'Configurar recursos: aceleração Photon, versão do runtime/Spark e ML',
      'Instalar bibliotecas no recurso de computação',
      'Configurar permissões de acesso à computação',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/compute/',
    learnLabel: 'Computação',
  },
  m4: {
    topicos: [
      'Trabalhar com notebooks no workspace',
      'Git folders (Repos): versionar com Git, branches e pull requests',
      'Databricks CLI e APIs REST para automação',
      'Boas práticas de controle de versão (base do SDLC)',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/notebooks/',
    learnLabel: 'Notebooks',
  },
  m5: {
    topicos: [
      'Arquitetura do Spark: driver, executores e particionamento',
      'DataFrames e Spark SQL: transformações × ações (lazy evaluation)',
      'Apache Spark no Databricks Runtime',
      'Noções de DAG e execução distribuída',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/spark/',
    learnLabel: 'Apache Spark',
  },

  // ── Percurso 2 — Preparar e processar dados (30–35%) ──
  m6: {
    topicos: [
      'Criar e carregar DataFrames; escolher tipos de coluna apropriados',
      'Filtrar, agrupar e agregar dados',
      'Combinar com join, union, intersect e except',
      'Desnormalizar, pivotar e despivotar',
      'Tratar duplicados, ausentes e nulos; profiling de dados',
      'Carregar com merge, insert e append',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/getting-started/dataframes',
    learnLabel: 'DataFrames do Spark',
  },
  m7: {
    topicos: [
      'Tabelas Delta: gerenciadas × externas; formato padrão do lakehouse',
      'Upsert com MERGE; histórico e time travel',
      'Liquid clustering, Z-order e deletion vectors',
      'Imposição e evolução de esquema',
      'Dimensões de mudança lenta (SCD) e tabelas temporais',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/delta/',
    learnLabel: 'Delta Lake',
  },
  m8: {
    topicos: [
      'Auto Loader: ingestão incremental de arquivos do armazenamento de objetos',
      'Structured Streaming: tabelas como fontes e destinos de streaming',
      'Ingerir de Azure Event Hubs e outros barramentos de mensagens',
      'Captura de mudanças (CDC feed)',
      'COPY INTO e CREATE STREAMING TABLE',
      'Lote × streaming e modos de gatilho',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/structured-streaming/concepts',
    learnLabel: 'Structured Streaming',
  },
  m9: {
    topicos: [
      'Lakeflow Spark Declarative Pipelines: tabelas de streaming e views materializadas',
      'Definir transformações declarativas em Python/SQL',
      'Expectations: gerenciar a qualidade de dados no pipeline',
      'Validações: nulidade, cardinalidade, intervalo e tipo',
      'Modos de pipeline: acionado (lote) × contínuo (streaming)',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/ldp/',
    learnLabel: 'Lakeflow Declarative Pipelines',
  },

  // ── Percurso 3 — Implantar e manter pipelines e cargas (30–35%) ──
  m10: {
    topicos: [
      'Lakeflow Jobs: tarefas, dependências e ordem de operações (DAG)',
      'Configurar gatilhos (tempo/evento) e agendar execuções',
      'Configurar alertas e notificações de trabalho',
      'Reinicializações automáticas de tarefa/pipeline',
      'Tratamento de erros e lógica condicional (if/else, for each)',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/jobs/',
    learnLabel: 'Lakeflow Jobs',
  },
  m11: {
    topicos: [
      'Asset Bundles (Pacotes de Automação Declarativa): definir recursos via YAML',
      'Configurar, validar e empacotar bundles',
      'Implantar via CLI do Databricks e APIs REST',
      'Git: branching, pull requests e resolução de conflitos',
      'Estratégia de testes: unitário, integração, ponta a ponta e UAT',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/dev-tools/bundles/',
    learnLabel: 'Asset Bundles',
  },
  m12: {
    topicos: [
      'Monitorar consumo de cluster para desempenho e custo',
      'Solucionar problemas em Lakeflow Jobs: reparar, reiniciar, parar e reexecutar',
      'Investigar cache, distorção (skew), vazamento (spill) e embaralhamento (shuffle) via DAG, Spark UI e perfil de consulta',
      'Ajustar notebooks e jobs Spark; resolver gargalos de recursos',
      'Log streaming com Log Analytics no Azure Monitor; configurar alertas',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/optimizations/',
    learnLabel: 'Otimização e desempenho',
  },
  m13: {
    topicos: [
      'OPTIMIZE: compactar arquivos e melhorar o layout dos dados',
      'VACUUM: remover arquivos de dados não referenciados',
      'Particionamento, Z-order e clustering líquido',
      'Aceleração Photon e otimização preditiva',
      'Equilibrar desempenho × custo',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/delta/optimize',
    learnLabel: 'Otimizar layout de dados',
  },

  // ── Percurso 4 — Proteger e governar objetos do Unity Catalog (15–20%) ──
  m14: {
    topicos: [
      'Organizar objetos: catálogos, esquemas, volumes, tabelas e views',
      'DDL em tabelas gerenciadas e externas; catálogo estrangeiro (foreign catalog)',
      'Convenções de nomenclatura por isolamento, ambiente e compartilhamento externo',
      'Descoberta de dados: descrições, tags e instruções do Genie (IA/BI)',
      'Linhagem no Catalog Explorer (proprietário, histórico, dependências)',
      'ABAC com tags e políticas; retenção de dados; Delta Sharing',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/data-governance/unity-catalog/',
    learnLabel: 'Unity Catalog',
  },
  m15: {
    topicos: [
      'Conceder privilégios a usuários, grupos e service principals',
      'Controle de acesso por tabela, coluna e linha (row-level security)',
      'Filtros de linha e máscaras de coluna',
      'Segredos do Azure Key Vault; service principals e managed identities',
      'Configurar logs de auditoria',
    ],
    learnUrl: 'https://learn.microsoft.com/pt-br/azure/databricks/security/',
    learnLabel: 'Segurança e conformidade',
  },
}
