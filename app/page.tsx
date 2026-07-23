"use client"

import { useEffect, useState } from 'react'
import BootSequence from './components/boot-sequence'

const ChevronDown = () => (
  <svg className="acc-chev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

export default function Home() {
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
            <a href="#skills" onClick={closeMobile}>Skills</a>
            <a href="#homelab" onClick={closeMobile}>Homelab</a>
            <a href="#desktop" onClick={closeMobile}>Desktop</a>
            <a href="#projects" onClick={closeMobile}>Projects</a>
            <a href="#oss" onClick={closeMobile}>Open Source</a>
            <a href="#github" onClick={closeMobile}>GitHub</a>
            <a href="#experience" onClick={closeMobile}>Experience</a>
            <a href="#contact" onClick={closeMobile}>Contact</a>
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
            <button className="nav-burger" aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(o => !o)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ANNOUNCE STRIP */}
      <div className="strip">
        <span className="strip-pill">Open to work</span>
        <a href="#contact">Available for Junior SysAdmin &amp; IT consulting &amp; Junior Quant <span className="strip-arr">&#8594;</span></a>
      </div>

      {/* HERO */}
      <div className="hero-row">
        <div className="hero-main">
          <div className="status-row"><span className="green-dot"></span>Lugano &middot; Switzerland &middot; USI Economics student</div>
          <div className="hero-name">Pietro<br/>Quintavalle</div>
          <div className="hero-role">Systems Engineer &middot; Developer &middot; Homelabber</div>
          <p className="hero-thesis">Economics models incentives under constraints; infrastructure models constraints under load  I like sitting where those two disciplines overlap.</p>
          <p className="hero-lead">5+ years building production-grade infrastructure from the ground up. I design resilient systems and write the software that runs on top of them  then secure and monitor all of it myself.</p>

          <div className="btns">
            <a href="#contact" className="btn btn-d">Get in touch</a>
            <a href="#homelab" className="btn btn-o">Explore homelab</a>
            <a href="#projects" className="btn btn-o">View projects</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-val">90%+ uptime</span><span className="stat-lbl">Production servers</span></div>
          <div className="stat"><span className="stat-val">4 servers</span><span className="stat-lbl">Under management</span></div>
          <div className="stat"><span className="stat-val">5+ years</span><span className="stat-lbl">SysAdmin experience</span></div>
          <div className="stat"><span className="stat-val">BSc Economics</span><span className="stat-lbl">USI &middot; Ongoing</span></div>
          <div className="stat"><span className="stat-val">IT &middot; EN &middot; DE &middot; ES &middot; NO</span><span className="stat-lbl">5 languages</span></div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="about-split">
        <div className="about-text">
          <div className="section-label"><div className="num"></div><h2>About me</h2><div className="rule"></div></div>
          <p>Hi  friends call me <strong>Quinta</strong>. I&rsquo;m an Economics student at USI Lugano and a self-taught systems engineer who&rsquo;s been running homelab infrastructure since 2020.</p>
          <p>My setup spans everything from <strong>bare-metal Proxmox clusters</strong> to <strong>DNS and domain management via Cloudflare</strong>, <strong>Pangolin/Traefik reverse proxying</strong>, and a full media+music automation pipeline.</p>
          <p>On the academic side I&rsquo;m deepening my understanding of <strong>microeconomics, macroeconomics, game theory, and quantitative finance</strong>  and finding more overlap with systems thinking than you&rsquo;d expect.</p>
        </div>
        <div className="about-card">
          <div className="about-card-row">
            <div className="about-card-t">Lugano, Switzerland</div>
            <div className="about-card-d">USI Economics student</div>
          </div>
          <div className="about-card-row">
            <div className="about-card-t">Open for work</div>
            <div className="about-card-d">Junior SysAdmin &middot; IT consulting &middot; Junior Quant</div>
          </div>
          <div className="about-card-row">
            <div className="about-card-t">Daily driver</div>
            <div className="about-card-d">Ryzen 7 9800X3D &middot; RTX 5080 &middot; hand-built keyboard</div>
          </div>
          <div className="about-card-row">
            <div className="about-card-t">5 languages</div>
            <div className="about-card-d">IT &middot; EN &middot; DE &middot; ES &middot; NO</div>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div className="sec" id="skills">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>Technical Arsenal</h2><div className="rule"></div></div>

          <div className="core-band">
            <div className="label">Core stack<span>Systems &amp; infrastructure,<br/>5+ years hands-on</span></div>
            <div className="stack">
              <span className="item">Proxmox</span><span className="item">Docker / LXC</span><span className="item">Ansible</span>
              <span className="item">Linux</span><span className="item">ZFS</span><span className="item">Cloudflare / Traefik</span>
              <span className="item">Tailscale</span><span className="item">Fail2Ban / CrowdSec</span><span className="item">Grafana / Prometheus</span>
            </div>
          </div>

          <div className="legend">
            <span className="l-applied"><span className="mark">&#9642;</span>Applied &mdash; used in production or a shipped project</span>
            <span className="l-exposure"><span className="mark">&#9643;</span>Exposure &mdash; coursework or limited use</span>
          </div>

          <div className="category-index">
            <div className="category-row">
              <div className="cat-num">01</div>
              <div className="cat-name">System &amp; Infra<span>Platforms</span></div>
              <div className="skill-list">
                <span className="skill applied">Proxmox VE</span><span className="skill applied">UNRAID</span><span className="skill applied">TrueNAS</span>
                <span className="skill applied">Docker</span><span className="skill applied">LXC</span><span className="skill applied">KVM</span>
                <span className="skill applied">Linux</span><span className="skill exposure">Win Server</span><span className="skill exposure">AD</span>
              </div>
            </div>
            <div className="category-row">
              <div className="cat-num">02</div>
              <div className="cat-name">Network &amp; Security<span>Infrastructure</span></div>
              <div className="skill-list">
                <span className="skill applied">VLAN</span><span className="skill applied">Cloudflare</span><span className="skill applied">AAAA/DNS</span>
                <span className="skill applied">CF Tunnels</span><span className="skill applied">Tailscale</span><span className="skill applied">Fail2Ban</span>
                <span className="skill applied">Crowdsec</span><span className="skill applied">UFW</span><span className="skill applied">Authelia</span><span className="skill applied">Traefik</span>
              </div>
            </div>
            <div className="category-row">
              <div className="cat-num">03</div>
              <div className="cat-name">Development<span>Languages / tools</span></div>
              <div className="skill-list">
                <span className="skill applied">Python</span><span className="skill applied">TypeScript</span><span className="skill applied">React</span>
                <span className="skill applied">Next.js</span><span className="skill applied">Django</span><span className="skill applied">SQL</span>
                <span className="skill applied">Bash</span><span className="skill applied">Ansible</span><span className="skill exposure">HTML/CSS</span><span className="skill exposure">Soldering</span>
              </div>
            </div>
            <div className="category-row">
              <div className="cat-num">04</div>
              <div className="cat-name">Data &amp; Monitoring<span>Observability</span></div>
              <div className="skill-list">
                <span className="skill applied">Grafana</span><span className="skill applied">Prometheus</span><span className="skill applied">Uptime Kuma</span>
                <span className="skill applied">ZFS</span><span className="skill applied">rsync</span><span className="skill applied">RAID</span><span className="skill applied">cAdvisor</span>
              </div>
            </div>
          </div>

          <div className="section-label" style={{marginTop:'56px'}}><div className="num">05&ndash;08</div><div className="slbl-t">Economics &amp; Quant</div><div className="rule"></div></div>

          <div className="quant-grid">
            <div className="quant-cell">
              <div className="cat-head"><span className="cat-num">05</span><h3>Microeconomics</h3></div>
              <div className="skill-list">
                <span className="skill exposure">Consumer theory</span><span className="skill exposure">Market structures</span>
                <span className="skill exposure">Production &amp; costs</span><span className="skill exposure">Price theory</span><span className="skill exposure">Welfare econ.</span>
              </div>
            </div>
            <div className="quant-cell">
              <div className="cat-head"><span className="cat-num">06</span><h3>Macroeconomics</h3></div>
              <div className="skill-list">
                <span className="skill exposure">GDP &amp; growth</span><span className="skill exposure">Monetary policy</span>
                <span className="skill exposure">Fiscal policy</span><span className="skill exposure">IS-LM model</span><span className="skill exposure">Open economy</span>
              </div>
            </div>
            <div className="quant-cell">
              <div className="cat-head"><span className="cat-num">07</span><h3>Game Theory</h3></div>
              <div className="skill-list">
                <span className="skill exposure">Nash equilibrium</span><span className="skill exposure">Dominant strategies</span>
                <span className="skill exposure">Extensive form</span><span className="skill exposure">Mechanism design</span><span className="skill exposure">Auctions</span>
              </div>
            </div>
            <div className="quant-cell">
              <div className="cat-head"><span className="cat-num">08</span><h3>Quantitative Finance</h3></div>
              <div className="skill-list">
                <span className="skill exposure">Time value of money</span><span className="skill exposure">Probability</span>
                <span className="skill applied">Statistics</span><span className="skill applied">Regression</span><span className="skill applied">Financial modelling</span>
              </div>
            </div>
          </div>

          <div className="section-label"><div className="num">09</div><div className="slbl-t">Certifications</div><div className="rule"></div></div>
          <div className="certs">
            <div className="cert-row">
              <div className="cert-mark">GA</div>
              <div><div className="cert-name">Data Analytics Professional Certificate</div><div className="cert-issuer">Google</div></div>
              <div className="cert-status">Verified</div>
            </div>
            <div className="cert-row">
              <div className="cert-mark">GA</div>
              <div><div className="cert-name">IT Support Professional Certificate</div><div className="cert-issuer">Google</div></div>
              <div className="cert-status">Verified</div>
            </div>
            <div className="cert-row">
              <div className="cert-mark">MS</div>
              <div><div className="cert-name">Foundations of IT Systems, Networking &amp; Data Protection</div><div className="cert-issuer">Microsoft</div></div>
              <div className="cert-status">Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* HOMELAB */}
      <div className="sec" id="homelab">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>Homelab Infrastructure</h2><div className="rule"></div></div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'40px',maxWidth:'680px',lineHeight:'1.65',fontWeight:'400'}}>Every service containerised, every entry-point proxied, every failure logged. Domain management via Cloudflare with AAAA records and tunnels. Built to enterprise patterns at personal scale.</p>

          <div className="section-label" style={{marginBottom:'0'}}><div className="num">&mdash;</div><div className="slbl-t">Hardware</div><div className="rule"></div></div>
          <table className="hw-table">
            <thead><tr><th>Component</th><th>UNRAID Server</th><th>Proxmox Node</th></tr></thead>
            <tbody>
              <tr><td>CPU</td><td>Intel Core Ultra 5 225</td><td>Intel Core i7-8700</td></tr>
              <tr><td>RAM</td><td>48GB DDR5 5600MHz</td><td>32GB DDR4</td></tr>
              <tr><td>Storage</td><td>4&times; HDD parity array + NVMe cache</td><td>SSD (OS) + SATA pool</td></tr>
              <tr><td>Network</td><td>1Gbps LAN &middot; VLANs</td><td>1Gbps LAN &middot; VLANs</td></tr>
              <tr><td>OS</td><td>UNRAID 7.3.1</td><td>Proxmox VE 8</td></tr>
              <tr><td>Access</td><td>Pangolin + Traefik</td><td>Tailscale + SSH</td></tr>
              <tr><td>Focus</td><td>Idle power efficiency &middot; perf/watt</td><td>Virtualisation &middot; LXC</td></tr>
            </tbody>
          </table>

          <div className="section-label" style={{marginBottom:'0'}}><div className="num">&mdash;</div><div className="slbl-t">Services &amp; Stack</div><div className="rule"></div></div>
          <div className="category-index">
            <div className="detail-row">
              <div className="cat-num">01</div>
              <div className="cat-name">UNRAID NAS</div>
              <div>
                <div className="desc">Parity-protected array hosting 9-user network shares, Docker Appdata, automated backups. Acts as the central file hub for all services via SMB/NFS.</div>
                <div className="skill-list"><span className="skill">UNRAID 7.3.1</span><span className="skill">Parity array</span><span className="skill">NVMe cache</span><span className="skill">9 users</span><span className="skill">rsync</span><span className="skill">SMB/NFS</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">02</div>
              <div className="cat-name">DNS &amp; Cloudflare</div>
              <div>
                <div className="desc">Domain managed through Cloudflare with AAAA records for IPv6, Cloudflare Tunnels for zero-open-port external access, and AdGuard Home for internal DNS resolution and ad-blocking.</div>
                <div className="skill-list"><span className="skill">Cloudflare</span><span className="skill">AAAA records</span><span className="skill">CF Tunnels</span><span className="skill">AdGuard Home</span><span className="skill">Split DNS</span><span className="skill">DNSSEC</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">03</div>
              <div className="cat-name">Pangolin + Traefik</div>
              <div>
                <div className="desc">Pangolin (Traefik-based) handles all inbound HTTPS with automatic TLS, subdomain routing, and middleware. Newt tunnel enables access without exposing raw ports. Authelia adds SSO/2FA.</div>
                <div className="skill-list"><span className="skill">Pangolin</span><span className="skill">Traefik</span><span className="skill">Auto-TLS</span><span className="skill">Newt tunnel</span><span className="skill">Authelia</span><span className="skill">Middleware</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">04</div>
              <div className="cat-name">Fail2Ban + Security</div>
              <div>
                <div className="desc">Fail2Ban monitors SSH and auth logs, auto-banning brute-force IPs. Crowdsec adds community threat intelligence with real-time blocklist sync. UFW provides host-level firewall rules on each node.</div>
                <div className="skill-list"><span className="skill">Fail2Ban</span><span className="skill">Crowdsec</span><span className="skill">UFW</span><span className="skill">iptables</span><span className="skill">SSH hardening</span><span className="skill">Authelia</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">05</div>
              <div className="cat-name">Jellyfin + Media</div>
              <div>
                <div className="desc">Jellyfin handles hardware-transcoded streaming with per-user OAuth authentication and Authelia SSO. Sonarr/Radarr auto-manage TV and film libraries; Bazarr handles subtitles; Prowlarr indexes trackers.</div>
                <div className="skill-list"><span className="skill">Jellyfin</span><span className="skill">HW transcode</span><span className="skill">OAuth</span><span className="skill">Sonarr</span><span className="skill">Radarr</span><span className="skill">Bazarr</span><span className="skill">Prowlarr</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">06</div>
              <div className="cat-name">Music Pipeline</div>
              <div>
                <div className="desc">Lidarr monitors for releases &#8594; Prowlarr indexes &#8594; Beets normalises tags &#8594; Navidrome streams via Subsonic API. Scrobbling to Listenbrainz. Mobile playback via Symfonium and Explo apps.</div>
                <div className="skill-list"><span className="skill">Navidrome</span><span className="skill">Lidarr</span><span className="skill">Prowlarr</span><span className="skill">Beets</span><span className="skill">Listenbrainz</span><span className="skill">Symfonium</span><span className="skill">Explo</span></div>
              </div>
            </div>
          </div>

          <div className="note" style={{marginTop:'40px'}}>
            <div className="note-t">Zero open ports via Tailscale + Cloudflare Tunnels</div>
            <div className="note-d">All services reachable remotely through a combination of Tailscale mesh VPN (for trusted devices) and Cloudflare Tunnels (for public-facing services). No port-forwarding. MagicDNS handles internal name resolution. Pangolin&rsquo;s Newt agent tunnels external traffic into the private LAN.</div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="sec" id="desktop">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>Personal Workstation</h2><div className="rule"></div></div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'40px',maxWidth:'680px',lineHeight:'1.65',fontWeight:'400'}}>Daily driver and dev machine. Built around AMD&rsquo;s 3D V-Cache architecture for a blend of high single-threaded performance and serious GPU compute  doubles as a gaming rig, 3D modelling workstation, and 3D printing controller.</p>

          <table className="hw-table">
            <thead><tr><th>Component</th><th>Spec</th></tr></thead>
            <tbody>
              <tr><td>CPU</td><td>AMD Ryzen 7 9800X3D (8c/16t &middot; 3D V-Cache)</td></tr>
              <tr><td>GPU</td><td>Zotac RTX 5080 Solid OC</td></tr>
              <tr><td>RAM</td><td>32GB DDR5 6000MHz</td></tr>
              <tr><td>Motherboard</td><td>Gigabyte X870E AORUS PRO X3D ICE</td></tr>
              <tr><td>OS</td><td>CachyOS</td></tr>
              <tr><td>Role</td><td>Dev &middot; Gaming &middot; 3D Modelling &middot; 3D Printing &middot; Daily Driver</td></tr>
            </tbody>
          </table>

          <div className="category-index">
            <div className="detail-row">
              <div className="cat-num">01</div>
              <div className="cat-name">AMD Ryzen 7 9800X3D</div>
              <div>
                <div className="desc">Zen 5 architecture with 96MB 3D V-Cache. Exceptional single-thread and gaming performance, with low-latency cache access ideal for simulation and data-heavy workloads.</div>
                <div className="skill-list"><span className="skill">Zen 5</span><span className="skill">8c / 16t</span><span className="skill">96MB L3 3D V-Cache</span><span className="skill">5.0GHz boost</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">02</div>
              <div className="cat-name">Zotac RTX 5080 Solid OC</div>
              <div>
                <div className="desc">Blackwell architecture. 16GB GDDR7, hardware ray tracing, DLSS 4 with Multi Frame Generation. Used for gaming, 3D rendering, and GPU-accelerated dev and compute tasks.</div>
                <div className="skill-list"><span className="skill">Blackwell</span><span className="skill">16GB GDDR7</span><span className="skill">DLSS 4</span><span className="skill">MFG</span><span className="skill">CUDA</span><span className="skill">Ray Tracing</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">03</div>
              <div className="cat-name">X870E AORUS PRO X3D ICE</div>
              <div>
                <div className="desc">Gigabyte X870E flagship board with PCIe 5.0, USB4, and optimised X3D power delivery. Supports DDR5 6000MHz XMP out-of-the-box. White aesthetic matches the build&rsquo;s ICE theme.</div>
                <div className="skill-list"><span className="skill">X870E</span><span className="skill">PCIe 5.0</span><span className="skill">USB4</span><span className="skill">DDR5 6000</span><span className="skill">WiFi 7</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="sec" id="projects">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>Personal &amp; Client Projects</h2><div className="rule"></div></div>
          <div className="category-index">
            <div className="detail-row">
              <div className="cat-num">01</div>
              <div className="row-meta"><div className="pr-type">Professional Client</div><div className="status-tag live">Live</div></div>
              <div>
                <div className="pr-t">Enterprise Proxmox Cluster</div>
                <div className="desc">Full single-node virtualisation with VLAN segmentation, Pangolin/Traefik reverse proxy, Cloudflare Tunnels, and centralised Grafana/Prometheus monitoring. 90%+ uptime maintained.</div>
                <div className="skill-list"><span className="skill">Proxmox</span><span className="skill">Docker</span><span className="skill">LXC</span><span className="skill">Traefik</span><span className="skill">Tailscale</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">02</div>
              <div className="row-meta"><div className="pr-type">Professional Client</div><div className="status-tag live">Live</div></div>
              <div>
                <div className="pr-t">9-User RAID 10 NAS</div>
                <div className="desc">TrueNAS on RAID 10 serving as a self-hosted cloud for 9 users. Per-user ACLs, automated rsync offsite backups, ZFS snapshots for instant point-in-time recovery.</div>
                <div className="skill-list"><span className="skill">TrueNAS</span><span className="skill">RAID 10</span><span className="skill">ZFS</span><span className="skill">rsync</span><span className="skill">ACLs</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">03</div>
              <div className="row-meta"><div className="pr-type">Personal Project</div><div className="status-tag oss">Open Source</div></div>
              <div>
                <div className="pr-t">Valgo  Algorithm Visualizer</div>
                <div className="desc">Step-by-step algorithm visualisation built with React and Next.js. Sorting, graph, and search algorithms with live code annotations and speed controls.</div>
                <div className="skill-list"><span className="skill">React</span><span className="skill">Next.js</span><span className="skill">TypeScript</span><span className="skill">Tailwind</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">04</div>
              <div className="row-meta"><div className="pr-type">Personal Project</div><div className="status-tag oss">Open Source</div></div>
              <div>
                <div className="pr-t">Riptune  Terminal Music Client</div>
                <div className="desc">Terminal-native music client for Subsonic-compatible servers (Navidrome, Airsonic, Gonic), built in Rust for the niri Wayland compositor  MPRIS2 D-Bus control, SQLite-cached library for instant startup, and inline album art via Kitty/Sixel graphics.</div>
                <div className="skill-list"><span className="skill">Rust</span><span className="skill">ratatui</span><span className="skill">Subsonic</span><span className="skill">MPRIS2</span><span className="skill">tokio</span><span className="skill">SQLite</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">05</div>
              <div className="row-meta"><div className="pr-type">Personal Homelab</div><div className="status-tag live">Live</div></div>
              <div>
                <div className="pr-t">Self-Hosted Stack (IaC)</div>
                <div className="desc">Entire homelab reproduced from code  Ansible playbooks, Docker Compose, and Bash scripts. Idempotent provisioning; full rebuild in under 30 minutes from scratch.</div>
                <div className="skill-list"><span className="skill">Ansible</span><span className="skill">Compose</span><span className="skill">Bash</span><span className="skill">IaC</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">06</div>
              <div className="row-meta"><div className="pr-type">Personal Project</div><div className="status-tag oss">Open Source</div></div>
              <div>
                <div className="pr-t">re-soulcommand</div>
                <div className="desc">Music recommendation downloader integrating ListenBrainz and Last.fm playlists with Navidrome via slskd (Soulseek daemon). Fork rebuilt around a REST API backend  stripped of bloat, Docker-native.</div>
                <div className="skill-list"><span className="skill">Python</span><span className="skill">Docker</span><span className="skill">ListenBrainz</span><span className="skill">Last.fm</span><span className="skill">slskd</span><span className="skill">Navidrome</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">07</div>
              <div className="row-meta"><div className="pr-type">Personal Homelab</div><div className="status-tag live">Live</div></div>
              <div>
                <div className="pr-t">Ainulindale  Music Stack</div>
                <div className="desc">Fully self-hosted music discovery and streaming platform. Auto-discovers music weekly from listening habits, downloads via Soulseek P2P through a VPN gateway, streams via Navidrome. No commercial services required.</div>
                <div className="skill-list"><span className="skill">Docker</span><span className="skill">Navidrome</span><span className="skill">slskd</span><span className="skill">Gluetun</span><span className="skill">ListenBrainz</span><span className="skill">ProtonVPN</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">08</div>
              <div className="row-meta"><div className="pr-type">Personal Homelab</div><div className="status-tag live">Live</div></div>
              <div>
                <div className="pr-t">UNRAID Home Server</div>
                <div className="desc">Intel Core Ultra 5 225 build running UNRAID 7.3.1 as primary NAS, Docker host, and media stack. Parity-protected array with NVMe cache, 9-user SMB/NFS shares, and all homelab services containerised.</div>
                <div className="skill-list"><span className="skill">UNRAID 7.3.1</span><span className="skill">Docker</span><span className="skill">Parity Array</span><span className="skill">48GB DDR5</span><span className="skill">SMB/NFS</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">09</div>
              <div className="row-meta"><div className="pr-type">Personal Homelab</div><div className="status-tag live">Live</div></div>
              <div>
                <div className="pr-t">Proxmox Virtualisation Node</div>
                <div className="desc">Intel Core i7-8700 node running Proxmox VE 8 for LXC containers and KVM VMs. VLAN-segmented network, Tailscale + SSH access, acts as the compute backbone for all hosted services.</div>
                <div className="skill-list"><span className="skill">Proxmox VE 8</span><span className="skill">LXC</span><span className="skill">KVM</span><span className="skill">Tailscale</span><span className="skill">VLAN</span><span className="skill">32GB DDR4</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">10</div>
              <div className="row-meta"><div className="pr-type">Personal Project</div><div className="status-tag oss">Open Source &middot; &#9733; 26</div></div>
              <div>
                <div className="pr-t">ObsidianSetup</div>
                <div className="desc">Cross-platform utility script that makes installing Obsidian and its plugins consistent across devices  PowerShell and Bash installers driven by a single plugins.json manifest.</div>
                <div className="skill-list"><span className="skill">PowerShell</span><span className="skill">Bash</span><span className="skill">Obsidian</span><span className="skill">Automation</span></div>
              </div>
            </div>
            <div className="detail-row">
              <div className="cat-num">11</div>
              <div className="row-meta"><div className="pr-type">Academic Project</div><div className="status-tag oss">Open Source</div></div>
              <div>
                <div className="pr-t">Boston Housing Price Prediction</div>
                <div className="desc">Probability &amp; Statistics coursework at USI  built and evaluated regression models on the classic Boston housing dataset to predict median home values from neighbourhood features.</div>
                <div className="skill-list"><span className="skill">Python</span><span className="skill">scikit-learn</span><span className="skill">Regression</span><span className="skill">Jupyter</span><span className="skill">Statistics</span></div>
              </div>
            </div>
          </div>
          <p style={{marginTop:'24px',fontSize:'12px',color:'var(--muted)',fontFamily:'var(--f-mono)'}}>
            More projects at <a href="https://github.com/Quinta0" target="_blank" rel="noopener" style={{color:'var(--navy2)',textDecoration:'none'}}>github.com/Quinta0 &#8599;</a>
          </p>
        </div>
      </div>

      {/* OPEN SOURCE CONTRIBUTIONS */}
      <div className="sec" id="oss">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>Open Source Contributions</h2><div className="rule"></div></div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'28px',maxWidth:'640px',lineHeight:'1.6',fontWeight:'400'}}>External pull requests and issues resolved in other maintainers&rsquo; codebases  work landed in repos I don&rsquo;t own.</p>
          <div className="row-index">
            <div className="repo-row">
              <div>
                <h3>libratbag/libratbag</h3>
                <p>Reverse-engineered the full USB HID protocol (via Wireshark/USBPcap capture analysis) for an unsupported gaming mouse and wrote a complete libratbag driver from scratch  DPI, polling rate, debounce, and button remapping, with persistence verified on real hardware.</p>
              </div>
              <div className="repo-meta"><span className="lang">C</span><a href="https://github.com/libratbag/libratbag/pull/1873" target="_blank" rel="noopener" className="action">PR #1873</a></div>
            </div>
            <div className="repo-row">
              <div>
                <h3>libratbag/piper</h3>
                <p>Companion contribution to the driver above  custom device artwork and Piper GUI integration so the new mouse is recognised and configurable in the Piper front-end.</p>
              </div>
              <div className="repo-meta"><span className="lang">SVG</span><a href="https://github.com/libratbag/piper/pull/1121" target="_blank" rel="noopener" className="action">PR #1121</a></div>
            </div>
            <div className="repo-row">
              <div>
                <h3>ValveSoftware/steam-for-linux</h3>
                <p>Diagnosed and fixed a Steam Linux Runtime install bug via config.vdf and appmanifest inspection after all standard recovery paths (integrity verification, manifest wipes, steamcmd re-install) failed; workaround adopted by other affected users.</p>
              </div>
              <div className="repo-meta"><span className="kind">debugging</span><a href="https://github.com/ValveSoftware/steam-for-linux/issues/13248" target="_blank" rel="noopener" className="action issue">Issue #13248</a></div>
            </div>
          </div>
        </div>
      </div>

      {/* GITHUB */}
      <div className="sec" id="github">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>My Projects on GitHub</h2><div className="rule"></div></div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'28px',maxWidth:'640px',lineHeight:'1.6',fontWeight:'400'}}>The complete repository list  including the projects featured above, plus the smaller tools and documentation that support them.</p>
          <div className="row-index">
            <div className="repo-row">
              <div>
                <h3>Quinta0/re-soulcommand</h3>
                <p>Music recommendation downloader  ListenBrainz &amp; Last.fm playlists into Navidrome via slskd. Author &amp; maintainer.</p>
              </div>
              <div className="repo-meta"><span className="lang">Python</span><a href="https://github.com/Quinta0/re-soulcommand" target="_blank" rel="noopener" className="action">Repo</a></div>
            </div>
            <div className="repo-row">
              <div>
                <h3>Quinta0/riptune</h3>
                <p>A terminal-native music client for Subsonic-compatible servers (Navidrome, Airsonic, Gonic), built for the niri scrollable-tiling compositor.</p>
              </div>
              <div className="repo-meta"><span className="lang">Rust</span><a href="https://github.com/Quinta0/riptune" target="_blank" rel="noopener" className="action">Repo</a></div>
            </div>
            <div className="repo-row">
              <div>
                <h3>Quinta0/Ainulindale</h3>
                <p>Self-hosted music discovery &amp; streaming stack  auto-discovery, Soulseek P2P download via VPN, Navidrome streaming. Author &amp; maintainer.</p>
              </div>
              <div className="repo-meta"><span className="lang">Shell</span><a href="https://github.com/Quinta0/Ainulindale" target="_blank" rel="noopener" className="action">Repo</a></div>
            </div>
            <div className="repo-row">
              <div>
                <h3>Quinta0/Nargothrond</h3>
                <p>Documentation for full homelab provisioning.</p>
              </div>
              <div className="repo-meta"><span className="kind">docs</span><a href="https://github.com/Quinta0/Nargothrond" target="_blank" rel="noopener" className="action">Repo</a></div>
            </div>
            <div className="repo-row">
              <div>
                <h3>Quinta0/ObsidianSetup</h3>
                <p>Cross-platform Obsidian + plugin installer, driven by a shared plugins.json manifest. Author &amp; maintainer.</p>
              </div>
              <div className="repo-meta"><span className="star">26</span><span className="lang">PowerShell</span><a href="https://github.com/Quinta0/ObsidianSetup" target="_blank" rel="noopener" className="action">Repo</a></div>
            </div>
            <div className="repo-row">
              <div>
                <h3>Quinta0/BostonHousing</h3>
                <p>Probability &amp; Statistics coursework at USI  regression models predicting Boston-area housing prices.</p>
              </div>
              <div className="repo-meta"><span className="lang">Jupyter</span><a href="https://github.com/Quinta0/BostonHousing" target="_blank" rel="noopener" className="action">Repo</a></div>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCE + EDUCATION */}
      <div className="sec" id="experience">
        <div className="sec-body">
          <div className="section-label"><div className="num"></div><h2>Experience</h2><div className="rule"></div></div>
          <div className="acc">
            <div className={`acc-item${openAcc['exp-0'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('exp-0')}>
                <div className="acc-l"><div className="acc-t">Systems Engineering Consultant</div><div className="acc-s">Freelance &middot; Ticino, Switzerland</div></div>
                <div className="acc-r2"><span className="acc-per">Jan 2020  Present</span><ChevronDown/></div>
              </button>
              <div className="acc-body-wrap">
                <div className="acc-body">
                  <p>End-to-end IT infrastructure for private and business clients in Ticino.</p>
                  <ul>
                    <li>Delivered and maintained 4 production servers at 90%+ uptime using containerisation, IaC, and automated monitoring  all without managed hosting.</li>
                    <li>Eliminated public exposure across all client servers by routing every external entry-point through Cloudflare Tunnels and Pangolin/Traefik  zero open ports, DNSSEC enforced, split-DNS via AdGuard Home.</li>
                    <li>Pangolin + Traefik reverse proxy with Authelia SSO, automatic TLS, and Newt tunnelling.</li>
                    <li>Fail2Ban + Crowdsec intrusion detection; UFW + iptables firewall rules across all nodes.</li>
                    <li>Reduced storage recovery time to under 30 minutes with ZFS snapshots on the TrueNAS RAID 10 array and automated rsync offsite backups across all storage nodes.</li>
                    <li>Music pipeline: Lidarr &#8594; Prowlarr &#8594; Beets &#8594; Navidrome + Listenbrainz scrobbling + Symfonium/Explo mobile.</li>
                    <li>Windows Server: Active Directory, DNS, DHCP, Group Policy, Disaster Recovery planning.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="section-label" style={{marginTop:'56px'}}><div className="num">&mdash;</div><div className="slbl-t">Education</div><div className="rule"></div></div>
          <div className="acc">
            <div className={`acc-item${openAcc['edu-0'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('edu-0')}>
                <div className="acc-l"><div className="acc-t">BSc in Economics</div><div className="acc-s">USI Universit&agrave; della Svizzera italiana &middot; Lugano</div></div>
                <div className="acc-r2"><span className="acc-per">Sep 2024  Present</span><ChevronDown/></div>
              </button>
              <div className="acc-body-wrap">
                <div className="acc-body">
                  <p>Ongoing bachelor&rsquo;s focusing on rigorous theory and quantitative methods.</p>
                  <ul>
                    <li><strong style={{color:'var(--navy)'}}>Microeconomics</strong>  consumer and producer theory, market structures (perfect competition, oligopoly, monopoly), welfare economics, externalities.</li>
                    <li><strong style={{color:'var(--navy)'}}>Macroeconomics</strong>  GDP and growth models, IS-LM, monetary and fiscal policy, open economy models, inflation and unemployment dynamics.</li>
                    <li><strong style={{color:'var(--navy)'}}>Game Theory</strong>  Nash equilibrium, dominant strategies, extensive and normal form games, mechanism design, auction theory, repeated games.</li>
                    <li><strong style={{color:'var(--navy)'}}>Quantitative Finance &amp; Statistics</strong>  probability theory, statistical inference, regression analysis, time series, financial modelling, portfolio theory basics.</li>
                    <li>Accounting, Statistics, and Quantitative Methods for economic analysis.</li>
                  </ul>
                  <div className="econ-tags skill-list">
                    <span className="skill">Game Theory</span><span className="skill">Microeconomics</span><span className="skill">Macroeconomics</span><span className="skill">Quantitative Finance</span><span className="skill">Statistics</span><span className="skill">Financial Modelling</span><span className="skill">IS-LM</span><span className="skill">Nash Equilibrium</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`acc-item${openAcc['edu-1'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('edu-1')}>
                <div className="acc-l"><div className="acc-t">BSc in Informatics <span style={{fontSize:'11px',color:'var(--muted)',fontWeight:400,fontFamily:'var(--f-mono)'}}> 2 yrs completed</span></div><div className="acc-s">USI Universit&agrave; della Svizzera italiana &middot; Lugano</div></div>
                <div className="acc-r2"><span className="acc-per">Sep 2022  Jun 2024</span><ChevronDown/></div>
              </button>
              <div className="acc-body-wrap">
                <div className="acc-body">
                  <p>Two years of rigorous computer science foundations before transitioning to Economics.</p>
                  <ul>
                    <li><strong style={{color:'var(--navy)'}}>Software Engineering</strong>  agile methodologies, requirements engineering, UML modelling, design patterns, and testing practices.</li>
                    <li><strong style={{color:'var(--navy)'}}>Data Structures &amp; Algorithms</strong>  complexity analysis (Big-O), arrays, linked lists, trees, graphs, and sorting and searching algorithms.</li>
                    <li><strong style={{color:'var(--navy)'}}>Object-Oriented Programming</strong>  Java and C++ with inheritance, polymorphism, encapsulation, and SOLID principles.</li>
                    <li><strong style={{color:'var(--navy)'}}>Web Development</strong>  HTML, CSS, and JavaScript fundamentals with introductory full-stack concepts.</li>
                    <li>Discrete mathematics, logic, and formal reasoning for computer science.</li>
                  </ul>
                  <div className="econ-tags skill-list">
                    <span className="skill">Java</span><span className="skill">C++</span><span className="skill">Algorithms</span><span className="skill">Data Structures</span><span className="skill">OOP</span><span className="skill">Agile</span><span className="skill">Software Engineering</span><span className="skill">Web Dev</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`acc-item${openAcc['edu-2'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('edu-2')}>
                <div className="acc-l"><div className="acc-t">Maturit&agrave; Cantonale &amp; AFC Economics</div><div className="acc-s">Scuola cantonale di commercio &middot; Bellinzona</div></div>
                <div className="acc-r2"><span className="acc-per">Sep 2018  Jun 2022</span><ChevronDown/></div>
              </button>
              <div className="acc-body-wrap">
                <div className="acc-body">
                  <p>Swiss dual-track qualification combining the academic Maturit&agrave; with a commercial AFC diploma. Graduated above average in both tracks.</p>
                  <ul>
                    <li><strong style={{color:'var(--navy)'}}>Economics &amp; Business</strong>  microeconomic principles, business organisation, entrepreneurship, and market dynamics.</li>
                    <li><strong style={{color:'var(--navy)'}}>Accounting &amp; Finance</strong>  double-entry bookkeeping, financial statements, cost accounting, and Swiss business law.</li>
                    <li><strong style={{color:'var(--navy)'}}>Mathematics &amp; Statistics</strong>  algebra, calculus foundations, probability, and descriptive statistics.</li>
                    <li><strong style={{color:'var(--navy)'}}>Languages</strong>  Italian (native instruction), German, English, and French; professional writing and communication.</li>
                    <li>Maturit&agrave; Cantonale: <strong>4.5 / 6</strong> &middot; AFC Economics: <strong>5 / 6</strong>. Above average in both tracks.</li>
                  </ul>
                  <div className="econ-tags skill-list">
                    <span className="skill">Maturit&agrave; 4.5/6</span><span className="skill">AFC 5/6</span><span className="skill">Accounting</span><span className="skill">Business Law</span><span className="skill">Mathematics</span><span className="skill">Economics</span><span className="skill">Multilingual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-label" style={{marginTop:'48px'}}><div className="num">&mdash;</div><div className="slbl-t">Languages</div><div className="rule"></div></div>
          <div className="langs">
            <div className="langc"><div className="lang-n">Italian</div><div className="lang-l">Native &middot; C2</div></div>
            <div className="langc"><div className="lang-n">English</div><div className="lang-l">Fluent &middot; C2</div></div>
            <div className="langc"><div className="lang-n">German</div><div className="lang-l">Conversational &middot; B1&ndash;B2</div></div>
            <div className="langc"><div className="lang-n">Spanish</div><div className="lang-l">Basic &middot; A1</div></div>
            <div className="langc"><div className="lang-n">Norwegian</div><div className="lang-l">Basic &middot; A1</div></div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="contact" id="contact">
        <div className="contact-body">
          <h2>Ready to<br/>collaborate?</h2>
          <p>Whether you need server infrastructure, network architecture, a self-hosted media stack, or a Junior SysAdmin  let&rsquo;s build something reliable together.</p>
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
          <p>&#169; 2026 Pietro Quintavalle &middot; Lugano, Switzerland</p>
          <a href="#">Back to top &#8593;</a>
        </div>
      </footer>
      </div>
    </>
  )
}
