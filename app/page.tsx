"use client"

import { useState } from 'react'

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

  return (
    <>
      <div className="col-rule-l"></div>
      <div className="col-rule-r"></div>
      <div className="col-rule-c1"></div>
      <div className="col-rule-c2"></div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo-wrap">
          <svg className="nav-logosvg" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="22" height="22" rx="4" fill="#1C2033"/>
            <path d="M5 8L11 5.5L17 8V12.8C17 16.5 11 20 11 20C11 20 5 16.5 5 12.8V8Z" stroke="#E8E5DF" strokeWidth="1.3"/>
            <path d="M9 11.8L10.8 13.5L14 9.5" stroke="#E8E5DF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-name">Pietro<sup>DEV</sup></span>
        </a>
        <div className="nav-links">
          <a href="#skills">Skills</a>
          <a href="#homelab">Homelab</a>
          <a href="#desktop">Desktop</a>
          <a href="#projects">Projects</a>
          <a href="#github">GitHub</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-socials">
          <a href="https://github.com/Quinta0" target="_blank" rel="noopener" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69C6.72 19.9 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/" target="_blank" rel="noopener" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
          </a>
        </div>
      </nav>

      {/* ANNOUNCE STRIP */}
      <div className="strip">
        <span className="strip-pill">Open to work</span>
        <a href="#contact">Available for Junior SysAdmin &amp; IT consulting <span className="strip-arr">&#8594;</span></a>
      </div>

      {/* HERO */}
      <div className="hero-row">
        <div className="hero-gutter"></div>
        <div className="hero-main">
          <div className="status-row"><span className="green-dot"></span>Lugano &middot; Switzerland &middot; USI Economics student</div>
          <div className="hero-name">Pietro<br/>Quintavalle</div>
          <div className="hero-role">Systems Engineer &middot; Developer &middot; Homelabber</div>
          <p className="hero-lead">5+ years building production-grade infrastructure from the ground up. I design resilient systems and write the software that runs on top of them &mdash; then secure and monitor all of it myself.</p>
          <div className="btns">
            <a href="#contact" className="btn btn-d">Get in touch &#8594;</a>
            <a href="#homelab" className="btn btn-o">Explore homelab</a>
            <a href="#projects" className="btn btn-o">View projects</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-ico">&#9889;</span><div><div className="stat-val">90%+ uptime</div><div className="stat-lbl">Production servers</div></div></div>
          <div className="stat"><span className="stat-ico">&#128187;</span><div><div className="stat-val">6&ndash;10 servers</div><div className="stat-lbl">Under management</div></div></div>
          <div className="stat"><span className="stat-ico">&#128197;</span><div><div className="stat-val">5+ years</div><div className="stat-lbl">SysAdmin experience</div></div></div>
          <div className="stat"><span className="stat-ico">&#127891;</span><div><div className="stat-val">BSc Economics</div><div className="stat-lbl">USI &middot; Ongoing</div></div></div>
          <div className="stat"><span className="stat-ico">&#127760;</span><div><div className="stat-val">IT &middot; EN &middot; DE &middot; ES &middot; NO</div><div className="stat-lbl">5 languages</div></div></div>
        </div>
        <div className="hero-gutter-r"></div>
      </div>

      {/* ABOUT + TERMINAL */}
      <div className="about-split">
        <div className="about-g"></div>
        <div className="about-left">
          <div className="terminal">
            <div className="t-bar"><span className="td r"></span><span className="td y"></span><span className="td g"></span><span className="t-title">quinta@proxmox:~</span></div>
            <div className="t-body">
              <div><span className="t-p">&#10148;</span> <span className="t-c">~</span> neofetch</div>
              <div>&nbsp;</div>
              <div><span className="t-k">OS        </span><span className="t-v">Proxmox VE 8 / UNRAID 7.3.1 / TrueNAS</span></div>
              <div><span className="t-k">Virt      </span><span className="t-v">LXC &middot; Docker &middot; KVM</span></div>
              <div><span className="t-k">DNS       </span><span className="t-v">Cloudflare &middot; AAAA &middot; AdGuard</span></div>
              <div><span className="t-k">Tunnels   </span><span className="t-v">Cloudflare Tunnel &middot; Newt</span></div>
              <div><span className="t-k">Proxy     </span><span className="t-v">Pangolin + Traefik + Auto-TLS</span></div>
              <div><span className="t-k">Security  </span><span className="t-v">Fail2Ban &middot; Crowdsec &middot; Authelia</span></div>
              <div><span className="t-k">Storage   </span><span className="t-v">UNRAID parity &middot; ZFS RAID-Z</span></div>
              <div><span className="t-k">Media     </span><span className="t-v">Jellyfin &middot; Navidrome &middot; *arr</span></div>
              <div><span className="t-k">Music     </span><span className="t-v">Listenbrainz &middot; Symfonium</span></div>
              <div><span className="t-k">Monitor   </span><span className="t-v">Grafana &middot; Prometheus &middot; Kuma</span></div>
              <div><span className="t-k">Code      </span><span className="t-v">Python &middot; TypeScript &middot; SQL</span></div>
              <div><span className="t-k">Status    </span><span className="t-v" style={{color:'#5FCE8A'}}>Open for work &#9679;</span></div>
              <div>&nbsp;</div>
              <div><span className="t-p">&#10148;</span> <span className="t-c">~</span> <span className="cur"></span></div>
            </div>
          </div>
        </div>
        <div className="about-right">
          <div className="slbl">About me</div>
          <p>Hi &mdash; friends call me <strong>Quinta</strong>. I&rsquo;m an Economics student at USI Lugano and a self-taught systems engineer who&rsquo;s been running homelab infrastructure since 2020.</p>
          <p>My setup spans everything from <strong>bare-metal Proxmox clusters</strong> to <strong>DNS and domain management via Cloudflare</strong>, <strong>Pangolin/Traefik reverse proxying</strong>, and a full media+music automation pipeline.</p>
          <p>On the academic side I&rsquo;m deepening my understanding of <strong>microeconomics, macroeconomics, game theory, and quantitative finance</strong> &mdash; and finding more overlap with systems thinking than you&rsquo;d expect.</p>
          <p style={{fontSize:'12.5px',color:'var(--muted)',fontFamily:'\'DM Mono\',monospace',marginTop:'4px'}}>Daily driver &mdash; Ryzen 7 9800X3D &middot; RTX 5080 &middot; hand-built custom keyboard</p>
        </div>
        <div className="about-gr"></div>
      </div>

      {/* SKILLS */}
      <div className="sec" id="skills">
        <div className="sec-g"></div>
        <div className="sec-body">
          <div className="slbl">Technical Arsenal</div>
          <div className="sk4">
            <div className="sk"><div className="sk-ico">&#128423;</div><div className="sk-t">System &amp; Infra</div><div className="tags"><span className="tag">Proxmox VE</span><span className="tag">UNRAID</span><span className="tag">TrueNAS</span><span className="tag">Docker</span><span className="tag">LXC</span><span className="tag">KVM</span><span className="tag">Linux</span><span className="tag">Win Server</span><span className="tag">AD</span></div></div>
            <div className="sk"><div className="sk-ico">&#128274;</div><div className="sk-t">Network &amp; Security</div><div className="tags"><span className="tag">VLAN</span><span className="tag">Cloudflare</span><span className="tag">AAAA/DNS</span><span className="tag">CF Tunnels</span><span className="tag">Tailscale</span><span className="tag">Fail2Ban</span><span className="tag">Crowdsec</span><span className="tag">UFW</span><span className="tag">Authelia</span><span className="tag">Traefik</span></div></div>
            <div className="sk"><div className="sk-ico">&#9000;</div><div className="sk-t">Development</div><div className="tags"><span className="tag">Python</span><span className="tag">TypeScript</span><span className="tag">React</span><span className="tag">Next.js</span><span className="tag">Django</span><span className="tag">SQL</span><span className="tag">Bash</span><span className="tag">Ansible</span><span className="tag">HTML/CSS</span><span className="tag">Soldering</span></div></div>
            <div className="sk"><div className="sk-ico">&#128202;</div><div className="sk-t">Data &amp; Monitoring</div><div className="tags"><span className="tag">Grafana</span><span className="tag">Prometheus</span><span className="tag">Uptime Kuma</span><span className="tag">ZFS</span><span className="tag">rsync</span><span className="tag">RAID</span><span className="tag">cAdvisor</span></div></div>
          </div>
          <div style={{marginTop:'32px'}}>
            <div className="slbl">Economics &amp; Quant</div>
            <div className="sk4">
              <div className="sk"><div className="sk-ico">&#128200;</div><div className="sk-t">Microeconomics</div><div className="tags"><span className="tag">Consumer theory</span><span className="tag">Market structures</span><span className="tag">Production &amp; costs</span><span className="tag">Price theory</span><span className="tag">Welfare econ.</span></div></div>
              <div className="sk"><div className="sk-ico">&#127758;</div><div className="sk-t">Macroeconomics</div><div className="tags"><span className="tag">GDP &amp; growth</span><span className="tag">Monetary policy</span><span className="tag">Fiscal policy</span><span className="tag">IS-LM model</span><span className="tag">Open economy</span></div></div>
              <div className="sk"><div className="sk-ico">&#9861;</div><div className="sk-t">Game Theory</div><div className="tags"><span className="tag">Nash equilibrium</span><span className="tag">Dominant strategies</span><span className="tag">Extensive form</span><span className="tag">Mechanism design</span><span className="tag">Auctions</span></div></div>
              <div className="sk"><div className="sk-ico">&#128185;</div><div className="sk-t">Quantitative Finance</div><div className="tags"><span className="tag">Time value of money</span><span className="tag">Probability</span><span className="tag">Statistics</span><span className="tag">Regression</span><span className="tag">Financial modelling</span></div></div>
            </div>
          </div>
          <div style={{marginTop:'28px'}}>
            <div className="slbl">Certifications</div>
            <div className="certs">
              <div className="cert">&#127891; Google Data Analytics Professional Certificate</div>
              <div className="cert">&#127891; Google IT Support Professional Certificate</div>
            </div>
          </div>
        </div>
        <div className="sec-gr"></div>
      </div>

      {/* HOMELAB */}
      <div className="sec" id="homelab">
        <div className="sec-g"></div>
        <div className="sec-body">
          <div className="slbl">Homelab Infrastructure</div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'32px',maxWidth:'680px',lineHeight:'1.65',fontWeight:'300'}}>Every service containerised, every entry-point proxied, every failure logged. Domain management via Cloudflare with AAAA records and tunnels. Built to enterprise patterns at personal scale.</p>

          <div className="slbl" style={{marginBottom:'14px'}}>Hardware</div>
          <table className="hw-table" style={{marginBottom:'32px',border:'1px solid var(--line3)',borderRadius:'5px',overflow:'hidden'}}>
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

          <div className="slbl" style={{marginBottom:'14px'}}>Services &amp; Stack</div>
          <div className="hl3">
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#128190;</span><span className="hl-t">UNRAID NAS</span></div>
              <div className="hl-d">Parity-protected array hosting 9-user network shares, Docker Appdata, automated backups. Acts as the central file hub for all services via SMB/NFS.</div>
              <div className="specs"><span className="spec">UNRAID 7.3.1</span><span className="spec">Parity array</span><span className="spec">NVMe cache</span><span className="spec">9 users</span><span className="spec">rsync</span><span className="spec">SMB/NFS</span></div>
            </div>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#127758;</span><span className="hl-t">DNS &amp; Cloudflare</span></div>
              <div className="hl-d">Domain managed through Cloudflare with AAAA records for IPv6, Cloudflare Tunnels for zero-open-port external access, and AdGuard Home for internal DNS resolution and ad-blocking.</div>
              <div className="specs"><span className="spec">Cloudflare</span><span className="spec">AAAA records</span><span className="spec">CF Tunnels</span><span className="spec">AdGuard Home</span><span className="spec">Split DNS</span><span className="spec">DNSSEC</span></div>
            </div>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#128256;</span><span className="hl-t">Pangolin + Traefik</span></div>
              <div className="hl-d">Pangolin (Traefik-based) handles all inbound HTTPS with automatic TLS, subdomain routing, and middleware. Newt tunnel enables access without exposing raw ports. Authelia adds SSO/2FA.</div>
              <div className="specs"><span className="spec">Pangolin</span><span className="spec">Traefik</span><span className="spec">Auto-TLS</span><span className="spec">Newt tunnel</span><span className="spec">Authelia</span><span className="spec">Middleware</span></div>
            </div>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#128737;</span><span className="hl-t">Fail2Ban + Security</span></div>
              <div className="hl-d">Fail2Ban monitors SSH and auth logs, auto-banning brute-force IPs. Crowdsec adds community threat intelligence with real-time blocklist sync. UFW provides host-level firewall rules on each node.</div>
              <div className="specs"><span className="spec">Fail2Ban</span><span className="spec">Crowdsec</span><span className="spec">UFW</span><span className="spec">iptables</span><span className="spec">SSH hardening</span><span className="spec">Authelia</span></div>
            </div>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#127916;</span><span className="hl-t">Jellyfin + Media</span></div>
              <div className="hl-d">Jellyfin handles hardware-transcoded streaming with per-user OAuth authentication and Authelia SSO. Sonarr/Radarr auto-manage TV and film libraries; Bazarr handles subtitles; Prowlarr indexes trackers.</div>
              <div className="specs"><span className="spec">Jellyfin</span><span className="spec">HW transcode</span><span className="spec">OAuth</span><span className="spec">Sonarr</span><span className="spec">Radarr</span><span className="spec">Bazarr</span><span className="spec">Prowlarr</span></div>
            </div>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#127925;</span><span className="hl-t">Music Pipeline</span></div>
              <div className="hl-d">Lidarr monitors for releases &#8594; Prowlarr indexes &#8594; Beets normalises tags &#8594; Navidrome streams via Subsonic API. Scrobbling to Listenbrainz. Mobile playback via Symfonium and Explo apps.</div>
              <div className="specs"><span className="spec">Navidrome</span><span className="spec">Lidarr</span><span className="spec">Prowlarr</span><span className="spec">Beets</span><span className="spec">Listenbrainz</span><span className="spec">Symfonium</span><span className="spec">Explo</span></div>
            </div>
          </div>
          <div className="note">
            <span className="note-ico">&#128279;</span>
            <div>
              <div className="note-t">Zero open ports via Tailscale + Cloudflare Tunnels</div>
              <div className="note-d">All services reachable remotely through a combination of Tailscale mesh VPN (for trusted devices) and Cloudflare Tunnels (for public-facing services). No port-forwarding. MagicDNS handles internal name resolution. Pangolin&rsquo;s Newt agent tunnels external traffic into the private LAN.</div>
            </div>
          </div>
        </div>
        <div className="sec-gr"></div>
      </div>

      {/* DESKTOP */}
      <div className="sec" id="desktop">
        <div className="sec-g"></div>
        <div className="sec-body">
          <div className="slbl">Personal Workstation</div>
          <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'32px',maxWidth:'680px',lineHeight:'1.65',fontWeight:'300'}}>Daily driver and dev machine. Built around AMD&rsquo;s 3D V-Cache architecture for a blend of high single-threaded performance and serious GPU compute &mdash; doubles as a gaming rig, 3D modelling workstation, and 3D printing controller.</p>

          <table className="hw-table" style={{marginBottom:'32px',border:'1px solid var(--line3)',borderRadius:'5px',overflow:'hidden'}}>
            <thead><tr><th>Component</th><th>Spec</th></tr></thead>
            <tbody>
              <tr><td>CPU</td><td>AMD Ryzen 7 9800X3D (8c/16t &middot; 3D V-Cache)</td></tr>
              <tr><td>GPU</td><td>Zotac RTX 5080 Solid OC</td></tr>
              <tr><td>RAM</td><td>32GB DDR5 6000MHz</td></tr>
              <tr><td>Motherboard</td><td>Gigabyte X870E AORUS PRO X3D ICE</td></tr>
              <tr><td>OS</td><td>CachyOS</td></tr>
              <tr><td>Role</td><td>Dev &middot; Gaming &middot; 3D Modelling &middot; 3D Printing &middot; Daily Driver</td></tr>
              <tr><td>Keyboard</td><td>Weikav Stars 75 &middot; Huano Sakura switches (hand-lubed, custom assembly)</td></tr>
            </tbody>
          </table>

          <div className="hl3" style={{marginBottom:'0',gridTemplateColumns:'repeat(2,1fr)'}}>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#9889;</span><span className="hl-t">AMD Ryzen 7 9800X3D</span></div>
              <div className="hl-d">Zen 5 architecture with 96MB 3D V-Cache. Exceptional single-thread and gaming performance, with low-latency cache access ideal for simulation and data-heavy workloads.</div>
              <div className="specs"><span className="spec">Zen 5</span><span className="spec">8c / 16t</span><span className="spec">96MB L3 3D V-Cache</span><span className="spec">5.0GHz boost</span></div>
            </div>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#127918;</span><span className="hl-t">Zotac RTX 5080 Solid OC</span></div>
              <div className="hl-d">Blackwell architecture. 16GB GDDR7, hardware ray tracing, DLSS 4 with Multi Frame Generation. Used for gaming, 3D rendering, and GPU-accelerated dev and compute tasks.</div>
              <div className="specs"><span className="spec">Blackwell</span><span className="spec">16GB GDDR7</span><span className="spec">DLSS 4</span><span className="spec">MFG</span><span className="spec">CUDA</span><span className="spec">Ray Tracing</span></div>
            </div>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#128268;</span><span className="hl-t">X870E AORUS PRO X3D ICE</span></div>
              <div className="hl-d">Gigabyte X870E flagship board with PCIe 5.0, USB4, and optimised X3D power delivery. Supports DDR5 6000MHz XMP out-of-the-box. White aesthetic matches the build&rsquo;s ICE theme.</div>
              <div className="specs"><span className="spec">X870E</span><span className="spec">PCIe 5.0</span><span className="spec">USB4</span><span className="spec">DDR5 6000</span><span className="spec">WiFi 7</span></div>
            </div>
            <div className="hl">
              <div className="hl-hd"><span className="hl-ico">&#9000;</span><span className="hl-t">Weikav Stars 75</span></div>
              <div className="hl-d">Fully custom 75% aluminium keyboard &mdash; hand-lubed Huano Sakura tactile switches, gasket mount, per-key RGB, 1000Hz polling. Full assembly and switch tuning done from scratch.</div>
              <div className="specs"><span className="spec">75% layout</span><span className="spec">Huano Sakura</span><span className="spec">Tactile</span><span className="spec">Hand-lubed</span><span className="spec">Gasket mount</span><span className="spec">Aluminium</span><span className="spec">1000Hz</span></div>
            </div>
          </div>
        </div>
        <div className="sec-gr"></div>
      </div>

      {/* PROJECTS */}
      <div className="sec" id="projects">
        <div className="sec-g"></div>
        <div className="sec-body">
          <div className="slbl">Personal &amp; Client Projects</div>
          <div className="pr3">
            <div className="pr">
              <span className="badge b-live">&#9679; Live</span>
              <div className="pr-type">Professional Client</div>
              <div className="pr-t">Enterprise Proxmox Cluster</div>
              <div className="pr-d">Full single-node virtualisation with VLAN segmentation, Pangolin/Traefik reverse proxy, Cloudflare Tunnels, and centralised Grafana/Prometheus monitoring. 90%+ uptime maintained.</div>
              <div className="pr-tags"><span className="pr-tag">Proxmox</span><span className="pr-tag">Docker</span><span className="pr-tag">LXC</span><span className="pr-tag">Traefik</span><span className="pr-tag">Tailscale</span></div>
            </div>
            <div className="pr">
              <span className="badge b-live">&#9679; Live</span>
              <div className="pr-type">Professional Client</div>
              <div className="pr-t">9-User RAID 10 NAS</div>
              <div className="pr-d">TrueNAS on RAID 10 serving as a self-hosted cloud for 9 users. Per-user ACLs, automated rsync offsite backups, ZFS snapshots for instant point-in-time recovery.</div>
              <div className="pr-tags"><span className="pr-tag">TrueNAS</span><span className="pr-tag">RAID 10</span><span className="pr-tag">ZFS</span><span className="pr-tag">rsync</span><span className="pr-tag">ACLs</span></div>
            </div>
            <div className="pr">
              <span className="badge b-oss">&#8599; Open Source</span>
              <div className="pr-type">Personal Project</div>
              <div className="pr-t">Valgo &mdash; Algorithm Visualizer</div>
              <div className="pr-d">Step-by-step algorithm visualisation built with React and Next.js. Sorting, graph, and search algorithms with live code annotations and speed controls.</div>
              <div className="pr-tags"><span className="pr-tag">React</span><span className="pr-tag">Next.js</span><span className="pr-tag">TypeScript</span><span className="pr-tag">Tailwind</span></div>
            </div>
            <div className="pr">
              <span className="badge b-dev">&#9680; In Dev</span>
              <div className="pr-type">Personal Project</div>
              <div className="pr-t">Finance Tracker</div>
              <div className="pr-d">50/30/20 budgeting tool with Django backend, SQLite, and Chart.js dashboards. Monthly trend analysis, category breakdowns, and exportable reports.</div>
              <div className="pr-tags"><span className="pr-tag">Django</span><span className="pr-tag">Python</span><span className="pr-tag">SQLite</span><span className="pr-tag">Chart.js</span></div>
            </div>
            <div className="pr">
              <span className="badge b-live">&#9679; Live</span>
              <div className="pr-type">Personal Homelab</div>
              <div className="pr-t">Self-Hosted Stack (IaC)</div>
              <div className="pr-d">Entire homelab reproduced from code &mdash; Ansible playbooks, Docker Compose, and Bash scripts. Idempotent provisioning; full rebuild in under 30 minutes from scratch.</div>
              <div className="pr-tags"><span className="pr-tag">Ansible</span><span className="pr-tag">Compose</span><span className="pr-tag">Bash</span><span className="pr-tag">IaC</span></div>
            </div>
            <div className="pr">
              <span className="badge b-oss">&#8599; Open Source</span>
              <div className="pr-type">Personal Project</div>
              <div className="pr-t">re-soulcommand</div>
              <div className="pr-d">Music recommendation downloader integrating ListenBrainz and Last.fm playlists with Navidrome via slskd (Soulseek daemon). Fork rebuilt around a REST API backend &mdash; stripped of bloat, Docker-native.</div>
              <div className="pr-tags"><span className="pr-tag">Python</span><span className="pr-tag">Docker</span><span className="pr-tag">ListenBrainz</span><span className="pr-tag">Last.fm</span><span className="pr-tag">slskd</span><span className="pr-tag">Navidrome</span></div>
            </div>
            <div className="pr">
              <span className="badge b-live">&#9679; Live</span>
              <div className="pr-type">Personal Homelab</div>
              <div className="pr-t">Ainulindale &mdash; Music Stack</div>
              <div className="pr-d">Fully self-hosted music discovery and streaming platform. Auto-discovers music weekly from listening habits, downloads via Soulseek P2P through a VPN gateway, streams via Navidrome. No commercial services required.</div>
              <div className="pr-tags"><span className="pr-tag">Docker</span><span className="pr-tag">Navidrome</span><span className="pr-tag">slskd</span><span className="pr-tag">Gluetun</span><span className="pr-tag">ListenBrainz</span><span className="pr-tag">ProtonVPN</span></div>
            </div>
            <div className="pr">
              <span className="badge b-live">&#9679; Live</span>
              <div className="pr-type">Personal Homelab</div>
              <div className="pr-t">UNRAID Home Server</div>
              <div className="pr-d">Intel Core Ultra 5 225 build running UNRAID 7.3.1 as primary NAS, Docker host, and media stack. Parity-protected array with NVMe cache, 9-user SMB/NFS shares, and all homelab services containerised.</div>
              <div className="pr-tags"><span className="pr-tag">UNRAID 7.3.1</span><span className="pr-tag">Docker</span><span className="pr-tag">Parity Array</span><span className="pr-tag">48GB DDR5</span><span className="pr-tag">SMB/NFS</span></div>
            </div>
            <div className="pr">
              <span className="badge b-live">&#9679; Live</span>
              <div className="pr-type">Personal Homelab</div>
              <div className="pr-t">Proxmox Virtualisation Node</div>
              <div className="pr-d">Intel Core i7-8700 node running Proxmox VE 8 for LXC containers and KVM VMs. VLAN-segmented network, Tailscale + SSH access, acts as the compute backbone for all hosted services.</div>
              <div className="pr-tags"><span className="pr-tag">Proxmox VE 8</span><span className="pr-tag">LXC</span><span className="pr-tag">KVM</span><span className="pr-tag">Tailscale</span><span className="pr-tag">VLAN</span><span className="pr-tag">32GB DDR4</span></div>
            </div>
          </div>
          <p style={{marginTop:'16px',fontSize:'12px',color:'var(--muted)',fontFamily:'\'DM Mono\',monospace'}}>
            More projects at <a href="https://github.com/Quinta0" target="_blank" rel="noopener" style={{color:'var(--mid)',textDecoration:'none',borderBottom:'1px solid var(--line3)'}}>github.com/Quinta0 &#8599;</a>
          </p>
        </div>
        <div className="sec-gr"></div>
      </div>

      {/* GITHUB */}
      <div className="sec" id="github">
        <div className="sec-g"></div>
        <div className="sec-body">
          <div className="slbl">GitHub &mdash; Contributions &amp; Issues</div>
          <div className="gh-list">
            <div className="gh-item"><div style={{flex:1}}><div className="gh-n">Quinta0/valgo</div><div className="gh-d">Algorithm visualizer &mdash; step-by-step sorting, graph and search walkthroughs. Author &amp; maintainer.</div></div><div className="gh-r"><span className="gh-lang">TypeScript</span><a href="https://github.com/Quinta0/valgo" target="_blank" rel="noopener" className="gh-lnk">&#8599; repo</a></div></div>
            <div className="gh-item"><div style={{flex:1}}><div className="gh-n">Quinta0/finance-tracker</div><div className="gh-d">50/30/20 budgeting dashboard with Django and Chart.js. Author &amp; maintainer.</div></div><div className="gh-r"><span className="gh-lang">Python</span><a href="https://github.com/Quinta0/finance-tracker" target="_blank" rel="noopener" className="gh-lnk">&#8599; repo</a></div></div>
            <div className="gh-item"><div style={{flex:1}}><div className="gh-n">Quinta0/re-soulcommand</div><div className="gh-d">Music recommendation downloader &mdash; ListenBrainz &amp; Last.fm playlists into Navidrome via slskd. Author &amp; maintainer.</div></div><div className="gh-r"><span className="gh-lang">Python</span><a href="https://github.com/Quinta0/re-soulcommand" target="_blank" rel="noopener" className="gh-lnk">&#8599; repo</a></div></div>
            <div className="gh-item"><div style={{flex:1}}><div className="gh-n">Quinta0/Ainulindale</div><div className="gh-d">Self-hosted music discovery &amp; streaming stack &mdash; auto-discovery, Soulseek P2P download via VPN, Navidrome streaming. Author &amp; maintainer.</div></div><div className="gh-r"><span className="gh-lang">Shell</span><a href="https://github.com/Quinta0/Ainulindale" target="_blank" rel="noopener" className="gh-lnk">&#8599; repo</a></div></div>
            <div className="gh-item"><div style={{flex:1}}><div className="gh-n">Quinta0/homelab</div><div className="gh-d">IaC scripts, Ansible playbooks, Docker Compose stacks for full homelab provisioning.</div></div><div className="gh-r"><span className="gh-lang">Shell</span><a href="https://github.com/Quinta0" target="_blank" rel="noopener" className="gh-lnk">&#8599; repo</a></div></div>
          </div>
        </div>
        <div className="sec-gr"></div>
      </div>

      {/* EXPERIENCE + EDUCATION */}
      <div className="sec" id="experience">
        <div className="sec-g"></div>
        <div className="sec-body">
          <div className="slbl">Experience</div>
          <div className="acc">
            <div className={`acc-item${openAcc['exp-0'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('exp-0')}>
                <div className="acc-l"><div className="acc-t">Systems Engineering Consultant</div><div className="acc-s">Freelance &middot; Ticino, Switzerland</div></div>
                <div className="acc-r2"><span className="acc-per">Jan 2020 &mdash; Present</span><ChevronDown/></div>
              </button>
              <div className="acc-body">
                <p>End-to-end IT infrastructure for private and business clients in Ticino.</p>
                <ul>
                  <li>Delivered and maintained 6&ndash;10 production servers at 90%+ uptime using containerisation, IaC, and automated monitoring &mdash; all without managed hosting.</li>
                  <li>Eliminated public exposure across all client servers by routing every external entry-point through Cloudflare Tunnels and Pangolin/Traefik &mdash; zero open ports, DNSSEC enforced, split-DNS via AdGuard Home.</li>
                  <li>Pangolin + Traefik reverse proxy with Authelia SSO, automatic TLS, and Newt tunnelling.</li>
                  <li>Fail2Ban + Crowdsec intrusion detection; UFW + iptables firewall rules across all nodes.</li>
                  <li>Reduced storage recovery time to under 30 minutes by implementing ZFS RAID-Z snapshots and automated rsync offsite backups on all storage nodes.</li>
                  <li>Music pipeline: Lidarr &#8594; Prowlarr &#8594; Beets &#8594; Navidrome + Listenbrainz scrobbling + Symfonium/Explo mobile.</li>
                  <li>Windows Server: Active Directory, DNS, DHCP, Group Policy, Disaster Recovery planning.</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{marginTop:'44px'}}><div className="slbl">Education</div></div>
          <div className="acc">
            <div className={`acc-item${openAcc['edu-0'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('edu-0')}>
                <div className="acc-l"><div className="acc-t">BSc in Economics</div><div className="acc-s">USI Universit&agrave; della Svizzera italiana &middot; Lugano</div></div>
                <div className="acc-r2"><span className="acc-per">Sep 2024 &mdash; Present</span><ChevronDown/></div>
              </button>
              <div className="acc-body">
                <p>Ongoing bachelor&rsquo;s focusing on rigorous theory and quantitative methods.</p>
                <ul>
                  <li><strong style={{color:'var(--navy)'}}>Microeconomics</strong> &mdash; consumer and producer theory, market structures (perfect competition, oligopoly, monopoly), welfare economics, externalities.</li>
                  <li><strong style={{color:'var(--navy)'}}>Macroeconomics</strong> &mdash; GDP and growth models, IS-LM, monetary and fiscal policy, open economy models, inflation and unemployment dynamics.</li>
                  <li><strong style={{color:'var(--navy)'}}>Game Theory</strong> &mdash; Nash equilibrium, dominant strategies, extensive and normal form games, mechanism design, auction theory, repeated games.</li>
                  <li><strong style={{color:'var(--navy)'}}>Quantitative Finance &amp; Statistics</strong> &mdash; probability theory, statistical inference, regression analysis, time series, financial modelling, portfolio theory basics.</li>
                  <li>Accounting, Statistics, and Quantitative Methods for economic analysis.</li>
                </ul>
                <div className="econ-tags">
                  <span className="econ-tag">Game Theory</span><span className="econ-tag">Microeconomics</span><span className="econ-tag">Macroeconomics</span><span className="econ-tag">Quantitative Finance</span><span className="econ-tag">Statistics</span><span className="econ-tag">Financial Modelling</span><span className="econ-tag">IS-LM</span><span className="econ-tag">Nash Equilibrium</span>
                </div>
              </div>
            </div>
            <div className={`acc-item${openAcc['edu-1'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('edu-1')}>
                <div className="acc-l"><div className="acc-t">BSc in Informatics <span style={{fontSize:'11.5px',color:'var(--muted)',fontWeight:400,fontFamily:'\'DM Mono\',monospace'}}>&mdash; 2 yrs completed</span></div><div className="acc-s">USI Universit&agrave; della Svizzera italiana &middot; Lugano</div></div>
                <div className="acc-r2"><span className="acc-per">Sep 2022 &mdash; Jun 2024</span><ChevronDown/></div>
              </button>
              <div className="acc-body">
                <p>Two years of rigorous computer science foundations before transitioning to Economics.</p>
                <ul>
                  <li><strong style={{color:'var(--navy)'}}>Software Engineering</strong> &mdash; agile methodologies, requirements engineering, UML modelling, design patterns, and testing practices.</li>
                  <li><strong style={{color:'var(--navy)'}}>Data Structures &amp; Algorithms</strong> &mdash; complexity analysis (Big-O), arrays, linked lists, trees, graphs, and sorting and searching algorithms.</li>
                  <li><strong style={{color:'var(--navy)'}}>Object-Oriented Programming</strong> &mdash; Java and C++ with inheritance, polymorphism, encapsulation, and SOLID principles.</li>
                  <li><strong style={{color:'var(--navy)'}}>Web Development</strong> &mdash; HTML, CSS, and JavaScript fundamentals with introductory full-stack concepts.</li>
                  <li>Discrete mathematics, logic, and formal reasoning for computer science.</li>
                </ul>
                <div className="econ-tags">
                  <span className="econ-tag">Java</span><span className="econ-tag">C++</span><span className="econ-tag">Algorithms</span><span className="econ-tag">Data Structures</span><span className="econ-tag">OOP</span><span className="econ-tag">Agile</span><span className="econ-tag">Software Engineering</span><span className="econ-tag">Web Dev</span>
                </div>
              </div>
            </div>
            <div className={`acc-item${openAcc['edu-2'] ? ' open' : ''}`}>
              <button className="acc-btn" onClick={() => toggle('edu-2')}>
                <div className="acc-l"><div className="acc-t">Maturit&agrave; Cantonale &amp; AFC Economics</div><div className="acc-s">Scuola cantonale di commercio &middot; Bellinzona</div></div>
                <div className="acc-r2"><span className="acc-per">Sep 2018 &mdash; Jun 2022</span><ChevronDown/></div>
              </button>
              <div className="acc-body">
                <p>Swiss dual-track qualification combining the academic Maturit&agrave; with a commercial AFC diploma. Graduated above average in both tracks.</p>
                <ul>
                  <li><strong style={{color:'var(--navy)'}}>Economics &amp; Business</strong> &mdash; microeconomic principles, business organisation, entrepreneurship, and market dynamics.</li>
                  <li><strong style={{color:'var(--navy)'}}>Accounting &amp; Finance</strong> &mdash; double-entry bookkeeping, financial statements, cost accounting, and Swiss business law.</li>
                  <li><strong style={{color:'var(--navy)'}}>Mathematics &amp; Statistics</strong> &mdash; algebra, calculus foundations, probability, and descriptive statistics.</li>
                  <li><strong style={{color:'var(--navy)'}}>Languages</strong> &mdash; Italian (native instruction), German, English, and French; professional writing and communication.</li>
                  <li>Maturit&agrave; Cantonale: <strong>4.5 / 6</strong> &middot; AFC Economics: <strong>5 / 6</strong>. Above average in both tracks.</li>
                </ul>
                <div className="econ-tags">
                  <span className="econ-tag">Maturit&agrave; 4.5/6</span><span className="econ-tag">AFC 5/6</span><span className="econ-tag">Accounting</span><span className="econ-tag">Business Law</span><span className="econ-tag">Mathematics</span><span className="econ-tag">Economics</span><span className="econ-tag">Multilingual</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{marginTop:'36px'}}><div className="slbl">Languages</div></div>
          <div className="langs">
            <div className="langc"><div className="lang-n">Italian</div><div className="lang-l">Native</div></div>
            <div className="langc"><div className="lang-n">English</div><div className="lang-l">Fluent</div></div>
            <div className="langc"><div className="lang-n">German</div><div className="lang-l">Conversational</div></div>
            <div className="langc"><div className="lang-n">Spanish</div><div className="lang-l">Basic</div></div>
            <div className="langc"><div className="lang-n">Norwegian</div><div className="lang-l">Basic</div></div>
          </div>
        </div>
        <div className="sec-gr"></div>
      </div>

      {/* CONTACT */}
      <div className="contact" id="contact">
        <div className="contact-g"></div>
        <div className="contact-body">
          <h2>Ready to<br/>collaborate?</h2>
          <p>Whether you need server infrastructure, network architecture, a self-hosted media stack, or a Junior SysAdmin &mdash; let&rsquo;s build something reliable together.</p>
          <div className="contact-ctas">
            <a href="mailto:0pietroquintavalle0@gmail.com" className="btn-li">&#9993; 0pietroquintavalle0@gmail.com</a>
            <a href="https://github.com/Quinta0" target="_blank" rel="noopener" className="btn-gh">GitHub &#8599;</a>
            <a href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/" target="_blank" rel="noopener" className="btn-gh">LinkedIn &#8599;</a>
          </div>
        </div>
        <div className="contact-gr"></div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="foot">
          <p>&#169; 2025 Pietro Quintavalle &middot; Lugano, Switzerland</p>
          <a href="#">Back to top &#8593;</a>
        </div>
      </footer>
    </>
  )
}
