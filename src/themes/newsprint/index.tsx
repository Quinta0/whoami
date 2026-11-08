import css from './style.css?inline'
import * as C from '../../content'

const today = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Zurich' }).format(new Date())

export default function Newsprint() {
  return (
    <div className="t-newsprint">
      <style>{css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@700&family=Spectral:ital,wght@0,400;0,500;1,400&family=Libre+Franklin:wght@500&display=swap" />

      <header className="container mast">
        <div className="dateline">
          <span>Monte Carasso, Ticino</span>
          <span>{today}</span>
        </div>
        <a href="#top" className="title">Pietro Quintavalle</a>
        <nav aria-label="Sections">
          <a href="#about">Front page</a><a href="#career">Career</a><a href="#upstream">Upstream</a><a href="#listings">Projects</a><a href="#records">Records</a><a href="#notice">Contact</a>
        </nav>
        <hr className="rule--double" />
      </header>

      <main id="top">
        <section className="container lead-story">
          <h1>Cluster rebuilt from bare metal, again.</h1>
          <p className="deck">Pietro Quintavalle builds infrastructure from the solder joint up.</p>
          <div className="actions">
            <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Write to the desk</a>
            <a className="btn btn--secondary" href={C.GITHUB} target="_blank" rel="noopener">Read the code</a>
          </div>
        </section>

        <section id="about" className="container front">
          <p className="byline">From our correspondent at the bench</p>
          <div className="cols">
            <p className="dropcap">{C.intro}</p>
            <p><i>{C.tagline}</i></p>
            {C.qualities.map(q => <p key={q.title}><b>{q.title}.</b> {q.text}</p>)}
          </div>
          <div className="box-score">
            {C.facts.map(f => (
              <div key={f.label}><b>{f.prefix ?? ''}{f.n}{f.prefix ? '' : '+'}</b><span>{f.label}</span></div>
            ))}
          </div>
        </section>

        <section id="career" className="container block">
          <hr className="rule--double" />
          <h2>Career: two jobs, one bench, since January 2020</h2>
          <div className="career">
            {C.jobs.map(j => (
              <article key={j.title}>
                <p className="byline">{j.time}</p>
                <h3>{j.title}</h3>
                <p className="kicker">{j.org}</p>
                <div className="cols cols--2">{j.bullets.map(b => <p key={b}>{b}</p>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="upstream" className="well">
          <div className="container block-in">
            <h2>Upstream report</h2>
            <div className="stories">
              {C.oss.map(o => (
                <article key={o.href}>
                  <p className="byline">{o.repo}</p>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                  <p className="byline">Filed as <a href={o.href} target="_blank" rel="noopener">{o.ref}</a></p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="listings" className="container block">
          <h2>Listings: five projects in production</h2>
          <ol className="listing">
            {C.projects.map(p => (
              <li key={p.title}>
                <p className="lt">{p.title}</p>
                <div><p>{p.text}</p><p className="byline">{p.stack}</p></div>
                <span className="agate">{p.star ?? ''}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="records" className="container block">
          <hr className="rule--double" />
          <div className="records">
            <div>
              <h2>Classifieds</h2>
              <p className="byline">Wanted on the bench, platform and storage</p>
              <p className="classified">{C.toolsRowA.join(', ')}.</p>
              <p className="byline">Network, security, monitoring and code</p>
              <p className="classified">{C.toolsRowB.join(', ')}.</p>
              <p>{C.skillsNote}</p>
            </div>
            <div>
              <h2>Records</h2>
              <dl className="rec">
                {C.education.map(e => <div key={e.title}><dt>{e.title}</dt><dd>{e.text}</dd></div>)}
                <div><dt>Certifications</dt><dd>{C.certifications}</dd></div>
                <div><dt>Status</dt><dd>{C.status}</dd></div>
              </dl>
              <table className="langs">
                <caption>Languages</caption>
                <tbody>{C.languages.map(([l, lv]) => <tr key={l}><th scope="row">{l}</th><td className="agate">{lv}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="notice" className="ink">
          <div className="container">
            <h2>{C.contactHead}</h2>
            <a className="mail" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a>
            <p className="ink-links">{C.links.map(([n, h]) => <a key={n} href={h} target="_blank" rel="noopener">{n}</a>)}</p>
          </div>
        </section>
      </main>

      <footer className="container colophon">
        <hr className="rule--double" />
        <p>Set in Zilla Slab and Spectral. Printed in Monte Carasso, Ticino, Switzerland, by Pietro Quintavalle.</p>
      </footer>
    </div>
  )
}
