# PRD — DeltaQuest

**Product Requirements Document**
Plataforma de estudo gamificada para a certificação DP-750

| | |
|---|---|
| **Produto** | DeltaQuest — ambiente de estudo gamificado |
| **Autor** | Chavier (mentor DP-750) com Igor Ferreira Rodrigues |
| **Versão** | 1.0 |
| **Data** | 18 de junho de 2026 |
| **Status** | Draft para aprovação |
| **Stakeholder único** | Igor Ferreira Rodrigues (candidato DP-750) |

---

## 1. Resumo executivo

DeltaQuest é um aplicativo web de página única (SPA) que transforma o plano de
estudos da certificação **DP-750: Implementing Data Engineering Solutions Using
Azure Databricks** num ambiente gamificado de progresso. O objetivo é sustentar
a motivação e a consistência de estudo ao longo das ~13 semanas que antecedem o
exame (14/09/2026), substituindo um checklist estático em Markdown por um painel
interativo com XP, níveis, conquistas, ofensiva (streak) e estatísticas.

O produto é de uso pessoal, single-user, sem backend de servidor: todo o estado
é persistido localmente no navegador. Não há autenticação, não há dados de
terceiros, não há custo recorrente.

---

## 2. Problema e oportunidade

### 2.1 Problema
O acompanhamento do progresso hoje vive num arquivo Markdown (`04_checklist_progresso.md`).
Funciona como registro, mas é inerte: não dá feedback, não recompensa avanço, não
visualiza o quanto falta, e não cria o gatilho diário de "voltar e estudar". Em uma
maratona de 13 semanas, a queda de motivação na metade do percurso é o maior risco
para a aprovação — não a dificuldade do conteúdo.

### 2.2 Oportunidade
O plano DP-750 já é naturalmente "gamificável": tem 15 módulos discretos, 4
percursos com metas de data, uma fase de simulados com nota-alvo e uma contagem
regressiva para o exame. Mapear essa estrutura para mecânicas de jogo (pontos,
níveis, medalhas, ofensiva) cria reforço positivo a cada sessão e torna o progresso
tangível e satisfatório.

### 2.3 Por que agora
O estudo começa em 22/06. Construir a ferramenta no início do percurso maximiza o
retorno: ela acompanha o candidato desde o primeiro módulo até o dia da prova.

---

## 3. Objetivos e métricas de sucesso

### 3.1 Objetivos do produto
1. Tornar o progresso de estudo visível e recompensador.
2. Criar um gatilho de retorno diário (via ofensiva e metas).
3. Centralizar num só lugar: checklist, contagem regressiva, simulados e estatísticas.
4. Reduzir o atrito de "saber o que estudar hoje".

### 3.2 Métricas de sucesso (pessoais)
| Métrica | Alvo |
|---|---|
| Consistência de estudo | Ofensiva média ≥ 4 dias/semana |
| Conclusão da trilha | 15/15 módulos até 26/08 (marco do plano) |
| Desempenho em simulado | ≥ 85% antes de 09/09 |
| Uso da ferramenta | Abertura em ≥ 80% dos dias de estudo planejados |
| Resultado final | Aprovação no DP-750 em 14/09/2026 |

### 3.3 Não-objetivos (out of scope)
- Não é uma plataforma multiusuário nem social (sem ranking entre pessoas).
- Não hospeda conteúdo de estudo (isso vive no Microsoft Learn e no NotebookLM).
- Não substitui o mentor nem gera os quizzes (isso continua no chat/NotebookLM).
- Não sincroniza com o Google Calendar nem com o Microsoft Learn via API.

---

## 4. Persona e contexto de uso

**Igor Ferreira Rodrigues** — profissional de dados experiente (SQL, ETL, pipelines),
preparando-se para o DP-750. Estuda à noite (seg/ter/sex, 19h30–21h00), com sessão
longa no sábado e revisão no domingo. Valoriza eficiência, foco e estética estilo IDE.

