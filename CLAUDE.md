# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Estado atual

**MVP local-first + v1.1 + v1.2 concluídos** e validados (`npm run build` + `typecheck` ok):
dashboard, checklist gamificado (15 módulos + simulados + revisão), XP/níveis, badges,
ofensiva, contagem regressiva, **registro de simulados com sparkline** (F6) e
**microinterações** (toasts de level-up/badge, glow, countdown pulsando — F10), tudo
persistido em `localStorage`. Pendente: **F7 sync Supabase**, **F8 PWA**, **F9 deploy
Vercel**, depois extras/testes. Backlog completo: `C:\Users\Igorn\.claude\plans\keen-discovering-rose.md`.

Documentos-fonte:

- `.llm/PRD/DeltaQuest_PRD.md` — **fonte de verdade do produto**. Leia por inteiro antes de implementar.
- `.llm/PRD/04_checklist_progresso.md` — conteúdo canônico da trilha (seed do app).

## Stack e arquitetura (decidida)

- **Frontend:** React + Vite + TypeScript.
- **Estilo:** Tailwind CSS (tema escuro estilo IDE — ver Direção visual).
- **Estado + persistência local:** Zustand com middleware `persist` → `localStorage`
  (cache offline e fonte de verdade enquanto offline).
- **Sync entre dispositivos:** Supabase (Postgres + Auth). Login leve de **um único usuário**
  para ler/gravar o mesmo progresso no PC e no celular; RLS protege a linha do usuário.
  Estratégia **last-write-wins** (suficiente para 1 usuário).
- **Offline / instalável:** PWA via `vite-plugin-pwa`.
- **Hospedagem:** Vercel (build estático, deploy no `git push`). **Sem servidor próprio / sem Render.**

**Ordem de construção:** (A) MVP local-first 100% funcional com localStorage → (B) camada de
sync Supabase → (C) deploy na Vercel. A fase B precisa das credenciais do projeto Supabase em
`.env`: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

**Comandos (Vite):** `npm run dev` · `npm run build` · `npm run preview`.
Atualize aqui quando lint/testes forem adicionados.

## O produto: DeltaQuest

SPA gamificada, de **uso pessoal e single-user**, que transforma o plano de estudos da
certificação **DP-750 (Azure Databricks)** num painel com XP, níveis, badges, ofensiva
(streak) e contagem regressiva para o exame. Objetivo real: sustentar a motivação do
candidato ao longo de ~13 semanas até a prova.

## Restrições arquiteturais que moldam o design (não-óbvias, do PRD)

Estas decisões são deliberadas e devem ser respeitadas — não são acidentes a "melhorar":

- **Offline-first com sync na nuvem.** O app abre e funciona offline (localStorage como cache)
  e sincroniza com Supabase quando online. *Desvio consciente do PRD* (que pedia 100% local sem
  backend): o candidato optou por sincronizar o progresso entre dispositivos. Mantenha o offline
  sempre funcionando — a nuvem é sync, não dependência para abrir o app.
- **Single-user com auth leve.** Continua um único usuário (sem social/ranking), mas há **login
  (uma conta)** para identificar o mesmo progresso entre dispositivos — outro desvio consciente
  do "sem autenticação" do PRD.
- **Persistência por blocos.** O estado é salvo automaticamente a cada ação, mas
  agrupado em chaves por bloco coeso (ver modelo de dados na seção 9 do PRD) para
  minimizar escritas — não persista campo a campo.
- **Escopo travado no MVP.** O risco explícito do projeto é over-engineering. O MVP
  (dashboard, checklist, XP/níveis, badges, ofensiva, countdown, persistência) vem
  primeiro; simulados, animações e export/import são fases posteriores (roadmap, seção 10).
- **Responsivo desktop + mobile** e respeita `prefers-reduced-motion`.

## Regras de negócio e constantes do domínio

Os dados do domínio são **fixos e conhecidos** — modele-os como seed/constantes, não como
entrada do usuário:

- **Trilha = 15 módulos em 4 percursos**, com nomes reais e metas de data:
  1. *Set up and configure environment* — 5 módulos, meta **08/07**
  2. *Prepare and process data* — 4 módulos, meta **05/08**
  3. *Deploy and maintain data pipelines and workloads* — 4 módulos, meta **19/08**
  4. *Secure and govern Unity Catalog objects* — 2 módulos, meta **26/08**
- **Fase de simulados**: 5 tarefas, meta **09/09**. **Revisão final**: 4 tarefas (semana 13).
- **Datas-chave**: início do estudo **22/06/2026**; exame **14/09/2026** (alvo da contagem
  regressiva).
- **XP por ação**: módulo 100 · bônus de percurso concluído 250 · tarefa de simulado 75 ·
  tarefa de revisão 50 · dia de estudo registrado 20.
- **Curva de nível**: nível N exige `100 × N²` de XP acumulado (primeiros níveis rápidos).
- **Badges**: desbloqueadas por marcos reais (1º módulo, cada percurso, trilha 100%,
  ofensivas de 7/21 dias, simulado ≥ 85%, revisão completa). Lista completa na seção 5.2.
- **Ofensiva (streak)**: conta **dias de estudo *planejados*** com atividade registrada —
  **não dias corridos**. A agenda já prevê quarta e quinta sem estudo, então esses dias
  não podem quebrar a ofensiva. Prevê um "freeze" de 1 dia. Implementar isso ingenuamente
  (dias corridos) é um bug de produto.

> A fonte canônica do conteúdo da trilha é `.llm/PRD/04_checklist_progresso.md` (títulos
> dos 15 módulos, tarefas de simulado e de revisão). Use-a como *seed* do app. Os títulos
> dos módulos ali são uma reconstrução de melhor esforço — confirme-os com o candidato
> antes de tratá-los como definitivos; percursos, contagens e datas-meta já são fiéis ao PRD.

## Direção visual

Tema **escuro estilo IDE**: fundo grafite-azulado, cores semânticas de "sintaxe" (âmbar = XP,
ciano = conquistas, laranja = ofensiva, verde = concluído), fonte **monoespaçada para
números/dados** e sans para texto corrido. Ousadia só nos momentos de recompensa (level-up,
badge); o resto do painel é quieto e legível. Detalhes na seção 8 do PRD.
