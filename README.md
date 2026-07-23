# whoami

Personal portfolio site for **Pietro Quintavalle** — systems engineer, developer, and homelabber. Built as a single-page Next.js app with a dark, terminal-inspired aesthetic.

**Live:** deployed via GitHub Pages on every push to `main`.

## What's on it

- A boot-sequence intro — the page opens on a black screen running a fake BIOS/POST log (hardware checks, homelab services starting up) before greeting the visitor and revealing the site. Skippable at any time with a click or keypress.
- A single-page layout covering skills, homelab infrastructure, desktop specs, personal & client projects, open-source contributions, experience, and education.
- An interactive terminal panel (in the "About" section) styled after a real shell session, complete with a `neofetch`-style system summary.
- Hidden terminal commands — type into the terminal prompt:
  - `mellon` — the Doors of Durin
  - `you shall not pass` — the Balrog
  - `iddqd` / `idkfa` — DOOM cheat codes
  - `reboot` — replays the boot sequence

## Stack

- [Next.js](https://nextjs.org) 15 (App Router) + React 18 + TypeScript
- Tailwind CSS for utilities, hand-written CSS (`app/globals.css`) for the page's design system
- Statically exported (`output: 'export'`) and deployed to GitHub Pages via GitHub Actions (`.github/workflows/nextjs.yml`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page auto-updates as you edit `app/page.tsx`.

Other scripts:

```bash
npm run build       # static export to ./out
npm run lint        # ESLint
npm run type-check  # tsc --noEmit
```

## Structure

```
app/
  page.tsx                    # all page content and sections
  components/boot-sequence.tsx  # the black-screen boot/greeting intro
  globals.css                 # design tokens + component styles
  layout.tsx                  # metadata, fonts
```
