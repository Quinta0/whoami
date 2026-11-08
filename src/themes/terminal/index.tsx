import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import css from './style.css?inline'
import * as C from '../../content'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.md'
const files = C.projects.map(p => ({ name: slug(p.title), p }))

type Line = { k: 'in' | 'out' | 'dim' | 'err'; t: string }

const HELP: Line[] = [
  ['whoami', 'who is on the other end'],
  ['ls', 'list the projects'],
  ['cat <file>', 'read one, tab completes'],
  ['upstream', 'merged work in other repos'],
  ['skills', 'the tools on the bench'],
  ['education', 'schools and degrees'],
  ['contact', 'how to reach me'],
  ['clear', 'empty the screen'],
].map(([c, d]) => ({ k: 'out' as const, t: `  ${c.padEnd(12)} ${d}` }))

function run(raw: string): Line[] | 'clear' {
  const [cmd, ...args] = raw.trim().split(/\s+/)
  const arg = args.join(' ')
  switch (cmd) {
    case '': return []
    case 'help': return HELP
    case 'whoami': return [
      { k: 'out', t: 'pietro quintavalle, monte carasso, ticino' },
      { k: 'dim', t: 'hardware bench since 2020, linux since 2021, four servers in production' },
      { k: 'dim', t: 'looking for datacenter ops, hardware integration or linux support' },
    ]
    case 'ls': return files.map(f => ({ k: 'out', t: f.name }))
    case 'cat': {
      const f = files.find(f => f.name === arg || f.name === arg + '.md')
      if (!f) return [{ k: 'err', t: `cat: ${arg || '(nothing)'}: no such file, try ls` }]
      return [{ k: 'out', t: `# ${f.p.title}` }, { k: 'out', t: f.p.text }, { k: 'dim', t: `stack: ${f.p.stack}` }]
    }
    case 'upstream': return C.oss.flatMap(o => [{ k: 'out' as const, t: `${o.repo}  ${o.ref}` }, { k: 'dim' as const, t: `  ${o.title}` }])
    case 'skills': return [{ k: 'out', t: C.toolsRowA.join(', ') }, { k: 'out', t: C.toolsRowB.join(', ') }]
    case 'contact': return [{ k: 'out', t: C.EMAIL }, ...C.links.map(([n, h]) => ({ k: 'dim' as const, t: `${n.toLowerCase().padEnd(10)}${h}` }))]
    case 'education': return C.education.flatMap(e => [{ k: 'out' as const, t: e.title }, { k: 'dim' as const, t: `  ${e.text}` }])
    case 'sudo': return [{ k: 'err', t: 'you are not in the sudoers file, but my inbox is open: contact' }]
    case 'clear': return 'clear'
    default: return [{ k: 'err', t: `${cmd}: command not found, try help` }]
  }
}

function Shell() {
  const [lines, setLines] = useState<Line[]>([])
  const [val, setVal] = useState('')
  const [hist, setHist] = useState<string[]>([])
  const [hi, setHi] = useState(-1)
  const input = useRef<HTMLInputElement>(null)
  const screen = useRef<HTMLDivElement>(null)

  // types `whoami` once, then hands over the prompt
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const intro = 'whoami'
    const done = () => setLines([{ k: 'in', t: intro }, ...(run(intro) as Line[]), { k: 'dim', t: 'type help, or ls' }])
    if (reduce) { done(); return }
    let i = 0
    const iv = setInterval(() => { i++; setVal(intro.slice(0, i)); if (i === intro.length) { clearInterval(iv); setTimeout(() => { setVal(''); done() }, 280) } }, 90)
    return () => clearInterval(iv)
  }, [])
  useEffect(() => { screen.current?.scrollTo({ top: screen.current.scrollHeight }) }, [lines])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const out = run(val)
    if (out === 'clear') setLines([])
    else setLines(l => [...l, { k: 'in' as const, t: val }, ...out].slice(-80))
    if (val.trim()) setHist(h => [val, ...h].slice(0, 30))
    setHi(-1); setVal('')
  }
  const key = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const n = Math.max(-1, Math.min(hist.length - 1, hi + (e.key === 'ArrowUp' ? 1 : -1)))
      setHi(n); setVal(n < 0 ? '' : hist[n])
    } else if (e.key === 'Tab' && val.startsWith('cat ')) {
      const m = files.find(f => f.name.startsWith(val.slice(4)))
      if (m) { e.preventDefault(); setVal('cat ' + m.name) }
    }
  }

  return (
    <div className="shell" onClick={() => input.current?.focus()}>
      <div className="screen" ref={screen} role="log" aria-live="polite">
        {lines.map((l, i) => <p key={i} className={`ln ${l.k}`}>{l.k === 'in' && <span className="ps">~ $ </span>}{l.t}</p>)}
      </div>
      <form className="prompt" onSubmit={submit}>
        <label htmlFor="sh" className="ps">~ $</label>
        <input id="sh" ref={input} value={val} onChange={e => setVal(e.target.value)} onKeyDown={key}
          autoComplete="off" spellCheck={false} autoCapitalize="off" aria-label="Command, try help" />
      </form>
    </div>
  )
}