**Contextos de uso principais:**
- *Início da sessão de estudo:* abre o painel para ver o que fazer hoje e o progresso atual.
- *Fim da sessão:* marca módulos concluídos, ganha XP, vê a ofensiva subir.
- *Domingo (revisão):* registra nota de simulado, revisa estatísticas da semana.
- *Momentos de baixa motivação:* abre para ver conquistas desbloqueadas e o quanto já avançou.

---

## 5. Mecânicas de gamificação (detalhe)

### 5.1 XP e níveis
- Cada ação concluída concede XP. Sugestão de balanceamento:
  - Módulo concluído: **100 XP**
  - Percurso concluído (bônus): **250 XP**
  - Tarefa da fase de simulados: **75 XP**
  - Tarefa de revisão final: **50 XP**
  - Dia de estudo registrado (manter ofensiva): **20 XP**
- Níveis seguem curva crescente (ex.: nível N exige `100 × N²` XP acumulado),
  de modo que os primeiros níveis venham rápido (reforço inicial) e os últimos
  exijam consistência.
- O nível atual e a barra "XP até o próximo nível" ficam sempre visíveis no topo.

### 5.2 Conquistas / badges
Medalhas desbloqueadas por marcos reais do plano. Exemplos:
| Badge | Condição |
|---|---|
| **Primeiro Commit** | Concluir o 1º módulo |
| **Ambiente no Ar** | Concluir o Percurso 1 |
| **Domador de Delta** | Concluir o Percurso 2 |
| **Pipeline Master** | Concluir o Percurso 3 |
| **Guardião do Catálogo** | Concluir o Percurso 4 |
| **Trilha 100%** | Concluir os 15 módulos |
| **Maratonista** | Atingir ofensiva de 7 dias |
| **Inabalável** | Atingir ofensiva de 21 dias |
| **Acima da Linha** | Registrar simulado ≥ 85% |
| **Pronto para a Prova** | Concluir todas as tarefas de revisão final |

### 5.3 Ofensiva (streak)
- Conta dias consecutivos com pelo menos uma ação registrada.
- Exibe a ofensiva atual e o recorde pessoal.
- Tolerância opcional: "freeze" de 1 dia para não punir um descanso planejado
  (a agenda já prevê quarta e quinta sem estudo — a ofensiva deve considerar
  "dias de estudo planejados", não dias corridos, para não desmotivar).

### 5.4 Progresso visual
- Barra de progresso geral da trilha (módulos concluídos / 15).
- Barra por percurso, com a meta de data e indicador de "no prazo / atrasado".
- Contagem regressiva grande para o exame (dias restantes até 14/09).

---

## 6. Escopo funcional

### 6.1 Painel principal (dashboard)
- Topo: nível atual, barra de XP, ofensiva atual, dias até o exame.
- Estatísticas: XP total, módulos concluídos, conquistas desbloqueadas, % da trilha.

### 6.2 Checklist gamificado
Reflete fielmente o `04_checklist_progresso.md`:
- **Trilha oficial (15 módulos em 4 percursos)** com nomes reais dos percursos:
  1. Set up and configure environment (5 módulos, meta 08/07)
  2. Prepare and process data (4 módulos, meta 05/08)
  3. Deploy and maintain data pipelines and workloads (4 módulos, meta 19/08)
  4. Secure and govern Unity Catalog objects (2 módulos, meta 26/08)
- **Fase de simulados** (5 tarefas, meta 09/09).
- **Revisão final** (4 tarefas, semana 13).
- Marcar um item concede XP, anima a barra e pode disparar uma conquista.

### 6.3 Registro de simulados
- Formulário simples: data, nome do simulado, nota (%), observações.
- Histórico em tabela e mini-gráfico de evolução das notas.
- Nota ≥ 85% dispara a badge "Acima da Linha".

### 6.4 Estatísticas de estudo
- Total de XP, nível, ofensiva atual e recorde.
- Distribuição de progresso por percurso.
- Linha do tempo de marcos (datas-meta do plano) com status.

