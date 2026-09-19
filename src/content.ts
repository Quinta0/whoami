// All page copy lives here so the layout stays clean
export const EMAIL = '0pietroquintavalle0@gmail.com'
export const GITHUB = 'https://github.com/Quinta0'
export const LINKEDIN = 'https://linkedin.com/in/pietro-quintavalle'
export const WHOAMI = 'https://quinta0.github.io/whoami'
export const GITLAB = 'https://gitlab.com/Quinta0'
export const CODEBERG = 'https://codeberg.org/Quinta'

export const facts = [
  { n: 6, label: 'years assembling and repairing hardware' },
  { n: 25, label: 'systems built for private clients' },
  { n: 12, label: 'active users on self-hosted infrastructure' },
  { n: 30, prefix: '<', label: 'minutes to rebuild a cluster from bare metal' },
]

export const qualities = [
  { title: 'Diagnoses at the component, not the ticket', text: 'Thermal bench-testing, firmware and BIOS flashing, soldering and harness wiring. When a node fails I find the part, not the symptom.' },
  { title: 'Treats every host as disposable', text: 'Ansible playbooks and Docker Compose rebuild the whole environment from a blank disk in under thirty minutes. Nothing important lives only in one place.' },
  { title: 'Zero exposed WAN ports, by default', text: 'Cloudflare Tunnels, WireGuard and Tailscale meshes, SSO with 2FA, host firewalls and intrusion detection on every node. Security is part of the build, not a later phase.' },
  { title: 'Reads the protocol when there is no documentation', text: 'Reverse-engineered a vendor USB HID protocol from packet captures and shipped a working Linux driver upstream. Undocumented hardware is a puzzle, not a blocker.' },
]

export type Shaped = { shape?: string; label?: string }

export const jobs: (Shaped & { time: string; title: string; org: string; bullets: string[] })[] = [
  {
    time: '2026 to now', title: 'Infrastructure and hardware consultant', org: 'DEC Energy, USI startup, freelance',
    shape: 'cluster', label: 'DEC Energy: two nodes, one GPU, one HBA',
    bullets: [
      'Designed, procured and deployed an on-premise two-node Kubernetes cluster from parts to production: local LLM inference, web hosting, accounting and Gitea/GitLab source control.',
      'Tuned fan curves and ran thermal bench stress tests so the nodes stay quiet in an open office under full inference load.',
      "Specified and assembled the engineering team's workstations and remain on-call for support.",
    ],
  },
  {
    time: 'January 2020 to now', title: 'IT support technician', org: 'Private clients across Ticino, freelance',
    bullets: [
      'Built, configured and repaired more than 25 desktop and laptop systems: sourcing, assembly, Windows and Linux deployment, driver debugging, ongoing maintenance.',
      'Remote and on-site support for hardware failures, software conflicts and local networking faults, with repair logs kept to stop issues recurring.',
    ],
  },
  {
    time: 'January 2020 to now', title: 'Infrastructure engineer, self-directed', org: 'Four bare-metal servers serving 12+ users',
    shape: 'homelab', label: 'Homelab as code: nine bays, twelve users, no open ports',
    bullets: [
      'UNRAID, Proxmox VE 8, TrueNAS, Docker and LXC running production workloads without any managed hosting.',
      'Delivered a turnkey rack for a client: cabinet, chassis, structured cabling, TrueNAS with ZFS RAID 10, per-user ACLs and automated offsite snapshots with under thirty minutes of recovery time.',
      'Hardened every edge: no open WAN ports, SSO and 2FA, intrusion detection, host-level firewalls.',
    ],
  },
]

