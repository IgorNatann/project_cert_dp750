# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Estado atual

**MVP + v1.1 + v1.2 + sync na nuvem + deploy + PWA concluídos** e validados (`npm run build`,
`typecheck`, `lint` e `test` ok — 29 testes): dashboard, checklist gamificado (15 módulos +
simulados + revisão), XP/níveis, badges, ofensiva, contagem regressiva, **registro de
simulados com sparkline** (F6), **microinterações** (toasts de level-up/badge, glow,
countdown pulsando — F10), **sync Supabase com login leve** (F7), **matéria de apoio por
módulo alinhada ao curso oficial DP-750T00** com link das aulas (`src/data/guia.ts`), **selo
de peso do exame por percurso** e **PWA instalável/offline** (F8). Tudo persiste em `localStorage` (offline-first)
e sincroniza quando há login + Supabase configurado.

**Em produção:** deploy automático na Vercel a cada merge na `main` (F9) →
https://deltaquest.vercel.app (projeto `deltaquest`).

**PWA (F8):** `vite-plugin-pwa` com `registerType: 'autoUpdate'` e precache do app shell;
ícones gerados por `npx pwa-assets-generator` (config em `pwa-assets.config.ts`) a partir de
`public/favicon.svg`. O service worker só roda em `build`/`preview`, não em `dev`.

**Pendente:** apenas extras — export/import de progresso em JSON.
Backlog completo: `C:\Users\Igorn\.claude\plans\keen-discovering-rose.md`.

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
- **Offline / instalável:** PWA via `vite-plugin-pwa` (manifest + service worker, autoUpdate).
- **Hospedagem:** Vercel (build estático, deploy no `git push`). **Sem servidor próprio / sem Render.**

**Ordem de construção:** (A) MVP local-first com localStorage ✅ → (B) camada de sync
Supabase ✅ → (C) deploy na Vercel ✅ → (D) PWA instalável/offline ✅. A fase B usa as
credenciais do Supabase em `.env`: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` — sem elas o
cliente Supabase fica `null`, o sync vira no-op e o app roda 100% local.

**Comandos:** `npm run dev` · `npm run build` · `npm run preview` · `npm run typecheck`
(`tsc --noEmit`) · `npm run test` (Vitest) · `npm run test:watch` · `npm run lint` (ESLint) ·
`npm run format` (Prettier). Rode `typecheck` + `lint` + `test` + `build` antes de abrir PR.

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

- **Trilha = 15 módulos em 4 percursos**, com nomes reais, metas de data e peso no exame
  (do guia oficial — note que o nº de módulos não acompanha o peso):
  1. *Set up and configure environment* — 5 módulos, meta **08/07** · peso **15–20%**
  2. *Prepare and process data* — 4 módulos, meta **05/08** · peso **30–35%**
  3. *Deploy and maintain data pipelines and workloads* — 4 módulos, meta **19/08** · peso **30–35%**
  4. *Secure and govern Unity Catalog objects* — 2 módulos, meta **26/08** · peso **15–20%**
- **Fase de simulados**: 5 tarefas, meta **09/09**. **Revisão final**: 4 tarefas (semana 13).
- **Datas-chave**: início do estudo **22/06/2026**; exame **14/09/2026** (alvo da contagem
  regressiva).
- **XP por ação**: módulo 100 · bônus de percurso concluído 250 · tarefa de simulado 75 ·
  tarefa de revisão 50 · dia de estudo registrado 20.
- **Curva de nível**: nível N exige `100 × (N − 1)²` de XP acumulado — offset para começar no
  nível 1 com 0 XP (primeiros níveis rápidos). Ver `src/data/xp.ts` e `xp.test.ts`.
- **Badges**: desbloqueadas por marcos reais (1º módulo, cada percurso, trilha 100%,
  ofensivas de 7/21 dias, simulado ≥ 85%, revisão completa). Lista completa na seção 5.2.
- **Ofensiva (streak)**: conta **dias de estudo *planejados*** com atividade registrada —
  **não dias corridos**. A agenda já prevê quarta e quinta sem estudo, então esses dias
  não podem quebrar a ofensiva. Prevê um "freeze" de 1 dia. Implementar isso ingenuamente
  (dias corridos) é um bug de produto.

> A fonte canônica do conteúdo da trilha é `.llm/PRD/04_checklist_progresso.md` (títulos
> dos 15 módulos, tarefas de simulado e de revisão). Use-a como *seed* do app. Os 15 módulos
> estão **alinhados ao curso oficial DP-750T00** (4 learning paths × 5/4/4/2 = 15 módulos) —
> título em PT no app + título oficial em inglês; percursos, contagens, datas-meta e pesos
> seguem fiéis ao curso e ao PRD.
>
> A **matéria de apoio** vive em `src/data/guia.ts` (keyed por id do módulo): `tituloOficial`
> (inglês), `topicos` e `learnUrl` — link direto para a **aula** no Microsoft Learn. O
> **learning path** de cada percurso está em `src/data/trilha.ts` (`learnPathUrl`). Curso
> completo: https://learn.microsoft.com/en-us/training/courses/dp-750t00 (todas as URLs validadas).

## Direção visual

Tema **escuro estilo IDE**: fundo grafite-azulado, cores semânticas de "sintaxe" (âmbar = XP,
ciano = conquistas, laranja = ofensiva, verde = concluído), fonte **monoespaçada para
números/dados** e sans para texto corrido. Ousadia só nos momentos de recompensa (level-up,
badge); o resto do painel é quieto e legível. Detalhes na seção 8 do PRD.
