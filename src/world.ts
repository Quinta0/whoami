// One procedural world, metres, y up. The hero solder joint sits at the origin so the
// smallest things get the best float precision; everything else is built outwards from it.
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import contrib from './contrib.json'

const mm = 1e-3
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const sstep = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
// seeded so the board looks the same on every visit
let seed = 0x2001
const rnd = () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 }

// ---------- the year: contribution calendar laid out as a field of columns ----------
const WEEKS = contrib.weeks, NW = WEEKS.length, TODAY = WEEKS[NW - 1].length - 1
const PITCH = 600, CELL = 520, YZ = -60
const cellX = (w: number) => (w - (NW - 1)) * PITCH, cellZ = (d: number) => (d - TODAY) * PITCH + YZ
const MAXC = Math.max(...WEEKS.flat())
const colH = (c: number) => c ? 150 + Math.sqrt(c / MAXC) * 3400 : 24
let best = { w: 0, d: 0, c: 0 }
WEEKS.forEach((wk, w) => wk.forEach((c, d) => { if (c > best.c) best = { w, d, c } }))
const YEAR_C = V(cellX(0) * .36, 0, cellZ(3))

// ---------- camera keyframes, one per chapter. off = how far the subject is pushed aside for the text ----------
const K = [
  { t: V(0, 0.15 * mm, 0), d: 0.0036, az: 58, el: 15, blur: 1, off: 1, oy: 0, wide: 0 },            // joint
  { t: V(-4.5 * mm, 0, 0), d: 0.034, az: 38, el: 44, blur: .6, off: 1, oy: 0, wide: 0 },            // chip
  { t: V(-0.05, 0.02, 0), d: 0.6, az: 72, el: 50, blur: .16, off: 1, oy: 0, wide: 0 },              // board
  { t: V(-0.42, -0.1, 0.02), d: 4.5, az: 63, el: 12, blur: .06, off: 1, oy: 0, wide: 0 },           // rack
  { t: V(15, 0, -50), d: 470, az: 28, el: 36, blur: .2, off: .8, oy: 0, wide: .5 },                 // network
  { t: YEAR_C, d: 40000, az: 10, el: 38, blur: .3, off: .5, oy: 0, wide: 1 },                       // year
  { t: V(-5200, 0, cellZ(3)), d: 12500, az: 76, el: 13, blur: .35, off: 0, oy: .24, wide: 0 },      // contact: looking back down the year from today
]

export const callouts: { ch: number; p: THREE.Vector3; text: string }[] = [
  { ch: 0, p: V(0, 0.16 * mm, 0), text: 'pin 41 · 0.22 mm of tin' },
  { ch: 1, p: V(-5.8 * mm, 1.6 * mm, -2.5 * mm), text: 'U1 · USB HID controller' },
  { ch: 1, p: V(-9.5 * mm, 0, 8.2 * mm), text: 'HID reports, 1000 per second' },
  { ch: 2, p: V(-0.115, 0.152, -0.04), text: 'PL1 / PL2 capped · C-states on' },
  { ch: 2, p: V(-0.06, 0.034, 0.02), text: '48 GB DDR5' },
  { ch: 2, p: V(-0.13, 0.07, 0.045), text: '10 GbE' },
  { ch: 3, p: V(0.3, 0.17, 0.02), text: 'out on its rails, lid off' },
  { ch: 3, p: V(-0.12, -0.68, 0.02), text: 'nine bays · ZFS RAID 10' },
  { ch: 3, p: V(-0.07, 0.3, -0.1), text: 'every run dressed and labelled' },
  { ch: 4, p: V(-20, 10, 45), text: '0 open WAN ports' },
  { ch: 4, p: V(95, 14, 20), text: 'tunnel edge · SSO + 2FA' },
  { ch: 4, p: V(60, 30, -190), text: '14,000 players, each one a dot' },
  { ch: 4, p: V(-150, 26, 90), text: 'offsite snapshots' },
  { ch: 5, p: V(0, 0, YZ), text: 'you are here · everything so far' },
  { ch: 5, p: V(cellX(best.w), colH(best.c), cellZ(best.d)), text: `busiest day · ${best.c} contributions` },
]

// ---------- small builders ----------
type Box = [cx: number, y0: number, cz: number, sx: number, sy: number, sz: number, ry?: number, color?: number]
const unitBox = new THREE.BoxGeometry(1, 1, 1)
const M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), EU = new THREE.Euler(), COL = new THREE.Color()
function boxes(parent: THREE.Object3D, mat: THREE.Material, list: Box[], geo: THREE.BufferGeometry = unitBox, shadow = true) {
  const m = new THREE.InstancedMesh(geo, mat, list.length)
  list.forEach(([x, y, z, sx, sy, sz, ry = 0, c], i) => {
    m.setMatrixAt(i, M4.compose(V(x, y + sy / 2, z), Q.setFromEuler(EU.set(0, ry, 0)), V(sx, sy, sz)))
    if (c !== undefined) m.setColorAt(i, COL.set(c))
  })
  m.castShadow = m.receiveShadow = shadow
  m.frustumCulled = false // instances span far more than the unit box three would cull by
  parent.add(m)
  return m
}
const std = (color: number, metalness: number, roughness: number) => new THREE.MeshStandardMaterial({ color, metalness, roughness })

