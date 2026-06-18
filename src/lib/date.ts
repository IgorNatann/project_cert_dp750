// Helpers de data em formato ISO local (yyyy-mm-dd), sem dependências.

export function toISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayISO(): string {
  return toISO(new Date())
}

/** Interpreta um ISO ao meio-dia local para evitar problemas de fuso/DST. */
export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d, 12, 0, 0, 0)
}

export function addDays(iso: string, n: number): string {
  const d = parseISO(iso)
  d.setDate(d.getDate() + n)
  return toISO(d)
}

/** 0 = domingo … 6 = sábado */
export function weekday(iso: string): number {
  return parseISO(iso).getDay()
}

export function daysUntil(targetISO: string, fromISO: string = todayISO()): number {
  const ms = parseISO(targetISO).getTime() - parseISO(fromISO).getTime()
  return Math.round(ms / 86_400_000)
}

export function formatBR(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
