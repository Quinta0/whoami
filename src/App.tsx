import { useCallback, useEffect, useRef, useState } from 'react'
import ParticleScene, { SHAPE_NAMES } from './scene/ParticleScene'
import { usePageMotion } from './usePageMotion'
import * as C from './content'

const KEYFRAMES = ['.hero', '#work', '#skills', '#contact']

function Name({ lines }: { lines: string[] }) {
  const minLen = Math.min(...lines.map(l => l.length))
  return (
    <h1 className="name" id="name" aria-label={lines.join(' ')}>
      {lines.map((ln, li) => (
        <span className="ln" key={ln} aria-hidden="true" style={{ '--s': Math.max(.55, minLen / ln.length) } as React.CSSProperties}>
          {[...ln].map((ch, i) => <span className="ch" key={i} style={{ transitionDelay: `${0.25 + li * 0.35 + i * 0.04}s` }}>{ch}</span>)}
        </span>
      ))}
    </h1>
  )
}

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items]
  return <div className={`mq rv${reverse ? ' rev' : ''}`} aria-hidden="true"><div>{row.map((s, i) => <span key={i}>{s}</span>)}</div></div>
}

export default function App() {
  usePageMotion()
  const [label, setLabel] = useState(SHAPE_NAMES[0])
  const [swap, setSwap] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  // label swaps with a short fade
  const pending = useRef<number | null>(null)
  const onLabel = useCallback((text: string) => {
    setSwap(true)
    if (pending.current) clearTimeout(pending.current)
    pending.current = window.setTimeout(() => { setLabel(text); setSwap(false) }, 400)
  }, [])
  useEffect(() => () => { if (pending.current) clearTimeout(pending.current) }, [])
  const onProgress = useCallback((f: number) => { if (barRef.current) barRef.current.style.transform = `scaleX(${f.toFixed(4)})` }, [])

  return (
    <>
      <ParticleScene keyframes={KEYFRAMES} onLabel={onLabel} onProgress={onProgress} />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="cur" aria-hidden="true" /><div className="cur-ring" aria-hidden="true" />
      <div className="progress" ref={barRef} aria-hidden="true" />

      <nav>
        <a className="brand" href="#top">PQ</a>
        <ul>
          <li><a href="#work">Work</a></li>
          <li><a href="#oss">Open source</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="shape-label" aria-hidden="true"><i /><span className={swap ? 'swap' : ''}>{label}</span></div>

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <p className="intro rv">Monte Carasso, Ticino. Six years at the bench, five years on Linux, four servers in production. Looking for datacenter operations, hardware integration or Linux systems support, on-site or hybrid.</p>
            <Name lines={['Pietro', 'Quintavalle']} />
            <div className="tag rv">
              <p>I build infrastructure from the <em>solder joint</em> up. Component-level diagnostics, ZFS storage, zero-trust networks, and the occasional driver written from a packet dump.</p>
            </div>
            <div className="facts rv">
              {C.facts.map(f => <div key={f.label}><b data-count={f.n} data-prefix={f.prefix}>0</b><small>{f.label}</small></div>)}
            </div>
            <div className="hint rv"><b />Scroll. The particles follow.</div>
          </div>
        </section>

        <section id="qualities">
          <div className="wrap">
            <h2 className="rv">What you get when you hire me</h2>
            <div className="qual rv">
              {C.qualities.map(q => <article key={q.title}><h3>{q.title}</h3><p>{q.text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="work">
          <div className="wrap">
            <h2 className="rv">Experience</h2>
            <div className="tl rv" id="tl"><div className="beam" />
              {C.jobs.map(j => (
                <div className="job" key={j.title} data-shape={j.shape} data-label={j.label}>
                  <time>{j.time}</time>
                  <h3>{j.title}</h3>
                  <span className="org">{j.org}</span>
                  <ul>{j.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="oss">
          <div className="wrap">
            <h2 className="rv">Open source, close to the metal</h2>
            <p className="dim rv" style={{ marginBottom: 40 }}>Upstream contributions to projects that sit between hardware and the kernel. Hover a row and the sculpture becomes the work.</p>
            <div className="oss rv">
              {C.oss.map(o => (
                <a href={o.href} target="_blank" rel="noopener" key={o.href} data-shape={o.shape} data-label={o.label}>
                  <div><span className="repo">{o.repo}</span><h3>{o.title}</h3><p className="what">{o.text}</p></div>
                  <span className="ref">{o.ref}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <h2 className="rv">Selected projects</h2>
            <div className="proj rv">
              {C.projects.map(p => (
                <article key={p.title} data-tilt data-shape={p.shape} data-label={p.label}>
                  <h3>{p.title}{p.star && <> <span className="star">{p.star}</span></>}</h3>
                  <p>{p.text}</p>
                  <div className="stack">{p.stack}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="wrap"><h2 className="rv">Tools I reach for</h2></div>
          <Marquee items={C.toolsRowA} />
          <Marquee items={C.toolsRowB} reverse />
          <div className="wrap">
            <p className="skills-note rv">Also on the bench: Rust, C, C++, Python and SQL for diagnostics, and a self-directed track on local LLM deployment and quantisation on bare-metal hardware with llama.cpp and Claude Code.</p>
          </div>
        </section>

        <section id="education">
          <div className="wrap">
            <h2 className="rv">Education and languages</h2>
            <div className="edu rv">
              <dl>{C.education.map(e => <div key={e.title}><dt>{e.title}</dt><dd>{e.text}</dd></div>)}</dl>
              <div>
                <dl>
                  <div><dt>Certifications</dt><dd>{C.certifications}</dd></div>
                  <div><dt>Languages</dt><dd className="langs">{C.languages.map(([l, lv]) => <span key={l}><b>{l}</b> {lv}</span>)}</dd></div>
                  <div><dt>Status</dt><dd>Italian national, Swiss Permit C, born 2001.</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <h2 className="rv">Need someone who can rack it, image it, and keep it up?</h2>
            <a className="mail rv" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a>
            <div className="links rv">
              <a data-mag href={C.GITHUB} target="_blank" rel="noopener">GitHub</a>
              <a data-mag href={C.LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
              <a data-mag href={C.WHOAMI} target="_blank" rel="noopener">whoami</a>
	      <a data-mag href={C.GITLAB} target="_blank" rel="noopener">GitLab</a>
              <a data-mag href={C.CODEBERG} target="_blank" rel="noopener">Codeberg</a>
            </div>
          </div>
        </section>
      </main>
      <footer><span>Pietro Quintavalle, Ticino, Switzerland</span><span>Built with Three.js, one canvas, fifteen thousand particles.</span></footer>
    </>
  )
}
