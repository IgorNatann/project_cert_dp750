import { TopBar } from './components/TopBar'
import { Checklist } from './components/Checklist'
import { Simulados } from './components/Simulados'
import { Badges } from './components/Badges'
import { RewardToasts } from './components/RewardToasts'
import { useProgress } from './store/useProgress'

export default function App() {
  const reset = useProgress((s) => s.reset)

  function handleReset() {
    if (window.confirm('Resetar TODO o progresso? Esta ação não pode ser desfeita.')) {
      reset()
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <RewardToasts />
      <header className="mb-6">
        <h1 className="font-mono text-xl font-bold tracking-tight">
          <span className="text-done">Delta</span>
          <span className="text-xp">Quest</span>
        </h1>
        <p className="text-sm text-muted">Trilha gamificada — certificação DP-750</p>
      </header>

      <TopBar />

      <main className="mt-8 space-y-10">
        <Checklist />
        <Simulados />
        <Badges />
      </main>

      <footer className="mt-12 flex items-center justify-between border-t border-border pt-6">
        <span className="text-xs text-muted">Progresso salvo neste dispositivo.</span>
        <button
          onClick={handleReset}
          className="rounded text-xs text-muted transition-colors hover:text-streak focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-streak/50"
        >
          Resetar progresso
        </button>
      </footer>
    </div>
  )
}
