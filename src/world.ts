// 65,536 cubes, one population. Every chapter is a layout in which a cube stands for something
// measured (a request, a watt, a port, a month, a contribution); scrolling morphs one layout into the next.
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import contrib from './contrib.json'

const SIDE = 256, N = SIDE * SIDE
const INK = 0, HOT = 1, PALE = 2
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const sstep = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
// seeded, so the charts are the same on every visit
let seed = 0x2001
const rnd = () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 }
const gauss = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(6.2831853 * rnd())

// every cube has a home on a 256x256 field; cubes a chart doesn't need shrink to nothing where they stand
const perm = Array.from({ length: N }, (_, i) => i)
for (let i = N - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1));[perm[i], perm[j]] = [perm[j], perm[i]] }
const FP = 1.6, homeX = (i: number) => (perm[i] % SIDE - 127.5) * FP, homeZ = (i: number) => (Math.floor(perm[i] / SIDE) - 127.5) * FP

type Put = (x: number, y: number, z: number, col?: number, scale?: number) => void
type Layout = { a: THREE.InstancedBufferAttribute; c: THREE.InstancedBufferAttribute; wave: number; scan: number }
function layout(fill: (put: Put) => void, wave = 0, scan = 0): Layout {
  const a = new Float32Array(N * 4), c = new Float32Array(N)
  for (let i = 0; i < N; i++) { a[i * 4] = homeX(i); a[i * 4 + 2] = homeZ(i) }
  let n = 0
  fill((x, y, z, col = INK, scale = 1) => { if (n < N) { a.set([x, y, z, scale], n * 4); c[n++] = col } })
  return { a: new THREE.InstancedBufferAttribute(a, 4), c: new THREE.InstancedBufferAttribute(c, 1), wave, scan }
}
const P = 1.25 // pitch of unit cubes in the charts

// ---------- the charts ----------
const field = (relief?: (u: number, v: number) => boolean) => layout(put => {
  for (let i = 0; i < N; i++) { const up = relief?.(perm[i] % SIDE, Math.floor(perm[i] / SIDE)); put(homeX(i), up ? 3.2 : .5, homeZ(i), up ? HOT : !relief && rnd() < .012 ? HOT : INK, 1.15) }
}, 1)

// latency: 14,000 requests binned on a log axis. the shapes are illustrative log-normals, pinned to the two measured p95 values
const REQ = 14000, BINS = 92, LN0 = Math.log(3), LN1 = Math.log(3000)
const msX = (ms: number) => ((Math.log(ms) - LN0) / (LN1 - LN0) * BINS - BINS / 2) * P
function histogram(p95: number, sigma: number) {
  const mu = Math.log(p95) - 1.645 * sigma, ms = Array.from({ length: REQ }, () => Math.exp(mu + sigma * gauss())).sort((a, b) => a - b)
  const fill = new Uint16Array(BINS); let top = 0
  const l = layout(put => ms.forEach((v, rank) => { // same rank = same cube in both charts, so slow requests stay the slow ones
    const b = Math.min(BINS - 1, Math.max(0, Math.floor((Math.log(v) - LN0) / (LN1 - LN0) * BINS))), k = fill[b]++
    top = Math.max(top, Math.floor(k / 8))
    put((b - BINS / 2 + .5) * P, .5 + Math.floor(k / 8) * P, (k % 8 - 3.5) * P, rank >= REQ * .95 ? HOT : INK)
  }))
  return { l, top: top * P, p95: ms[Math.floor(REQ * .95)] }
}
const before = histogram(747, .9), after = histogram(66, .6)

// power: one 10x10 layer of cubes per watt
const power = layout(put => [[-11, 85, INK], [11, 17, HOT]].forEach(([x0, watts, col]) => {
  for (let y = 0; y < watts; y++) for (let k = 0; k < 100; k++) put(x0 + (k % 10 - 4.5) * P, .5 + y * P, (Math.floor(k / 10) - 4.5) * P, col)
}))

// ports: all 65,536 of them as a wall, port 0 bottom left
const portAt = (p: number, dy = 0) => V(p % SIDE - 127.5, Math.floor(p / SIDE) + .5 + dy, 0)
const ports = layout(put => { for (let p = 0; p < N; p++) { const v = portAt(p); put(v.x, v.y, (rnd() - .5) * 1.4, INK, 1) } }, 0, 1) // solid, with random relief: gaps between 2px cubes would moire

