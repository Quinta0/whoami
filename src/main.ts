import './style.css'
import { createWorld, callouts, contributions } from './world'

const $ = <T extends HTMLElement>(q: string) => document.querySelector<T>(q)!
const sections = [...document.querySelectorAll<HTMLElement>('section[data-ch]')]
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const world = createWorld($<HTMLCanvasElement>('#world'))
if (!world) document.documentElement.classList.add('no-gl') // the page is plain HTML underneath, it still reads fine

$('#contribs').textContent = String(contributions)

// chapter position from scroll: 0 at the first section's centre, 1 at the second's, and so on
let centres: number[] = []
const measure = () => { centres = sections.map(s => s.offsetTop + s.offsetHeight / 2 - innerHeight / 2); world?.resize() }
// slow GPU: after two seconds averaging under ~35 fps, render at 1x and stop checking
let slowT = 0, slowN = 0
function chapterAt(y: number) {
  const last = centres.length - 1
  if (y <= centres[0]) return 0
  for (let i = 0; i < last; i++) if (y < centres[i + 1]) return i + (y - centres[i]) / (centres[i + 1] - centres[i])
  return last
}
addEventListener('resize', measure)
new ResizeObserver(measure).observe(document.body) // fonts loading move the centres too
measure()

let mx = 0, my = 0
addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { mx = e.clientX / innerWidth * 2 - 1; my = e.clientY / innerHeight * 2 - 1 } })

// callouts: labels pinned to points in the 3D world
const tags = callouts.map(c => { const el = document.createElement('div'); el.className = 'co'; el.innerHTML = `<span>${c.text}</span>`; $('#callouts').append(el); return el })

// scale bar: pick the 1-2-5 length that lands nearest 120px, like a microscope does
const units: [number, string][] = [[1e3, 'km'], [1, 'm'], [1e-2, 'cm'], [1e-3, 'mm'], [1e-6, 'µm']]
function scaleBar(mpp: number, p: number, week: number) {
  if (p > 4.6) return { px: Math.max(2, week / mpp), label: '1 week' } // out here the grid is time, one cell pitch per week
  const raw = mpp * 120, pow = 10 ** Math.floor(Math.log10(raw)), len = [1, 2, 5, 10].map(m => m * pow).reduce((a, b) => Math.abs(b - raw) < Math.abs(a - raw) ? b : a)
  const [u, name] = units.find(([u]) => len >= u * .999) ?? units[4]
  return { px: len / mpp, label: `${+(len / u).toPrecision(1)} ${name}` }
}

const bar = $('#bar'), barLabel = $('#barl'), chap = $('#chap'), needle = $('#needle'), navLinks = [...document.querySelectorAll<HTMLElement>('.ruler a')]
const names = sections.map(s => s.dataset.ch!)
let p = chapterAt(scrollY), mxs = 0, mys = 0, last = performance.now(), active = -1
function tick(now: number) {
  const dt = Math.min(.1, (now - last) / 1000); last = now
  if (slowN >= 0 && now > 1500) { slowT += dt; if (++slowN === 70) { if (slowT / 70 > .028) world?.resize(1); slowN = -1 } }
  const k = reduce ? 1 : 1 - Math.exp(-dt * 5)
  p += (chapterAt(scrollY) - p) * k; mxs += (mx - mxs) * k; mys += (my - mys) * k
  if (world) {
    world.frame(p, reduce ? 60 : now / 1000, reduce ? 0 : mxs, reduce ? 0 : mys)
    const sb = scaleBar(world.mpp(), p, world.week)
    bar.style.width = `${sb.px}px`; barLabel.textContent = sb.label
    callouts.forEach((c, i) => {
      const at = Math.abs(p - c.ch) < .3 ? world.toScreen(c.p) : null
      tags[i].classList.toggle('on', !!at)
      if (at) { tags[i].style.transform = `translate(${at[0]}px,${at[1]}px)`; tags[i].classList.toggle('flip', at[0] > innerWidth - 300) }
    })
  }
  needle.style.top = `${p / (sections.length - 1) * 100}%`
  const cur = Math.round(p)
  if (cur !== active) {
    active = cur
    chap.textContent = `${String(cur).padStart(2, '0')} / ${names[cur]}`
    navLinks.forEach((a, i) => a.classList.toggle('on', i === cur))
  }
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)

// before/after bars and section reveals play once, when first seen
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .25 })
document.querySelectorAll('.ba, .panel > *').forEach(el => io.observe(el))
