interface Props {
  pct: number
  /** Classe de cor de fundo do preenchimento (ex.: 'bg-xp', 'bg-done'). */
  color?: string
}

export function ProgressBar({ pct, color = 'bg-done' }: Props) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
      <div
        className={`h-full rounded-full ${color} transition-[width] duration-500 ease-out`}
        style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
      />
    </div>
  )
}
