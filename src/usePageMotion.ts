import { useEffect } from 'react'
import { hoverIn, hoverOut } from './scene/hoverStore'

// Everything in the page that moves: name reveal, counters, fades, tilt, magnetic links, cursor, hover wiring.
export function usePageMotion() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer: coarse)').matches
    const cleanups: (() => void)[] = []

    // hero name
    const nameT = setTimeout(() => document.getElementById('name')?.classList.add('on'), 150)
    cleanups.push(() => clearTimeout(nameT))

    // counters
    const countUp = (el: HTMLElement) => {
      const target = +el.dataset.count!, prefix = el.dataset.prefix || '', t0 = performance.now(), dur = 1600
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3)
        el.textContent = prefix + Math.round(target * e) + (k === 1 && !prefix ? '+' : '')
        if (k < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    // one quiet fade per block
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return
      e.target.classList.add('in'); io.unobserve(e.target)
      if (e.target.classList.contains('facts')) e.target.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
    }), { threshold: 0.15 })
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    cleanups.push(() => io.disconnect())

    // timeline beam
    const tl = document.getElementById('tl')
    if (tl) { const tio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) tl.classList.add('in') }), { threshold: 0.2 }); tio.observe(tl); cleanups.push(() => tio.disconnect()) }

    // hover-morph rows
    const rows = [...document.querySelectorAll<HTMLElement>('[data-shape]')]
    rows.forEach(el => {
      const on = () => hoverIn(el.dataset.shape!, el.dataset.label || '')
      el.addEventListener('pointerenter', on); el.addEventListener('pointerleave', hoverOut)
      el.addEventListener('focusin', on); el.addEventListener('focusout', hoverOut)
      cleanups.push(() => { el.removeEventListener('pointerenter', on); el.removeEventListener('pointerleave', hoverOut); el.removeEventListener('focusin', on); el.removeEventListener('focusout', hoverOut) })
    })
    if (coarse) { // touch: the row nearest the middle of the screen drives the sculpture
      const iv = setInterval(() => {
        const mid = innerHeight / 2; let best: HTMLElement | null = null, bd = 1e9
        for (const r of rows) { const b = r.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight) continue; const d = Math.abs((b.top + b.bottom) / 2 - mid); if (d < bd) { bd = d; best = r } }
        if (best && bd < innerHeight * 0.3) hoverIn(best.dataset.shape!, best.dataset.label || ''); else hoverOut()
      }, 250)
      cleanups.push(() => clearInterval(iv))
    }

    if (!coarse && !reduce) {
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(el => {
        const mv = (e: PointerEvent) => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateZ(6px)` }
        const lv = () => { el.style.transform = '' }
        el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv)
        cleanups.push(() => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv) })
      })
      document.querySelectorAll<HTMLElement>('[data-mag]').forEach(el => {
        const mv = (e: PointerEvent) => { const r = el.getBoundingClientRect(); const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2); el.style.transform = `translate(${x * 0.25}px,${y * 0.35}px)`; el.style.transition = 'transform .15s' }
        const lv = () => { el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)'; el.style.transform = '' }
        el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv)
        cleanups.push(() => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv) })
      })
    }

    // custom cursor
    if (!coarse) {
      const dot = document.querySelector<HTMLElement>('.cur'), ring = document.querySelector<HTMLElement>('.cur-ring')
      if (dot && ring) {
        let cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy, raf = 0
        const mv = (e: PointerEvent) => { cx = e.clientX; cy = e.clientY }
        addEventListener('pointermove', mv, { passive: true })
        const loop = () => { rx += (cx - rx) * 0.18; ry += (cy - ry) * 0.18; dot.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop) }
        loop()
        const big = () => ring.classList.add('big'), small = () => ring.classList.remove('big')
        const links = [...document.querySelectorAll('a,button')]
        links.forEach(a => { a.addEventListener('pointerenter', big); a.addEventListener('pointerleave', small) })
        cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener('pointermove', mv); links.forEach(a => { a.removeEventListener('pointerenter', big); a.removeEventListener('pointerleave', small) }) })
      }
    }

    // smooth anchors
    const anchors = [...document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')]
    const click = (e: Event) => { const a = e.currentTarget as HTMLAnchorElement; const t = document.querySelector(a.getAttribute('href')!); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }) } }
    anchors.forEach(a => a.addEventListener('click', click))
    cleanups.push(() => anchors.forEach(a => a.removeEventListener('click', click)))

    return () => cleanups.forEach(f => f())
  }, [])
}
