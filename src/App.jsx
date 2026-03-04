import SmoothScroll from './components/layout/SmoothScroll'
import SceneCanvas from './components/layout/SceneCanvas'
import HTMLOverlay from './components/layout/HTMLOverlay'
import { useMousePosition } from './hooks/useMousePosition'

export default function App() {
  useMousePosition()

  return (
    <SmoothScroll>
      <SceneCanvas />
      <HTMLOverlay />
    </SmoothScroll>
  )
}