type Path = { pts: [number, number][]; w: number }
// flat ribbons with a distance-along-path attribute, so one shader can run light pulses down them.
// used twice: copper traces at chip scale, network links at WAN scale. Same pattern, six orders apart.
function ribbons(paths: Path[], y: number, wave: number, base: number, pulse: number, gain: number) {
  const pos: number[] = [], au: number[] = [], as: number[] = []
  for (const { pts, w } of paths) {
    let d = 0; const s = rnd()
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1], dx = bx - ax, dz = bz - az, l = Math.hypot(dx, dz)
      if (l < 1e-9) continue
      const ex = dx / l * w / 2, ez = dz / l * w / 2 // overshoot by half a width so corners close
      const v = [[ax - ex - ez, az - ez + ex, d], [ax - ex + ez, az - ez - ex, d], [bx + ex - ez, bz + ez + ex, d + l], [bx + ex + ez, bz + ez - ex, d + l]]
      for (const k of [0, 1, 2, 2, 1, 3]) { pos.push(v[k][0], y, v[k][1]); au.push(v[k][2]); as.push(s) }
      d += l
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('aU', new THREE.Float32BufferAttribute(au, 1))
  g.setAttribute('aSeed', new THREE.Float32BufferAttribute(as, 1))
  const mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 }, uFade: { value: 1 }, uWave: { value: wave }, uGain: { value: gain }, uBase: { value: new THREE.Color(base) }, uPulse: { value: new THREE.Color(pulse) } },
    vertexShader: `attribute float aU, aSeed; varying float vU, vS;
      void main(){ vU = aU; vS = aSeed; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
    fragmentShader: `uniform float uTime, uFade, uWave, uGain; uniform vec3 uBase, uPulse; varying float vU, vS;
      void main(){
        float ph = fract(vU / uWave - uTime * (.22 + .3 * fract(vS * 7.3)) + vS * 9.);
        float p = smoothstep(.9, 1., ph) + .18 * smoothstep(.45, 1., ph);
        p *= step(.35, fract(vS * 13.7)); // a third of the lines stay quiet
        gl_FragColor = vec4((uBase + uPulse * p * uGain) * uFade, 1.);
      }`,
  })
  const mesh = new THREE.Mesh(g, mat)
  mesh.frustumCulled = false
  return mesh
}
// parallel copy of a polyline, mitred, for buses
const offsetPath = (pts: [number, number][], o: number): [number, number][] => pts.map((p, i) => {
  const n = (a: [number, number], b: [number, number]) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]); return [-(b[1] - a[1]) / l, (b[0] - a[0]) / l] }
  const n1 = n(pts[Math.max(i - 1, 0)], pts[Math.max(i, 1)]), n2 = n(pts[Math.min(i, pts.length - 2)], pts[Math.min(i + 1, pts.length - 1)])
  const k = o / (1 + n1[0] * n2[0] + n1[1] * n2[1])
  return [p[0] + (n1[0] + n2[0]) * k, p[1] + (n1[1] + n2[1]) * k]
})
// PCB-style route: straight, then one 45° leg
const route = (a: [number, number], b: [number, number]): [number, number][] => {
  const dx = b[0] - a[0], dz = b[1] - a[1], ax = Math.abs(dx), az = Math.abs(dz)
  return ax > az ? [a, [a[0] + Math.sign(dx) * (ax - az), a[1]], b] : [a, [a[0], a[1] + Math.sign(dz) * (az - ax)], b]
}
function textTexture(size: number, draw: (c: CanvasRenderingContext2D, s: number) => void) {
  const cv = document.createElement('canvas'); cv.width = cv.height = size
  draw(cv.getContext('2d')!, size)
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8
  return t
}

export function createWorld(canvas: HTMLCanvasElement) {
  let renderer: THREE.WebGLRenderer
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' }) } catch { return null }
  const mobile = matchMedia('(pointer: coarse)').matches || innerWidth < 760
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true

  const scene = new THREE.Scene()
  const BG = new THREE.Color(0x06070a)
  scene.background = BG
  const fog = scene.fog = new THREE.FogExp2(BG, 1)
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 0.8
  const camera = new THREE.PerspectiveCamera(35, 1, 0.001, 10)

  const sun = new THREE.DirectionalLight(0xfff1e0, 3.2)
  sun.castShadow = true
  sun.shadow.mapSize.setScalar(mobile ? 1024 : 2048)
  sun.shadow.bias = -0.0004
  scene.add(sun, sun.target, new THREE.HemisphereLight(0x9db4ff, 0x2a1a10, 0.9))
  const SUN_DIR = V(0.45, 1, 0.55).normalize()
  // the heat of the fresh joint. inverse-square, so it simply stops mattering once the camera pulls away
  const heatLight = new THREE.PointLight(0xff7a1a, 0, 0, 2)
  heatLight.position.set(0.5 * mm, 0.9 * mm, 0.4 * mm)
  scene.add(heatLight)

  // ---------- materials ----------
  const pcb = std(0x101820, 0.2, 0.3), plastic = std(0x1b1d22, 0.05, 0.45), alu = std(0x9a9ea6, 1, 0.42), darkAlu = std(0x6a707b, 1, 0.36), anod = std(0xe0621a, 1, 0.38)
  const steel = std(0x4a4f58, 0.55, 0.5), panel = std(0x2b2e35, 0.5, 0.42), copper = std(0xc46a2a, 1, 0.28), gold = std(0xd9ac4e, 1, 0.3)
  const tin = std(0xaeb2b8, 1, 0.38), tint = std(0xffffff, 0.1, 0.55)
  const led = new THREE.MeshBasicMaterial({ toneMapped: false })

  // ---------- micro: the chip, its 64 joints, the traces fanning out ----------
  const micro = new THREE.Group(); scene.add(micro)
  const CX = -5.8 * mm, CZ = -0.25 * mm // puts lead 8 of the +x side exactly on the origin
  const shoulders: Box[] = [], pads: Box[] = [], fillets: Box[] = [], vias: Box[] = [], tracePaths: Path[] = []
  for (let s = 0; s < 4; s++) for (let k = 0; k < 16; k++) {
    const a = s * Math.PI / 2, t = (k - 7.5) * 0.5 * mm, ca = Math.cos(a), sa = Math.sin(a)
    const at = (o: number, l = t): [number, number] => [CX + o * ca + l * sa, CZ - o * sa + l * ca]
    const put = (list: Box[], o: number, y0: number, so: number, sy: number, sl: number) => { const [x, z] = at(o); list.push([x, y0, z, so, sy, sl, a]) }
    put(shoulders, 5.25 * mm, 0.7 * mm, 0.5 * mm, 0.1 * mm, 0.22 * mm)
    put(shoulders, 5.5 * mm, 0.1 * mm, 0.1 * mm, 0.7 * mm, 0.22 * mm)
    put(shoulders, 5.8 * mm, 0.02 * mm, 0.6 * mm, 0.1 * mm, 0.22 * mm)
    put(pads, 5.9 * mm, 0, 1.1 * mm, 0.02 * mm, 0.3 * mm)
    if (s || k !== 8) put(fillets, 5.84 * mm, -0.045 * mm, 0.95 * mm, 0.15 * mm, 0.36 * mm)
    // fan-out: outer leads jog further sideways, so nothing crosses
    const e = k - 7.5, l1 = (0.5 + (7.5 - Math.abs(e)) * 0.33) * mm, jog = e * 0.42 * mm, l3 = (1.5 + rnd() * 7) * mm
    const o0 = 6.45 * mm, o1 = o0 + l1, o2 = o1 + Math.abs(jog), o3 = o2 + l3
    tracePaths.push({ pts: [at(o0), at(o1), at(o2, t + jog), at(o3, t + jog)], w: 0.13 * mm })
    const [vx, vz] = at(o3, t + jog); vias.push([vx, 0, vz, 0.42 * mm, 0.025 * mm, 0.42 * mm])
  }
  boxes(micro, tin, shoulders)
  boxes(micro, gold, pads)
  boxes(micro, tin, fillets, new THREE.SphereGeometry(0.5, 20, 12))
  boxes(micro, gold, vias, new THREE.CylinderGeometry(0.5, 0.5, 1, 14))
  const hero = new THREE.Mesh(new THREE.SphereGeometry(0.5, 40, 24), new THREE.MeshStandardMaterial({ color: 0x9a9da3, metalness: 1, roughness: 0.2, emissive: 0xff4a00 }))
  hero.scale.set(1.0 * mm, 0.17 * mm, 0.4 * mm); hero.position.set(0.04 * mm, 0.035 * mm, 0); hero.castShadow = true
  micro.add(hero)
  const body = new THREE.Mesh(new THREE.BoxGeometry(10 * mm, 1.3 * mm, 10 * mm), [plastic, plastic, new THREE.MeshStandardMaterial({
    roughness: 0.6, map: textTexture(512, (c, s) => {
      c.fillStyle = '#0f1013'; c.fillRect(0, 0, s, s)
      c.fillStyle = '#8d9096'; c.textAlign = 'center'; c.font = '600 74px ui-monospace, Menlo, monospace'
      c.fillText('PQ·2001', s / 2, 200); c.font = '44px ui-monospace, Menlo, monospace'
      c.fillText('HID-CTRL REV 6', s / 2, 276); c.fillText('TICINO · CH', s / 2, 338)
      c.beginPath(); c.arc(64, s - 64, 22, 0, 7); c.fill()
    }),
  }), plastic, plastic, plastic])
  body.position.set(CX, 0.75 * mm, CZ); body.castShadow = body.receiveShadow = true
  micro.add(body)
  const silk = new THREE.Mesh(new THREE.PlaneGeometry(30 * mm, 30 * mm), new THREE.MeshBasicMaterial({
    transparent: true, opacity: 0.55, depthWrite: false, map: textTexture(1024, (c, s) => {
      c.strokeStyle = c.fillStyle = '#e8e6df'; c.lineWidth = 3; const u = s / 30 // px per mm
      c.strokeRect(s / 2 - 7.2 * u, s / 2 - 7.2 * u, 14.4 * u, 14.4 * u)
      c.font = `${1.3 * u}px ui-monospace, Menlo, monospace`
      c.fillText('U1', s / 2 - 7 * u, s / 2 - 7.8 * u); c.fillText('TP3', s / 2 + 8.4 * u, s / 2 + 5 * u); c.fillText('PQ-HID REV 6', s / 2 + 1 * u, s / 2 + 9.2 * u)
      c.beginPath(); c.arc(s / 2 - 8.2 * u, s / 2 + 8.2 * u, 0.45 * u, 0, 7); c.fill()
    }),
  }))
  silk.rotation.x = -Math.PI / 2; silk.position.set(CX, 0.004 * mm, CZ)
  micro.add(silk)

  // buses across the board, in the same ribbon mesh as the chip fan-out
  const bus = (pts: [number, number][], n: number, pitch: number) => { for (let i = 0; i < n; i++) tracePaths.push({ pts: offsetPath(pts, (i - (n - 1) / 2) * pitch), w: 0.2 * mm }) }
  bus([[-0.018, -0.004], [-0.03, -0.004], [-0.04, -0.014], [-0.085, -0.014]], 14, 0.45 * mm)
  bus([[-0.0058, 0.012], [-0.0058, 0.03], [-0.02, 0.044], [-0.02, 0.052]], 10, 0.45 * mm)
  bus([[0.012, 0.004], [0.03, 0.004], [0.05, 0.024], [0.081, 0.024]], 8, 0.5 * mm)
  bus([[-0.0058, -0.014], [-0.0058, -0.05], [0.02, -0.076], [0.068, -0.076]], 12, 0.45 * mm)
  bus([[-0.09, 0.03], [-0.09, 0.05], [-0.1, 0.06], [-0.1, 0.12]], 16, 0.5 * mm)
  bus([[-0.04, 0.03], [-0.04, 0.08], [-0.06, 0.1], [-0.19, 0.1]], 9, 0.5 * mm)
  const traces = ribbons(tracePaths, 0.006 * mm, 5 * mm, 0x3a2510, 0xff7a1a, 5)
  micro.add(traces)

  // ---------- board: an ATX layout around the chip ----------
  const board = new THREE.Group(); scene.add(board)
  boxes(board, pcb, [[-0.06, -1.6 * mm, 0, 0.305, 1.6 * mm, 0.244]])
  const fins: Box[] = []; for (let i = 0; i < 44; i++) fins.push([-0.115, 0.04 + i * 0.0025, -0.04, 0.05, 0.0006, 0.12])
  boxes(board, alu, fins)
  boxes(board, copper, [[-0.115, 0.004, -0.04, 0.042, 0.014, 0.042], ...[-0.075, -0.052, -0.028, -0.005].map((z): Box => [-0.115, 0.018, z, 0.006, 0.134, 0.006])], new THREE.CylinderGeometry(0.5, 0.5, 1, 16))
  boxes(board, darkAlu, [
    [-0.115, 0, -0.04, 0.056, 0.005, 0.056], [-0.115, 0.15, -0.04, 0.052, 0.002, 0.122],     // socket frame, cooler top plate
    ...[0, 1, 2, 3].map((i): Box => [-0.048 - i * 0.009, 0.006, -0.04, 0.0052, 0.034, 0.133]), // DIMM spreaders
        [-0.13, 0.012, 0.062, 0.04, 0.04, 0.012],                                                // NIC heatsink
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((i): Box => [-0.157, 0, -0.082 + i * 0.012, 0.01, 0.01, 0.01]), // chokes
  ])
  boxes(board, anod, [[-0.176, 0, -0.04, 0.014, 0.028, 0.09], [0.045, 0, 0.055, 0.045, 0.008, 0.045]]) // VRM and chipset sinks
  boxes(board, plastic, [
    ...[0, 1, 2, 3].map((i): Box => [-0.048 - i * 0.009, 0, -0.04, 0.007, 0.007, 0.14]),    // DIMM slots
    ...[0.045, 0.07, 0.095].map((z): Box => [-0.145, 0, z, 0.09, 0.011, 0.008]),             // PCIe
    [0.075, 0, -0.085, 0.012, 0.014, 0.054], ...[0, 1, 2, 3].map((i): Box => [0.085, 0, 0.03 + i * 0.019, 0.009, 0.009, 0.016]), // 24-pin, SATA
    [-0.135, 0.011, 0.045, 0.13, 0.062, 0.0016], [-0.02, 0.003, 0.085, 0.08, 0.0012, 0.022], // NIC and M.2 boards
    ...[0, 1, 2].map((i): Box => [-0.04 + i * 0.02, 0.0042, 0.085, 0.012, 0.001, 0.014]),    // M.2 packages
    [0.03, 0, -0.03, 0.007, 0.0009, 0.007], [0.05, 0, -0.045, 0.005, 0.0009, 0.005], [-0.03, 0, 0.03, 0.006, 0.0009, 0.006], [0.02, 0, 0.1, 0.008, 0.001, 0.008],
  ])
  boxes(board, steel, [[-0.196, 0, -0.04, 0.032, 0.038, 0.14], [-0.2, 0, 0.045, 0.002, 0.12, 0.018]]) // rear I/O, NIC bracket
  const caps: Box[] = []
  for (let i = 0; i < 9; i++) caps.push([-0.143, 0, -0.092 + i * 0.013, 0.008, 0.011, 0.008])
  for (let i = 0; i < 6; i++) caps.push([-0.02 + i * 0.012, 0, -0.105, 0.0065, 0.009, 0.0065], [-0.19 + i * 0.011, 0, 0.115, 0.0065, 0.009, 0.0065])
  boxes(board, darkAlu, [...caps, [0.0, 0, 0.108, 0.02, 0.0032, 0.02, 0, 0xffffff]], new THREE.CylinderGeometry(0.5, 0.5, 1, 20))
  // SMD passives everywhere there isn't something bigger
  const keep: [number, number, number, number][] = [[-0.0185, -0.013, 0.0075, 0.0125], [-0.215, -0.115, -0.08, 0.03], [-0.21, 0.035, -0.06, 0.125], [0.06, -0.12, 0.095, 0.125], [0.02, 0.03, 0.07, 0.08], [-0.065, 0.07, 0.025, 0.12]]
  const smd: Box[] = []
  while (smd.length < 900) {
    const near = smd.length < 260, x = near ? CX + (rnd() - .5) * 0.06 : -0.2 + rnd() * 0.28, z = near ? CZ + (rnd() - .5) * 0.06 : -0.118 + rnd() * 0.236
    if (keep.some(([x0, z0, x1, z1]) => x > x0 && x < x1 && z > z0 && z < z1) || x < -0.21 || x > 0.09 || Math.abs(z) > 0.12) continue
    const big = rnd() > .7, l = (big ? 1.6 : 1) * mm, w = l / 2
    smd.push([x, 0, z, l, w * (big ? .9 : 1), w, rnd() > .5 ? 0 : Math.PI / 2, rnd() > .45 ? 0x8a6a3c : 0x17181b])
  }
  boxes(micro, tint, smd)

  // ---------- chassis: 4U, lid off, pulled out on its rails ----------
  const rack = new THREE.Group(); scene.add(rack)
  const leds: { x: number; y: number; z: number; c: THREE.Color; rate: number; ph: number }[] = []
  const addLed = (x: number, y: number, z: number, c = 0x35ff7a, rate = 0) => leds.push({ x, y, z, c: new THREE.Color(c), rate, ph: rnd() * 9 })
  const ZC = 0.0175, FY = -0.012
  const trays: Box[] = [], drives: Box[] = []
  for (let i = 0; i < 8; i++) {
    const z = -0.1575 + i * 0.05
    drives.push([0.288, FY + 0.004, z, 0.147, 0.1016, 0.026]); trays.push([0.368, FY + 0.002, z, 0.006, 0.112, 0.042])
    addLed(0.372, FY + 0.012, z + 0.012, 0x35ff7a, 2 + rnd() * 9); addLed(0.372, FY + 0.012, z + 0.004, 0x3aa0ff)
  }
  boxes(rack, steel, [
    [0.076, FY - 0.0012, ZC, 0.59, 0.0012, 0.455], [-0.2187, FY, ZC, 0.0012, 0.178, 0.455],                     // floor, rear
    [0.076, FY, ZC - 0.227, 0.59, 0.178, 0.0012], [0.076, FY, ZC + 0.227, 0.59, 0.178, 0.0012],                 // sides
    [-0.14, FY, 0.19, 0.15, 0.086, 0.1],                                                                        // PSU
    [-0.35, 0.07, ZC - 0.232, 1.3, 0.03, 0.006], [-0.35, 0.07, ZC + 0.232, 1.3, 0.03, 0.006],                   // rails
    ...[-0.12, ZC, 0.155].flatMap((z): Box[] => [[0.16, FY, z, 0.026, 0.004, 0.124], [0.16, FY + 0.12, z, 0.026, 0.004, 0.124], [0.16, FY, z - 0.06, 0.026, 0.124, 0.004], [0.16, FY, z + 0.06, 0.026, 0.124, 0.004]]),
  ])
  boxes(rack, alu, drives); boxes(rack, panel, trays)
  const fans = [-0.12, ZC, 0.155].map(z => {
    const f = new THREE.Group(); f.position.set(0.16, FY + 0.062, z)
    for (let i = 0; i < 7; i++) { const b = new THREE.Mesh(unitBox, plastic); b.scale.set(0.003, 0.046, 0.024); b.rotation.set(i * Math.PI * 2 / 7, 0.5, 0, 'XYZ'); b.translateY(0.033); f.add(b) }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.02, 20), plastic); hub.rotation.z = Math.PI / 2; f.add(hub)
    rack.add(f); return f
  })

  // ---------- rack: 42U around the chassis ----------
  const RX = -0.12, U = 0.04445, RY0 = -0.95, units: Box[] = [], faces: Box[] = [], bays: Box[] = [], cables: [number, number, number][] = []
  const kinds = 'ups ups store srv2 srv2 blank1 srv2 blank2 store . blank1 switch patch patch switch blank1 srv1 srv1 srv1 blank2 blank2 blank2 blank2'.split(' ')
  const size: Record<string, number> = { ups: 2, store: 4, srv2: 2, srv1: 1, blank1: 1, blank2: 2, switch: 1, patch: 1, '.': 4 }
  let row = 0
  for (const kind of kinds) {
    const n = size[kind], y = RY0 + row * U, h = n * U; row += n
    if (kind === '.') continue // our chassis lives here
    units.push([RX - 0.353, y + 0.002, ZC, 0.7, h - 0.004, 0.44]); faces.push([RX - 0.0015, y + 0.001, ZC, 0.003, h - 0.002, 0.483])
    const fx = RX + 0.0015
    if (kind === 'store') for (let i = 0; i < 9; i++) { const z = ZC + (i % 3 - 1) * 0.142, by = y + 0.006 + Math.floor(i / 3) * 0.056; bays.push([fx, by, z, 0.004, 0.05, 0.134]); addLed(fx + 0.003, by + 0.006, z + 0.055, 0x35ff7a, 1 + rnd() * 6) }
    if (kind === 'srv2') { for (let i = 0; i < 8; i++) bays.push([fx, y + 0.006, ZC - 0.18 + i * 0.047, 0.004, 0.076, 0.042]); addLed(fx + 0.003, y + 0.07, ZC + 0.21, 0x3aa0ff); addLed(fx + 0.003, y + 0.06, ZC + 0.21, 0x35ff7a, 3 + rnd() * 5) }
    if (kind === 'srv1') { for (let i = 0; i < 4; i++) bays.push([fx, y + 0.006, ZC - 0.16 + i * 0.1, 0.004, 0.03, 0.094]); addLed(fx + 0.003, y + 0.02, ZC + 0.21, 0x35ff7a, 2 + rnd() * 5) }
    if (kind === 'ups') { addLed(fx + 0.002, y + 0.03, ZC - 0.1, 0x2fd6c8); addLed(fx + 0.002, y + 0.03, ZC - 0.12, 0x2fd6c8); addLed(fx + 0.002, y + 0.03, ZC + 0.15, 0x35ff7a) }
    if (kind === 'switch' || kind === 'patch') {
      bays.push([fx, y + 0.012, ZC - 0.03, 0.003, 0.02, 0.36])
      for (let i = 0; i < 24; i++) { const z = ZC - 0.2 + i * 0.0145; if (kind === 'switch') addLed(fx + 0.003, y + 0.035, z, rnd() > .25 ? 0x35ff7a : 0xffb020, 4 + rnd() * 20); cables.push([y + 0.022, z, kind === 'patch' ? 1 : 0]) }
    }
  }
  boxes(rack, steel, [
    ...units,
    ...[RX - 0.02, RX - 0.98].flatMap((x): Box[] => [[x, -1, ZC - 0.28, 0.045, 2, 0.045], [x, -1, ZC + 0.28, 0.045, 2, 0.045]]),
    [RX - 0.5, -1.04, ZC, 1, 0.04, 0.605], [RX - 0.5, 1, ZC, 1, 0.04, 0.605],
    [RX - 0.5, -1, ZC - 0.302, 1, 2, 0.004], [RX - 0.5, -1, ZC + 0.302, 1, 2, 0.004],
  ])
  boxes(rack, panel, faces); boxes(rack, plastic, bays)
  // patch leads: each patch port to the switch port above or below it, dressed in a neat bow
  const sw = cables.filter(c => !c[2]), pt = cables.filter(c => c[2])
  pt.forEach(([py, pz], i) => {
    if (i % 24 > 19) return
    const [sy, sz] = sw[i], bow = 0.035 + (i % 4) * 0.006
    const curve = new THREE.CatmullRomCurve3([V(RX + 0.004, py, pz), V(RX + bow, lerp(py, sy, .25), pz), V(RX + bow, lerp(py, sy, .75), sz), V(RX + 0.004, sy, sz)])
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 14, 0.0022, 5), std([0xff7a1a, 0x2f6fd0, 0xc9ccd2][i % 3], 0, 0.6))
    m.castShadow = true; rack.add(m)
  })
  const ledMesh = boxes(rack, led, leds.map((l): Box => [l.x, l.y, l.z, 0.003, 0.0045, 0.0045, 0, 0xffffff]), unitBox, false)

  // ---------- ground: a CAD grid that re-rules itself every power of ten ----------
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(4e5, 4e5), new THREE.ShaderMaterial({
    uniforms: { uD: { value: 1 }, uT: { value: V(0, 0, 0) }, uBg: { value: BG } },
    vertexShader: `varying vec3 vW; void main(){ vW = (modelMatrix * vec4(position, 1.)).xyz; gl_Position = projectionMatrix * viewMatrix * vec4(vW, 1.); }`,
    fragmentShader: `uniform float uD; uniform vec3 uT, uBg; varying vec3 vW;
      // lines closer than a couple of pixels fade out instead of turning to moire
      float grid(vec2 p){ vec2 w = fwidth(p), g = abs(fract(p - .5) - .5) / w; return (1. - min(min(g.x, g.y), 1.)) * (1. - min(max(w.x, w.y) * 3., 1.)); }
      void main(){
        float l = log(uD) / 2.302585, f = fract(l), s = pow(10., floor(l) - 1.);
        float g = grid(vW.xz / s) * (1. - f) * .5 + grid(vW.xz / (s * 10.)) * (.5 + .5 * f);
        float fall = exp(-length(vW.xz - uT.xz) / (uD * 1.6));
        vec2 q = vW.xz - vec2(-.62, .02);
        float contact = 1. - .75 * exp(-dot(q, q) / .45);
        gl_FragColor = vec4(uBg + (vec3(.014, .017, .024) + vec3(.2, .26, .36) * g * .45) * fall * contact, 1.);
      }`,
  }))
  ground.rotation.x = -Math.PI / 2; ground.position.y = -1.06
  scene.add(ground)

  // ---------- network: the rack becomes one node ----------
  const net = new THREE.Group(); scene.add(net)
  const GY = -1.0, glow = (c: number, o = 1) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  const servers: [number, number][] = [[0, 0], [-32, 20], [-14, -36], [-44, -18]], edge: [number, number] = [95, 20], offsite: [number, number] = [-150, 90], game: [number, number] = [60, -190]
  const users: [number, number][] = Array.from({ length: 12 }, (_, i) => { const a = -1.15 + i * 0.21, r = 62 + (i % 3) * 16; return [edge[0] + Math.cos(a) * r, edge[1] + Math.sin(a) * r] })
  boxes(net, std(0x9fb4d8, 0.6, 0.3), servers.slice(1).map(([x, z]): Box => [x, GY, z, 3.5, 11, 3.5]), unitBox, false)
  boxes(net, glow(0x6fa8ff, .55), [...servers.slice(1).map(([x, z]): Box => [x, GY, z, .5, 34, .5]), [offsite[0], GY, offsite[1], .6, 26, .6], ...users.map(([x, z]): Box => [x, GY, z, .35, 7, .35])], unitBox, false)
  boxes(net, glow(0xff7a1a, .7), [[0, GY, 0, .7, 60, .7], [edge[0], GY, edge[1], .6, 30, .6], [game[0], GY, game[1], .8, 44, .8]], unitBox, false)
  boxes(net, std(0xdfe6f2, 0.2, 0.4), users.map(([x, z]): Box => [x, GY, z, 2.4, 2.4, 2.4]), new THREE.SphereGeometry(0.5, 12, 8), false)
  const edgeMesh = new THREE.Mesh(new THREE.OctahedronGeometry(7), new THREE.MeshStandardMaterial({ color: 0xff7a1a, emissive: 0xff5a0a, emissiveIntensity: .8, metalness: .4, roughness: .3, flatShading: true }))
  edgeMesh.position.set(edge[0], 12, edge[1]); net.add(edgeMesh)
  const links = ribbons([
    ...users.map(u => ({ pts: route(u, edge), w: .5 })),
    ...servers.map(s => ({ pts: route(edge, s), w: .9 })),
    ...servers.flatMap((a, i) => servers.slice(i + 1).map(b => ({ pts: route(a, b), w: .5 }))),
    { pts: route(servers[3], offsite), w: .7 },
  ], GY + .05, 46, 0x16263f, 0x7ab8ff, 4)
  net.add(links)
  // the perimeter: a fence with no gate. traffic only gets in through the tunnel edge
  const fence = new THREE.Mesh(new THREE.CylinderGeometry(52, 52, 12, 96, 1, true), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uFade: { value: 1 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
    fragmentShader: `uniform float uTime, uFade; varying vec2 vUv;
      void main(){
        float rim = smoothstep(.95, 1., vUv.y) * (.6 + .4 * step(.5, fract(vUv.x * 60. - uTime * .15)));
        float bars = step(.82, fract(vUv.x * 240.)) * (1. - vUv.y) * .35;
        gl_FragColor = vec4(vec3(.3, .62, 1.) * (rim * 1.6 + bars + pow(1. - vUv.y, 3.) * .3) * uFade, 1.);
      }`,
  }))
  fence.position.set(-22, GY + 6, -9); net.add(fence)
  // 14,000 players: exactly that many points, spiralling into one game server
  const NP = 14000, sw4 = new Float32Array(NP * 4)
  for (let i = 0; i < NP; i++) sw4.set([rnd(), rnd() * 6.2832, rnd(), .5 + rnd()], i * 4)
  const swarmGeo = new THREE.BufferGeometry()
  swarmGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NP * 3), 3))
  swarmGeo.setAttribute('aS', new THREE.BufferAttribute(sw4, 4))
  const swarm = new THREE.Points(swarmGeo, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uFade: { value: 1 }, uPx: { value: 1 }, uC: { value: V(game[0], GY, game[1]) } },
    vertexShader: `attribute vec4 aS; uniform float uTime, uPx; uniform vec3 uC; varying float vA;
      void main(){
        float life = fract(aS.x + uTime * .018 * aS.w), r = mix(92., 5., life * life);
        float th = aS.y + life * 7. + uTime * .04;
        vec4 mv = viewMatrix * vec4(uC + vec3(cos(th) * r, 1. + aS.z * 34. * (1. - life) * (1. - life), sin(th) * r), 1.);
        gl_Position = projectionMatrix * mv;
        float px = uPx * 1.1 / -mv.z; gl_PointSize = max(1.6, px);
        vA = smoothstep(0., .08, life) * (1. - smoothstep(.8, 1., life)) * (.3 + .5 * aS.z) * min(1., px * px / 2.56);
      }`,
    fragmentShader: `uniform float uFade; varying float vA;
      void main(){ float d = length(gl_PointCoord - .5); gl_FragColor = vec4(vec3(1., .52, .16) * vA * uFade * (1. - smoothstep(.1, .5, d)), 1.); }`,
  }))
  swarm.frustumCulled = false; net.add(swarm)

  // ---------- year: 53 weeks of contributions. the world above is one square of it ----------
  const year = new THREE.Group(); scene.add(year)
  const cols: Box[] = [], lo = new THREE.Color(0x4a2a12), hi = new THREE.Color(0xff7a1a)
  WEEKS.forEach((wk, w) => wk.forEach((c, d) => {
    if (w === NW - 1 && d === TODAY) return
    cols.push([cellX(w), -1.06, cellZ(d), CELL, colH(c), CELL, 0, c ? COL.copy(lo).lerp(hi, Math.sqrt(c / MAXC)).getHex() : 0x161a21])
  }))
  const colMat = std(0xffffff, 0.1, 0.5)
  colMat.onBeforeCompile = s => { s.fragmentShader = s.fragmentShader.replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n totalEmissiveRadiance += vColor.rgb * step(.05, vColor.r - vColor.b) * .55;') }
  boxes(year, colMat, cols)
  const hx = CELL / 2, here: [number, number][] = [[-hx, YZ - hx], [hx, YZ - hx], [hx, YZ + hx], [-hx, YZ + hx], [-hx, YZ - hx]]
  const hereMesh = ribbons([{ pts: here, w: 22 }], 0, 1, 0xff7a1a, 0, 0); hereMesh.position.y = -0.8
  scene.add(hereMesh)

  // ---------- post: bloom, then a lens (tilt-shift blur, vignette, grain) ----------
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: mobile ? 0 : 4 }))
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.45, 0.55, 1)
  composer.addPass(bloom)
  const lens = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, uBlur: { value: 0 }, uFocus: { value: .5 }, uPx: { value: new THREE.Vector2() }, uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader: `uniform sampler2D tDiffuse; uniform float uBlur, uFocus, uTime; uniform vec2 uPx; varying vec2 vUv;
      void main(){
        float r = uBlur * smoothstep(.05, .5, abs(vUv.y - uFocus));
        vec3 c = vec3(0.);
        for (int i = 0; i < 16; i++){ float a = float(i) * 2.39996, q = sqrt((float(i) + .5) / 16.); c += texture2D(tDiffuse, vUv + vec2(cos(a), sin(a)) * q * r * uPx).rgb; }
        c /= 16.;
        vec2 v = vUv - .5; c *= 1. - dot(v, v) * .85;
        c += (fract(sin(dot(vUv * 913. + uTime, vec2(12.9898, 78.233))) * 43758.5453) - .5) * .018;
        gl_FragColor = vec4(c, 1.);
      }`,
  })
  composer.addPass(lens); composer.addPass(new OutputPass())

  let W = 1, H = 1, aspect = 1, dist = 1, cap = mobile ? 1.5 : 2
  const target = V(0, 0, 0), tmp = V(0, 0, 0)
  /** maxRatio lowers the pixel-ratio cap, for GPUs that can't hold the frame rate */
  function resize(maxRatio = cap) {
    cap = maxRatio; W = innerWidth; H = innerHeight; aspect = W / H
    const pr = Math.min(devicePixelRatio, cap)
    renderer.setPixelRatio(pr); renderer.setSize(W, H, false)
    composer.setPixelRatio(pr); composer.setSize(W, H)
    lens.uniforms.uPx.value.set(1 / W, 1 / H)
    swarm.material.uniforms.uPx.value = H * pr / (2 * Math.tan(camera.fov * Math.PI / 360))
  }
  resize()

  /** p: chapter position 0..6, t: seconds, mx/my: pointer in -1..1 */
  function frame(p: number, t: number, mx: number, my: number) {
    const i = Math.min(Math.floor(p), K.length - 2), a = K[i], b = K[i + 1], f = sstep(.1, .9, p - i)
    const portrait = Math.max(1, 1.5 / aspect), da = a.d * lerp(1, portrait, a.wide), db = b.d * lerp(1, portrait, b.wide)
    dist = Math.exp(lerp(Math.log(da), Math.log(db), f))
    // move the target in step with distance, not with scroll, so the subject stays framed all the way out
    target.lerpVectors(a.t, b.t, da === db ? f : (dist - da) / (db - da))
    const az = (lerp(a.az, b.az, f) + mx * 5 + Math.sin(t * .23) * 1.6) * Math.PI / 180, el = Math.max(.05, (lerp(a.el, b.el, f) - my * 3) * Math.PI / 180)
    camera.position.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(dist).add(target)
    camera.lookAt(target)
    camera.near = dist * .02; camera.far = dist * 600; camera.aspect = aspect
    const off = lerp(a.off, b.off, f), oy = lerp(a.oy, b.oy, f), up = aspect > 1.1 ? -oy : .17 * off - oy
    camera.setViewOffset(W, H, aspect > 1.1 ? -W * .19 * off : 0, H * up, W, H)
    lens.uniforms.uFocus.value = .5 + up
    fog.density = .22 / dist

    sun.position.copy(target).addScaledVector(SUN_DIR, dist * 6); sun.target.position.copy(target)
    const sc = sun.shadow.camera, s = dist * 1.5
    sc.left = sc.bottom = -s; sc.right = sc.top = s; sc.near = dist; sc.far = dist * 12; sc.updateProjectionMatrix()
    sun.shadow.normalBias = dist * .003

    micro.visible = dist < 4; net.visible = dist > 6; hereMesh.visible = dist > 300
    const heat = .3 + .7 * Math.exp(-t * .45) // cools over the first few seconds, never quite to cold
    hero.material.emissiveIntensity = heat * 5; heatLight.intensity = heat * 4e-5
    traces.material.uniforms.uTime.value = t
    if (dist < 12) fans.forEach((fan, k) => fan.rotation.x = t * (9 + k))
    if (dist < 80) { leds.forEach((l, k) => ledMesh.setColorAt(k, COL.copy(l.c).multiplyScalar(l.rate && Math.sin(t * l.rate + l.ph) > .2 ? .15 : 2.2))); ledMesh.instanceColor!.needsUpdate = true }
    const nf = sstep(6, 60, dist)
    for (const m of [links, fence, swarm]) { m.material.uniforms.uTime.value = t; m.material.uniforms.uFade.value = nf }
    edgeMesh.rotation.y = t * .4
    year.visible = p > 4.2; year.scale.y = Math.max(1e-3, sstep(4.2, 5, p)) // never 0: a singular normal matrix gives NaN, and bloom spreads one NaN pixel over the whole frame
    const gu = ground.material.uniforms; gu.uD.value = dist; gu.uT.value.copy(target)
    lens.uniforms.uBlur.value = lerp(a.blur, b.blur, f) * (mobile ? 16 : 26); lens.uniforms.uTime.value = t % 10
    composer.render()
  }

  return {
    frame, resize,
    /** metres per CSS pixel at the focus plane, for the scale bar */
    mpp: () => 2 * dist * Math.tan(camera.fov * Math.PI / 360) / H,
    /** world point to CSS pixels, or null when it is behind the camera or off screen */
    toScreen(v: THREE.Vector3): [number, number] | null {
      tmp.copy(v).project(camera)
      return tmp.z > 1 || Math.abs(tmp.x) > 1 || Math.abs(tmp.y) > 1 ? null : [(tmp.x * .5 + .5) * W, (-tmp.y * .5 + .5) * H]
    },
    /** metres per week of the contribution grid */
    week: PITCH,
  }
}
export const contributions = contrib.total
