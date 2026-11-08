import css from './style.css?inline'
import * as C from '../../content'

// three shops, one primary each, the same wherever they appear
type Shop = 'bench' | 'rack' | 'code'
const SHOPS: { id: Shop; name: string; covers: string }[] = [
  { id: 'bench', name: 'The bench', covers: 'Assembly, repair, thermal bench-testing, firmware and BIOS flashing, soldering, harness wiring, USB HID protocols.' },
  { id: 'rack', name: 'The rack', covers: 'Proxmox, TrueNAS and ZFS, UNRAID, Docker and LXC, Ansible rebuilds, WireGuard, Tailscale and Cloudflare Tunnels.' },
  { id: 'code', name: 'The code', covers: 'C, Rust, Java and Spring Boot, TypeScript, Python, PowerShell and Bash, upstream pull requests.' },
]
// keyed by title so new entries in content.ts never crash the page; anything unlisted files under the rack
const SHOP_OF: Record<string, Shop> = {
  'Diagnoses at the component, not the ticket': 'bench', 'Reads the protocol when there is no documentation': 'bench',
  'IT support technician': 'bench', 'Turnkey TrueNAS rack': 'bench', 'A complete USB HID device driver, written from a packet capture': 'bench',
  'ObsidianSetup': 'code', 'City simulator, USI group project': 'code', 'Community revival of a mobile game': 'code',
  'Runtime installation pipeline fault, diagnosed and fixed upstream': 'code', 'Multi-vendor upscaler library detection': 'code',
}
const shopOf = (title: string): Shop => SHOP_OF[title] ?? 'rack'
const shopName = (s: Shop) => SHOPS.find(x => x.id === s)?.name ?? ''

const Tag = ({ s }: { s: Shop }) => <span className={`tag shop-${s}`}>{shopName(s)}</span>

export default function Werkstatt() {
  return (
    <div className="t-werkstatt">
      <style>{css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@700&family=Karla:wght@400;600&display=swap" />

      <header className="nav container">
        <a href="#top" className="mark">Pietro Quintavalle</a>
        <nav aria-label="Sections"><a href="#shops">Shops</a><a href="#schedule">Schedule</a><a href="#projects">Projects</a><a href="#upstream">Upstream</a><a href="#contact">Contact</a></nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <h1>Bench, rack and code.</h1>
            <p className="lead">One technician for the hardware, the servers and the drivers between them.</p>
            <div className="actions">
              <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Email me</a>
              <a className="btn" href={C.GITHUB} target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
          <ul className="shops" id="shops" aria-label="What each shop covers">
            {SHOPS.map(s => (
              <li key={s.id} className={`shop shop-${s.id}`}>
                <h2>{s.name}</h2>
                <p>{s.covers}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="container block">
          <div className="about">
            <p className="tagline">{C.tagline}</p>
            <p>{C.intro}</p>
          </div>
          <div className="figs">
            {C.facts.map(f => <div key={f.label}><b>{f.prefix ?? ''}{f.n}{f.prefix ? '' : '+'}</b><small>{f.label}</small></div>)}
          </div>
        </section>

        <section className="container block">
          <h2>What you get when you hire me</h2>
          <ul className="grid4">
            {C.qualities.map(q => (
              <li key={q.title}><Tag s={shopOf(q.title)} /><h3>{q.title}</h3><p>{q.text}</p></li>
            ))}
          </ul>
        </section>

        <section id="schedule" className="band">
          <div className="container block-in">
            <h2>Work and school, by year</h2>
            <ol className="sched">
              {C.jobs.map(j => (
                <li key={j.title}>
                  <p className="when">{j.time}</p>
                  <div>
                    <Tag s={shopOf(j.title)} />
                    <h3>{j.title}</h3>
                    <p className="org">{j.org}</p>
                    <ul>{j.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  </div>
                </li>
              ))}
              {C.education.map(e => (
                <li key={e.title}><p className="when">School</p><div><h3>{e.title}</h3><p>{e.text}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="projects" className="container block">
          <h2>Builds, coded by shop</h2>
          <ul className="grid3">
            {C.projects.map(p => (
              <li key={p.title} className={p.title === 'Homelab as code' ? 'wide' : undefined}>
                <Tag s={shopOf(p.title)} />
                <h3>{p.title}</h3>
                {p.star && <p className="star">{p.star}</p>}
                <p>{p.text}</p>
                <small>{p.stack}</small>
              </li>
            ))}
          </ul>
        </section>

        <section id="upstream" className="container block">
          <h2>Merged upstream</h2>
          <p className="oss-intro">{C.ossIntro}</p>
          <table className="tbl">
            <thead><tr><th scope="col">Shop</th><th scope="col">Contribution</th><th scope="col">Reference</th></tr></thead>
            <tbody>
              {C.oss.map(o => (
                <tr key={o.href}>
                  <td><Tag s={shopOf(o.title)} /></td>
                  <td><b className="row-h">{o.title}</b><small>{o.repo}</small><p>{o.text}</p></td>
                  <td><a href={o.href} target="_blank" rel="noopener">{o.ref}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="container block">
          <h2>Tools and papers</h2>
          <div className="grid2">
            <div className="cell">
              <h3>Tools</h3>
              <p>{C.toolsRowA.join(', ')}.</p>
              <p>{C.toolsRowB.join(', ')}.</p>
              <p className="muted">{C.skillsNote}</p>
            </div>
            <dl className="cell papers">
              <div><dt>Certifications</dt><dd>{C.certifications}</dd></div>
              <div><dt>Languages</dt><dd>{C.languages.map(([l, lv]) => `${l} ${lv}`).join(', ')}</dd></div>
              <div><dt>Status</dt><dd>{C.status}</dd></div>
            </dl>
          </div>
        </section>

        <section id="contact" className="band--ink">
          <div className="container block-in">
            <h2>{C.contactHead}</h2>
            <a className="mail" href={`mailto:${C.EMAIL}`}>{C.EMAIL}</a>
            <div className="actions">
              <a className="btn btn--primary" href={`mailto:${C.EMAIL}`}>Email me</a>
              {C.links.map(([n, h]) => <a key={n} className="btn" href={h} target="_blank" rel="noopener">{n}</a>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="foot container">
        <span>Pietro Quintavalle, Monte Carasso, Ticino</span>
        <span className="legend">{SHOPS.map(s => <Tag key={s.id} s={s.id} />)}</span>
      </footer>
    </div>
  )
}
