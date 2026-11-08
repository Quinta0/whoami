import { useEffect, useRef, useState, type PointerEvent as RPE } from 'react'
import css from './style.css?inline'
import * as C from '../../content'

// outcome first, each line lifted from content.ts
const OUTCOME: Record<string, string> = {
  'Homelab as code': 'Rebuilt from bare metal in under thirty minutes',
  'Turnkey TrueNAS rack': 'Nine drive bays, ZFS RAID 10, every cable labelled',
  'ObsidianSetup': 'Adopted by other users, 26 stars on GitHub',
  'City simulator, USI group project': 'Twelve people, one Spring Boot backend',
  'Nargothrond Watch': 'No daemon, no database, a script on a schedule',
}
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
const ROWS: { label: string; from: number; to: number }[] = [
  { label: 'Commerce school, Bellinzona', from: 2018, to: 2022 },
  { label: 'IT support, freelance', from: 2020, to: 2026 },
  { label: 'Homelab in production', from: 2020, to: 2026 },
  { label: 'Computer science, USI', from: 2022, to: 2024 },
  { label: 'Economics, USI', from: 2024, to: 2026 },
]

function Clock() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => { const iv = setInterval(() => setT(fmt()), 15000); return () => clearInterval(iv) }, [])
  return <span className="clock">{t} in Ticino</span>
}

function Deck() {
  const [order, setOrder] = useState(() => C.projects.map((_, i) => i))
  const [drag, setDrag] = useState({ x: 0, y: 0, on: false })
  const start = useRef({ x: 0, y: 0 })
  const next = (dir = 1) => setOrder(o => dir > 0 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)])

  const down = (e: RPE<HTMLElement>) => { e.currentTarget.setPointerCapture(e.pointerId); start.current = { x: e.clientX, y: e.clientY }; setDrag({ x: 0, y: 0, on: true }) }
  const move = (e: RPE<HTMLElement>) => { if (drag.on) setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, on: true }) }
  const up = () => { if (Math.abs(drag.x) > 110) next(); setDrag({ x: 0, y: 0, on: false }) }

  const top = C.projects[order[0]]
  return (
    <div className="deck-wrap">
      <div className="deck" aria-roledescription="card deck">
        {order.slice(0, 3).reverse().map((idx) => {
          const p = C.projects[idx], depth = order.indexOf(idx), isTop = depth === 0
          const style = isTop
            ? { transform: `translate(${drag.x}px, ${drag.y * 0.3}px) rotate(${drag.x / 24}deg)`, transition: drag.on ? 'none' : undefined }
            : { transform: `translateY(${depth * 14}px) scale(${1 - depth * 0.04}) rotate(${depth % 2 ? 1.5 : -1.5}deg)` }
          return (
            <article key={p.title} className={`card crop${isTop ? ' top' : ''}`} style={style} aria-hidden={!isTop}
              onPointerDown={isTop ? down : undefined} onPointerMove={isTop ? move : undefined} onPointerUp={isTop ? up : undefined} onPointerCancel={isTop ? up : undefined}>
              <p className="file">{slug(p.title)}.md, {String(idx + 1).padStart(2, '0')} of {String(C.projects.length).padStart(2, '0')}</p>
              {isTop && <><h3>{OUTCOME[p.title]}</h3><p className="name">{p.title}</p><p className="stack">{p.stack}</p></>}
            </article>
          )
        })}
      </div>
      <div className="deck-ctl">
        <span className="hint">Drag the top card away</span>
        <button className="btn btn--quiet" onClick={() => next(-1)} aria-label="Previous project">Back</button>
        <button className="btn btn--quiet" onClick={() => next()} aria-label="Next project">Next</button>
      </div>
      <p className="visually-hidden" aria-live="polite">{top.title}</p>
    </div>
  )
}

function Row({ o }: { o: (typeof C.oss)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <details onToggle={e => setOpen(e.currentTarget.open)}>
      <summary><h3>{o.title}</h3><span className="meta">{o.repo}</span></summary>
      {open && <div className="case"><p>{o.text}</p><a href={o.href} target="_blank" rel="noopener">Read {o.ref} on GitHub</a></div>}
    </details>
  )
}

function Ticker() {
  const [paused, setPaused] = useState(false)
  const items = [...C.toolsRowA, ...C.toolsRowB]
  return (
    <div className="ticker">
      <div className={`belt${paused ? ' paused' : ''}`} aria-hidden="true">
        <div>{[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>
      <p className="visually-hidden">{items.join(', ')}</p>
      <button className="btn btn--quiet" onClick={() => setPaused(p => !p)} aria-pressed={paused}>{paused ? 'Play' : 'Pause'}</button>
    </div>
  )
}

export default function Studio() {
  return (
    <div className="t-studio">
      <style>{css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Geist:wght@400;500&display=swap" />

      <div className="proof">
        <header className="nav container">
          <a href="#top" className="mark">Pietro Quintavalle</a>
          <Clock />
          <nav aria-label="Sections"><a href="#work">Work</a><a href="#upstream">Upstream</a><a href="#years">Years</a><a href="#contact">Contact</a></nav>
        </header>

        <section className="hero container" id="top">
          <div className="hero-copy">
            <h1>Hardware, racks and Linux, by hand.</h1>
            <p className="lead">Infrastructure built and repaired in Ticino, from the solder joint up.</p>
            <div className="actions">
              <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Email me</a>
              <a className="btn" href={C.GITHUB} target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
          <div id="work"><Deck /></div>
        </section>
      </div>

      <main>
        <section className="container block quals">
          <h2>What you get when you hire me</h2>
          <ol>
            {C.qualities.map((q, i) => (
              <li key={q.title} className="crop">
                <h3>{q.title}</h3>
                <span className="fig">Fig. {i + 1}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="upstream" className="container block">
          <h2>Merged upstream</h2>
          <div className="set">{C.oss.map(o => <Row key={o.href} o={o} />)}</div>
        </section>

        <section id="years" className="container block">
          <h2>Nine years on one sheet</h2>
          <div className="cal" role="table" aria-label="What ran in which year">
            <div className="cal-row head" role="row">
              <span role="columnheader" className="cal-label" />
              {YEARS.map(y => <span role="columnheader" key={y} className="yr">{String(y).slice(2)}</span>)}
            </div>
            {ROWS.map(r => (
              <div className="cal-row" role="row" key={r.label}>
                <span role="rowheader" className="cal-label">{r.label}</span>
                {YEARS.map(y => <span role="cell" key={y} className={y >= r.from && y <= r.to ? 'on' : ''} aria-label={y >= r.from && y <= r.to ? String(y) : undefined} />)}
              </div>
            ))}
          </div>
        </section>

        <section className="block">
          <div className="container"><h2>On the bench</h2></div>
          <Ticker />
        </section>

        <section id="contact" className="ink">
          <div className="container">
            <h2>Need someone who can rack it, image it and keep it up?</h2>
            <a className="mail" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a>
          </div>
        </section>
      </main>

      <footer className="foot proof">
        <div className="container foot-in">
          <span className="mark">Pietro Quintavalle</span>
          <span className="links"><a href={C.GITHUB}>GitHub</a><a href={C.LINKEDIN}>LinkedIn</a><a href={C.GITLAB}>GitLab</a><a href={C.CODEBERG}>Codeberg</a></span>
          <Clock />
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  )
}
