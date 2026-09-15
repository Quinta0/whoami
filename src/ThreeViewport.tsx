import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type ViewportHandle = {
  update?: () => void
  dispose?: () => void
}

export type BuildFn = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  renderer: THREE.WebGLRenderer,
  container: HTMLDivElement,
) => ViewportHandle | void

export default function ThreeViewport({ build, className }: { build: BuildFn; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 1

    const handle = build(scene, camera, controls, renderer, container) ?? undefined

    let frameId = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      controls.update()
      handle?.update?.()
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      handle?.dispose?.()
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [build])

  return <div ref={containerRef} className={className} />
}
