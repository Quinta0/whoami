import { useState, type FormEvent } from 'react'
import css from './style.css?inline'
import * as C from '../../content'

// the rebuild, as content.ts states it: blank disk, Ansible, Docker Compose, everything back
const REBUILD = ['Blank disk', 'Ansible playbooks', 'Docker Compose', 'Environment up']
const STAGES = [
  { y: '2018', t: 'Commerce school, Bellinzona' },
  { y: '2020', t: 'Freelance IT support and the homelab' },
  { y: '2022', t: 'Computer science, USI' },
  { y: '2024', t: 'BSc Economics, USI' },
]

function TitleBlock() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [msg, setMsg] = useState('')
  const send = (e: FormEvent) => {
    e.preventDefault()
    location.href = `mailto:${C.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${msg}\n\n${name}`)}`
  }
  return (
    <form className="tb" onSubmit={send}>
      <label className="c-name"><span>Your name</span><input value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="First and last" required /></label>
      <label className="c-subj"><span>Subject</span><input value={subject} onChange={e => setSubject(e.target.value)} placeholder="A rack, a role, a node" required /></label>
      <label className="c-msg"><span>What needs building or fixing</span><textarea rows={4} value={msg} onChange={e => setMsg(e.target.value)} /></label>
      <div className="c-foot"><span className="num">To {C.EMAIL}</span><button className="btn btn--primary" type="submit">Open in my mail app</button></div>
    </form>
  )
}

export default function Blueprint() {
  return (
    <div className="t-blueprint">
      <style>{css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@500&display=swap" />

      <header className="nav container">
        <a href="#top" className="mark">Pietro Quintavalle</a>
        <nav aria-label="Sections"><a href="#register">Projects</a><a href="#upstream">Upstream</a><a href="#stages">Stages</a><a href="#contact">Contact</a></nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <h1>Systems built from the rack up</h1>
            <p className="lead">Linux infrastructure, ZFS storage and hardware diagnostics in Ticino.</p>
            <div className="actions">
              <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Email me</a>
              <a className="btn" href={C.GITHUB} target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>

          <figure className="drawing fig" aria-labelledby="rb-cap">
            <div className="sheet-grid" aria-hidden="true" />
            <p className="dwg-no num">DWG 01, homelab rebuild</p>
            <b className="big">&lt;30 min</b>
            <div className="dim dim--draw" aria-hidden="true" />
            <ol className="rebuild">
              {REBUILD.map((s, i) => <li key={s}><span className="num">{String(i).padStart(2, '0')}</span>{s}</li>)}
            </ol>
            <figcaption id="rb-cap">Four production hosts, rebuilt from a blank disk.</figcaption>
          </figure>
        </section>

        <section className="figs container" aria-label="Figures">
          {C.facts.map(f => (
            <div key={f.label}><b>{f.prefix ?? ''}{f.n}{f.prefix ? '' : '+'}</b><span>{f.label}</span></div>
          ))}
        </section>

        <section id="register" className="block container">
          <h2>Drawing register</h2>
          <table className="reg">
            <thead><tr><th scope="col">No.</th><th scope="col">Project</th><th scope="col">Built with</th></tr></thead>
            <tbody>
              {C.projects.map((p, i) => (
                <tr key={p.title}>
                  <td className="num">P-{String(i + 1).padStart(2, '0')}</td>
                  <th scope="row">{p.title}{p.star && <span className="note">{p.star}</span>}</th>
                  <td>{p.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="upstream" className="band">
          <div className="container block-in">
            <h2>Merged upstream</h2>
            <div className="elev">
              {C.oss.map(o => (
                <a key={o.href} href={o.href} target="_blank" rel="noopener">
                  <span className="num">{o.ref}</span>
                  <h3>{o.title}</h3>
                  <span className="repo">{o.repo}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="stages" className="block container">
          <h2>Stages</h2>
          <div className="run">
            <div className="dim" aria-hidden="true" />
            <ol>
              {STAGES.map(s => <li key={s.y}><span className="num">{s.y}</span><p className="st">{s.t}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="block container spec">
          <h2>Specification</h2>
          <ul className="cells">
            {C.qualities.map(q => <li key={q.title}><h3>{q.title}</h3></li>)}
          </ul>
        </section>

        <section id="contact" className="block container contact">
          <h2>Need someone who can rack it, image it and keep it up?</h2>
          <TitleBlock />
        </section>
      </main>

      <footer className="foot container">
        <dl>
          <div><dt>Drawn by</dt><dd>Pietro Quintavalle</dd></div>
          <div><dt>Location</dt><dd>Monte Carasso, Ticino</dd></div>
          <div><dt>Languages</dt><dd>{C.languages.slice(0, 3).map(([l]) => l).join(', ')}</dd></div>
          <div><dt>Elsewhere</dt><dd className="links"><a href={C.GITHUB}>GitHub</a><a href={C.GITLAB}>GitLab</a><a href={C.CODEBERG}>Codeberg</a><a href={C.LINKEDIN}>LinkedIn</a></dd></div>
        </dl>
      </footer>
    </div>
  )
}