// the path: one 4x3 slab of cubes per month, January 2018 to November 2026
const M0 = 2018, NOW = (2026 - M0) * 12 + 10, month = (y: number, m: number) => (y - M0) * 12 + m - 1
const tracks: [label: string, from: number, to: number, col: number][] = [
  ['School of commerce, Bellinzona', month(2018, 9), month(2022, 6), PALE],
  ['Computer science, USI', month(2022, 9), month(2024, 6), PALE],
  ['Economics, USI', month(2024, 9), NOW, PALE],
  ['IT support, private clients', month(2020, 1), NOW, INK],
  ['Homelab, 12+ users', month(2020, 1), NOW, INK],
  ['DEC Energy', month(2026, 7), month(2026, 8), HOT],
  ['Game server revival', month(2026, 10), NOW, HOT],
]
const trackAt = (t: number, m: number) => V((m - NOW / 2) * P, 0, (t - 3) * 8.5)
const path = layout(put => tracks.forEach(([, from, to, col], t) => {
  for (let m = from; m <= to; m++) for (let k = 0; k < 12; k++) { const v = trackAt(t, m); put(v.x, .5 + Math.floor(k / 4) * P, v.z + (k % 4 - 1.5) * P, col) }
}))

// the year: GitHub's calendar. a pale tile per day, one hot cube per contribution stacked on it
const WEEKS = contrib.weeks, CP = 2.7, dayAt = (w: number, d: number) => V((w - (WEEKS.length - 1) / 2) * CP, 0, (d - 3) * CP)
let best = { w: 0, d: 0, c: 0 }
const year = layout(put => {
  WEEKS.forEach((wk, w) => wk.forEach((_, d) => { const v = dayAt(w, d); put(v.x, -.7, v.z, PALE, 2.4) }))
  WEEKS.forEach((wk, w) => wk.forEach((c, d) => {
    if (c > best.c) best = { w, d, c }
    for (let k = 0; k < c; k++) { const v = dayAt(w, d); put(v.x + (k % 2 - .5) * 1.15, 1.05 + Math.floor(k / 4) * 1.15, v.z + (Math.floor(k / 2) % 2 - .5) * 1.15, HOT, 1.05) }
  }))
})

// contact: the field again, with a monogram pressed up through it
function monogram() {
  const cv = document.createElement('canvas'); cv.width = cv.height = SIDE
  const c = cv.getContext('2d')!; c.font = '900 150px "Arial Black", Arial, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('PQ', SIDE / 2, SIDE / 2 + 8)
  const px = c.getImageData(0, 0, SIDE, SIDE).data
  return (u: number, v: number) => px[(v * SIDE + u) * 4 + 3] > 120
}

// ---------- camera keyframes and labels, one set per chapter ----------
const K = [
  { t: V(0, 0, 0), d: 150, az: 32, el: 17 },
  { t: V(-4, before.top * .46, 0), d: 235, az: 16, el: 11 },
  { t: V(-26, after.top * .46, 0), d: 330, az: -14, el: 9 },
  { t: V(0, 46, 0), d: 300, az: 32, el: 7 },
  { t: V(0, 128, 0), d: 640, az: 20, el: 3 },
  { t: V(14, 0, 2), d: 340, az: 0, el: 56 },
  { t: V(12, 4, 0), d: 330, az: 12, el: 32 },
  { t: V(-40, 0, 10), d: 800, az: 0, el: 60 },
]
export const legend = ['65,536 cubes', '1 cube = 1 request', '1 cube = 1 request', '1 layer of cubes = 1 watt', '1 cube = 1 port', '12 cubes = 1 month', '1 orange cube = 1 contribution', '65,536 cubes, 0 images']
export const callouts: { ch: number; p: THREE.Vector3; text: string }[] = [
  { ch: 1, p: V(msX(before.p95), before.top * .28, 5), text: 'p95 · 747 ms' },
  ...[10, 100, 1000].map(ms => ({ ch: 1, p: V(msX(ms), 0, 7), text: ms < 1000 ? `${ms} ms` : '1 s' })),
  { ch: 2, p: V(msX(after.p95), after.top * .28, 5), text: 'p95 · 66 ms' },
  ...[10, 100, 1000].map(ms => ({ ch: 2, p: V(msX(ms), 0, 7), text: ms < 1000 ? `${ms} ms` : '1 s' })),
  { ch: 3, p: V(-11, 85 * P, 0), text: '85 W · before' },
  { ch: 3, p: V(11, 17 * P, 0), text: '17 W · after' },
  ...[22, 3389, 32400, 51820].map(p => ({ ch: 4, p: portAt(p, .5), text: `${p} · closed` })),
  ...tracks.map(([label, from], t) => ({ ch: 5, p: trackAt(t, from).setY(3.5), text: label })),
  { ch: 6, p: dayAt(best.w, best.d).setY(1.6 + Math.floor(best.c / 4) * 1.15), text: `busiest day · ${best.c}` },
]
export const contributions = contrib.total

