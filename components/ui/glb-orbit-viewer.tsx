"use client"

import {
  type CSSProperties,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Center, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js"

import { cn } from "@/lib/utils"

function AimCamera({
  position,
  lookAt,
}: {
  position: [number, number, number]
  lookAt: [number, number, number]
}) {
  const { camera } = useThree()

  useLayoutEffect(() => {
    camera.position.set(...position)
    camera.lookAt(...lookAt)
    camera.updateProjectionMatrix()
  }, [camera, position, lookAt])

  return null
}

function CursorFollowRectAreaLight({
  y,
  width,
  height: rectHeight,
  intensity,
  color,
  xRange,
  zRange,
  lerp = 0.08,
}: {
  y: number
  width: number
  height: number
  intensity: number
  color: THREE.ColorRepresentation
  xRange: number
  zRange: number
  lerp?: number
}) {
  const lightRef = useRef<THREE.RectAreaLight>(null)
  const target = useRef(new THREE.Vector3(0, y, 0))
  const current = useRef(new THREE.Vector3(0, y, 0))

  useEffect(() => {
    const applyPointer = (clientX: number, clientY: number) => {
      const nx = clientX / window.innerWidth
      const ny = clientY / window.innerHeight
      const x = (nx - 0.5) * 2 * xRange
      const z = (ny - 0.5) * 2 * zRange
      target.current.set(x, y, z)
    }

    const onMouseMove = (e: MouseEvent) => {
      applyPointer(e.clientX, e.clientY)
    }

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      applyPointer(t.clientX, t.clientY)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchstart", onTouch, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchstart", onTouch)
      window.removeEventListener("touchmove", onTouch)
    }
  }, [y, xRange, zRange])

  useFrame(() => {
    const light = lightRef.current
    if (!light) return
    current.current.lerp(target.current, lerp)
    light.position.copy(current.current)
  })

  return (
    <rectAreaLight
      ref={lightRef}
      args={[color, intensity, width, rectHeight]}
      position={[0, y, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  )
}

function Model({
  src,
  yawSpeed = 0.35,
}: {
  src: string
  /** Radians per second around world Y; set 0 to stop */
  yawSpeed?: number
}) {
  const { scene } = useGLTF(src)
  const spinRef = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (mesh.isMesh) {
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    const g = spinRef.current
    if (!g || yawSpeed === 0) return
    g.rotation.y += yawSpeed * delta
  })

  return (
    <group ref={spinRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

function EdgeVignette({
  bandPercent,
  blurPx,
  edgeDarken,
}: {
  /** Height of each band (top and bottom) as % of viewer height */
  bandPercent: number
  /** Backdrop blur strength in px (lens-style softening) */
  blurPx: number
  /** Extra black at the very top/bottom edge, 0–1 (fades via gradient) */
  edgeDarken: number
}) {
  const h = `${Math.min(Math.max(bandPercent, 0), 48)}%`
  const blur = `${Math.max(0, blurPx)}px`

  const blurTopStyle: CSSProperties = {
    height: h,
    WebkitBackdropFilter: `blur(${blur})`,
    backdropFilter: `blur(${blur})`,
    WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
    maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
  }

  const blurBottomStyle: CSSProperties = {
    height: h,
    WebkitBackdropFilter: `blur(${blur})`,
    backdropFilter: `blur(${blur})`,
    WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
    maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
  }

  const dark = Math.min(Math.max(edgeDarken, 0), 1)

  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2]"
        style={blurTopStyle}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
        style={blurBottomStyle}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3]"
        style={{
          height: h,
          background: `linear-gradient(to bottom, rgba(0,0,0,${dark}), transparent)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3]"
        style={{
          height: h,
          background: `linear-gradient(to top, rgba(0,0,0,${dark}), transparent)`,
        }}
        aria-hidden
      />
    </>
  )
}

export type GlbOrbitViewerProps = {
  modelSrc: string
  className?: string
  /** Fixed camera position (world space) */
  cameraPosition?: [number, number, number]
  /** Camera look-at target */
  lookAt?: [number, number, number]
  /** Rect area light world Y — height of the light above the scene origin */
  areaLightY?: number
  /** Width of the luminous rectangle (adjustable “bar” length along local X, shines downward) */
  areaLightWidth?: number
  /** Second edge of the rectangle (depth of the bar along local Y before rotation) */
  areaLightDepth?: number
  /** RectAreaLight intensity */
  areaLightIntensity?: number
  areaLightColor?: THREE.ColorRepresentation
  /** Cursor X maps light X in [-areaLightXRange, +areaLightXRange] */
  areaLightXRange?: number
  /** Cursor Y maps light Z in [-areaLightZRange, +areaLightZRange] */
  areaLightZRange?: number
  /** 0–1, higher = snappier follow */
  areaLightLerp?: number
  /** Renderer exposure multiplier (lower = darker overall) */
  toneMappingExposure?: number
  /** Omnidirectional fill; keep low for mood, higher so the model stays faintly readable */
  ambientIntensity?: number
  /** Ambient light color */
  ambientColor?: THREE.ColorRepresentation
  /** Very soft sky/ground gradient (0 = off). Adds shape in shadows without brightening the scene much */
  hemisphereIntensity?: number
  hemisphereSkyColor?: THREE.ColorRepresentation
  hemisphereGroundColor?: THREE.ColorRepresentation
  /** Model spin rate around world Y, radians per second; 0 disables */
  modelYawSpeed?: number
  /** Top & bottom band height as % of viewport (vignette “thickness”) */
  vignetteBandPercent?: number
  /** Edge lens blur strength in CSS px */
  vignetteBlurPx?: number
  /** Extra black at top/bottom rim, 0–1 */
  vignetteEdgeDarken?: number
}

export function GlbOrbitViewer({
  modelSrc,
  className,
  cameraPosition = [0, 2.8, 12],
  lookAt = [0, 0, 0],
  areaLightY = 6,
  areaLightWidth = 3.5,
  areaLightDepth = 1.25,
  areaLightIntensity = 18,
  areaLightColor = "#ffe8d0",
  areaLightXRange = 4.5,
  areaLightZRange = 3.5,
  areaLightLerp = 0.09,
  toneMappingExposure = 0.42,
  ambientIntensity = 0.038,
  ambientColor = "#12161f",
  hemisphereIntensity = 0.08,
  hemisphereSkyColor = "#1e2636",
  hemisphereGroundColor = "#06070c",
  modelYawSpeed = 0.35,
  vignetteBandPercent = 22,
  vignetteBlurPx = 18,
  vignetteEdgeDarken = 0.55,
}: GlbOrbitViewerProps) {
  const [canvasReady, setCanvasReady] = useState(false)
  useEffect(() => {
    setCanvasReady(true)
  }, [])

  return (
    <div
      className={cn(
        /* pan-y so vertical swipes scroll the page snap container on mobile */
        "relative h-full w-full touch-pan-y bg-black",
        className,
      )}
    >
      {canvasReady ? (
        <Canvas
          className="relative z-0 h-full w-full !touch-pan-y"
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          onCreated={({ gl }) => {
            RectAreaLightUniformsLib.init()
            gl.setClearColor("#000000", 1)
          }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 5000,
            position: [...cameraPosition],
          }}
        >
          <color attach="background" args={["#000000"]} />

          <AimCamera position={cameraPosition} lookAt={lookAt} />

          <ambientLight intensity={ambientIntensity} color={ambientColor} />
          {hemisphereIntensity > 0 ? (
            <hemisphereLight
              args={[hemisphereSkyColor, hemisphereGroundColor, hemisphereIntensity]}
            />
          ) : null}

          <CursorFollowRectAreaLight
            y={areaLightY}
            width={areaLightWidth}
            height={areaLightDepth}
            intensity={areaLightIntensity}
            color={areaLightColor}
            xRange={areaLightXRange}
            zRange={areaLightZRange}
            lerp={areaLightLerp}
          />

          <Suspense fallback={null}>
            <Model src={modelSrc} yawSpeed={modelYawSpeed} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="absolute inset-0 z-0 bg-black" aria-hidden />
      )}
      <EdgeVignette
        bandPercent={vignetteBandPercent}
        blurPx={vignetteBlurPx}
        edgeDarken={vignetteEdgeDarken}
      />
    </div>
  )
}

useGLTF.preload("/casa_city_logo.glb")