### 6.5 Gestão de estado
- Botão para **resetar** todo o progresso (com confirmação).
- Estado persistido automaticamente a cada ação.

---

## 7. Requisitos não-funcionais

| Requisito | Especificação |
|---|---|
| **Plataforma** | App web single-page, abre no navegador |
| **Persistência** | Armazenamento local persistente entre sessões; sem servidor |
| **Privacidade** | 100% local; nenhum dado sai do dispositivo |
| **Offline** | Funciona sem internet após carregado |
| **Responsivo** | Desktop e mobile (estudo pelo celular à noite) |
| **Acessibilidade** | Foco de teclado visível, contraste adequado, respeita reduce-motion |
| **Performance** | Carregamento instantâneo; animações leves |

---

## 8. Direção visual

**Tema escuro estilo IDE — foco total.**
- Paleta inspirada num editor de código real: fundo grafite-azulado profundo,
  texto claro de baixo brilho, e cores de "sintaxe" para os acentos —
  âmbar para XP, ciano para conquistas, laranja-quente para ofensiva,
  verde para concluído.
- Tipografia: uma fonte monoespaçada para números/XP/dados (reforça a vibe IDE)
  e uma sans limpa para texto corrido.
- Microinterações discretas: barra de XP que preenche com easing, badge que
  "acende" ao desbloquear, contagem regressiva pulsando suavemente.
- Disciplina: a ousadia mora nos momentos de recompensa (level up, badge);
  o resto do painel é quieto e legível, como um bom editor.

---

## 9. Modelo de dados (conceitual)

```
estado_global {
  xp_total: number
  nivel: number (derivado de xp_total)
  ofensiva_atual: number
  ofensiva_recorde: number
  ultimo_dia_registrado: date
  modulos: [ { id, percurso, titulo, concluido: bool, data_conclusao } ]
  tarefas_simulado: [ { id, titulo, concluido } ]
  tarefas_revisao: [ { id, titulo, concluido } ]
  badges: [ { id, titulo, desbloqueado: bool, data } ]
  registros_simulado: [ { data, nome, nota, observacoes } ]
}
```

Persistência via armazenamento chave-valor do app (uma chave por bloco de estado
atualizado em conjunto, para minimizar escritas).

---

## 10. Roadmap de implementação

| Fase | Entrega | Conteúdo |
|---|---|---|
| **MVP (v1.0)** | App funcional | Dashboard, checklist gamificado, XP/níveis, badges, ofensiva, contagem regressiva, persistência |
| **v1.1** | Simulados | Registro de notas, histórico e gráfico de evolução |
| **v1.2** | Polimento | Animações de level-up e badge, freeze de ofensiva, ajustes de balanceamento de XP |
| **v1.3 (opcional)** | Extras | Exportar/importar progresso (JSON), modo "véspera do exame" com checklist do dia da prova |

---

## 11. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Gamificação vira distração | Médio | Manter painel enxuto; recompensa serve o estudo, não o contrário |
| Perda de dados (limpar navegador) | Alto | v1.3 com export/import de progresso em JSON |
| Ofensiva punir descanso planejado | Médio | Contar "dias de estudo planejados", com freeze |
| Over-engineering | Médio | Travar escopo do MVP; extras só depois de usar de verdade |

---

## 12. Critérios de aceitação do MVP

- [ ] Os 15 módulos reais aparecem agrupados nos 4 percursos com nomes e metas corretos.
- [ ] Marcar um módulo concede XP e atualiza a barra de progresso na hora.
- [ ] Concluir um percurso desbloqueia a badge correspondente.
- [ ] A ofensiva incrementa ao registrar atividade e exibe o recorde.
- [ ] A contagem regressiva mostra os dias corretos até 14/09/2026.
- [ ] O progresso persiste ao fechar e reabrir o navegador.
- [ ] Existe botão de reset com confirmação.
- [ ] Interface legível e usável em desktop e mobile, com tema escuro estilo IDE.
