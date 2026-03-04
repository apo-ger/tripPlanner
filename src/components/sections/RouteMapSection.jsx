import { useRef, useEffect, useState } from 'react'
import { routeStops } from '../../data/routeStops'
import { useFadeIn } from '../../hooks/useScrollTrigger'

export default function RouteMapSection() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const sectionRef = useFadeIn({ y: 60, duration: 1 })

  useEffect(() => {
    let cancelled = false

    async function loadAndInit() {
      // Load Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
        document.head.appendChild(link)
      }

      // Load Leaflet JS
      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      if (cancelled || !mapRef.current || mapInstanceRef.current) return
      initMap()
    }

    loadAndInit()

    // Inject dark popup styles once
    if (!document.querySelector('#leaflet-dark-styles')) {
      const style = document.createElement('style')
      style.id = 'leaflet-dark-styles'
      style.textContent = `
        .dark-popup .leaflet-popup-content-wrapper {
          background: #1A222D;
          border: 1px solid rgba(225,215,200,0.1);
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .dark-popup .leaflet-popup-tip { background: #1A222D; }
        .dark-popup .leaflet-popup-content {
          margin: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          line-height: 1.5;
        }
      `
      document.head.appendChild(style)
    }

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  function initMap() {
    const L = window.L
    const container = mapRef.current

    const map = L.map(container, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    })
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)

    // Fit bounds to show all stops with padding
    const bounds = L.latLngBounds(routeStops.map((s) => [s.lat, s.lng]))
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 })

    // Invalidate size after a tick (fixes rendering in smooth-scroll containers)
    setTimeout(() => map.invalidateSize(), 200)

    // Add markers with persistent labels for destinations
    routeStops.forEach((stop) => {
      const isDestination = stop.type === 'destination'
      const size = isDestination ? 14 : 9
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:${size}px;height:${size}px;
          background:${stop.color};
          border-radius:50%;
          border:2px solid rgba(237,232,224,0.7);
          box-shadow:0 0 16px ${stop.color}50;
          transition: transform 0.2s ease;
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })

      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map)

      // Persistent tooltip for destinations, popup for stops
      if (isDestination) {
        marker.bindTooltip(stop.name, {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
          className: 'dark-tooltip',
        })
      }

      if (stop.note) {
        marker.bindPopup(
          `<b style="color:#EDE8E0">${stop.name}</b><br><span style="color:#A89B8C;font-size:11px">${stop.note}</span>`,
          { className: 'dark-popup', closeButton: false }
        )
      }
    })

    // Route polyline
    const coords = routeStops.map((s) => [s.lat, s.lng])
    L.polyline(coords, {
      color: '#C49B3D',
      weight: 2.5,
      opacity: 0.5,
      dashArray: '8 5',
    }).addTo(map)

    // Dark tooltip style
    const tooltipStyle = document.createElement('style')
    tooltipStyle.textContent = `
      .dark-tooltip {
        background: rgba(26, 34, 45, 0.9) !important;
        border: 1px solid rgba(225,215,200,0.1) !important;
        border-radius: 6px !important;
        color: #EDE8E0 !important;
        font-family: 'DM Sans', sans-serif !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        padding: 3px 8px !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3) !important;
      }
      .dark-tooltip::before { display: none !important; }
    `
    document.head.appendChild(tooltipStyle)
  }

  return (
    <section ref={sectionRef} className="route-map-section" data-section="route-map">
      <div className="route-map-container">
        <div className="route-map-subtitle">Day 2 · March 6</div>
        <div className="route-map-title">The Route</div>
        <div className="map-wrapper" ref={mapRef} />
      </div>
    </section>
  )
}
