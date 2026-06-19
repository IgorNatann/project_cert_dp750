import { useCallback, useEffect, useRef, useState } from 'react'
import { selectXp, useProgress } from '../store/useProgress'
import { levelFromXp } from '../data/xp'
import { BADGES } from '../data/badges'

interface Toast {
  id: number
  kind: 'level' | 'badge'
  text: string
}

/**
 * Avisos transitórios nos momentos de recompensa (PRD §8): level-up e badge.
 * Compara o valor atual com o anterior (refs) e dispara um toast que some sozinho.
 * Os refs iniciam com o estado já hidratado, então nada dispara ao abrir o app.
 */
export function RewardToasts() {
  const xp = useProgress(selectXp)
  const badges = useProgress((s) => s.badges)
  const level = levelFromXp(xp)

  const prevLevel = useRef(level)
  const prevBadges = useRef(new Set(Object.keys(badges)))
  const counter = useRef(0)
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((kind: Toast['kind'], text: string) => {
    const id = (counter.current += 1)
    setToasts((prev) => [...prev, { id, kind, text }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200)
  }, [])

  useEffect(() => {
    if (level > prevLevel.current) push('level', `Nível ${level} alcançado!`)
    prevLevel.current = level
  }, [level, push])

  useEffect(() => {
    const atuais = Object.keys(badges)
    for (const id of atuais) {
      if (!prevBadges.current.has(id)) {
        const b = BADGES.find((x) => x.id === id)
        push('badge', `🏅 ${b?.titulo ?? 'Conquista'} desbloqueada!`)
      }
    }
    prevBadges.current = new Set(atuais)
  }, [badges, push])

  if (toasts.length === 0) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-pop rounded-lg border px-4 py-2 text-sm font-semibold shadow-lg ${
            t.kind === 'level'
              ? 'border-xp/50 bg-surface text-xp'
              : 'border-badge/50 bg-surface text-badge'
          }`}
        >
          {t.text}
        </div>
      ))}
    </div>
  )
}
