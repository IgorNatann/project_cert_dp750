import type { GuiaModulo } from '../types'

/**
 * Matéria de apoio por módulo, alinhada ao curso oficial DP-750T00 (4 learning paths,
 * 15 módulos): https://learn.microsoft.com/en-us/training/courses/dp-750t00
 *
 * Cada entrada traz o título oficial (inglês), os tópicos cobertos pelo módulo e o link
 * direto para a aula no Microsoft Learn (todas as URLs validadas). Conteúdo de referência
 * fixo — seed/constante, não entrada do usuário.
 *
 * Pesos do exame por domínio (contexto de prioridade):
 *  • Configurar ambiente (m1–m5) ........ 15–20%
 *  • Preparar e processar (m6–m9) ....... 30–35%
 *  • Implantar e manter (m10–m13) ....... 30–35%
 *  • Proteger e governar UC (m14–m15) ... 15–20%
 */
const MOD = 'https://learn.microsoft.com/en-us/training/modules/'

export const GUIA: Record<string, GuiaModulo> = {
  // ── Percurso 1 — Set up and configure environment (15–20%) ──
  m1: {
    tituloOficial: 'Explore Azure Databricks',
    topicos: [
      'Azure Databricks como plataforma de analytics sobre Apache Spark',
      'Workspace, notebooks e o ecossistema do Databricks',
      'Conceito de lakehouse e o papel do Delta Lake',
      'Cargas de trabalho: engenharia de dados, analytics e IA',
    ],
    learnUrl: `${MOD}explore-azure-databricks/`,
  },
  m2: {
    tituloOficial: 'Understand Azure Databricks architecture',
    topicos: [
      'Separação entre control plane e compute plane',
      'Hierarquia da conta (account, workspaces, metastore)',
      'Compute serverless × clássico',
      'Armazenamento: default, externo e gerenciado pelo Unity Catalog',
    ],
    learnUrl: `${MOD}understand-azure-databricks-architecture/`,
  },
  m3: {
    tituloOficial: 'Understand Azure Databricks integrations',
    topicos: [
      'Integração com Microsoft Fabric e Power BI',
      'Visual Studio Code e ferramentas de desenvolvimento',
      'Power Platform e Copilot Studio',
      'Microsoft Purview e Microsoft Foundry',
    ],
    learnUrl: `${MOD}understand-azure-databricks-integrations/`,
  },
  m4: {
    tituloOficial: 'Select and configure compute',
    topicos: [
      'Escolher o tipo de computação: serverless × clássico, job e warehouse',
      'Ajustar desempenho: nº de nós, autoescala, término e pools',
      'Instalar bibliotecas no recurso de computação',
      'Permissões de acesso e otimização de custo',
    ],
    learnUrl: `${MOD}select-and-configure-compute/`,
  },
  m5: {
    tituloOficial: 'Create and organize objects in Unity Catalog',
    topicos: [
      'Namespace de três níveis: catálogos, esquemas e objetos',
      'Criar catálogos para isolamento por ambiente',
      'Tabelas, views e volumes (estruturados e não estruturados)',
      'Catálogos estrangeiros (foreign catalogs) e conexões',
      'Convenções de nomenclatura e instruções do Genie (IA/BI)',
    ],
    learnUrl: `${MOD}create-and-organize-objects-in-unity-catalog/`,
  },

  // ── Percurso 2 — Prepare and process data (30–35%) ──
  m6: {
    tituloOficial: 'Design and implement data modeling',
    topicos: [
      'Projetar a lógica de ingestão e configurar a fonte de dados',
      'Escolher ferramenta de ingestão e formato de tabela',
      'Esquemas de particionamento',
      'Dimensões de mudança lenta (SCD) e granularidade',
      'Estratégias de clustering para desempenho',
    ],
    learnUrl: `${MOD}design-implement-data-modeling-unity-catalog/`,
  },
  m7: {
    tituloOficial: 'Ingest data into Unity Catalog',
    topicos: [
      'Conectores gerenciados com Lakeflow Connect',
      'Ingestão por notebooks e por SQL (COPY INTO, CTAS)',
      'Captura de mudanças (CDC feed)',
      'Streaming a partir de barramentos de mensagens',
      'Auto Loader e Lakeflow Spark Declarative Pipelines',
    ],
    learnUrl: `${MOD}ingest-data-into-unity-catalog/`,
  },
  m8: {
    tituloOficial: 'Cleanse, transform, and load data',
    topicos: [
      'Profiling e escolha de tipos de coluna',
      'Resolver duplicados e valores nulos',
      'Filtrar, agregar, joins e operadores de conjunto',
      'Pivotar e desnormalizar dados',
      'Carregar com append, overwrite e merge',
    ],
    learnUrl: `${MOD}cleanse-transform-load-data-into-unity-catalog/`,
  },
  m9: {
    tituloOficial: 'Implement and manage data quality constraints',
    topicos: [
      'Verificações de validação (nulidade, cardinalidade, intervalo)',
      'Imposição de esquema e gestão de schema drift',
      'Expectations em Lakeflow Spark Declarative Pipelines',
      'Garantir integridade ao longo do pipeline',
    ],
    learnUrl: `${MOD}implement-manage-data-quality-constraints-unity-catalog/`,
  },

  // ── Percurso 3 — Deploy and maintain data pipelines and workloads (30–35%) ──
  m10: {
    tituloOficial: 'Design and implement data pipelines',
    topicos: [
      'Pipelines com notebooks e Lakeflow Spark Declarative Pipelines',
      'Definir a ordem de operações e a lógica das tarefas',
      'Tratamento de erros no pipeline',
      'Orquestrar transformações de ponta a ponta',
    ],
    learnUrl: `${MOD}design-implement-data-pipelines/`,
  },
  m11: {
    tituloOficial: 'Implement Lakeflow Jobs',
    topicos: [
      'Criar jobs e configurar tarefas',
      'Configurar gatilhos e agendamento',
      'Alertas e notificações de execução',
      'Reinicializações automáticas',
    ],
    learnUrl: `${MOD}implement-lakeflow-jobs/`,
  },
  m12: {
    tituloOficial: 'Implement development lifecycle processes',
    topicos: [
      'Git folders: versionamento, branches e pull requests',
      'Estratégias de teste (unitário, integração, e2e, UAT)',
      'Declarative Automation Bundles (Asset Bundles)',
      'Deploy entre ambientes via CLI do Databricks',
    ],
    learnUrl: `${MOD}implement-development-lifecycle-processes-in-azure-databricks/`,
  },
  m13: {
    tituloOficial: 'Monitor, troubleshoot and optimize workloads',
    topicos: [
      'Métricas de consumo de cluster (desempenho × custo)',
      'Troubleshooting de Lakeflow Jobs e de jobs Spark',
      'Cache, skew, spill e shuffle (DAG, Spark UI, query profile)',
      'Otimização (OPTIMIZE/VACUUM) e log streaming no Azure Monitor',
    ],
    learnUrl: `${MOD}monitor-troubleshoot-optimize-workloads-azure-databricks/`,
  },

  // ── Percurso 4 — Secure and govern Unity Catalog objects (15–20%) ──
  m14: {
    tituloOficial: 'Secure Unity Catalog objects',
    topicos: [
      'Controle de acesso por tabela e esquema; permissões granulares',
      'Filtros de linha e máscaras de coluna',
      'Acessar segredos do Azure Key Vault',
      'Autenticar com service principals e managed identities',
    ],
    learnUrl: `${MOD}secure-unity-catalog-objects/`,
  },
  m15: {
    tituloOficial: 'Govern Unity Catalog objects',
    topicos: [
      'Linhagem de dados (data lineage)',
      'Configurar logs de auditoria',
      'ABAC: controle de acesso baseado em atributo com tags',
      'Compartilhamento seguro com Delta Sharing',
    ],
    learnUrl: `${MOD}govern-unity-catalog-objects/`,
  },
}
