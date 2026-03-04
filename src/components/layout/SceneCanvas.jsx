import { Canvas } from '@react-three/fiber'
import GrainOverlay from '../three/GrainOverlay'

export default function SceneCanvas() {
  return (
    <div className="scene-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1]}
        gl={{ alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <GrainOverlay />
      </Canvas>
    </div>
  )
}
