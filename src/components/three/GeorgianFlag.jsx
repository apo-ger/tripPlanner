// ABOUTME: Animated 3D Georgian flag rendered in an inline Canvas element.
// ABOUTME: Uses vertex shader for cloth waving and fragment shader for dynamic lighting.

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createFlagTexture } from '../../utils/flagTexture'
import flagVert from '../../shaders/flag.vert.glsl'
import flagFrag from '../../shaders/flag.frag.glsl'

function FlagMesh() {
  const meshRef = useRef()
  const materialRef = useRef()
  const texture = useMemo(() => createFlagTexture(), [])

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uScrollVelocity: { value: 0 },
    }),
    [texture]
  )

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 2, 50, 30]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={flagVert}
        fragmentShader={flagFrag}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  )
}

export default function GeorgianFlag() {
  return (
    <div style={{
      width: 200,
      height: 130,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 8px 28px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
    }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 4]} intensity={0.5} />
        <FlagMesh />
      </Canvas>
    </div>
  )
}
