import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import css from './remix.css?inline'

// every style is its own chunk; three.js only loads when Particles is shown
const STYLES = [
  { id: 'particles', name: 'Particles', C: lazy(() => import('./App')) },
  { id: 'terminal', name: 'Terminal', C: lazy(() => import('./themes/terminal')) },
  { id: 'swiss', name: 'Swiss', C: lazy(() => import('./themes/grid')) },
  { id: 'blueprint', name: 'Blueprint', C: lazy(() => import('./themes/blueprint')) },
  { id: 'studio', name: 'Studio', C: lazy(() => import('./themes/studio')) },
  { id: 'newsprint', name: 'Newsprint', C: lazy(() => import('./themes/newsprint')) },
  { id: 'werkstatt', name: 'Werkstatt', C: lazy(() => import('./themes/werkstatt')) },
  { id: 'arcade', name: 'Arcade', C: lazy(() => import('./themes/arcade')) },
]
const KEY = 'pq-style'
const byId = (id: string | null) => STYLES.findIndex(s => s.id === id)
const store = { get: () => { try { return localStorage.getItem(KEY) } catch { return null } }, set: (v: string) => { try { localStorage.setItem(KEY, v) } catch { /* private mode */ } } }

// ?style= wins, then the last one seen, then the first
function initial() {
  const q = byId(new URLSearchParams(location.search).get('style'))
  if (q >= 0) return q
  const s = byId(store.get())
  return Math.max(s, 0)
}

// one broken style shows a note instead of blanking the page, so the chevrons stay usable
class Guard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <p className="remix-fail">This style failed to load. Use the chevrons to pick another.</p> : this.props.children }
}

export default function Remix() {
  const [i, setI] = useState(initial)
  const cur = STYLES[i]

  useEffect(() => {
    store.set(cur.id)
    const u = new URL(location.href); u.searchParams.set('style', cur.id); history.replaceState(null, '', u)
    document.documentElement.dataset.style = cur.id
  }, [cur.id])

  const n = STYLES.length
  const prev = STYLES[(i - 1 + n) % n], next = STYLES[(i + 1) % n]
  const go = (d: number) => { setI((i + d + n) % n); scrollTo({ top: 0 }) }

  return (
    <>
      <style>{css}</style>
      <Guard key={cur.id}>
        <Suspense fallback={<div className="remix-wait" />}>
          <cur.C />
        </Suspense>
      </Guard>
      <div className="remix" role="group" aria-label="Page style">
        <span className="remix-name" aria-live="polite">{cur.name}, {i + 1} of {STYLES.length}</span>
        <button className="remix-btn" onClick={() => go(-1)} aria-label={`Previous style: ${prev.name}`} title={`Previous: ${prev.name}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" /></svg>
        </button>
        <button className="remix-btn" onClick={() => go(1)} aria-label={`Next style: ${next.name}`} title={`Next: ${next.name}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" /></svg>
        </button>
      </div>
    </>
  )
}
