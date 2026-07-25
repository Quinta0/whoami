"use client"

import { useEffect, useState } from 'react'
import BootSequence from './components/boot-sequence'
import LangSwitcher from './components/lang-switcher'
import { LangProvider, useLang } from './i18n/lang-context'

const ChevronDown = () => (
  <svg className="acc-chev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

// Trusted, hand-authored copy only (never user input); dangerouslySetInnerHTML is safe here.
function Html({ html, tag = 'span', className, style }: { html: string; tag?: 'span' | 'p' | 'div' | 'li' | 'h2'; className?: string; style?: React.CSSProperties }) {
  const Tag = tag as any
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />
}

export default function Home() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}

function Page() {
  const { t } = useLang()

  const [openAcc, setOpenAcc] = useState<Record<string, boolean>>({
    'exp-0': true,
    'edu-0': true,
  })

  const toggle = (id: string) => {
    setOpenAcc(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  const [booting, setBooting] = useState(false)
  const [bootKey, setBootKey] = useState(0)

  useEffect(() => {
    setBooting(true)
  }, [])

  useEffect(() => {
    if (booting) return

    const nav = document.querySelector('nav')
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle('nav-scrolled', window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const revealEls = document.querySelectorAll(
      '.sec-body, .hero-main, .hero-stats, .about-text, .about-card, .contact-body'
    )
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [booting])

  const reboot = () => {
    setBootKey(k => k + 1)
    setBooting(true)
  }

  return (
    <>
      {booting && <BootSequence key={bootKey} onComplete={() => setBooting(false)} onReboot={reboot} />}
      <div className={`site-shell${booting ? ' site-hidden' : ''}`} aria-hidden={booting}>

      {/* NAV */}
      <nav className={mobileOpen ? 'nav-open' : ''}>
        <div className="nav-bar">
          <a href="#" className="nav-logo-wrap">
            <span className="nav-mark">P<em>Q</em></span>
          </a>
          <div className="nav-links">
            <a href="#skills" onClick={closeMobile}>{t.nav.skills}</a>
            <a href="#homelab" onClick={closeMobile}>{t.nav.homelab}</a>
            <a href="#desktop" onClick={closeMobile}>{t.nav.desktop}</a>
            <a href="#projects" onClick={closeMobile}>{t.nav.projects}</a>
            <a href="#oss" onClick={closeMobile}>{t.nav.oss}</a>
            <a href="#github" onClick={closeMobile}>{t.nav.github}</a>
            <a href="#experience" onClick={closeMobile}>{t.nav.experience}</a>
            <a href="#contact" onClick={closeMobile}>{t.nav.contact}</a>
          </div>
          <div className="nav-right">
            <div className="nav-socials">
              <a href="https://github.com/Quinta0" target="_blank" rel="noopener" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69C6.72 19.9 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/" target="_blank" rel="noopener" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
              </a>
            </div>
            <LangSwitcher />
            <button className="nav-burger" aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(o => !o)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ANNOUNCE STRIP */}
      <div className="strip">
        <span className="strip-pill">{t.strip.pill}</span>
        <a href="#contact">{t.strip.cta} <span className="strip-arr">&#8594;</span></a>
      </div>

      {/* HERO */}
      <div className="hero-row">
        <div className="hero-main">
          <div className="status-row"><span className="green-dot"></span>{t.hero.status}</div>
          <div className="hero-name">Pietro<br/>Quintavalle</div>
          <div className="hero-role">{t.hero.role}</div>
          <p className="hero-thesis">{t.hero.thesis}</p>
          <p className="hero-lead">{t.hero.lead}</p>

          <div className="btns">
            <a href="#contact" className="btn btn-d">{t.hero.btnContact}</a>
            <a href="#homelab" className="btn btn-o">{t.hero.btnHomelab}</a>
            <a href="#projects" className="btn btn-o">{t.hero.btnProjects}</a>
          </div>
        </div>
        <div className="hero-stats">
          {t.hero.stats.map((s, i) => (
            <div className="stat" key={i}><span className="stat-val">{s.val}</span><span className="stat-lbl">{s.lbl}</span></div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div className="about-split">
        <div className="about-text">
          <div className="section-label"><div className="num"></div><h2>{t.about.heading}</h2><div className="rule"></div></div>
          <Html tag="p" html={t.about.p1} />
          <Html tag="p" html={t.about.p2} />
          <Html tag="p" html={t.about.p3} />
        </div>
        <div className="about-card">
          {t.about.card.map((c, i) => (
            <div className="about-card-row" key={i}>
              <div className="about-card-t">{c.t}</div>
              <div className="about-card-d">{c.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className="sec" id="skills">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>{t.skills.heading}</h2><div className="rule"></div></div>

          <div className="core-band">
            <div className="label">{t.skills.coreLabel}<span><Html html={t.skills.coreDesc} /></span></div>
            <div className="stack">
              <span className="item">Proxmox</span><span className="item">Docker / LXC</span><span className="item">Ansible</span>
              <span className="item">Linux</span><span className="item">ZFS</span><span className="item">Cloudflare / Traefik</span>
              <span className="item">Tailscale</span><span className="item">Fail2Ban / CrowdSec</span><span className="item">Grafana / Prometheus</span>
            </div>
          </div>

          <div className="legend">
            <span className="l-applied"><span className="mark">&#9642;</span>{t.skills.legendApplied}</span>
            <span className="l-exposure"><span className="mark">&#9643;</span>{t.skills.legendExposure}</span>
          </div>

          <div className="category-index">
            <div className="category-row">
              <div className="cat-num">01</div>
              <div className="cat-name">{t.skills.categories[0].name}<span>{t.skills.categories[0].sub}</span></div>
              <div className="skill-list">
                <span className="skill applied">Proxmox VE</span><span className="skill applied">UNRAID</span><span className="skill applied">TrueNAS</span>
                <span className="skill applied">Docker</span><span className="skill applied">LXC</span><span className="skill applied">KVM</span>
                <span className="skill applied">Linux</span><span className="skill exposure">Win Server</span><span className="skill exposure">AD</span>
              </div>
            </div>
            <div className="category-row">
              <div className="cat-num">02</div>
              <div className="cat-name">{t.skills.categories[1].name}<span>{t.skills.categories[1].sub}</span></div>
              <div className="skill-list">
                <span className="skill applied">VLAN</span><span className="skill applied">Cloudflare</span><span className="skill applied">AAAA/DNS</span>
                <span className="skill applied">CF Tunnels</span><span className="skill applied">Tailscale</span><span className="skill applied">Fail2Ban</span>
                <span className="skill applied">Crowdsec</span><span className="skill applied">UFW</span><span className="skill applied">Authelia</span><span className="skill applied">Traefik</span>
              </div>
            </div>
            <div className="category-row">
              <div className="cat-num">03</div>
              <div className="cat-name">{t.skills.categories[2].name}<span>{t.skills.categories[2].sub}</span></div>
              <div className="skill-list">
                <span className="skill applied">Python</span><span className="skill applied">TypeScript</span><span className="skill applied">React</span>
                <span className="skill applied">Next.js</span><span className="skill applied">Django</span><span className="skill applied">SQL</span>
                <span className="skill applied">Bash</span><span className="skill applied">Ansible</span><span className="skill exposure">HTML/CSS</span><span className="skill exposure">Soldering</span>
              </div>
            </div>
            <div className="category-row">
              <div className="cat-num">04</div>
              <div className="cat-name">{t.skills.categories[3].name}<span>{t.skills.categories[3].sub}</span></div>
              <div className="skill-list">
                <span className="skill applied">Grafana</span><span className="skill applied">Prometheus</span><span className="skill applied">Uptime Kuma</span>
                <span className="skill applied">ZFS</span><span className="skill applied">rsync</span><span className="skill applied">RAID</span><span className="skill applied">cAdvisor</span>
              </div>
            </div>
          </div>

          <div className="section-label" style={{marginTop:'56px'}}><div className="num">05&ndash;08</div><div className="slbl-t">{t.skills.quantHeading}</div><div className="rule"></div></div>

          <div className="quant-grid">
            {t.skills.quant.map((q, qi) => (
              <div className="quant-cell" key={qi}>
                <div className="cat-head"><span className="cat-num">{String(qi + 5).padStart(2, '0')}</span><h3>{q.name}</h3></div>
                <div className="skill-list">
                  {q.items.map((item, ii) => (
                    <span key={ii} className={`skill ${qi === 3 && ii >= 2 ? 'applied' : 'exposure'}`}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="section-label"><div className="num">09</div><div className="slbl-t">{t.skills.certsHeading}</div><div className="rule"></div></div>
          <div className="certs">
            {t.skills.certs.map((c, i) => (
              <div className="cert-row" key={i}>
                <div className="cert-mark">{c.issuer === 'Google' ? 'GA' : 'MS'}</div>
                <div><div className="cert-name">{c.name}</div><div className="cert-issuer">{c.issuer}</div></div>
                <div className="cert-status">{t.skills.verified}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOMELAB */}
      <div className="sec" id="homelab">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>{t.homelab.heading}</h2><div className="rule"></div></div>
          <Html tag="p" style={{fontSize:'14px',color:'var(--mid)',marginBottom:'24px',maxWidth:'900px',lineHeight:'1.65',fontWeight:'400'}} html={t.homelab.intro} />

          <div className="section-label" style={{marginBottom:'0'}}><div className="num">-</div><div className="slbl-t">{t.homelab.hardwareHeading}</div><div className="rule"></div></div>
          <table className="hw-table">
            <thead><tr><th>{t.homelab.hw.component}</th><th>{t.homelab.hw.unraidCol}</th><th>{t.homelab.hw.proxmoxCol}</th></tr></thead>
            <tbody>
              <tr><td>{t.homelab.hw.cpu}</td><td>Intel Core Ultra 5 225</td><td>Intel Core i7-8700</td></tr>
              <tr><td>{t.homelab.hw.motherboard}</td><td>ASUS Prime Z890M-Plus</td><td>-</td></tr>
              <tr><td>{t.homelab.hw.ram}</td><td>48GB DDR5 5600MHz</td><td>32GB DDR4</td></tr>
              <tr><td>{t.homelab.hw.case}</td><td>Jonsbo N6</td><td>-</td></tr>
              <tr><td>{t.homelab.hw.storage}</td><td>14TB + 2&times;12TB parity array + 2TB NVMe cache + 1TB NVMe boot</td><td>SSD (OS) + SATA pool</td></tr>
              <tr><td>{t.homelab.hw.network}</td><td>10GbE (Realtek RTL8127) + 1Gbps LAN &middot; VLANs</td><td>1Gbps LAN &middot; VLANs</td></tr>
              <tr><td>{t.homelab.hw.os}</td><td>UNRAID 7.3.1</td><td>Proxmox VE 8</td></tr>
              <tr><td>{t.homelab.hw.access}</td><td>Pangolin + Traefik</td><td>Tailscale + SSH</td></tr>
            </tbody>
          </table>

          <div className="section-label" style={{marginBottom:'0',marginTop:'56px'}}><div className="num">-</div><div className="slbl-t">{t.homelab.servicesHeading}</div><div className="rule"></div></div>
          <div className="category-index">
            {[
              ['Pangolin','Traefik','WireGuard','Cloudflared','Auto-TLS'],
              ['AdGuard Home','Unbound','macvlan','Split DNS'],
              ['CrowdSec','Gluetun','Kill switch','Intrusion detection'],
              ['Jellyfin','Seerr','Sonarr','Radarr','Jackett','Byparr','qBittorrent'],
              ['Navidrome','Lidarr','slskd','Subsonic API'],
              ['Immich','PostgreSQL','Redis','Vaultwarden'],
              ['Docker networking','Tailscale','VLANs','Zero-trust'],
            ].map((tags, i) => (
              <div className="detail-row" key={i}>
                <div className="cat-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="cat-name">{t.homelab.services[i].name}</div>
                <div>
                  <div className="desc">{t.homelab.services[i].desc}</div>
                  <div className="skill-list">{tags.map((s, si) => <span className="skill" key={si}>{s}</span>)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="note" style={{marginTop:'40px'}}>
            <div className="note-t">{t.homelab.note1.t}</div>
            <div className="note-d">{t.homelab.note1.d}</div>
          </div>

          <div className="section-label" style={{marginBottom:'0',marginTop:'56px'}}><div className="num">-</div><div className="slbl-t">{t.homelab.flowHeading}</div><div className="rule"></div></div>
          <div className="flow-diagram-wrap">
            <svg viewBox="0 0 920 540" width="100%" role="img" aria-label={t.homelab.flowSvgLabel}>
              <defs>
                <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M1 1L8 5L1 9" fill="none" stroke="var(--navy2)" strokeWidth="1.3"/>
                </marker>
                <marker id="arrow-grey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M1 1L8 5L1 9" fill="none" stroke="var(--line3)" strokeWidth="1.3"/>
                </marker>
                <marker id="arrow-navy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M1 1L8 5L1 9" fill="none" stroke="var(--navy)" strokeWidth="1.3"/>
                </marker>
              </defs>

              <path id="ext-motion" d="M190,85 L490,85 L490,195 L530,195 L680,200 L880,200" fill="none" stroke="none"/>
              <path id="int-motion" d="M190,365 L505,365 L505,205 L530,205 L680,200 L880,200" fill="none" stroke="none"/>

              <circle r="3" fill="var(--navy2)" className="flow-dot">
                <animateMotion dur="3s" repeatCount="indefinite">
                  <mpath href="#ext-motion"/>
                </animateMotion>
              </circle>
              <circle r="3" fill="var(--stone2)" stroke="var(--navy2)" strokeWidth="1.2" className="flow-dot flow-dot-return">
                <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                  <mpath href="#ext-motion"/>
                </animateMotion>
              </circle>

              <circle r="3" fill="var(--line3)" className="flow-dot">
                <animateMotion dur="3.4s" begin="0.4s" repeatCount="indefinite">
                  <mpath href="#int-motion"/>
                </animateMotion>
              </circle>
              <circle r="3" fill="var(--stone2)" stroke="var(--line3)" strokeWidth="1.2" className="flow-dot flow-dot-return">
                <animateMotion dur="3.4s" begin="2.1s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                  <mpath href="#int-motion"/>
                </animateMotion>
              </circle>

              <line x1="230" y1="10" x2="230" y2="490" stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4"/>
              <text x="40" y="24" className="flow-zone">{t.homelab.flow.outside}</text>
              <text x="260" y="24" className="flow-zone">{t.homelab.flow.internal}</text>

              <rect x="40" y="60" width="150" height="50" fill="var(--stone2)" stroke="var(--line)"/>
              <text x="115" y="80" textAnchor="middle" className="flow-t">{t.homelab.flow.phone}</text>
              <text x="115" y="97" textAnchor="middle" className="flow-s">{t.homelab.flow.phoneSub}</text>
              <line x1="190" y1="85" x2="260" y2="85" stroke="var(--navy2)" strokeWidth="1.2" markerEnd="url(#arrow-red)"/>

              <rect x="260" y="60" width="190" height="50" fill="var(--stone2)" stroke="var(--line)"/>
              <text x="355" y="80" textAnchor="middle" className="flow-t">{t.homelab.flow.cfPangolin}</text>
              <text x="355" y="97" textAnchor="middle" className="flow-s">{t.homelab.flow.cfPangolinSub}</text>
              <path d="M450 85 H490 V195 H530" fill="none" stroke="var(--navy2)" strokeWidth="1.2" markerEnd="url(#arrow-red)"/>
              <text x="490" y="145" textAnchor="middle" className="flow-s">{t.homelab.flow.passesThrough}</text>

              <rect x="40" y="340" width="150" height="50" fill="var(--stone2)" stroke="var(--line)"/>
              <text x="115" y="360" textAnchor="middle" className="flow-t">{t.homelab.flow.lanDevice}</text>
              <text x="115" y="377" textAnchor="middle" className="flow-s">{t.homelab.flow.lanDeviceSub}</text>
              <line x1="190" y1="365" x2="260" y2="365" stroke="var(--line3)" strokeWidth="1.2" markerEnd="url(#arrow-grey)"/>

              <rect x="260" y="340" width="190" height="50" fill="var(--stone2)" stroke="var(--line)"/>
              <text x="355" y="360" textAnchor="middle" className="flow-t">{t.homelab.flow.adguard}</text>
              <text x="355" y="377" textAnchor="middle" className="flow-s">{t.homelab.flow.adguardSub}</text>
              <path d="M450 365 H505 V205 H530" fill="none" stroke="var(--line3)" strokeWidth="1.2" markerEnd="url(#arrow-grey)"/>

              <rect x="530" y="175" width="150" height="50" fill="var(--stone2)" stroke="var(--navy)"/>
              <text x="605" y="195" textAnchor="middle" className="flow-t">{t.homelab.flow.traefik}</text>
              <text x="605" y="212" textAnchor="middle" className="flow-s">{t.homelab.flow.traefikSub}</text>
              <line x1="680" y1="200" x2="730" y2="200" stroke="var(--navy)" strokeWidth="1.2" markerEnd="url(#arrow-navy)"/>

              <rect x="730" y="175" width="150" height="50" fill="var(--stone2)" stroke="var(--line)"/>
              <text x="805" y="195" textAnchor="middle" className="flow-t">{t.homelab.flow.targetApp}</text>
              <text x="805" y="212" textAnchor="middle" className="flow-s">{t.homelab.flow.targetAppSub}</text>

              <rect x="260" y="420" width="190" height="50" fill="var(--stone2)" stroke="var(--line)"/>
              <text x="355" y="440" textAnchor="middle" className="flow-t">{t.homelab.flow.iot}</text>
              <text x="355" y="457" textAnchor="middle" className="flow-s">{t.homelab.flow.iotSub}</text>
              <path d="M355 420 V398" fill="none" stroke="var(--navy2)" strokeWidth="1.2" strokeDasharray="3 3"/>
              <line x1="349" y1="392" x2="361" y2="404" stroke="var(--navy2)" strokeWidth="1.4"/>
              <line x1="349" y1="404" x2="361" y2="392" stroke="var(--navy2)" strokeWidth="1.4"/>
              <text x="370" y="401" className="flow-s">{t.homelab.flow.iotNote}</text>

              <line x1="40" y1="510" x2="64" y2="510" stroke="var(--navy2)" strokeWidth="1.5"/>
              <text x="72" y="514" className="flow-s">{t.homelab.flow.legendPublic}</text>
              <line x1="260" y1="510" x2="284" y2="510" stroke="var(--line3)" strokeWidth="1.5"/>
              <text x="292" y="514" className="flow-s">{t.homelab.flow.legendLan}</text>
              <line x1="470" y1="505" x2="480" y2="515" stroke="var(--navy2)" strokeWidth="1.4"/>
              <line x1="470" y1="515" x2="480" y2="505" stroke="var(--navy2)" strokeWidth="1.4"/>
              <text x="490" y="514" className="flow-s">{t.homelab.flow.legendBlocked}</text>

              <circle cx="705" cy="510" r="3" fill="var(--navy2)"/>
              <text x="716" y="514" className="flow-s">{t.homelab.flow.legendRequest}</text>
              <circle cx="775" cy="510" r="3" fill="var(--stone2)" stroke="var(--navy2)" strokeWidth="1.2"/>
              <text x="786" y="514" className="flow-s">{t.homelab.flow.legendResponse}</text>
            </svg>
          </div>

          <div className="note" style={{marginTop:'16px'}}>
            <div className="note-t">{t.homelab.note2.t}</div>
            <div className="note-d">{t.homelab.note2.d}</div>
          </div>

          <div className="note" style={{marginTop:'16px'}}>
            <div className="note-t">{t.homelab.note3.t}</div>
            <div className="note-d">{t.homelab.note3.d}</div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="sec" id="desktop">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>{t.desktop.heading}</h2><div className="rule"></div></div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'40px',maxWidth:'900px',lineHeight:'1.65',fontWeight:'400'}}>{t.desktop.intro}</p>

          <table className="hw-table">
            <thead><tr><th>{t.desktop.hw.component}</th><th>{t.desktop.hw.spec}</th></tr></thead>
            <tbody>
              <tr><td>{t.desktop.hw.cpu}</td><td>AMD Ryzen 7 9800X3D (8c/16t &middot; 3D V-Cache)</td></tr>
              <tr><td>{t.desktop.hw.gpu}</td><td>Zotac RTX 5080 Solid OC</td></tr>
              <tr><td>{t.desktop.hw.ram}</td><td>32GB DDR5 6000MHz</td></tr>
              <tr><td>{t.desktop.hw.motherboard}</td><td>Gigabyte X870E AORUS PRO X3D ICE</td></tr>
              <tr><td>{t.desktop.hw.os}</td><td>CachyOS</td></tr>
              <tr><td>{t.desktop.hw.role}</td><td>{t.desktop.hw.roleVal}</td></tr>
            </tbody>
          </table>

          <div className="category-index">
            {[
              ['Zen 5','8c / 16t','96MB L3 3D V-Cache','5.0GHz boost'],
              ['Blackwell','16GB GDDR7','DLSS 4','MFG','CUDA','Ray Tracing'],
              ['X870E','PCIe 5.0','USB4','DDR5 6000','WiFi 7'],
            ].map((tags, i) => (
              <div className="detail-row" key={i}>
                <div className="cat-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="cat-name">{t.desktop.parts[i].name}</div>
                <div>
                  <div className="desc">{t.desktop.parts[i].desc}</div>
                  <div className="skill-list">{tags.map((s, si) => <span className="skill" key={si}>{s}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="sec" id="projects">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>{t.projects.heading}</h2><div className="rule"></div></div>
          <div className="category-index">
            {[
              ['Proxmox','Docker','LXC','Traefik','Tailscale'],
              ['TrueNAS','RAID 10','ZFS','rsync','ACLs'],
              ['React','Next.js','TypeScript','Tailwind'],
              ['Rust','ratatui','Subsonic','MPRIS2','tokio','SQLite'],
              ['Ansible','Compose','Bash','IaC'],
              ['Python','Docker','ListenBrainz','Last.fm','slskd','Navidrome'],
              ['Docker','Navidrome','slskd','Gluetun','ListenBrainz','ProtonVPN'],
              ['UNRAID 7.3.1','Docker','Parity Array','48GB DDR5','SMB/NFS'],
              ['Proxmox VE 8','LXC','KVM','Tailscale','VLAN','32GB DDR4'],
              ['PowerShell','Bash','Obsidian','Automation'],
              ['Python','scikit-learn','Regression','Jupyter','Statistics'],
            ].map((tags, i) => {
              const p = t.projects.items[i]
              return (
                <div className="detail-row" key={i}>
                  <div className="cat-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="row-meta"><div className="pr-type">{p.type}</div><div className={`status-tag ${p.status}`}>{t.projects.statusLabels[p.status as 'live' | 'oss']}{(p as any).statusExtra || ''}</div></div>
                  <div>
                    <div className="pr-t">{p.title}</div>
                    <div className="desc">{p.desc}</div>
                    <div className="skill-list">{tags.map((s, si) => <span className="skill" key={si}>{s}</span>)}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <p style={{marginTop:'24px',fontSize:'12px',color:'var(--muted)',fontFamily:'var(--f-mono)'}}>
            {t.projects.moreAt} <a href="https://github.com/Quinta0" target="_blank" rel="noopener" style={{color:'var(--navy2)',textDecoration:'none'}}>github.com/Quinta0 &#8599;</a>
          </p>
        </div>
      </div>

      {/* OPEN SOURCE CONTRIBUTIONS */}
      <div className="sec" id="oss">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>{t.oss.heading}</h2><div className="rule"></div></div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'28px',maxWidth:'820px',lineHeight:'1.6',fontWeight:'400'}}>{t.oss.intro}</p>
          <div className="row-index">
            {t.oss.repos.map((r, i) => (
              <div className="repo-row" key={i}>
                <div>
                  <h3>{r.name}</h3>
                  <p>{r.desc}</p>
                </div>
                <div className="repo-meta">
                  <span className={(r as any).isKind ? 'kind' : 'lang'}>{r.tag}</span>
                  <a href={r.href} target="_blank" rel="noopener" className={`action${(r as any).isIssue ? ' issue' : ''}`}>{r.action}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GITHUB */}
      <div className="sec" id="github">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>{t.github.heading}</h2><div className="rule"></div></div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'28px',maxWidth:'820px',lineHeight:'1.6',fontWeight:'400'}}>{t.github.intro}</p>
          <div className="row-index">
            {t.github.repos.map((r, i) => (
              <div className="repo-row" key={i}>
                <div>
                  <h3>{r.name}</h3>
                  <p>{r.desc}</p>
                </div>
                <div className="repo-meta">
                  {(r as any).star && <span className="star">{(r as any).star}</span>}
                  <span className={(r as any).isKind ? 'kind' : 'lang'}>{r.tag}</span>
                  <a href={r.href} target="_blank" rel="noopener" className="action">{t.github.repoAction}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EXPERIENCE + EDUCATION */}
      <div className="sec" id="experience">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>{t.experience.heading}</h2><div className="rule"></div></div>
          <div className="acc">
            <div className={`acc-item${openAcc['exp-0'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('exp-0')}>
                <div className="acc-l"><div className="acc-t">{t.experience.job.title}</div><div className="acc-s">{t.experience.job.sub}</div></div>
                <div className="acc-r2"><span className="acc-per">{t.experience.job.period}</span><ChevronDown/></div>
              </button>
              <div className="acc-body-wrap">
                <div className="acc-body">
                  <p>{t.experience.job.intro}</p>
                  <ul>
                    {t.experience.job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="section-label" style={{marginTop:'56px'}}><div className="num">-</div><div className="slbl-t">{t.experience.educationHeading}</div><div className="rule"></div></div>
          <div className="acc">
            {t.experience.education.map((edu, i) => (
              <div className={`acc-item${openAcc[`edu-${i}`] ? ' open' : ''}`} key={i}>
                <button className="acc-btn" onClick={() => toggle(`edu-${i}`)}>
                  <div className="acc-l"><div className="acc-t">{edu.title}{(edu as any).titleNote && <span style={{fontSize:'11px',color:'var(--muted)',fontWeight:400,fontFamily:'var(--f-mono)'}}> · {(edu as any).titleNote}</span>}</div><div className="acc-s">{edu.sub}</div></div>
                  <div className="acc-r2"><span className="acc-per">{edu.period}</span><ChevronDown/></div>
                </button>
                <div className="acc-body-wrap">
                  <div className="acc-body">
                    <p>{edu.intro}</p>
                    <ul>
                      {edu.bullets.map((b, bi) => <Html key={bi} tag="li" html={b} />)}
                    </ul>
                    <div className="econ-tags skill-list">
                      {edu.tags.map((tag, ti) => <span className="skill" key={ti}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-label" style={{marginTop:'48px'}}><div className="num">-</div><div className="slbl-t">{t.experience.languagesHeading}</div><div className="rule"></div></div>
          <div className="langs">
            {t.experience.languages.map((l, i) => (
              <div className="langc" key={i}><div className="lang-n">{l.name}</div><div className="lang-l">{l.level}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="contact" id="contact">
        <div className="contact-body">
          <Html tag="h2" html={t.contact.heading} />
          <p>{t.contact.p}</p>
          <div className="contact-ctas">
            <a href="mailto:0pietroquintavalle0@gmail.com" className="btn-li">0pietroquintavalle0@gmail.com</a>
            <a href="https://github.com/Quinta0" target="_blank" rel="noopener" className="btn-gh">GitHub &#8599;</a>
            <a href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/" target="_blank" rel="noopener" className="btn-gh">LinkedIn &#8599;</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="foot">
          <p>{t.footer.copyright}</p>
          <a href="#">{t.footer.backToTop} &#8593;</a>
        </div>
      </footer>
      </div>
    </>
  )
}
