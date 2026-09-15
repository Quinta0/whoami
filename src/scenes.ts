import * as THREE from 'three'
import type { BuildFn } from './ThreeViewport'

const wireMat = new THREE.LineBasicMaterial({ color: 0x121212 })
const chassisMat = new THREE.MeshBasicMaterial({ color: 0xf7f6f2, transparent: true, opacity: 0.75 })
const darkPartMat = new THREE.MeshBasicMaterial({ color: 0x1c1b19 })
const swissRedMat = new THREE.MeshBasicMaterial({ color: 0xc1121f })
const copperMat = new THREE.MeshBasicMaterial({ color: 0xb9814f })
const tealDriveMat = new THREE.MeshBasicMaterial({ color: 0x1f8f86, transparent: true, opacity: 0.75 })

export const buildRackScene: BuildFn = (scene, camera) => {
  camera.position.set(4, 2.5, 4.5)
  const rack = new THREE.Group()
  rack.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.6, 2.8, 1.4)), wireMat))

  for (let i = 0; i < 4; i++) {
    const server = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.38, 1.25), chassisMat)
    server.position.set(0, -0.9 + i * 0.55, 0)
    server.add(new THREE.LineSegments(new THREE.EdgesGeometry(server.geometry), wireMat))

    for (let d = 0; d < 4; d++) {
      const drive = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.05), darkPartMat)
      drive.position.set(-0.45 + d * 0.3, 0, 0.63)
      server.add(drive)
    }

    const led = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.04), swissRedMat)
    led.position.set(0.6, 0.1, 0.64)
    server.add(led)
    rack.add(server)
  }

  scene.add(rack)
}

export const buildClusterScene: BuildFn = (scene, camera) => {
  camera.position.set(3.8, 3.5, 3.8)
  const cluster = new THREE.Group()

  const makeBoard = (x: number) => {
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 1.8), chassisMat)
    board.position.set(x, 0, 0)
    board.add(new THREE.LineSegments(new THREE.EdgesGeometry(board.geometry), wireMat))
    const cpu = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.45), darkPartMat)
    cpu.position.set(0, 0.06, -0.2)
    board.add(cpu)
    return board
  }

  const b1 = makeBoard(-0.9)
  const gpu = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 1.2), darkPartMat)
  gpu.position.set(0.5, 0.2, 0.1)
  b1.add(gpu)
  cluster.add(b1)

  const b2 = makeBoard(0.9)
  const hba = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 1), darkPartMat)
  hba.position.set(-0.5, 0.18, 0.1)
  b2.add(hba)
  cluster.add(b2)

  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.06), swissRedMat)
  bridge.position.set(0, 0.08, -0.2)
  cluster.add(bridge)

  scene.add(cluster)
}

function makeGrilleTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, 128, 128)
  ctx.fillStyle = '#3a3a3a'
  for (let x = 5; x < 128; x += 10) {
    for (let y = 5; y < 128; y += 10) ctx.fillRect(x - 1.5, y - 1.5, 3, 3)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 2)
  return tex
}

export const buildNasScene: BuildFn = (scene, camera, controls, renderer, container) => {
  camera.position.set(3.6, 2.6, 3.8)

  const nas = new THREE.Group()
  const W = 2.3, H = 2.4, D = 2.6
  const halfH = H / 2
  const stripY = 0.25
  const bayTopY = stripY - 0.15
  const bayHeight = bayTopY - (-halfH + 0.25)

  nas.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W, H, D)), wireMat))

  const grilleTex = makeGrilleTexture()
  const topMat = new THREE.MeshBasicMaterial({ map: grilleTex, transparent: true, opacity: 0.85 })
  const top = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, D - 0.12), topMat)
  top.rotation.x = -Math.PI / 2
  top.position.y = halfH - 0.05
  nas.add(top)

  const strip = new THREE.Group()
  strip.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W, 0.26, 0.08)), new THREE.LineBasicMaterial({ color: 0xb9814f })))
  const stripFace = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.04, 0.22), copperMat)
  stripFace.position.z = 0.045
  strip.add(stripFace)
  strip.position.set(0, stripY, D / 2 + 0.02)
  nas.add(strip)

  const bayWidth = 0.17, gap = 0.02
  const startX = -(9 * bayWidth + 8 * gap) / 2 + bayWidth / 2
  const hitMeshes: THREE.Mesh[] = []
  const leds: { mat: THREE.MeshBasicMaterial; phase: number }[] = []

  for (let i = 0; i < 9; i++) {
    const x = startX + i * (bayWidth + gap)
    const bay = new THREE.Group()
    bay.position.set(x, bayTopY - bayHeight / 2, D / 2)
    bay.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(bayWidth, bayHeight, 0.18)), wireMat))

    const drive = new THREE.Mesh(new THREE.BoxGeometry(bayWidth - 0.03, bayHeight - 0.12, 0.32), tealDriveMat)
    drive.position.z = -0.16
    bay.add(drive)

    const hitMesh = new THREE.Mesh(new THREE.BoxGeometry(bayWidth, bayHeight, 0.5), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }))
    hitMesh.position.z = -0.1
    hitMesh.userData.label = `BAY ${String(i + 1).padStart(2, '0')} // WD RED 10TB (ONLINE)`
    bay.add(hitMesh)
    hitMeshes.push(hitMesh)

    const ledMat = new THREE.MeshBasicMaterial({ color: 0xc1121f, transparent: true, opacity: 0.5 })
    const led = new THREE.Mesh(new THREE.CircleGeometry(0.018, 8), ledMat)
    led.position.set(0, bayHeight / 2 - 0.08, 0.1)
    bay.add(led)
    leds.push({ mat: ledMat, phase: i * 0.5 })

    nas.add(bay)
  }

  scene.add(nas)

  const hud = document.createElement('div')
  hud.className = 'nas-hud'
  hud.hidden = true
  container.appendChild(hud)

  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  const onPointerMove = (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect()
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(pointer, camera)
    const hit = raycaster.intersectObjects(hitMeshes)[0]

    if (hit) {
      hud.textContent = hit.object.userData.label
      hud.style.left = `${Math.min(e.clientX - rect.left + 12, rect.width - 180)}px`
      hud.style.top = `${Math.max(e.clientY - rect.top - 28, 10)}px`
      hud.hidden = false
      controls.autoRotate = false
    } else {
      hud.hidden = true
      controls.autoRotate = true
    }
  }

  const onPointerLeave = () => {
    hud.hidden = true
    controls.autoRotate = true
  }

  renderer.domElement.addEventListener('pointermove', onPointerMove)
  renderer.domElement.addEventListener('pointerleave', onPointerLeave)

  const clock = new THREE.Clock()

  return {
    update: () => {
      const t = clock.getElapsedTime()
      for (const l of leds) l.mat.opacity = 0.3 + Math.abs(Math.sin(t * 1.6 + l.phase)) * 0.6
    },
    dispose: () => {
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave)
      container.removeChild(hud)
      grilleTex.dispose()
      topMat.dispose()
    },
  }
}
