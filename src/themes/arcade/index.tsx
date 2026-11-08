import css from './style.css?inline'
import * as C from '../../content'

export default function Arcade() {
  return (
    <div className="t-arcade">
      <style>{css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bungee&family=Chivo:wght@400;700;900&family=Silkscreen:wght@700&display=swap" />

      <header className="nav container">
        <a href="#top" className="mark">Pietro Quintavalle</a>
        <nav aria-label="Sections"><a href="#players">Work</a><a href="#menu">Projects</a><a href="#upstream">Upstream</a><a href="#contact">Contact</a></nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <h1>Pietro Quintavalle</h1>
            <p className="lead">Hardware, Linux and drivers, from a bench in Ticino.</p>
            <div className="actions">
              <a className="btn" href={`mailto:${C.EMAIL}`}>Email me</a>
              <a className="btn btn--secondary" href={C.GITHUB} target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
          <div className="board well crt" aria-label="Figures">
            {C.facts.map((f, i) => (
              <div key={f.label} className={i % 2 ? 'acid' : 'ember'}>
                <b className="figure">{f.prefix ?? ''}{f.n}{f.prefix ? '' : '+'}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="field">
          <div className="container block-in about">
            <p className="statement">{C.tagline}</p>
            <p>{C.intro}</p>
          </div>
        </section>

        <section className="container block">
          <h2>What you get when you hire me</h2>
          <ul className="quals">
            {C.qualities.map((q, i) => (
              <li key={q.title} className="well"><span className="n">{i + 1}</span><h3>{q.title}</h3><p>{q.text}</p></li>
            ))}
          </ul>
        </section>

        <section id="players" className="container block">
          <h2>Two jobs, played at once since January 2020</h2>
          <div className="players">
            {C.jobs.map((j, i) => (
              <article key={j.title} className={`well player ${i ? 'p2' : 'p1'}`}>
                <p className="who">Player {i + 1}</p>
                <h3>{j.title}</h3>
                <p className="org">{j.org}, {j.time.toLowerCase()}</p>
                <ul>{j.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="menu" className="container block">
          <h2>Select a project</h2>
          <ul className="menu">
            {C.projects.map(p => (
              <li key={p.title} className="row" tabIndex={0}>
                <h3>{p.title}</h3>
                <div><p>{p.text}</p><p className="stack">{p.stack}</p></div>
                <span className="star">{p.star ?? ''}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="upstream" className="band">
          <div className="container block-in">
            <h2>Merged upstream</h2>
            <div className="ups">
              {C.oss.map(o => (
                <article key={o.href} className="well">
                  <p className="who">{o.repo}</p>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                  <a href={o.href} target="_blank" rel="noopener">{o.ref}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container block">
          <h2>Loadout and save file</h2>
          <div className="load">
            <div>
              <p className="who">Platform, storage and automation</p>
              <ul className="chips">{C.toolsRowA.map(t => <li key={t}>{t}</li>)}</ul>
              <p className="who">Network, security, monitoring and code</p>
              <ul className="chips">{C.toolsRowB.map(t => <li key={t}>{t}</li>)}</ul>
              <p className="note">{C.skillsNote}</p>
            </div>
            <dl className="save well">
              {C.education.map(e => <div key={e.title}><dt>{e.title}</dt><dd>{e.text}</dd></div>)}
              <div><dt>Certifications</dt><dd>{C.certifications}</dd></div>
              <div><dt>Languages</dt><dd>{C.languages.map(([l, lv]) => `${l} ${lv}`).join(', ')}</dd></div>
              <div><dt>Status</dt><dd>{C.status}</dd></div>
            </dl>
          </div>
        </section>

        <section id="contact" className="field">
          <div className="container block-in">
            <h2>{C.contactHead}</h2>
            <a className="mail" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a>
            <div className="actions">
              {C.links.map(([n, h]) => <a key={n} className="btn btn--onfield" href={h} target="_blank" rel="noopener">{n}</a>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="foot container">
        <span>Pietro Quintavalle, Monte Carasso, Ticino</span>
        <a href="#top">Back to the start</a>
      </footer>
    </div>
  )
}
