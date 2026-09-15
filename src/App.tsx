import type { ReactNode } from 'react'
import ThreeViewport from './ThreeViewport'
import ContourBackground from './ContourBackground'
import { buildRackScene, buildClusterScene, buildNasScene } from './scenes'

const EMAIL = '0pietroquintavalle0@gmail.com'
const GITHUB = 'https://github.com/Quinta0'
const LINKEDIN = 'https://www.linkedin.com/in/pietro-quintavalle-996b96267/'

type CaseStudy = {
  label: string
  title: string
  desc: string
  tags: string[]
  tint: string
  headerL: string
  headerR: string
  footerL: string
  footerR: string
  diagram: ReactNode
  interactive?: boolean
}

const cases: CaseStudy[] = [
  {
    label: '01 / Turnkey Rack Assembly',
    title: 'Turnkey Server Cabinet & ZFS Storage Pool',
    desc: 'Procured and physically assembled a turnkey 19" server cabinet, structured patch panels, and storage chassis for a private client. Dressed and labeled all cable runs, deployed TrueNAS with ZFS RAID 10, automated granular user ACLs, and configured offsite snapshot synchronization for a <30 min recovery target.',
    tags: ['19" EIA-310 Cabinet', 'ZFS RAID 10', 'Structured Cabling'],
    tint: '#EFECE6',
    headerL: 'RACK_CHASSIS // EIA-310',
    headerR: '• DRAG TO ROTATE',
    footerL: 'STRUCTURED HARNESS',
    footerR: 'SUB-30M RTO SYNC',
    diagram: <ThreeViewport build={buildRackScene} className="case-canvas" />,
    interactive: true,
  },
  {
    label: '02 / Startup Infrastructure • DEC Energy',
    title: 'Dual-Node Bare-Metal Kubernetes Cluster',
    desc: 'Serving as freelance hardware partner for USI startup DEC Energy. Sourced parts, built, and deployed an on-premise 2-node cluster to host critical LLM inference, accounting, and Gitea source control. Tuned fan curves and conducted thermal bench stress testing to ensure quiet open-office operation under full tensor load.',
    tags: ['Bare-Metal K8s', 'LLM Inference', 'Thermal Profiling'],
    tint: '#EAE8E1',
    headerL: 'DUAL_NODE // TOPOLOGY',
    headerR: '• DRAG TO ROTATE',
    footerL: 'ON-PREMISES INGESTION',
    footerR: 'USI STARTUP',
    diagram: <ThreeViewport build={buildClusterScene} className="case-canvas" />,
    interactive: true,
  },
  {
    label: '03 / Protocol Reverse Engineering',
    title: 'libratbag USB HID Kernel Driver',
    desc: "Sniffed and reverse-engineered an undocumented vendor's raw USB HID packets using Wireshark. Decoded byte streams for DPI profiles, polling rates, and on-board memory layouts, writing a complete C device driver merged directly into upstream libratbag.",
    tags: ['Upstream PR #1873', 'Wireshark Sniffing', 'C Device Driver'],
    tint: '#F2EFEB',
    headerL: 'USB HID DECODER',
    headerR: 'KERNEL C INTERFACE',
    footerL: 'RAW BYTE INSPECTION',
    footerR: 'PR #1873 MERGED',
    diagram: (
      <svg viewBox="0 0 460 210" className="case-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="40" x2="430" y2="40" stroke="var(--ink)" strokeWidth="1" />
        <path d="M 60 40 L 90 85" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="2 2" />
        <path d="M 180 40 L 150 85" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 2" />

        <rect x="50" y="85" width="360" height="50" rx="3" stroke="var(--ink)" strokeWidth="1.5" fill="var(--canvas)" />
        <rect x="50" y="85" width="55" height="50" fill="var(--border)" stroke="var(--ink)" strokeWidth="1" />
        <text x="77" y="110" fill="var(--ink)" fontFamily="Space Mono" fontSize="9" textAnchor="middle" fontWeight="bold">0x08</text>
        <text x="77" y="125" fill="var(--secondary)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">REPORT</text>
        <rect x="105" y="85" width="55" height="50" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="1" />
        <text x="132" y="110" fill="var(--ink)" fontFamily="Space Mono" fontSize="9" textAnchor="middle" fontWeight="bold">0x14</text>
        <text x="132" y="125" fill="var(--secondary)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">CMD</text>
        <rect x="160" y="85" width="65" height="50" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="1" />
        <text x="192" y="110" fill="var(--ink)" fontFamily="Space Mono" fontSize="9" textAnchor="middle">0x01 02</text>
        <text x="192" y="125" fill="var(--secondary)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">PROF_2</text>
        <rect x="225" y="85" width="85" height="50" fill="#FFFFFF" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="267" y="110" fill="var(--accent)" fontFamily="Space Mono" fontSize="10" textAnchor="middle" fontWeight="bold">0x0640</text>
        <text x="267" y="125" fill="var(--accent)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">1600 DPI</text>
        <rect x="310" y="85" width="100" height="50" fill="var(--canvas)" stroke="var(--ink)" strokeWidth="1" />
        <text x="360" y="113" fill="var(--secondary)" fontFamily="Space Mono" fontSize="8" textAnchor="middle">00 00 ...</text>

        <line x1="267" y1="135" x2="267" y2="165" stroke="var(--accent)" strokeWidth="1" />
        <rect x="207" y="165" width="120" height="22" rx="2" fill="var(--ink)" />
        <text x="267" y="179" fill="var(--canvas)" fontFamily="Space Mono" fontSize="8" textAnchor="middle">UPSTREAM KERNEL C</text>
      </svg>
    ),
  },
  {
    label: '04 / Self-Directed Production',
    title: 'Homelab as Code: 4-Node Multi-User Fabric',
    desc: 'Operating 4 bare-metal production hosts (UNRAID, Proxmox VE 8, TrueNAS, Docker, LXC) actively serving 12+ daily active users without managed third-party hosting. Zero exposed WAN ports enforced via Cloudflare Tunnels, WireGuard, SSO/2FA, and Fail2Ban. Provisioned idempotently via Ansible with <30m bare-metal disaster recovery.',
    tags: ['Zero-Trust WAN', 'Ansible IaC', 'Proxmox / UNRAID'],
    tint: '#EDEAE3',
    headerL: 'TOPOLOGY MAP',
    headerR: '• HOVER BAYS',
    footerL: 'ANSIBLE PROVISIONED',
    footerR: 'DAILY PRODUCTION',
    diagram: <ThreeViewport build={buildNasScene} className="case-canvas" />,
    interactive: true,
  },
]

