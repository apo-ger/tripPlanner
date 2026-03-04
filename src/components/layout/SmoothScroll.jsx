import { useLenis } from '../../hooks/useLenis'

export default function SmoothScroll({ children }) {
  useLenis()
  return <div data-lenis-root>{children}</div>
}