function Mail() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const href = `mailto:${C.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return (
    <form className="mail well" onSubmit={e => { e.preventDefault(); location.href = href }}>
      <p className="cmd"><span className="ps">~ $</span> mail {C.EMAIL}</p>
      <label><span>subject</span><input value={subject} onChange={e => setSubject(e.target.value)} placeholder="a rack, a role, a broken node" required /></label>
      <label><span>body</span><textarea rows={4} value={body} onChange={e => setBody(e.target.value)} placeholder="what needs building or fixing" /></label>
      <button className="btn btn--primary" type="submit">Send from my mail app</button>
    </form>
  )
}

export default function Terminal() {
  return (
    <div className="t-terminal">
      <style>{css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,400..700&display=swap" />
      <header className="nav container">
        <a href="#top" className="mark">pq@ticino</a>
        <nav aria-label="Sections"><a href="#work">work</a><a href="#upstream">upstream</a><a href="#projects">projects</a><a href="#contact">contact</a></nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <h1>Infrastructure from the solder joint up.</h1>
            <p className="lead">Linux systems, ZFS storage and drivers, from Ticino.</p>
            <div className="actions">
              <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Email me</a>
              <a className="btn btn--quiet" href={C.GITHUB} target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
          <Shell />
        </section>

        <section className="figs container" aria-label="Figures">
          {C.facts.map(f => (
            <div key={f.label}><b className="figure">{f.prefix ?? ''}{f.n}{f.prefix ? '' : '+'}</b><small># {f.label}</small></div>
          ))}
        </section>

        <section id="man" className="container block">
          <h2>man pietro</h2>
          <div className="prose">
            <p>{C.intro}</p>
            <p className="ink">{C.tagline}</p>
          </div>
          <dl className="man">
            {C.qualities.map((q, i) => (
              <div key={q.title}><dt><span className="arg">-{'dsrp'[i]}</span> {q.title}</dt><dd>{q.text}</dd></div>
            ))}
          </dl>
        </section>

        <section id="work" className="container block">
          <h2>git log --author=pietro</h2>
          <ol className="log">
            {C.jobs.map(j => (
              <li key={j.title}>
                <time>{j.time}</time>
                <div><h3>{j.title}</h3><p className="dim">{j.org}</p><ul>{j.bullets.map(b => <li key={b}>{b}</li>)}</ul></div>
              </li>
            ))}
            {C.education.map(e => (
              <li key={e.title}><time>education</time><div><h3>{e.title}</h3><p className="dim">{e.text}</p></div></li>
            ))}
          </ol>
        </section>

        <section id="upstream" className="container block">
          <h2>Merged upstream</h2>
          <div className="refs">
            {C.oss.map(o => (
              <a key={o.href} href={o.href} target="_blank" rel="noopener">
                <span className="arg">{o.repo}</span><span className="t">{o.title}<small>{o.text}</small></span><span className="dim">{o.ref}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="projects" className="container block">
          <h2>ls -l ~/projects</h2>
          <div className="files">
            {files.map(({ name, p }) => (
              <article key={name}>
                <p className="row"><span className="arg">{name}</span><span className="t">{p.title}</span><span className="dim">{p.star ?? ''}</span></p>
                <p className="body">{p.text}</p>
                <p className="body dim">stack: {p.stack}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container block tools">
          <h2>ls /usr/local/bin</h2>
          <p className="dim grp"># platform, storage and automation</p>
          <ul className="cols">{C.toolsRowA.map(t => <li key={t}>{t}</li>)}</ul>
          <p className="dim grp"># network, security, monitoring and code</p>
          <ul className="cols">{C.toolsRowB.map(t => <li key={t}>{t}</li>)}</ul>
          <p className="note"><span className="dim"># </span>{C.skillsNote}</p>
          <dl className="env">
            <div><dt>CERTIFICATIONS</dt><dd>{C.certifications}</dd></div>
            <div><dt>LANG</dt><dd>{C.languages.map(([l, lv]) => `${l} ${lv}`).join(', ')}</dd></div>
            <div><dt>STATUS</dt><dd>{C.status}</dd></div>
          </dl>
        </section>

        <section id="contact" className="container block contact">
          <div className="contact-l"><h2>{C.contactHead}</h2><a className="mailto" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a></div>
          <Mail />
        </section>
      </main>

      <footer className="foot container">
        <span>Pietro Quintavalle, Ticino, Switzerland</span>
        <span className="links">
          {C.links.map(([n, h]) => <a key={n} href={h} target="_blank" rel="noopener">{n.toLowerCase()}</a>)}
        </span>
      </footer>
    </div>
  )
}