const ossCards = [
  {
    kicker: 'RUNTIME PIPELINES',
    title: 'Vysp3r/ProtonPlus • steam-for-linux',
    meta: 'Issue #1232',
    desc: 'Diagnosed a deployment pipeline fault in the Steam Linux Runtime installation sequence where unwritten manifest files caused execution crashes. Formulated a console depot recovery workaround and contributed code upstream to automate runtime integrity validation.',
    tags: ['#SteamRuntime', '#Proton', '#LinuxGaming'],
  },
  {
    kicker: 'COMPATIBILITY TOOLING',
    title: 'Recol/DLSS-Updater',
    meta: 'PR #283, #252, #256',
    desc: 'Engineered dynamic multi-vendor library detection (NVIDIA DLSS, AMD FSR, Intel XeSS). Replaced brittle static mapping tables with bounded manifest parsing to maintain driver compatibility across DLL upgrades; resolved UI state desynchronization bugs.',
    tags: ['#Python', '#Qt', '#DriverInterfacing'],
  },
  {
    kicker: 'AUTOMATION UTILITY',
    title: 'Quinta0/ObsidianSetup',
    meta: '26 Stars on GitHub',
    desc: 'Authored an idempotent cross-platform provisioning utility for automated workspace configuration, plugin synchronization, and environment deployment.',
    tags: ['#PowerShell', '#EnvironmentProvisioning'],
  },
  {
    kicker: 'TEAM SYSTEMS ARCHITECTURE',
    title: 'City Simulator • USI Systems Project',
    meta: 'Agile / Scrum',
    desc: 'Coordinated a 12-person development team using Agile/Scrum to build a full-stack city simulation. Owned backend architecture in Spring Boot while integrating JavaScript/HTML/CSS frontend components.',
    tags: ['#Java', '#SpringBoot', '#ScrumTeam'],
  },
]

