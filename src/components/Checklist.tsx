import { selectXp, useProgress } from '../store/useProgress'
import {
  MODULOS,
  PERCURSOS,
  TAREFAS_REVISAO,
  TAREFAS_SIMULADO,
} from '../data/trilha'
import type { Tarefa } from '../types'
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
        <h3 className="text-sm font-semibold text-text">{p.nome}</h3>
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
          <Item key={m.id} id={m.id} titulo={m.titulo} />
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
