import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const INK = 0x121212

export default function ContourBackground({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const width = mount.clientWidth || 800
    const height = mount.clientHeight || 600

    const scene = new THREE.Scene()
    const frustum = 9
    let aspect = width / height
    const camera = new THREE.OrthographicCamera(-(frustum * aspect) / 2, (frustum * aspect) / 2, frustum / 2, -frustum / 2, 0.1, 100)
    camera.position.set(6, 4, 10)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    const geo = new THREE.PlaneGeometry(8, 8, 22, 22)
    geo.rotateX(-Math.PI / 2)
    const mat = new THREE.MeshBasicMaterial({ color: INK, wireframe: true, transparent: true, opacity: 0.16 })
    group.add(new THREE.Mesh(geo, mat))
    group.position.set(-0.9, 1.6, 0)
    scene.add(group)

    const posAttr = geo.attributes.position
    const base = Float32Array.from(posAttr.array)

    // pointermove on window: mount itself is pointer-events:none so it never sees events directly
    const mouse = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      aspect = w / h
      camera.left = -(frustum * aspect) / 2
      camera.right = (frustum * aspect) / 2
      camera.top = frustum / 2
      camera.bottom = -frustum / 2
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(mount)

    let raf = 0
    const timer = new THREE.Timer()
    const tick = () => {
      timer.update()
      const t = timer.getElapsed()
      group.rotation.y = mouse.x * 0.15
      group.rotation.x = mouse.y * 0.06
      for (let i = 0; i < posAttr.count; i++) {
        const x = base[i * 3]
        const z = base[i * 3 + 2]
        posAttr.setY(i, Math.sin(x * 0.55 + t * 0.5) * 0.28 + Math.cos(z * 0.55 + t * 0.35) * 0.28)
      }
      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
}
