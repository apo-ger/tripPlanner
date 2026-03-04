// ABOUTME: Top-level HTML layout that stacks all page sections in scroll order.
// ABOUTME: SiteNav is sticky; hero, dashboard, destinations, and footer scroll beneath it.

import SiteNav from '../ui/SiteNav'
import HeroSection from '../sections/HeroSection'
import DashboardSection from '../sections/DashboardSection'
import DestinationSection from '../sections/DestinationSection'
import FooterSection from '../sections/FooterSection'

export default function HTMLOverlay() {
  return (
    <div className="html-overlay">
      <SiteNav />
      <HeroSection />
      <DashboardSection />
      <DestinationSection />
      <FooterSection />
    </div>
  )
}