export const oss: (Shaped & { href: string; repo: string; title: string; text: string; ref: string })[] = [
  {
    href: 'https://github.com/libratbag/libratbag/pull/1873', repo: 'libratbag/libratbag',
    title: 'A complete USB HID device driver, written from a packet capture',
    text: "Sniffed the vendor's raw HID reports in Wireshark, decoded the byte layout for DPI profiles, polling rates and on-board memory, then wrote a complete C driver that was merged upstream.",
    ref: 'PR #1873', shape: 'hid', label: 'HID report: the bytes that became a driver',
  },
  {
    href: 'https://github.com/ValveSoftware/steam-for-linux/issues/13248', repo: 'ValveSoftware/steam-for-linux, Vysp3r/ProtonPlus',
    title: 'Runtime installation pipeline fault, diagnosed and fixed upstream',
    text: 'Traced execution crashes in the Steam Linux Runtime to unwritten manifest files, documented a depot recovery workaround and contributed code to automate runtime integrity checks.',
    ref: 'Issues #13248, #1232',
  },
  {
    href: 'https://github.com/Recol/DLSS-Updater/pull/283', repo: 'Recol/DLSS-Updater',
    title: 'Multi-vendor upscaler library detection',
    text: 'Replaced brittle static tables with bounded manifest parsing so NVIDIA DLSS, AMD FSR and Intel XeSS libraries survive DLL upgrades; also fixed UI state desynchronisation.',
    ref: 'PRs #283, #252, #256',
  },
]

export const projects: (Shaped & { title: string; star?: string; text: string; stack: string })[] = [
  { title: 'Homelab as code', shape: 'homelab', label: 'Homelab as code: nine bays, twelve users, no open ports',
    text: 'Four production hosts rebuilt from bare metal by Ansible in under thirty minutes. Twelve-plus daily users, no exposed WAN ports: Cloudflare Tunnels, WireGuard, SSO with 2FA and Fail2Ban on every node.',
    stack: 'Ansible, Docker Compose, UNRAID, Grafana, Prometheus' },
  { title: 'Turnkey TrueNAS rack', shape: 'nas', label: 'Client rack: the cabinet that opens this page',
    text: 'A 19-inch cabinet for a private client: patch panels, storage chassis and nine drive bays, every cable run dressed and labelled. TrueNAS on top with ZFS RAID 10, per-user ACLs and offsite snapshots for a sub-30-minute recovery target.',
    stack: 'TrueNAS, ZFS, rack infrastructure, structured cabling' },
  { title: 'ObsidianSetup', star: '26 stars on GitHub',
    text: 'Cross-platform provisioning utility for environment configuration and plugin management, adopted by other users.',
    stack: 'PowerShell' },
  { title: 'City simulator, USI group project', shape: 'city', label: 'City simulator: twelve people, one Spring Boot backend',
    text: 'Coordinated a twelve-person Scrum team building a full-stack city simulation. Owned the Spring Boot backend and its integration with the web frontend.',
    stack: 'Java, Spring Boot, JavaScript, HTML, CSS' },
  { title: 'Nargothrond Watch',
    text: 'Scheduled health checks for a home server: container status via the Docker API, ZFS pool health, CrowdSec security events and Traefik routes, with an optional self-contained HTML dashboard and email/Discord alerts. No daemon, no database required, just a script on a schedule.',
    stack: 'Python, SQLite, Docker API, Traefik' },
]

export const toolsRowA = ['Proxmox VE', 'TrueNAS', 'ZFS', 'UNRAID', 'Kubernetes', 'Docker', 'LXC', 'KVM', 'Ansible', 'GitHub Actions', 'Bash', 'PowerShell', 'Debian', 'Arch', 'NixOS', 'Windows Server', 'Active Directory']
export const toolsRowB = ['WireGuard', 'Tailscale', 'Cloudflare Tunnels', 'UniFi', 'VLANs', 'iptables', 'Fail2Ban', 'AdGuard Home', 'Grafana', 'Prometheus', 'Uptime Kuma', 'Spring Boot', 'TypeScript', 'llama.cpp', 'Rust', 'C']

export const education = [
  { title: 'BSc Economics, English stream', text: 'Università della Svizzera italiana, Lugano, since September 2024. Microeconomics, game theory, quantitative finance, statistics, financial modelling.' },
  { title: 'Computer science coursework, two full years', text: 'USI, 2022 to 2024. Algorithms and data structures, object-oriented systems in Java and C++, software architecture, discrete logic.' },
  { title: 'Maturità Cantonale and Federal VET Diploma, AFC Economics', text: 'Scuola Cantonale di Commercio, Bellinzona, 2018 to 2022. Maturità 4.5/6, AFC 5/6.' },
]
export const certifications = 'Google IT Support Professional Certificate. Google Data Analytics Professional Certificate. Microsoft Foundations of IT Systems, Networking and Data Protection.'
export const languages = [['Italian', 'native'], ['English', 'C2'], ['German', 'B1–B2'], ['Spanish', 'A1'], ['Norwegian', 'A1']]
