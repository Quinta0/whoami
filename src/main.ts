import './style.css'
import contrib from './contrib.json'

// Scroll is the timeline. Each scene gets --p, 0..1, for how far through its pin it is; the CSS turns that into transforms,
// and the scenes that need more than CSS (canvas, a replayed sort, a narration line) get p through `on` below.
// Without the .motion class (reduced motion, or no script) every scene sits at its finished frame and nothing here animates.
const root = document.documentElement
const motion = root.classList.contains('motion')
const $$ = <T extends HTMLElement>(q: string, el: ParentNode = document) => [...el.querySelectorAll<T>(q)]
const clamp = (x: number) => Math.min(1, Math.max(0, x))
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
const pair = (s: string) => s.split(',').map(Number) as [number, number]
const tell = (el: HTMLElement, p: number, lines: [number, string][]) => { el.textContent = lines.find(l => p <= l[0])![1] }

// github: one calendar a year, each on a face of a drum; yr is the face in front, and may sit between two years while it turns
const data = contrib.years as Record<string, { total: number; weeks: number[][] }>, years = Object.keys(data), last = years.length - 1
const total = $$('#total')[0], totalUnit = $$('#total-unit')[0], drum = $$('.drum')[0]
drum.style.cssText = `--a:${360 / years.length}deg;--z:${.5 / Math.tan(Math.PI / years.length)}`
drum.append(...years.map((y, f) => {
  const face = document.createElement('div')
  face.className = 'cal'; face.style.setProperty('--f', String(f))
  face.append(...data[y].weeks.map(week => {
    const col = document.createElement('div')
    for (const c of week) { const d = document.createElement('i'); d.dataset.v = String(c === 0 ? 0 : c < 3 ? 1 : c < 6 ? 2 : c < 10 ? 3 : 4); col.append(d) }
    return col
  }))
  return face
}))
function showYear(yr: number) {
  const a = Math.floor(yr), b = Math.min(a + 1, last), i = Math.round(yr)
  drum.style.setProperty('--yr', yr.toFixed(3))
  total.textContent = fmt(data[years[a]].total + (data[years[b]].total - data[years[a]].total) * (yr - a))
  totalUnit.textContent = `contributions in ${years[i]}`
  yearBtns.forEach((btn, k) => btn.setAttribute('aria-pressed', String(k === i)))
}
const YEAR_A = .06, YEAR_B = .94 // the stretch of the pin the drum turns over
const yearBtns = years.map((y, i) => {
  const btn = document.createElement('button')
  btn.className = 'btn btn--quiet'; btn.type = 'button'; btn.textContent = y
  btn.onclick = () => {
    if (!motion) return showYear(i)
    const track = $$('#github .track')[0]
    scrollTo({ top: track.getBoundingClientRect().top + scrollY + (YEAR_A + i / last * (YEAR_B - YEAR_A)) * (track.offsetHeight - innerHeight), behavior: 'smooth' })
  }
  return btn
})
$$('.years')[0].append(...yearBtns)

