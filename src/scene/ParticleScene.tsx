import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { vert, frag } from './shaders'
import { shapeRack, shapeKnot, shapeGlobe, shapeText, getHoverShape, hoverFlat } from './shapes'
import { hover } from './hoverStore'

export const SHAPE_NAMES = [
  'Rack: four production servers, bare metal',
  'Mesh: zero exposed ports, every node peered',
  'Perimeter: SSO, 2FA, host firewalls, intrusion detection',
  'Contact: the whole thing reassembles on request',
]

type Props = {
  /** CSS selectors of the sections each scroll shape is keyed to, in order */
  keyframes: string[]
  onLabel?: (text: string) => void
  onProgress?: (scrollFraction: number) => void
}

export default function ParticleScene({ keyframes, onLabel, onProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer: coarse)').matches
    const isMobile = coarse || innerWidth < 760
    const COUNT = isMobile ? 6000 : 15000

    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' }) }
    catch { canvas.style.display = 'none'; return }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100)
    camera.position.set(0, 0, 18)
    const group = new THREE.Group()
    scene.add(group)

    const g = new THREE.BufferGeometry()
    const rand = new Float32Array(COUNT); for (let i = 0; i < COUNT; i++) rand[i] = Math.random()
    g.setAttribute('position', new THREE.BufferAttribute(shapeRack(COUNT), 3))
    g.setAttribute('aP0', new THREE.BufferAttribute(shapeRack(COUNT), 3))
    g.setAttribute('aP1', new THREE.BufferAttribute(shapeKnot(COUNT), 3))
    g.setAttribute('aP2', new THREE.BufferAttribute(shapeGlobe(COUNT), 3))
    g.setAttribute('aP3', new THREE.BufferAttribute(shapeText(COUNT), 3))
    g.setAttribute('aPH', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3))
    g.setAttribute('aPH2', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3))
    g.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
    const uniforms = {
      uProgress: { value: 0 }, uTime: { value: 0 }, uPR: { value: Math.min(devicePixelRatio, 2) },
      uMouse: { value: new THREE.Vector3(999, 999, 0) }, uMouseOn: { value: 0 }, uIntro: { value: reduce ? 1 : 0 },
      uDim: { value: 1 }, uHover: { value: 0 }, uSwap: { value: 1 },
      uC1: { value: new THREE.Color('#1f3d9e') }, uC2: { value: new THREE.Color('#d9741a') },
    }
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag, transparent: true, depthWrite: false, blending: THREE.NormalBlending })
    const points = new THREE.Points(g, material)
    group.add(points)

    const resize = () => {
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setSize(innerWidth, innerHeight, false)
      const aspect = innerWidth / innerHeight
      camera.aspect = aspect; camera.updateProjectionMatrix()
      // fixed vertical FOV means horizontal FOV shrinks on portrait screens; back the
      // camera off enough that the widest shape (the "PQ" text sweep, ~8 units half-width)
      // still fits the frustum instead of getting cropped on narrow viewports
      const halfV = Math.tan(camera.fov * Math.PI / 360)
      camera.position.z = 8.2 / (halfV * Math.min(aspect, 1))
    }

    // scroll: real fraction for the bar, section-keyed progress for the morph
    let scrollT = 0, scrollCur = 0, progT = 0, progCur = 0
    let mx = 0, my = 0, mxCur = 0, myCur = 0, mouseOn = 0, mouseOnCur = 0
    let hoverT = 0, hoverCur = 0, swapCur = 1, hoverKey: string | null = null
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      scrollT = max > 0 ? scrollY / max : 0
      const els = keyframes.map(q => document.querySelector<HTMLElement>(q)).filter(Boolean) as HTMLElement[]
      if (els.length < 2) return
      const c = els.map(el => el.offsetTop + el.offsetHeight / 2 - innerHeight / 2), y = scrollY, last = els.length - 1
      let v = last
      if (y <= c[0]) v = 0
      else for (let i = 0; i < last; i++) { if (y < c[i + 1]) { v = i + THREE.MathUtils.smoothstep((y - c[i]) / Math.max(1, c[i + 1] - c[i]), 0.45, 1); break } }
      progT = v / 3
    }
    const onMove = (e: PointerEvent) => { mx = (e.clientX / innerWidth) * 2 - 1; my = -(e.clientY / innerHeight) * 2 + 1; mouseOn = 1 }
    const onLeave = () => { mouseOn = 0 }
    const onResize = () => { resize(); updateScroll() }
    addEventListener('resize', onResize)
    addEventListener('scroll', updateScroll, { passive: true })
    addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    // hover shapes come from the shared store; swapping cross-fades through a scatter
    const applyHover = () => {
      if (!hover.on) { hoverT = 0; return }
      const k = hover.key!
      if (hoverKey !== k) {
        const ph = g.getAttribute('aPH') as THREE.BufferAttribute, ph2 = g.getAttribute('aPH2') as THREE.BufferAttribute
        if (hoverKey) { (ph2.array as Float32Array).set(ph.array as Float32Array); ph2.needsUpdate = true; swapCur = 0 }
        else { (ph2.array as Float32Array).set(getHoverShape(k, COUNT)); ph2.needsUpdate = true; swapCur = 1 }
        ;(ph.array as Float32Array).set(getHoverShape(k, COUNT)); ph.needsUpdate = true; hoverKey = k
      }
      hoverT = 1
    }

    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), ray = new THREE.Raycaster(), hit = new THREE.Vector3(), ndc = new THREE.Vector2()
    let last = performance.now(), elapsed = 0, introT = 0, labelIdx = -1, lastLabel = ''
    let raf = 0
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((now - last) / 1000, 0.05); last = now; elapsed += dt
      const t = elapsed
      applyHover()
      scrollCur += (scrollT - scrollCur) * 0.06; progCur += (progT - progCur) * 0.07
      mxCur += (mx - mxCur) * 0.08; myCur += (my - myCur) * 0.08
      mouseOnCur += (mouseOn - mouseOnCur) * 0.1
      if (!reduce) { introT = Math.min(1, introT + dt * 0.55); uniforms.uIntro.value = 1 - Math.pow(1 - introT, 3) }

      const prog = progCur * 3
      uniforms.uProgress.value = prog
      uniforms.uTime.value = t

      group.rotation.y = scrollCur * Math.PI * 1.35 + t * 0.03
      group.rotation.x = Math.sin(scrollCur * Math.PI) * 0.35
      const face = THREE.MathUtils.smoothstep(prog, 2.55, 3.0)
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, Math.round(group.rotation.y / (Math.PI * 2)) * Math.PI * 2, face)
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0, face)

      hoverCur += (hoverT - hoverCur) * 0.06; swapCur += (1 - swapCur) * 0.08
      const hEase = hoverCur * hoverCur * (3 - 2 * hoverCur)
      uniforms.uHover.value = hEase; uniforms.uSwap.value = swapCur
      if (hoverCur > 0.001) {
        const flat = hoverKey ? hoverFlat[hoverKey] : false
        const ty = (flat ? 0 : 0.62) + t * 0.08, tx = flat ? 0 : 0.3
        const near = ty + Math.round((group.rotation.y - ty) / (Math.PI * 2)) * Math.PI * 2
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, near, hEase)
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, tx, hEase)
      }

      const mid = THREE.MathUtils.smoothstep(prog, 0.15, 0.6) * (1 - THREE.MathUtils.smoothstep(prog, 2.5, 2.95))
      const offX = innerWidth < 760 ? 0 : THREE.MathUtils.lerp(5.5, 4.5, THREE.MathUtils.smoothstep(prog, 0, 0.8)) * (1 - THREE.MathUtils.smoothstep(prog, 2.5, 2.95))
      const hx = innerWidth < 760 ? 0 : 3.6, hz = innerWidth < 760 ? 2 : 5.5
      group.position.x += (THREE.MathUtils.lerp(offX, hx, hEase) - group.position.x) * 0.05
      group.position.z += (hz * hEase - group.position.z) * 0.05
      uniforms.uDim.value = THREE.MathUtils.lerp(1 - mid * 0.55, 1, hEase)

      camera.position.x += (mxCur * 0.9 - camera.position.x) * 0.05
      camera.position.y += (myCur * 0.6 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      ndc.set(mxCur, myCur); ray.setFromCamera(ndc, camera)
      if (ray.ray.intersectPlane(plane, hit)) { group.worldToLocal(hit); uniforms.uMouse.value.copy(hit) }
      uniforms.uMouseOn.value = coarse ? 0 : mouseOnCur

      // label + progress callbacks
      const label = hover.on && hover.label ? hover.label : SHAPE_NAMES[Math.min(3, Math.round(progCur * 3))]
      if (label !== lastLabel) { lastLabel = label; labelIdx = -1; onLabel?.(label) }
      void labelIdx
      onProgress?.(scrollCur)

      renderer.render(scene, camera)
    }

    const boot = () => { resize(); updateScroll(); raf = requestAnimationFrame(frame) }
    // wait for the display font so the "PQ" sampling uses it
    const ready = document.fonts?.load ? Promise.race([document.fonts.load('800 300px Syne'), new Promise(r => setTimeout(r, 1500))]) : Promise.resolve()
    ready.then(boot, boot)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', onResize); removeEventListener('scroll', updateScroll)
      removeEventListener('pointermove', onMove); document.removeEventListener('mouseleave', onLeave)
      g.dispose(); material.dispose(); renderer.dispose()
    }
  }, [keyframes, onLabel, onProgress])

  return <canvas id="scene" ref={canvasRef} aria-hidden="true" />
}