const experience = [
  {
    title: 'Infrastructure & Hardware Consultant (Freelance)',
    period: '2026',
    org: 'DEC Energy (USI Startup) • Ticino, Switzerland',
    desc: 'Trusted technical partner advising on workstation hardware (custom PCs, multi-monitor ergonomics, laptop fleet selection). Designed, procured, and deployed an on-premise 2-node bare-metal Kubernetes cluster for local LLM inference, accounting, and Git source control.',
  },
  {
    title: 'IT Support & Hardware Technician (Freelance)',
    period: 'Jan 2020 – Present',
    org: 'Private Clients • Ticino, Switzerland',
    desc: 'Assembled, configured, and repaired 25+ custom workstations and laptops: component sourcing, OS imaging (Windows/Linux), driver debugging, and remote/onsite diagnostics. Maintained comprehensive hardware logs to eliminate recurring component failures.',
  },
  {
    title: 'Bare-Metal Infrastructure Operator',
    period: 'Jan 2020 – Present',
    org: 'Self-Directed Production Homelab',
    desc: 'Engineered and maintained 4 bare-metal production nodes serving 12+ daily active users without managed external hosting. Deployed turnkey server rack cabinets, configured ZFS RAID 10 arrays, and implemented zero exposed WAN ports via Cloudflare Tunnels and WireGuard meshes.',
  },
]

const skillColumns = [
  {
    heading: 'HARDWARE & LAB',
    items: ['Desktop / Server Assembly', 'Component Fault Triage', 'Thermal Bench Stressing', 'Firmware / BIOS Flashing', 'Soldering & Harness Wiring', 'Rack Mounting & Cabling'],
  },
  {
    heading: 'SYSTEMS & STORAGE',
    items: ['Linux Daily (5+ yrs)', 'Debian, Arch, Ubuntu, NixOS', 'Proxmox VE 8, KVM, LXC', 'TrueNAS • ZFS RAID 10', 'UNRAID • Docker / K8s', 'Windows Server (AD, GPO, DNS)'],
  },
  {
    heading: 'NETWORK & TELEMETRY',
    items: ['VLANs • Ubiquiti UniFi', 'Zero-Trust Tunnels', 'WireGuard / Tailscale', 'UFW, iptables, Fail2Ban', 'Ansible IaC • Bash', 'Grafana, Prometheus, Kuma'],
  },
]

const education = [
  {
    date: '2022 – 2024 • USI Lugano',
    title: 'Foundational Higher Education in Computer Science',
    desc: 'Completed 2 full years of core CS curricula: Algorithms & data structures, OOP (Java, C++), discrete logic, and software architecture. Concluded formal coursework to transition full-time into hands-on bare-metal systems and datacenter infrastructure.',
  },
  {
    date: '2018 – 2022 • SCC Bellinzona',
    title: 'Maturità Cantonale & Federal VET Diploma (AFC)',
    desc: 'Completed Swiss dual-track qualification (Maturità: 4.5/6, AFC: 5/6).',
  },
]

const certifications = ['Google IT Support Professional', 'Google Data Analytics Professional', 'Microsoft Foundations of IT Systems']

const languages = [
  { name: 'Italian', level: 'Native (C2)' },
  { name: 'English', level: 'Full Professional (C2)' },
  { name: 'German', level: 'Working Proficiency (B1–B2)' },
  { name: 'Spanish / Norwegian', level: 'Basic (A1)' },
]

