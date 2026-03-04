import { useFadeIn } from '../../hooks/useScrollTrigger'

export default function FooterSection() {
  const ref = useFadeIn({ y: 30, duration: 0.8 })
  return (
    <footer ref={ref} className="footer" data-section="footer">
      <p className="footer-text">Living doc · ask me to add anything</p>
    </footer>
  )
}
