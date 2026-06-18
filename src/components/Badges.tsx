import { useEffect, useRef, useState } from 'react'
import { useProgress } from '../store/useProgress'
import { BADGES } from '../data/badges'

export function Badges() {
  const badges = useProgress((s) => s.badges)
  const desbloqueadas = BADGES.filter((b) => badges[b.id]).length

  // Acende (glow) a badge que acabou de ser desbloqueada.
  const prev = useRef(new Set(Object.keys(badges)))
  const [glow, setGlow] = useState<Set<string>>(new Set())

  useEffect(() => {
    const atuais = Object.keys(badges)
    const novas = atuais.filter((id) => !prev.current.has(id))
    prev.current = new Set(atuais)
    if (novas.length === 0) return

    setGlow((g) => new Set([...g, ...novas]))
    const t = setTimeout(() => {
      setGlow((g) => {
        const n = new Set(g)
        novas.forEach((id) => n.delete(id))
        return n
      })
    }, 1300)
    return () => clearTimeout(t)
  }, [badges])

  return (
    <section>
      <h2 className="mb-3 font-mono text-sm uppercase tracking-wide text-muted">
        Conquistas{' '}
        <span className="text-badge">
          {desbloqueadas}/{BADGES.length}
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {BADGES.map((b) => {
          const on = Boolean(badges[b.id])
          return (
            <div
              key={b.id}
              className={`rounded-lg border p-3 transition-colors ${
                on ? 'border-badge/50 bg-badge/10' : 'border-border bg-surface opacity-50'
              } ${glow.has(b.id) ? 'animate-glow' : ''}`}
            >
              <div className={`font-mono text-sm font-semibold ${on ? 'text-badge' : 'text-muted'}`}>
                {on ? '🏅 ' : '🔒 '}
                {b.titulo}
              </div>
              <div className="mt-1 text-xs text-muted">{b.descricao}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
