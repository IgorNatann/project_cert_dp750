// Balanceamento de XP (PRD §5.1)
export const XP = {
  modulo: 100,
  percursoBonus: 250,
  tarefaSimulado: 75,
  tarefaRevisao: 50,
  diaDeEstudo: 20,
} as const

/**
 * Curva de níveis. O PRD pede "nível N exige 100 × N² de XP".
 * Aplicamos um offset de 1 para o candidato começar no nível 1 com 0 XP:
 *   XP para ALCANÇAR o nível L = 100 × (L − 1)²
 *   → L1 em 0, L2 em 100, L3 em 400, L4 em 900, ...
 * Primeiros níveis vêm rápido (reforço inicial); os últimos exigem consistência.
 */
export function levelFromXp(totalXp: number): number {
  return 1 + Math.floor(Math.sqrt(Math.max(0, totalXp) / 100))
}

export function xpParaNivel(level: number): number {
  return 100 * (level - 1) * (level - 1)
}

export function levelProgress(totalXp: number) {
  const level = levelFromXp(totalXp)
  const curr = xpParaNivel(level)
  const next = xpParaNivel(level + 1)
  const span = next - curr
  const into = totalXp - curr
  return {
    level,
    into,
    span,
    restante: next - totalXp,
    pct: span > 0 ? Math.min(100, Math.round((into / span) * 100)) : 0,
  }
}