export default function App() {
  return (
    <>
      <header className="site-header">
        <div className="header-bar">
          <nav className="main-nav">
            <a href="#works">WORKS</a>
            <a href="#oss">DIAGNOSTICS &amp; OSS</a>
            <a href="#background">EXPERIENCE</a>
            <a href={`mailto:${EMAIL}`} className="nav-contact">CONTACT</a>
          </nav>
        </div>
      </header>

      <main className="site-main">
        {/* HERO */}
        <section className="hero">
          <ContourBackground className="hero-canvas" />

          <div className="hero-content">
            <div className="hero-badges">
              <span className="badge-secondary">Monte Carasso, CH &bull; Permit C</span>
              <span className="badge-sep">/</span>
              <span className="badge-accent">Bare-Metal &amp; Linux Systems</span>
            </div>

            <h1 className="hero-title">Bridging bare-metal hardware craft with low-level Linux systems.</h1>

            <p className="hero-lead">
              Systems technician with 6+ years assembling, repairing, and bench-testing desktop, laptop, and server hardware, backed by 5+ years administering Linux environments. Taking physical infrastructure from component-level triage to production reliability.
            </p>

            <div className="hero-ctas">
              <a href={`mailto:${EMAIL}`} className="btn btn-outline">{EMAIL}</a>
            </div>

            <div className="hero-metrics">
              <div>
                <span className="metric-val">25+</span>
                <span className="metric-lbl">Workstations Assembled</span>
              </div>
              <div>
                <span className="metric-val">4 Nodes</span>
                <span className="metric-lbl">12+ Active Tenants</span>
              </div>
              <div>
                <span className="metric-val">&lt;30m</span>
                <span className="metric-lbl">Ansible Disaster RTO</span>
              </div>
            </div>
          </div>
        </section>

        {/* WORKS */}
        <section id="works" className="works">
          <div className="section-head">
            <span className="section-kicker">Physical Deployments &amp; Infrastructure</span>
            <span className="section-kicker">[ 01 &mdash; 04 ]</span>
          </div>

          <div className="case-list">
            {cases.map(c => (
              <article className="case" key={c.title}>
                <div className="case-copy">
                  <span className="case-label">{c.label}</span>
                  <h2 className="case-title">{c.title}</h2>
                  <p className="case-desc">{c.desc}</p>
                  <div className="tag-row">
                    {c.tags.map(tag => <span className="tag-pill" key={tag}>{tag}</span>)}
                  </div>
                </div>

                <div className="case-diagram" style={{ background: c.tint }}>
                  <div className="diagram-card">
                    <div className="diagram-row diagram-header">
                      <span>{c.headerL}</span>
                      <span className={c.interactive ? 'diagram-interactive' : undefined}>{c.headerR}</span>
                    </div>
                    <div className="diagram-svg-wrap">{c.diagram}</div>
                    <div className="diagram-row diagram-footer">
                      <span>{c.footerL}</span>
                      <span>{c.footerR}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* OSS */}
        <section id="oss" className="oss">
          <div className="section-head">
            <span className="section-kicker">Systems Diagnostics &amp; Open-Source</span>
            <a href={GITHUB} target="_blank" rel="noopener" className="section-link">github.com/Quinta0 ↗</a>
          </div>

          <div className="oss-grid">
            {ossCards.map(card => (
              <div className="oss-card" key={card.title}>
                <div className="oss-card-top">
                  <div>
                    <span className="oss-kicker">{card.kicker}</span>
                    <h3>{card.title}</h3>
                  </div>
                  <span className="oss-meta">{card.meta}</span>
                </div>
                <p>{card.desc}</p>
                <div className="tag-row tag-row-mini">
                  {card.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BACKGROUND */}
        <section id="background" className="background">
          
          <div className="bg-row bg-row-bordered">
            <div className="bg-label">Professional Experience</div>
            <div className="bg-content exp-list">
              {experience.map(job => (
                <div className="exp-item" key={job.title}>
                  <div className="exp-head">
                    <h3>{job.title}</h3>
                    <span className="exp-period">{job.period}</span>
                  </div>
                  <div className="exp-org">{job.org}</div>
                  <p>{job.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-row bg-row-bordered">
            <div className="bg-label">Technical Capabilities</div>
            <div className="bg-content skills-grid">
              {skillColumns.map(col => (
                <div className="skills-col" key={col.heading}>
                  <span className="skills-heading">{col.heading}</span>
                  <ul>
                    {col.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-row bg-row-bordered">
            <div className="bg-label">Education &amp; Credentials</div>
            <div className="bg-content edu-grid">
              <div className="edu-list">
                {education.map(edu => (
                  <div key={edu.title}>
                    <span className="edu-date">{edu.date}</span>
                    <h4>{edu.title}</h4>
                    <p>{edu.desc}</p>
                  </div>
                ))}
              </div>

              <div className="creds-list">
                <div>
                  <span className="creds-heading">CERTIFICATIONS</span>
                  <ul>
                    {certifications.map(cert => <li key={cert}>&bull; {cert}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="creds-heading">LANGUAGES</span>
                  <ul>
                    {languages.map(l => <li key={l.name}>&bull; <strong>{l.name}</strong>: {l.level}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <span className="footer-name">Pietro Quintavalle</span> &bull; Open for Datacenter &amp; Systems roles across Switzerland
        </div>
        <div className="footer-links">
          <a href={GITHUB} target="_blank" rel="noopener">GitHub ↗</a>
          <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn ↗</a>
        </div>
      </footer>
    </>
  )
}