export function createWorld(canvas: HTMLCanvasElement) {
  let renderer: THREE.WebGLRenderer
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' }) } catch { return null }
  const mobile = matchMedia('(pointer: coarse)').matches || innerWidth < 760
  renderer.shadowMap.enabled = !mobile

  const L = [field(), before.l, after.l, power, ports, path, year, field(monogram())]
  const PAPER = new THREE.Color(0xefece5)
  const scene = new THREE.Scene()
  scene.background = PAPER
  const fog = scene.fog = new THREE.FogExp2(PAPER, 1)
  const camera = new THREE.PerspectiveCamera(32, 1, 1, 5000)
  const sun = new THREE.DirectionalLight(0xfff6ea, 2.6)
  sun.castShadow = true; sun.shadow.mapSize.setScalar(4096); sun.shadow.bias = -0.0004; sun.shadow.normalBias = .06
  scene.add(sun, sun.target, new THREE.HemisphereLight(0xffffff, 0xcfc4b2, 2.1))
  const SUN_DIR = V(-.5, 1, .45).normalize()

  // the floor is nothing but the shadows that fall on it, so it can never show a seam against the background
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8000, 8000), new THREE.ShadowMaterial({ opacity: .22 }))
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true
  scene.add(floor)

  // ---------- the cubes: a standard lit material with the morph spliced into its vertex stage ----------
  const U = {
    uT: { value: 0 }, uTime: { value: 0 }, uWave: { value: new THREE.Vector2() }, uScan: { value: new THREE.Vector2() },
    uRo: { value: V(0, 0, 0) }, uRd: { value: V(0, -1, 0) }, uHover: { value: 0 }, uRad: { value: 1 },
    uPal: { value: [new THREE.Color(0x1d1e22), new THREE.Color(0xff4a12), new THREE.Color(0xc9c2b3)] },
  }
  const head = `attribute vec4 aA, aB; attribute float aCa, aCb, aSeed;
    uniform float uT, uTime, uHover, uRad; uniform vec2 uWave, uScan; uniform vec3 uRo, uRd, uPal[3]; varying vec3 vCol;`
  const move = `
    float tt = clamp(uT * 1.5 - aSeed * .5, 0., 1.); tt = tt * tt * (3. - 2. * tt); // staggered, so a chart pours rather than snaps
    vec4 Q = mix(aA, aB, tt);
    Q.y += sin(tt * 3.14159) * (4. + aSeed * 12.);                                    // each cube flies an arc to its new place
    Q.y += mix(uWave.x, uWave.y, tt) * (sin(Q.x * .045 + uTime * .7) + sin(Q.z * .06 - uTime * .5) + sin((Q.x + Q.z) * .021 + uTime * .3)) * 2.4;
    vec3 col = mix(uPal[int(aCa)], uPal[int(aCb)], tt);
    float sc = mix(uScan.x, uScan.y, tt) * smoothstep(9., 0., abs(Q.y - mod(uTime * 45., 330.) + 30.)); // the port scan, sweeping up the wall
    col = mix(col, uPal[2], sc * .85); Q.z += sc * 2.;
    vec3 q = Q.xyz - uRo; float dr = length(q - uRd * dot(q, uRd));                     // distance to the pointer's ray
    float hv = uHover * exp(-dr * dr / (uRad * uRad));
    Q.w *= 1. + hv * .9; col = mix(col, uPal[1], min(1., hv * 1.4));
    vCol = col;
    vec3 transformed = position * Q.w + Q.xyz;`
  const splice = (s: { vertexShader: string; fragmentShader: string; uniforms: Record<string, THREE.IUniform> }) => {
    Object.assign(s.uniforms, U)
    s.vertexShader = s.vertexShader.replace('#include <common>', head + '\n#include <common>').replace('#include <begin_vertex>', move)
    s.fragmentShader = s.fragmentShader.replace('#include <common>', 'varying vec3 vCol;\n#include <common>').replace('vec4 diffuseColor = vec4( diffuse, opacity );', 'vec4 diffuseColor = vec4( vCol, opacity );')
  }
  const box = new THREE.BoxGeometry(1, 1, 1), geo = new THREE.InstancedBufferGeometry()
  geo.setIndex(box.index); geo.setAttribute('position', box.getAttribute('position')); geo.setAttribute('normal', box.getAttribute('normal'))
  geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(Float32Array.from({ length: N }, rnd), 1))
  geo.instanceCount = N
  const mat = new THREE.MeshStandardMaterial({ roughness: .62, metalness: 0 }); mat.onBeforeCompile = splice
  const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking }); depth.onBeforeCompile = splice
  const cubes = new THREE.Mesh(geo, mat)
  cubes.customDepthMaterial = depth; cubes.castShadow = cubes.receiveShadow = true; cubes.frustumCulled = false
  scene.add(cubes)

  // ---------- post: a tilt-shift lens, which is what makes a field of cubes read as a miniature ----------
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: mobile ? 0 : 4 }))
  composer.addPass(new RenderPass(scene, camera))
  const lens = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, uBlur: { value: 0 }, uPx: { value: new THREE.Vector2() }, uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader: `uniform sampler2D tDiffuse; uniform float uBlur, uTime; uniform vec2 uPx; varying vec2 vUv;
      void main(){
        float r = uBlur * smoothstep(.24, .5, abs(vUv.y - .5));
        vec3 c = vec3(0.);
        for (int i = 0; i < 16; i++){ float a = float(i) * 2.39996, q = sqrt((float(i) + .5) / 16.); c += texture2D(tDiffuse, vUv + vec2(cos(a), sin(a)) * q * r * uPx).rgb; }
        c /= 16.;
        c += (fract(sin(dot(vUv * 913. + uTime, vec2(12.9898, 78.233))) * 43758.5453) - .5) * .012;
        gl_FragColor = vec4(c, 1.);
      }`,
  })
  composer.addPass(lens); composer.addPass(new OutputPass())

  let W = 1, H = 1, aspect = 1, cap = mobile ? 1.5 : 2, cur = -1
  const target = V(0, 0, 0), tmp = V(0, 0, 0), ray = new THREE.Raycaster(), ndc = new THREE.Vector2()
  /** maxRatio lowers the pixel-ratio cap, for GPUs that can't hold the frame rate */
  function resize(maxRatio = cap) {
    cap = maxRatio; W = innerWidth; H = innerHeight; aspect = W / H
    const pr = Math.min(devicePixelRatio, cap)
    renderer.setPixelRatio(pr); renderer.setSize(W, H, false)
    composer.setPixelRatio(pr); composer.setSize(W, H)
    lens.uniforms.uPx.value.set(1 / W, 1 / H)
  }
  resize()

  /** p: chapter position 0..7, t: seconds, mx/my: pointer in -1..1, hover: whether a mouse is over the page */
  function frame(p: number, t: number, mx: number, my: number, hover: boolean) {
    const i = Math.min(Math.floor(p), K.length - 2), a = K[i], b = K[i + 1], f = sstep(.12, .88, p - i)
    if (i !== cur) { // re-point the morph at this pair of charts
      cur = i
      geo.setAttribute('aA', L[i].a); geo.setAttribute('aB', L[i + 1].a); geo.setAttribute('aCa', L[i].c); geo.setAttribute('aCb', L[i + 1].c)
      U.uWave.value.set(L[i].wave, L[i + 1].wave); U.uScan.value.set(L[i].scan, L[i + 1].scan)
    }
    U.uT.value = f; U.uTime.value = t
    const wide = Math.max(1, 1.25 / aspect), dist = lerp(a.d, b.d, f) * wide // portrait screens stand further back
    target.lerpVectors(a.t, b.t, f)
    const az = (lerp(a.az, b.az, f) + mx * 4 + Math.sin(t * .2) * 1.5) * Math.PI / 180, el = Math.max(.03, (lerp(a.el, b.el, f) - my * 2) * Math.PI / 180)
    camera.position.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(dist).add(target)
    camera.lookAt(target)
    camera.near = dist * .05; camera.far = dist * 20; camera.aspect = aspect
    // text sits left on wide screens and below on tall ones, so push the subject the other way
    if (aspect > 1.1) camera.setViewOffset(W, H, -W * .2, 0, W, H); else camera.setViewOffset(W, H, 0, H * .2, W, H)
    fog.density = .3 / dist

    sun.position.copy(target).addScaledVector(SUN_DIR, dist * 3); sun.target.position.copy(target)
    const sc = sun.shadow.camera, s = dist * 1.15
    sc.left = sc.bottom = -s; sc.right = sc.top = s; sc.near = dist * .5; sc.far = dist * 7; sc.updateProjectionMatrix()

    ray.setFromCamera(ndc.set(mx, -my), camera)
    U.uRo.value.copy(ray.ray.origin); U.uRd.value.copy(ray.ray.direction); U.uHover.value = hover ? 1 : 0; U.uRad.value = dist * .028
    lens.uniforms.uBlur.value = mobile ? 4 : 7; lens.uniforms.uTime.value = t % 10
    composer.render()
  }

  return {
    frame, resize,
    /** world point to CSS pixels, or null when it is behind the camera or off screen */
    toScreen(v: THREE.Vector3): [number, number] | null {
      tmp.copy(v).project(camera)
      return tmp.z > 1 || Math.abs(tmp.x) > 1 || Math.abs(tmp.y) > 1 ? null : [(tmp.x * .5 + .5) * W, (-tmp.y * .5 + .5) * H]
    },
  }
}
