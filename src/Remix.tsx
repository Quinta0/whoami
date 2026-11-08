import { lazy, Suspense, useEffect, useState } from 'react'
import css from './remix.css?inline'

// every style is its own chunk; three.js only loads when Particles is dealt
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

// ?style= wins, then the last one seen, then a random deal
function initial() {
  const q = byId(new URLSearchParams(location.search).get('style'))
  if (q >= 0) return q
  const s = byId(store.get())
  return s >= 0 ? s : Math.floor(Math.random() * STYLES.length)
}

export default function Remix() {
  const [i, setI] = useState(initial)
  const cur = STYLES[i]

  useEffect(() => {
    store.set(cur.id)
    const u = new URL(location.href); u.searchParams.set('style', cur.id); history.replaceState(null, '', u)
    document.documentElement.dataset.style = cur.id
  }, [cur.id])

  const shuffle = () => {
    const n = (i + 1 + Math.floor(Math.random() * (STYLES.length - 1))) % STYLES.length
    setI(n); scrollTo({ top: 0 })
  }

  return (
    <>
      <style>{css}</style>
      <Suspense fallback={<div className="remix-wait" />}>
        <cur.C key={cur.id} />
      </Suspense>
      <div className="remix" role="group" aria-label="Page style">
        <span className="remix-name" aria-live="polite">{cur.name}, {i + 1} of {STYLES.length}</span>
        <button className="remix-btn" onClick={shuffle}>Shuffle style</button>
      </div>
    </>
  )
}
