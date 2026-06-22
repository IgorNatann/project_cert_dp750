import { useId, useState } from 'react'
import { selectXp, useProgress } from '../store/useProgress'
import {
  MODULOS,
  PERCURSOS,
  TAREFAS_REVISAO,
  TAREFAS_SIMULADO,
} from '../data/trilha'
import { GUIA } from '../data/guia'
import type { GuiaModulo, Tarefa } from '../types'
import { daysUntil, formatBR } from '../lib/date'
import { ProgressBar } from './ProgressBar'

function Item({ id, titulo }: { id: string; titulo: string }) {
  const done = useProgress((s) => Boolean(s.concluidos[id]))
  const toggle = useProgress((s) => s.toggleConcluido)
  return (
    <li>
      <button
        onClick={() => toggle(id)}
        aria-pressed={done}
        className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xp/40"
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${
            done ? 'border-done bg-done/20 text-done' : 'border-border text-transparent'
          }`}
        >
          ✓
        </span>
        <span className={`text-sm ${done ? 'text-muted line-through' : 'text-text'}`}>
          {titulo}
        </span>
      </button>
    </li>
  )
}

function ModuloItem({
  id,
  titulo,
  guia,
}: {
  id: string
  titulo: string
  guia?: GuiaModulo
}) {
  const done = useProgress((s) => Boolean(s.concluidos[id]))
  const toggle = useProgress((s) => s.toggleConcluido)
  const [aberto, setAberto] = useState(false)
  const painelId = useId()

  return (
    <li>
      <div className="flex items-start gap-1">
        <button
          onClick={() => toggle(id)}
          aria-pressed={done}
          className="flex flex-1 items-start gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xp/40"
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${
              done ? 'border-done bg-done/20 text-done' : 'border-border text-transparent'
            }`}
          >
            ✓
          </span>
          <span className="min-w-0">
            <span className={`block text-sm ${done ? 'text-muted line-through' : 'text-text'}`}>
              {titulo}
            </span>
            {guia && (
              <span className="block font-mono text-[0.7rem] text-muted">
                {guia.tituloOficial}
              </span>
            )}
          </span>
        </button>
        {guia && (
          <button
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls={painelId}
            aria-label={aberto ? 'Ocultar tópicos do módulo' : 'Ver tópicos do módulo'}
            className="shrink-0 rounded-md px-2 py-1.5 font-mono text-xs text-muted transition-colors hover:bg-surface-2 hover:text-badge focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-badge/40"
          >
            <span className={`inline-block transition-transform ${aberto ? 'rotate-90' : ''}`}>
              ▸
            </span>
          </button>
        )}
      </div>
      {guia && aberto && (
        <div
          id={painelId}
          className="mb-1 ml-7 mt-1 rounded-md border-l-2 border-border bg-surface-2/40 px-3 py-2"
        >
          <p className="mb-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-muted">
            Tópicos do módulo · curso oficial DP-750
          </p>
          <ul className="space-y-1">
            {guia.topicos.map((t) => (
              <li key={t} className="flex gap-2 text-xs text-text/90">
                <span aria-hidden className="select-none text-badge">
                  ›
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <a
            href={guia.learnUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Estudar a aula "${guia.tituloOficial}" no Microsoft Learn`}
            className="mt-2 inline-flex items-center gap-1 rounded font-mono text-xs text-badge hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-badge/40"
          >
            Estudar no Microsoft Learn <span aria-hidden>↗</span>
          </a>
        </div>
      )}
    </li>
  )
}

function PercursoBlock({ percursoId }: { percursoId: string }) {
  const p = PERCURSOS.find((x) => x.id === percursoId)!
  const concluidos = useProgress((s) => s.concluidos)
  const mods = MODULOS.filter((m) => m.percursoId === p.id)
  const feitos = mods.filter((m) => concluidos[m.id]).length
  const pct = Math.round((feitos / mods.length) * 100)
  const completo = feitos === mods.length
  const dias = daysUntil(p.meta)
  const atrasado = !completo && dias < 0

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="text-sm font-semibold text-text">{p.nome}</h3>
          <span
            className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-muted"
            title="Peso do domínio no exame DP-750"
          >
            peso {p.pesoExame}
          </span>
          <a
            href={p.learnPathUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir o learning path "${p.nome}" no Microsoft Learn`}
            className="shrink-0 rounded font-mono text-[0.65rem] text-muted transition-colors hover:text-badge focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-badge/40"
          >
            curso oficial ↗
          </a>
        </div>
        <span
          className={`shrink-0 font-mono text-xs ${
            completo ? 'text-done' : atrasado ? 'text-streak' : 'text-muted'
          }`}
        >
          {completo ? 'concluído' : atrasado ? `atrasado` : `meta ${formatBR(p.meta)}`}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <ProgressBar pct={pct} color={completo ? 'bg-done' : 'bg-xp'} />
        <span className="shrink-0 font-mono text-xs text-muted">
          {feitos}/{mods.length}
        </span>
      </div>
      <ul className="mt-3 space-y-0.5">
        {mods.map((m) => (
          <ModuloItem key={m.id} id={m.id} titulo={m.titulo} guia={GUIA[m.id]} />
        ))}
      </ul>
    </div>
  )
}

function TarefasBlock({
  titulo,
  meta,
  tarefas,
}: {
  titulo: string
  meta?: string
  tarefas: Tarefa[]
}) {
  const concluidos = useProgress((s) => s.concluidos)
  const feitos = tarefas.filter((t) => concluidos[t.id]).length
  const pct = Math.round((feitos / tarefas.length) * 100)
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold text-text">{titulo}</h3>
        {meta && <span className="font-mono text-xs text-muted">meta {formatBR(meta)}</span>}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <ProgressBar pct={pct} color="bg-badge" />
        <span className="shrink-0 font-mono text-xs text-muted">
          {feitos}/{tarefas.length}
        </span>
      </div>
      <ul className="mt-3 space-y-0.5">
        {tarefas.map((t) => (
          <Item key={t.id} id={t.id} titulo={t.titulo} />
        ))}
      </ul>
    </div>
  )
}

export function Checklist() {
  // assina o XP só para forçar atualização visual coerente quando algo muda
  useProgress(selectXp)
  return (
    <section className="space-y-4">
      <h2 className="font-mono text-sm uppercase tracking-wide text-muted">Trilha oficial</h2>
      {PERCURSOS.map((p) => (
        <PercursoBlock key={p.id} percursoId={p.id} />
      ))}
      <TarefasBlock titulo="Fase de simulados" meta="2026-09-09" tarefas={TAREFAS_SIMULADO} />
      <TarefasBlock titulo="Revisão final" tarefas={TAREFAS_REVISAO} />
    </section>
  )
}