// whoami: a point cloud that morphs rack, knot, globe, name as p runs, turning once on the way
const cv = $$<HTMLCanvasElement>('.cloud')[0], N = 1400
const rnd = (i: number, k = 1) => { const x = Math.sin(i * 12.9898 * k + 78.233) * 43758.5453; return x - Math.floor(x) }
const shape = (f: (i: number) => number[]) => Array.from({ length: N }, (_, i) => f(i))
const shapes = [
  shape(i => { const u = rnd(i) * 4, s = u % 1 * 2 - 1, y = Math.round(rnd(i, 2) * 8) / 4 - 1; return u < 1 ? [s * .55, y, .35] : u < 2 ? [.55, y, s * .35] : u < 3 ? [s * .55, y, -.35] : [-.55, y, s * .35] }),
  shape(i => { const t = i / N * Math.PI * 2, j = (rnd(i) - .5) * .1; return [(Math.sin(t) + 2 * Math.sin(2 * t)) / 3 + j, (Math.cos(t) - 2 * Math.cos(2 * t)) / 3 + j, -Math.sin(3 * t) / 3 + j] }),
  shape(i => { const y = 1 - 2 * (i + .5) / N, r = Math.sqrt(1 - y * y), a = i * 2.39996; return [r * Math.cos(a) * .9, y * .9, r * Math.sin(a) * .9] }),
]
shapes[3] = shapes[2] // until the display face has loaded and the name can be sampled from it
let cloudP = 1
// one renderer for every cloud: n points from at(i), turned by a about the vertical, tipped by tilt, fitted to ex units across
function paint(el: HTMLCanvasElement, n: number, at: (i: number) => number[], a: number, tilt = 0, ex = 1.6) {
  const g = el.getContext('2d')!, w = el.clientWidth, h = el.clientHeight, dpr = devicePixelRatio
  el.width = w * dpr; el.height = h * dpr
  g.scale(dpr, dpr)
  g.fillStyle = getComputedStyle(el).color
  const c = Math.cos(a), s = Math.sin(a), ct = Math.cos(tilt), st = Math.sin(tilt), sc = Math.min(w / (2 * ex), h / 2.1)
  for (let i = 0; i < n; i++) {
    const [x, y, z] = at(i), z1 = z * c - x * s, Y = y * ct - z1 * st, Z = z1 * ct + y * st, d = 2.4 + Z * 1.2
    g.globalAlpha = .55 + .45 * clamp((Z + 1) / 2)
    g.fillRect(w / 2 + (x * c + z * s) * sc, h / 2 - Y * sc, d, d)
  }
}
function cloud(p: number) {
  cloudP = p
  const f = Math.min(2.999, p * 3), k = Math.floor(f), t = seg(f - k, .2, .85), e = t * t * (3 - 2 * t), A = shapes[k], B = shapes[k + 1]
  paint(cv, N, i => [A[i][0] + (B[i][0] - A[i][0]) * e, A[i][1] + (B[i][1] - A[i][1]) * e, A[i][2] + (B[i][2] - A[i][2]) * e], (1 - p) * Math.PI * 2)
}
document.fonts.ready.then(() => {
  const c = document.createElement('canvas'), x = c.getContext('2d')!, lit: number[][] = []
  c.width = 600; c.height = 160
  x.font = `800 120px ${getComputedStyle(root).getPropertyValue('--font-display')}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('whoami', 300, 80)
  const d = x.getImageData(0, 0, 600, 160).data
  for (let y = 0; y < 160; y += 2) for (let px = 0; px < 600; px += 2) if (d[(y * 600 + px) * 4 + 3] > 128) lit.push([(px - 300) / 200, (80 - y) / 200, 0])
  if (lit.length) shapes[3] = shape(i => lit[Math.floor(rnd(i, 3) * lit.length)])
  cloud(cloudP)
})
// the small clouds under the homelab, benthicbloom and hitscan: a rack, a flower and a mouse, turning as they pass through the viewport
const minis: Record<string, number[][]> = {
  rack: shapes[0],
  bloom: shape(i => { const a = rnd(i) * Math.PI * 2, r = Math.sqrt(rnd(i, 2)), m = .5 + .5 * Math.abs(Math.cos(2.5 * a)); return [r * m * Math.cos(a), .7 * r * r - .35, r * m * Math.sin(a)] }),
  mouse: shape(i => {
    const a = rnd(i) * Math.PI * 2, t = rnd(i, 2), m = i % 12
    const hw = (z: number) => { const c = z / .95; return .47 * (c < -.5 ? Math.sqrt(1 - (2 * c + 1) ** 2) : c > .7 ? (1 - ((c - .7) / .3) ** 4) ** .25 : 1) } // half the width at z: a round palm, straight flanks, a square nose
    const on = (s: number, z: number) => { const c = z / .95; return [s * hw(z), .42 * Math.sqrt((1 - s * s) * (1 - Math.abs(c) ** (c > 0 ? 4 : 2))) * (1 - .3 * c), z] } // a point on the shell, s from flank to flank
    if (m === 0) return [(t - .5) * .08, .33 + Math.sin(a) * .07, .58 + Math.cos(a) * .13] // the wheel
    if (m === 1) return [-.49, .05 + rnd(i, 3) * .1, (i % 24 < 12 ? .11 : -.19) + t * .27] // two side buttons under the thumb
    if (i % 4 === 2) { // the seams: the wheel channel, the split between the buttons, the arc where they end, the line down each flank
      const u = rnd(i, 3), e = i % 8 < 4 ? 1 : -1, z = .43 + t * .5
      return u < .3 ? on(e * .07 / hw(z), z) : u < .45 ? on(0, .13 + t * .3) : u < .8 ? on(e * t * .92, .19 - .06 * (1 - t * t)) : on(e * .92, .19 + t * .62)
    }
    const r = i % 5 === 0 ? 1 : Math.sqrt(t), c = r * Math.sin(a)
    return on(r * Math.cos(a) / Math.sqrt(1 - c * c + 1e-9), c * .95)
  }),
}
const spin = () => $$<HTMLCanvasElement>('.mini').forEach(el => {
  const r = el.getBoundingClientRect(), pts = minis[el.dataset.shape!]
  if (r.bottom > 0 && r.top < innerHeight) paint(el, N, i => pts[i], motion ? r.top / innerHeight * 3 : .7, .5, 1.15)
})
spin()
if (motion) addEventListener('scroll', spin, { passive: true })
addEventListener('resize', () => { cloud(cloudP); spin() })

// the drawing in the contact section: a river coming down between conifers, set in characters. t is seconds: the water runs, the trees sway
const art = $$('.ascii pre')[0], COLS = 88, ROWS = 40, HZ = 11
const mid = (y: number) => COLS / 2 + Math.sin(y * .21 + 1.3) * (3 + (y - HZ) * .32) // where the river runs on row y
const wide = (y: number) => 3 + (y - HZ) * .95 // and how wide: it opens toward the viewer
const trees = Array.from({ length: 18 }, (_, i) => {
  const d = rnd(i, 11), by = Math.round(HZ + 3 + d * (ROWS - 3 - HZ - 3)), h = Math.round(3 + d * 10)
  return { by, h, x: mid(by) + (i % 2 ? 1 : -1) * (wide(by) / 2 + 2 + h * .5 + rnd(i, 13) * (5 + 20 * d)) }
}).sort((a, b) => a.by - b.by) // far ones first, so near ones are drawn over them
function river(t: number) {
  const g: string[][] = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x): string => {
    if (y < HZ) { const hill = HZ - 2 - 2.5 * Math.abs(Math.sin(x * .07 + 2)) - 1.2 * Math.sin(x * .19); return y >= hill && y - hill < 1 ? '_' : ' ' }
    const dx = Math.abs(x - mid(y)), w = wide(y) / 2
    if (dx > w + 1) return rnd(x * 131 + y * 977, 17) > .9 ? (rnd(x + y * 7, 19) > .5 ? ',' : '.') : ' '
    if (dx > w) return ';'
    const f = Math.sin(Math.log(y - HZ + 1) * 9 - t * 4 + Math.sin(x * .45 + y * .2) * 1.6)
    return f > .45 ? '~' : f > -.3 ? '=' : '-'
  }))
  const put = (x: number, y: number, ch: string) => { if (y >= 0 && y < ROWS && x >= 0 && x < COLS) g[y][x] = ch }
  for (const tr of trees) {
    for (let k = 0; k < tr.h; k++) {
      const half = Math.round(k * .5), x0 = Math.round(tr.x + Math.sin(t * 1.4 + tr.x) * (1 - k / tr.h) * tr.h * .14)
      for (let d = -half; d <= half; d++) put(x0 + d, tr.by - tr.h + k, k === 0 ? '^' : d === -half ? '/' : d === half ? '\\' : rnd(k * 31 + d * 17 + tr.by, 23) > .35 ? '#' : '*')
    }
    put(Math.round(tr.x), tr.by, '|'); if (tr.h > 8) put(Math.round(tr.x), tr.by + 1, '|')
  }
  art.textContent = g.map(r => r.join('')).join('\n')
}
river(0)
if (motion) { // the water only runs while the drawing is on screen
  let id = 0
  new IntersectionObserver(es => { clearInterval(id); if (es[0].isIntersecting) id = setInterval(() => river(performance.now() / 1000), 90) }).observe(art)
}

// valgo: an insertion sort that runs once and records every step; p then replays the record, forwards or back
const sorter = $$('.sort')[0], say = $$('#say')[0], steps: { a: number[]; hot: number[]; say: string }[] = []
sorter.append(...Array.from({ length: 24 }, () => document.createElement('i')))
const bars = $$('i', sorter)
{
  const a = bars.map((_, i) => (i * 7 + 3) % bars.length + 1)
  const snap = (hot: number[], line: string) => steps.push({ a: [...a], hot, say: line })
  for (let i = 1; i < a.length; i++) for (let j = i; j > 0; j--) {
    snap([j - 1, j], `Comparing ${a[j - 1]} and ${a[j]}.`)
    if (a[j - 1] <= a[j]) break
    ;[a[j - 1], a[j]] = [a[j], a[j - 1]]
    snap([j - 1, j], `${a[j]} is larger, so they swap.`)
  }
  snap([], `Sorted: ${a.length} values in ${steps.length} recorded steps.`)
}
function sort(p: number) {
  const s = steps[Math.round(seg(p, .05, .9) * (steps.length - 1))]
  bars.forEach((b, i) => { b.style.transform = `scaleY(${s.a[i] / bars.length})`; b.classList.toggle('hot', s.hot.includes(i)) })
  say.textContent = s.say
}

// skills: every tile gets its turn, and a corner of its own to fly in from
$$('.mosaic .tile').forEach((el, i) => { el.style.cssText += `--i:${i};--dx:${(rnd(i, 5) - .5) * 90}vw;--dy:${(rnd(i, 7) - .5) * 90}vh;--rot:${(rnd(i, 9) - .5) * 180}deg` })

// hitscan: each byte and each decoded field needs its place in the queue
$$('.bytes b, .fields li').forEach((el, i) => el.style.setProperty('--i', String(i)))

// labs: the marker walks the index; the card on the right is rebuilt as text for the piece under it (the list itself stays the readable copy)
const benchItems = $$('#labs .works li'), benchNote = $$('.bench__note')[0]
let benchI = -1
function bench(p: number) {
  const i = Math.min(benchItems.length - 1, Math.floor(p * benchItems.length))
  if (i === benchI) return
  benchItems[benchI]?.classList.remove('is-on')
  benchItems[benchI = i].classList.add('is-on')
  const li = benchItems[i], tag = li.querySelector('.works__tag'), card = document.createElement('div')
  const span = (cls: string, text: string) => { const el = document.createElement('span'); el.className = cls; el.textContent = text; return el }
  const title = [...li.querySelector('h3')!.childNodes].filter(n => n !== tag).map(n => n.textContent).join('').trim()
  card.append(span('num', String(i + 1).padStart(2, '0')), ...(tag ? [span('tag', tag.textContent!)] : []), span('ttl', title), li.querySelector('p')!.cloneNode(true))
  card.querySelectorAll('a').forEach(a => a.replaceWith(a.textContent!)) // the card is a picture of the list item, not a second set of links
  benchNote.replaceChildren(card)
  if (motion) card.animate([{ opacity: 0, translate: '0 1.5rem' }, { opacity: 1, translate: '0 0' }], { duration: 450, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
}

const bbSay = $$('#bb-say')[0], tripSay = $$('#trip-say')[0]
const on: Record<string, (p: number) => void> = {
  whoami: cloud,
  valgo: sort,
  benthic: p => tell(bbSay, p, [[.38, 'Crossfade to the next wallpaper.'], [.74, 'Pixel shifting: a slow drift, exaggerated here.'], [1, 'Idle dimming: the background fades until you are back.']]),
  nargothrond: p => tell(tripSay, p, [[.1, 'A phone outside the house asks for a photo backup.'], [.24, 'The request enters the Cloudflare or Pangolin tunnel.'], [.4, 'Traefik reads the hostname and picks the container.'], [.6, 'Immich answers. The router never opened a port.'], [.78, 'A compromised smart bulb tries for the photos and passwords.'], [1, 'The VLAN boundary stops it.']]),
  labs: bench,
  github: p => { const x = seg(p, YEAR_A, YEAR_B) * last, k = Math.floor(x), f = seg(x - k, .25, .75); showYear(Math.min(last, k + f * f * (3 - 2 * f))) }, // each year rests a moment, then the drum turns on
}
Object.values(on).forEach(f => f(1)) // the finished frame, which is all there is without motion

if (motion) {
  // odometer wheels: 6 becomes a strip 6 5 4 3 2 1 0 that the CSS rolls
  $$('.d[data-from]').forEach((d, i) => {
    const n = +d.dataset.from!
    d.style.setProperty('--n', String(n)); d.style.setProperty('--i', String(i))
    d.innerHTML = `<span>${Array.from({ length: n + 1 }, (_, k) => `<b>${n - k}</b>`).join('')}</span>`
  })

  const fields = $$('main > section').map(el => ({ el, field: [...el.classList].find(c => c.startsWith('f-'))! }))
  const nav = $$('.nav')[0]
  const scenes = $$('.hero, .track, .contact').map(box => ({ box, host: box.closest<HTMLElement>('section')!, p: -1, e: '', enter: box.classList.contains('contact'),
    counts: $$('[data-count]', box).map(el => ({ el, v: pair(el.dataset.count!), r: pair(el.dataset.range!) })),
  }))

  let queued = false
  function frame() {
    queued = false
    const vh = innerHeight
    let moving = false
    for (const s of scenes) {
      const r = s.box.getBoundingClientRect(), span = r.height - vh
      if (!s.enter) { const e = clamp(1 - r.top / vh).toFixed(3); if (e !== s.e) s.host.style.setProperty('--e', s.e = e) } // 0..1 as the scene comes up into view
      const to = s.enter ? clamp(1 - r.top / vh) : clamp(-r.top / (span > 50 ? span : vh))
      const p = s.p < 0 || Math.abs(to - s.p) < .0005 ? to : s.p + (to - s.p) * .22 // a little glide, so a mouse wheel does not step
      if (p === s.p) continue
      if (p !== to) moving = true
      s.p = p
      s.host.style.setProperty('--p', p.toFixed(4))
      for (const c of s.counts) c.el.textContent = fmt(c.v[0] + (c.v[1] - c.v[0]) * seg(p, c.r[0], c.r[1]))
      on[s.host.id]?.(p)
    }
    const under = fields.find(f => { const r = f.el.getBoundingClientRect(); return r.top <= 36 && r.bottom > 36 })
    if (under && !nav.classList.contains(under.field)) nav.className = `nav ${under.field}`
    root.style.setProperty('--scroll', (scrollY / Math.max(1, root.scrollHeight - vh)).toFixed(4))
    if (moving) kick()
  }
  const kick = () => { if (!queued) { queued = true; requestAnimationFrame(frame) } }
  addEventListener('scroll', kick, { passive: true })
  addEventListener('resize', kick)
  frame()

  // latency: both bars fill in real time, 747 ms against 66
  const race = () => $$('.lane').forEach(lane => {
    const ms = +lane.dataset.ms!, out = $$('[data-out]', lane)[0], t0 = performance.now()
    $$('i', lane)[0].animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: ms, easing: 'linear' })
    const tick = (now: number) => { const e = Math.min(ms, now - t0); out.textContent = fmt(e); if (e < ms) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  })
  $$('#rerun')[0].addEventListener('click', race)
  const seen = new IntersectionObserver(es => { if (es[0].isIntersecting) { race(); seen.disconnect() } }, { threshold: .9 })
  seen.observe($$('.race')[0])

}
