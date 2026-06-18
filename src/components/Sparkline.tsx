interface Props {
  values: number[]
  width?: number
  height?: number
  /** Valor máximo do eixo (notas em %). */
  max?: number
  /** Linha de referência (ex.: 85 = nota-alvo). */
  threshold?: number
}

/** Mini-gráfico de evolução em SVG inline — sem libs, leve e responsivo. */
export function Sparkline({ values, width = 280, height = 64, max = 100, threshold }: Props) {
  if (values.length === 0) {
    return <p className="text-xs text-muted">Registre um simulado para ver a evolução.</p>
  }

  const pad = 6
  const n = values.length
  const x = (i: number) => (n === 1 ? width / 2 : pad + (i * (width - 2 * pad)) / (n - 1))
  const y = (v: number) => pad + (1 - Math.min(Math.max(v, 0), max) / max) * (height - 2 * pad)
  const points = values.map((v, i) => `${x(i)},${y(v)}`).join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-16 w-full"
      role="img"
      aria-label="Evolução das notas dos simulados"
      preserveAspectRatio="none"
    >
      {threshold !== undefined && (
        <line
          x1={pad}
          x2={width - pad}
          y1={y(threshold)}
          y2={y(threshold)}
          stroke="var(--color-done)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
        />
      )}
      {n > 1 && (
        <polyline
          points={points}
          fill="none"
          stroke="var(--color-badge)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
      {values.map((v, i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(v)}
          r="3"
          fill={threshold !== undefined && v >= threshold ? 'var(--color-done)' : 'var(--color-badge)'}
        />
      ))}
    </svg>
  )
}
