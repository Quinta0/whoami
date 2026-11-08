import { useState } from 'react'
import css from './style.css?inline'
import * as C from '../../content'

const YEARS = [
  { y: '2018', head: 'Commerce school, Bellinzona', text: 'Scuola Cantonale di Commercio. Maturità 4.5 of 6 and the federal AFC diploma in economics, 5 of 6, finished in 2022.' },
  { y: '2020', head: 'The bench and the rack', text: 'Freelance IT support across Ticino starts, and so does the homelab: four bare-metal servers that now serve twelve-plus users.' },
  { y: '2022', head: 'Computer science at USI', text: 'Two years of algorithms, Java, C++ and software architecture. Owned the Spring Boot backend of a twelve-person city simulator.' },
  { y: '2024', head: 'Economics at USI', text: 'BSc Economics in the English stream: game theory, quantitative finance, statistics and financial modelling.' },
  { y: '2026', head: 'Consultant at DEC Energy', text: 'July to August: built the internal server infrastructure from scratch, a two-node Kubernetes cluster on the company\'s own hardware.' },
]

function Index() {
  const [i, setI] = useState(1)
  const cur = YEARS[i]
  return (
    <div className="index">
      <div className="years" role="tablist" aria-label="Years">
        {YEARS.map((y, n) => (
          <button key={y.y} role="tab" aria-selected={n === i} aria-controls="year-panel" onClick={() => setI(n)}>{y.y}</button>
        ))}
      </div>
      <div className="year" id="year-panel" role="tabpanel" aria-live="polite">
        <b className="big" aria-hidden="true">{cur.y}</b>
        <div><h3>{cur.head}</h3><p>{cur.text}</p></div>
      </div>
    </div>
  )
}

export default function Grid() {
  return (
    <div className="t-grid">
      <style>{css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Radio+Canada+Big:wght@400;700&family=Radio+Canada:wght@400;500&display=swap" />

      <header className="nav container">
        <a href="#top" className="wordmark" aria-label="Pietro Quintavalle, top"><b>Pietro</b><span>Quintavalle</span></a>
        <nav aria-label="Sections"><a href="#qualities">Approach</a><a href="#work">Experience</a><a href="#projects">Projects</a><a href="#upstream">Upstream</a><a href="#contact">Contact</a></nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container sheet">
            <div className="bleed" aria-hidden="true" />
            <div className="heads">
              <h1>Pietro Quintavalle</h1>
              <div className="h1 overprint" aria-hidden="true">Pietro Quintavalle</div>
            </div>
            <div className="hero-foot">
              <div className="hero-copy">
                <p className="lead">Builds infrastructure from the solder joint up, in Ticino.</p>
                <div className="actions">
                  <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Write to me</a>
                  <a className="btn btn--secondary" href={C.GITHUB} target="_blank" rel="noopener">GitHub</a>
                </div>
              </div>
              <div className="hero-fig">
                <b>&lt;30</b>
                <span>minutes to rebuild a cluster from bare metal</span>
              </div>
            </div>
          </div>
        </section>

        <section className="about container block">
          <p className="statement">{C.tagline}</p>
          <p className="intro">{C.intro}</p>
          <dl className="facts">
            {C.facts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.prefix ?? ''}{f.n}{f.prefix ? '' : '+'}</dd></div>)}
          </dl>
        </section>

        <section id="qualities" className="band field">
          <div className="container">
            <h2>What you get</h2>
            <ol className="quals">
              {C.qualities.map((q, n) => <li key={q.title}><span className="n" aria-hidden="true">{n + 1}</span><div><h3>{q.title}</h3><p>{q.text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section id="work" className="container block">
          <h2>Experience</h2>
          <Index />
          <ol className="jobs">
            {C.jobs.map(j => (
              <li key={j.title}>
                <p className="when">{j.time}</p>
                <div><h3>{j.title}</h3><p className="org">{j.org}</p><ul>{j.bullets.map(b => <li key={b}>{b}</li>)}</ul></div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="container block">
          <h2>What I have built</h2>
          <ol className="proj">
            {C.projects.map((p, n) => (
              <li key={p.title}>
                <span className="n">{String(n + 1).padStart(2, '0')}</span>
                <div><h3>{p.title}</h3><p>{p.text}</p></div>
                <span className="stack">{p.star && <b>{p.star}</b>}{p.stack}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="upstream" className="well">
          <div className="container block-in">
            <h2>Merged upstream</h2>
            <p className="oss-intro">{C.ossIntro}</p>
            <div className="ups">
              {C.oss.map(o => (
                <a key={o.href} href={o.href} target="_blank" rel="noopener">
                  <span className="repo">{o.repo}</span>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                  <span className="ref">{o.ref}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="container block tools">
          <h2>Tools, education and languages</h2>
          <div className="cols2">
            <div className="tool-col">
              <p className="statement">{C.toolsRowA.join(', ')}.</p>
              <p className="statement">{C.toolsRowB.join(', ')}.</p>
              <p className="note">{C.skillsNote}</p>
            </div>
            <dl className="edu">
              {C.education.map(e => <div key={e.title}><dt>{e.title}</dt><dd>{e.text}</dd></div>)}
              <div><dt>Certifications</dt><dd>{C.certifications}</dd></div>
              <div><dt>Languages</dt><dd>{C.languages.map(([l, lv]) => `${l} ${lv}`).join(', ')}</dd></div>
              <div><dt>Status</dt><dd>{C.status}</dd></div>
            </dl>
          </div>
        </section>

        <section id="contact" className="band field--mark">
          <div className="container">
            <h2>{C.contactHead}</h2>
            <a className="mail" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a>
            <div className="actions">
              <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Write to me</a>
              {C.links.map(([n, h]) => <a key={n} className="btn btn--secondary" href={h} target="_blank" rel="noopener">{n}</a>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="foot container">
        <span>Pietro Quintavalle, Monte Carasso, Ticino</span>
        <span className="links">{C.links.map(([n, h]) => <a key={n} href={h}>{n}</a>)}</span>
      </footer>
    </div>
  )
}
