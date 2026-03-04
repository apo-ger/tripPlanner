// ABOUTME: Split-view dashboard with a sticky Leaflet map and scrollable stop list.
// ABOUTME: Switches routes based on activeRouteId from the scroll store.

import { useRef, useEffect, useState, useCallback } from 'react'
import { routes } from '../../data/routes'
import { useScrollStore } from '../../stores/useScrollStore'

export default function DashboardSection() {
  const activeRouteId = useScrollStore((s) => s.activeRouteId)
  const route = routes.find((r) => r.id === activeRouteId) || routes[0]
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layerGroupRef = useRef(null)
  const [leafletReady, setLeafletReady] = useState(!!window.L)
  const [activeStopIdx, setActiveStopIdx] = useState(null)

  // Load Leaflet once
  useEffect(() => {
    if (window.L) { setLeafletReady(true); return }
    let cancelled = false

    async function load() {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
        document.head.appendChild(link)
      }
      await new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
        script.onload = resolve
        document.head.appendChild(script)
      })
      if (!cancelled) setLeafletReady(true)
    }

    load()
    return () => { cancelled = true }
  }, [])

  // Init map once Leaflet is loaded
  useEffect(() => {
    if (!leafletReady || !mapRef.current || mapInstanceRef.current) return
    const L = window.L

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    })
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)

    layerGroupRef.current = L.layerGroup().addTo(map)

    setTimeout(() => map.invalidateSize(), 200)

    return () => {
      map.remove()
      mapInstanceRef.current = null
      layerGroupRef.current = null
    }
  }, [leafletReady])

  // Redraw markers + polyline when route changes
  const drawRoute = useCallback(() => {
    const L = window.L
    const map = mapInstanceRef.current
    const group = layerGroupRef.current
    if (!L || !map || !group) return

    group.clearLayers()

    const { stops } = route

    stops.forEach((stop, idx) => {
      const isDestination = stop.type === 'destination'
      const size = isDestination ? 14 : 9
      const dotColor = isDestination ? '#1A1612' : '#8A847C'

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:${size}px;height:${size}px;
          background:${dotColor};
          border-radius:50%;
          border:2px solid #FFFFFF;
          box-shadow:0 1px 4px rgba(0,0,0,0.15);
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })

      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(group)

      if (isDestination) {
        marker.bindTooltip(stop.name, {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
        })
      }

      marker.on('click', () => setActiveStopIdx(idx))
    })

    // Polyline
    const coords = stops.map((s) => [s.lat, s.lng])
    L.polyline(coords, {
      color: '#1A1612',
      weight: 2,
      opacity: 0.3,
      dashArray: '6 4',
    }).addTo(group)

    // Fit bounds
    const bounds = L.latLngBounds(coords)
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 })
  }, [route])

  useEffect(() => {
    drawRoute()
    setActiveStopIdx(null)
  }, [drawRoute, leafletReady])

  // Pan to stop when clicked in the list
  const handleStopClick = (idx) => {
    setActiveStopIdx(activeStopIdx === idx ? null : idx)
    const stop = route.stops[idx]
    if (mapInstanceRef.current && stop) {
      mapInstanceRef.current.panTo([stop.lat, stop.lng], { animate: true })
    }
  }

  return (
    <section className="dashboard-section" data-section="dashboard">
      <div className="dashboard-route-info">
        <span className="dashboard-route-tagline">{route.tagline}</span>
        <span className="dashboard-route-meta">{route.distance} · {route.duration}</span>
      </div>

      <div className="dashboard-split">
        <div className="map-panel" ref={mapRef} />

        <div className="content-panel" data-lenis-prevent>
          <div className="stop-list">
            {route.stops.map((stop, idx) => (
              <div
                key={`${route.id}-${idx}`}
                className={`stop-card${activeStopIdx === idx ? ' active' : ''}`}
                onClick={() => handleStopClick(idx)}
              >
                <div className="stop-card-header">
                  <span
                    className={`stop-card-type-dot${stop.type === 'destination' ? ' destination' : ''}`}
                    style={{ background: stop.type === 'destination' ? '#1A1612' : '#B0AAA2' }}
                  />
                  <span className="stop-card-name">{stop.name}</span>
                  <span className="stop-card-duration">{stop.duration}</span>
                </div>

                {activeStopIdx === idx && (
                  <div className="stop-card-detail">
                    <p className="stop-card-desc">{stop.description}</p>
                    {stop.links.length > 0 && (
                      <div className="stop-card-links">
                        {stop.links.map((link, i) => (
                          <a
                            key={i}
                            className="stop-card-link"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
