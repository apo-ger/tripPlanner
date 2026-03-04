import SmoothScroll from './components/layout/SmoothScroll'
import SceneCanvas from './components/layout/SceneCanvas'
import HTMLOverlay from './components/layout/HTMLOverlay'
export default function App() {
  return (
    <SmoothScroll>
      <SceneCanvas />
      <HTMLOverlay />
    </SmoothScroll>
  )
}
