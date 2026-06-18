# 🟩🟨 DeltaQuest

> Trilha de estudo **gamificada** para a certificação **DP-750 — Implementing Data
> Engineering Solutions Using Azure Databricks**.

DeltaQuest transforma o plano de estudos das ~13 semanas até o exame (14/09/2026) num
painel com **XP, níveis, conquistas, ofensiva (streak) e contagem regressiva** — para
sustentar a motivação e a consistência, não só registrar progresso. App de página única,
**uso pessoal**, com tema escuro estilo IDE.

---

## ✨ O que tem hoje

- **Dashboard** com nível, barra de XP, ofensiva (+ recorde) e dias até a prova.
- **Checklist gamificado** dos 15 módulos em 4 percursos, com barra de progresso, data-meta
  e indicador de atraso — além das fases de **simulados** e **revisão final**.
- **XP & níveis**: cada ação concede XP; a curva faz os primeiros níveis virem rápido.
- **Conquistas/badges** desbloqueadas por marcos reais do plano.
- **Ofensiva inteligente**: conta apenas os *dias de estudo planejados* (folga não quebra a
  sequência) e tem um "freeze" de tolerância.
- **Registro de simulados** com histórico e **mini-gráfico (sparkline)** de evolução das notas.
- **Microinterações**: toasts de level-up e de badge, glow ao desbloquear, countdown pulsando.
- **Persistência local** automática e **acessibilidade** (foco de teclado, `prefers-reduced-motion`).

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 + Vite 6 + TypeScript |
| Estilo | Tailwind CSS v4 (tema escuro estilo IDE) |
| Estado + persistência | Zustand (`persist`) → `localStorage` |
| Sync entre dispositivos *(planejado)* | Supabase |
| Hospedagem *(planejada)* | Vercel |

## 🚀 Começando

Requisitos: **Node 20+** (desenvolvido no Node 24) e npm.

```bash
npm install      # instala dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
```

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run typecheck` | Checagem de tipos com `tsc --noEmit` |

## 📂 Estrutura

```
src/
├─ data/         # dados do domínio: trilha (15 módulos), regras de XP, badges
├─ lib/          # utilitários puros: datas e lógica de ofensiva
├─ store/        # store Zustand (estado + ações + persistência)
├─ components/   # UI: dashboard, checklist, simulados, badges, toasts
├─ App.tsx       # composição da página
└─ index.css     # tema (tokens de cor) e microinterações
.llm/PRD/        # PRD do produto e checklist canônico da trilha
CLAUDE.md        # guia de arquitetura para agentes/colaboradores
```

## 🎮 Mecânicas (balanceamento)

- **XP por ação:** módulo `100` · bônus de percurso concluído `250` · tarefa de simulado `75`
  · tarefa de revisão `50` · dia de estudo registrado `20`.
- **Níveis:** XP para alcançar o nível *N* = `100 × (N − 1)²` (offset para começar no nível 1).
- **Ofensiva:** dias planejados = **Seg, Ter, Sex, Sáb, Dom** (qua/qui são folga e não quebram
  a sequência); tolera 1 dia planejado perdido via *freeze*.

Detalhes e regras completas vivem em [`.llm/PRD/DeltaQuest_PRD.md`](.llm/PRD/DeltaQuest_PRD.md).

## 🔐 Dados & privacidade

Todo o progresso é salvo **no próprio navegador** (`localStorage`, chave `deltaquest-v1`).
Nada sai do dispositivo. A sincronização entre dispositivos (Supabase) está no roadmap e será
opt-in.

## 🗺️ Roadmap

- [x] MVP local-first (dashboard, checklist, XP/níveis, badges, ofensiva, countdown)
- [x] Registro de simulados com gráfico de evolução *(v1.1)*
- [x] Microinterações de recompensa e acessibilidade *(v1.2)*
- [ ] Sincronização entre dispositivos (Supabase + login leve)
- [ ] PWA: instalável e offline
- [ ] Deploy na Vercel
- [ ] Export/import de progresso (JSON) e testes automatizados

---

Projeto pessoal de estudo. 🎯 Meta: aprovação no **DP-750** em **14/09/2026**.
