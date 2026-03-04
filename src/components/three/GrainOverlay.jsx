// ABOUTME: Full-screen grain/noise overlay rendered in the fixed R3F canvas.
// ABOUTME: Intensity scales with scroll velocity for a tactile scrolling feel.

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScrollStore } from '../../stores/useScrollStore'
import grainFrag from '../../shaders/grain.frag.glsl'

export default function GrainOverlay() {
  const meshRef = useRef()
  const materialRef = useRef()
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 0.5 },
      uResolution: { value: [window.innerWidth, window.innerHeight] },
    }),
    []
  )

  useFrame((state) => {
    if (!materialRef.current) return

    const { scrollVelocity } = useScrollStore.getState()

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    // Grain intensity increases with scroll velocity
    materialRef.current.uniforms.uIntensity.value = 0.15 + Math.abs(scrollVelocity) * 0.35
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 5]} renderOrder={999}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={grainFrag}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}
