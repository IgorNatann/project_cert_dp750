import { selectXp, useProgress } from '../store/useProgress'
import { levelProgress } from '../data/xp'
import { DATAS, MODULOS } from '../data/trilha'
import { daysUntil } from '../lib/date'
import { ProgressBar } from './ProgressBar'

function Stat({
  label,
  value,
  accent,
  pulse,
}: {
  label: string
  value: string
  accent: string
  pulse?: boolean
}) {
  return (
    <div className="flex flex-col">
      <span className={`font-mono text-2xl font-bold ${accent} ${pulse ? 'animate-pulse-soft' : ''}`}>
        {value}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  )
}

export function TopBar() {
  const xp = useProgress(selectXp)
  const streak = useProgress((s) => s.streakAtual)
  const recorde = useProgress((s) => s.streakRecorde)
  const concluidos = useProgress((s) => s.concluidos)

  const lp = levelProgress(xp)
  const diasProva = daysUntil(DATAS.exame)
  const modConcl = MODULOS.filter((m) => concluidos[m.id]).length
  const pctTrilha = Math.round((modConcl / MODULOS.length) * 100)

  return (
    <section className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      {/* Nível + barra de XP */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Nível</div>
          <div className="font-mono text-3xl font-bold text-xp">{lp.level}</div>
        </div>
        <div className="flex-1">
          <div className="mb-1 flex justify-between font-mono text-xs text-muted">
            <span>{xp} XP</span>
            <span>faltam {lp.restante} p/ nível {lp.level + 1}</span>
          </div>
          <ProgressBar pct={lp.pct} color="bg-xp" />
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="dias até a prova" value={String(diasProva)} accent="text-streak" pulse />
        <Stat
          label={`ofensiva (recorde ${recorde})`}
          value={`${streak}🔥`}
          accent="text-streak"
        />
        <Stat label="módulos" value={`${modConcl}/${MODULOS.length}`} accent="text-done" />
        <Stat label="da trilha" value={`${pctTrilha}%`} accent="text-done" />
      </div>
    </section>
  )
}
