import { useState } from 'react'
import css from './style.css?inline'
import * as C from '../../content'

const YEARS = [
  { y: '2018', head: 'Commerce school, Bellinzona', text: 'Scuola Cantonale di Commercio. Maturità 4.5 of 6 and the federal AFC diploma in economics, 5 of 6, finished in 2022.' },
  { y: '2020', head: 'The bench and the rack', text: 'Freelance IT support across Ticino starts, and so does the homelab: four bare-metal servers that now serve twelve-plus users.' },
  { y: '2022', head: 'Computer science at USI', text: 'Two years of algorithms, Java, C++ and software architecture. Owned the Spring Boot backend of a twelve-person city simulator.' },
  { y: '2024', head: 'Economics at USI', text: 'BSc Economics in the English stream: game theory, quantitative finance, statistics and financial modelling.' },
]

function Index() {
  const [i, setI] = useState(1)
  const cur = YEARS[i]
  return (
    <section className="index container" aria-labelledby="idx-h">
      <h2 id="idx-h" className="visually-hidden">Timeline</h2>
      <div className="years" role="tablist" aria-label="Years">
        {YEARS.map((y, n) => (
          <button key={y.y} role="tab" aria-selected={n === i} aria-controls="year-panel" onClick={() => setI(n)}>{y.y}</button>
        ))}
      </div>
      <div className="year" id="year-panel" role="tabpanel" aria-live="polite">
        <b className="big" aria-hidden="true">{cur.y}</b>
        <div><h3>{cur.head}</h3><p>{cur.text}</p></div>
      </div>
    </section>
  )
}

export default function Grid() {
  return (
    <div className="t-grid">
      <style>{css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Radio+Canada+Big:wght@400;700&family=Radio+Canada:wght@400;500&display=swap" />

      <header className="nav container">
        <a href="#top" className="wordmark" aria-label="Pietro Quintavalle, top"><b>Pietro</b><span>Quintavalle</span></a>
        <nav aria-label="Sections"><a href="#qualities">Approach</a><a href="#projects">Projects</a><a href="#upstream">Upstream</a><a href="#contact">Contact</a></nav>
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

        <Index />

        <section id="qualities" className="band field">
          <div className="container">
            <h2>What you get</h2>
            <ol className="quals">
              {C.qualities.map((q, n) => <li key={q.title}><span className="n" aria-hidden="true">{n + 1}</span><h3>{q.title}</h3></li>)}
            </ol>
          </div>
        </section>

        <section id="projects" className="container block">
          <h2>Five things I built and still run</h2>
          <ol className="proj">
            {C.projects.map((p, n) => (
              <li key={p.title}>
                <span className="n">{String(n + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <span className="stack">{p.star ?? p.stack}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="upstream" className="well">
          <div className="container block-in">
            <h2>Merged upstream</h2>
            <div className="ups">
              {C.oss.map(o => (
                <a key={o.href} href={o.href} target="_blank" rel="noopener">
                  <span className="repo">{o.repo}</span>
                  <h3>{o.title}</h3>
                  <span className="ref">{o.ref}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="container block tools">
          <h2>Tools and languages</h2>
          <div className="cols2">
            <p className="statement">{[...C.toolsRowA.slice(0, 9), ...C.toolsRowB.slice(0, 7)].join(', ')}.</p>
            <dl>{C.languages.map(([l, lv]) => <div key={l}><dt>{l}</dt><dd>{lv}</dd></div>)}</dl>
          </div>
        </section>

        <section id="contact" className="band field--mark">
          <div className="container">
            <h2>Need someone who can rack it, image it and keep it up?</h2>
            <a className="mail" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a>
            <div className="actions">
              <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Write to me</a>
              <a className="btn btn--secondary" href={C.LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot container">
        <span>Pietro Quintavalle, Monte Carasso, Ticino</span>
        <span className="links"><a href={C.GITHUB}>GitHub</a><a href={C.GITLAB}>GitLab</a><a href={C.CODEBERG}>Codeberg</a><a href={C.WHOAMI}>whoami</a></span>
      </footer>
    </div>
  )
}
