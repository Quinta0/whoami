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
        <nav aria-label="Sections"><a href="#stages">Work</a><a href="#register">Projects</a><a href="#upstream">Upstream</a><a href="#contact">Contact</a></nav>
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

        <section className="container notes-sec" aria-label="General notes and figures">
          <div className="notes">
            <p className="num">Note 1</p><p className="tag">{C.tagline}</p>
            <p className="num">Note 2</p><p>{C.intro}</p>
          </div>
          <div className="figs">
            {C.facts.map(f => (
              <div key={f.label}><b>{f.prefix ?? ''}{f.n}{f.prefix ? '' : '+'}</b><span>{f.label}</span></div>
            ))}
          </div>
        </section>

        <section className="block container spec">
          <h2>Specification</h2>
          <ul className="cells">
            {C.qualities.map(q => <li key={q.title}><h3>{q.title}</h3><p>{q.text}</p></li>)}
          </ul>
        </section>

        <section id="stages" className="block container">
          <h2>Stages and schedule of works</h2>
          <div className="run">
            <div className="dim" aria-hidden="true" />
            <ol>
              {STAGES.map(s => <li key={s.y}><span className="num">{s.y}</span><p className="st">{s.t}</p></li>)}
            </ol>
          </div>
          <table className="reg sched">
            <thead><tr><th scope="col">Period</th><th scope="col">Work</th></tr></thead>
            <tbody>
              {C.jobs.map(j => (
                <tr key={j.title}>
                  <td className="num">{j.time}</td>
                  <td><b className="row-h">{j.title}</b><span className="note">{j.org}</span><ul>{j.bullets.map(b => <li key={b}>{b}</li>)}</ul></td>
                </tr>
              ))}
              {C.education.map(e => (
                <tr key={e.title}><td className="num">Education</td><td><b className="row-h">{e.title}</b><span className="note">{e.text}</span></td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="register" className="block container">
          <h2>Drawing register</h2>
          <table className="reg">
            <thead><tr><th scope="col">No.</th><th scope="col">Project</th><th scope="col">Built with</th></tr></thead>
            <tbody>
              {C.projects.map((p, i) => (
                <tr key={p.title}>
                  <td className="num">P-{String(i + 1).padStart(2, '0')}</td>
                  <th scope="row">{p.title}{p.star && <span className="note">{p.star}</span>}<span className="desc">{p.text}</span></th>
                  <td>{p.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="upstream" className="band">
          <div className="container block-in">
            <h2>Merged upstream</h2>
            <p className="oss-intro">{C.ossIntro}</p>
            <div className="elev">
              {C.oss.map(o => (
                <a key={o.href} href={o.href} target="_blank" rel="noopener">
                  <span className="num">{o.ref}</span>
                  <h3>{o.title}</h3>
                  <p className="otext">{o.text}</p>
                  <span className="repo">{o.repo}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="materials" className="block container">
          <h2>Materials and credentials</h2>
          <div className="mat">
            <div className="fig mat-list">
              <p className="num">Platform, storage, automation</p>
              <p>{C.toolsRowA.join(', ')}</p>
              <p className="num">Network, security, monitoring, code</p>
              <p>{C.toolsRowB.join(', ')}</p>
              <p className="mat-note">{C.skillsNote}</p>
            </div>
            <dl className="creds">
              <div><dt>Certifications</dt><dd>{C.certifications}</dd></div>
              <div><dt>Languages</dt><dd>{C.languages.map(([l, lv]) => `${l} ${lv}`).join(', ')}</dd></div>
              <div><dt>Status</dt><dd>{C.status}</dd></div>
            </dl>
          </div>
        </section>

        <section id="contact" className="block container contact">
          <div className="contact-l"><h2>{C.contactHead}</h2><a className="mailto" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a></div>
          <TitleBlock />
        </section>
      </main>

      <footer className="foot container">
        <dl>
          <div><dt>Drawn by</dt><dd>Pietro Quintavalle</dd></div>
          <div><dt>Location</dt><dd>Monte Carasso, Ticino</dd></div>
          <div><dt>Status</dt><dd>Swiss Permit C</dd></div>
          <div><dt>Elsewhere</dt><dd className="links">{C.links.map(([n, h]) => <a key={n} href={h} target="_blank" rel="noopener">{n}</a>)}</dd></div>
        </dl>
      </footer>
    </div>
  )
}
