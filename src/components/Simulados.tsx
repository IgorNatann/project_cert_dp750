import { useState, type FormEvent } from 'react'
import { useProgress } from '../store/useProgress'
import { formatBR, todayISO } from '../lib/date'
import { Sparkline } from './Sparkline'

const ALVO = 85

const inputClass =
  'rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-muted outline-none focus-visible:ring-2 focus-visible:ring-xp/60'

export function Simulados() {
  const simulados = useProgress((s) => s.simulados)
  const addSimulado = useProgress((s) => s.addSimulado)
  const removeSimulado = useProgress((s) => s.removeSimulado)

  const [data, setData] = useState(todayISO())
  const [nome, setNome] = useState('')
  const [nota, setNota] = useState('')
  const [obs, setObs] = useState('')

  const notaNum = Number(nota)
  const valido = nome.trim().length > 0 && nota !== '' && notaNum >= 0 && notaNum <= 100

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!valido) return
    addSimulado({
      data,
      nome: nome.trim(),
      nota: notaNum,
      observacoes: obs.trim() || undefined,
    })
    setNome('')
    setNota('')
    setObs('')
    setData(todayISO())
  }

  const ordenados = [...simulados].sort((a, b) => a.data.localeCompare(b.data))
  const valores = ordenados.map((r) => r.nota)
  const melhor = valores.length ? Math.max(...valores) : 0

  return (
    <section>
      <h2 className="mb-3 font-mono text-sm uppercase tracking-wide text-muted">
        Simulados {melhor > 0 && <span className="text-badge">· melhor {melhor}%</span>}
      </h2>

      {/* Formulário */}
      <form
        onSubmit={submit}
        className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2"
      >
        <label className="flex flex-col gap-1 text-xs text-muted">
          Data
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className={inputClass}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted">
          Nota (%)
          <input
            type="number"
            min={0}
            max={100}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="0–100"
            className={`${inputClass} font-mono`}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted sm:col-span-2">
          Nome do simulado
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="ex.: Practice assessment Microsoft — rodada 1"
            className={inputClass}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted sm:col-span-2">
          Observações (opcional)
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            rows={2}
            placeholder="Tópicos a reforçar, erros recorrentes…"
            className={`${inputClass} resize-y`}
          />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={!valido}
            className="rounded-md bg-xp px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Registrar simulado
          </button>
        </div>
      </form>

      {/* Evolução */}
      <div className="mt-4 rounded-lg border border-border bg-surface p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted">Evolução das notas</span>
          <span className="font-mono text-xs text-done">alvo {ALVO}%</span>
        </div>
        <Sparkline values={valores} threshold={ALVO} />
      </div>

      {/* Histórico */}
      {ordenados.length > 0 && (
        <ul className="mt-4 space-y-2">
          {[...ordenados].reverse().map((r) => (
            <li
              key={r.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3"
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-mono text-lg font-bold ${
                      r.nota >= ALVO ? 'text-done' : 'text-text'
                    }`}
                  >
                    {r.nota}%
                  </span>
                  <span className="truncate text-sm text-text">{r.nome}</span>
                </div>
                <div className="text-xs text-muted">{formatBR(r.data)}</div>
                {r.observacoes && (
                  <p className="mt-1 text-xs text-muted">{r.observacoes}</p>
                )}
              </div>
              <button
                onClick={() => removeSimulado(r.id)}
                aria-label={`Remover simulado ${r.nome}`}
                className="shrink-0 rounded px-2 py-1 text-xs text-muted transition-colors hover:text-streak focus-visible:ring-2 focus-visible:ring-streak/60"
              >
                remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
