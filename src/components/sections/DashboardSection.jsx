// ABOUTME: Sticky Leaflet map that shows the trip route and zooms per active chapter.
// ABOUTME: Markers highlight when a stop is selected from the chapter content below.

import { useRef, useEffect, useState, useCallback } from 'react'
import { route } from '../../data/routes'
import { chapters } from '../../data/destinations'
import { useScrollStore } from '../../stores/useScrollStore'

// Georgia bounding box with padding
const GEORGIA_BOUNDS = [[40.8, 39.8], [43.8, 46.8]]

// Full-route view used as initial map state
const ROUTE_VIEW = { center: [42.1, 43.8], zoom: 7 }

export default function DashboardSection() {
  const activeChapter = useScrollStore((s) => s.activeChapter)
  const activeStopName = useScrollStore((s) => s.activeStopName)
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layerGroupRef = useRef(null)
  const markersRef = useRef([])
  const [leafletReady, setLeafletReady] = useState(!!window.L)

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
      maxBounds: L.latLngBounds(GEORGIA_BOUNDS),
      maxBoundsViscosity: 1.0,
      minZoom: 7,
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
      markersRef.current = []
    }
  }, [leafletReady])

  // Build icon for a marker
  const buildIcon = useCallback((stop, isActive) => {
    const L = window.L
    if (!L) return null

    const isDestination = stop.type === 'destination'

    if (isActive) {
      const size = 20
      return L.divIcon({
        className: '',
        html: `<div style="
          width:${size}px;height:${size}px;
          background:#1A1612;
          border-radius:50%;
          border:2.5px solid #FFFFFF;
          box-shadow:0 0 0 4px rgba(26,22,18,0.2), 0 2px 8px rgba(0,0,0,0.25);
          transition:all 0.25s ease;
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })
    }

    const size = isDestination ? 14 : 9
    const dotColor = isDestination ? '#1A1612' : '#8A847C'
    return L.divIcon({
      className: '',
      html: `<div style="
        width:${size}px;height:${size}px;
        background:${dotColor};
        border-radius:50%;
        border:2px solid #FFFFFF;
        box-shadow:0 1px 4px rgba(0,0,0,0.15);
        transition:all 0.25s ease;
      "></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    })
  }, [])

  // Draw route markers + polyline (once)
  const drawRoute = useCallback(() => {
    const L = window.L
    const map = mapInstanceRef.current
    const group = layerGroupRef.current
    if (!L || !map || !group) return

    group.clearLayers()
    markersRef.current = []

    const setActiveStop = useScrollStore.getState().setActiveStop

    route.stops.forEach((stop) => {
      const icon = buildIcon(stop, false)
      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(group)

      if (stop.type === 'destination') {
        marker.bindTooltip(stop.name, {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
        })
      }

      marker.on('click', () => setActiveStop(stop.name))
      markersRef.current.push(marker)
    })

    // Polyline
    const coords = route.stops.map((s) => [s.lat, s.lng])
    L.polyline(coords, {
      color: '#1A1612',
      weight: 2,
      opacity: 0.3,
      dashArray: '6 4',
    }).addTo(group)

    map.setView(ROUTE_VIEW.center, ROUTE_VIEW.zoom)
  }, [buildIcon])

  useEffect(() => {
    drawRoute()
  }, [drawRoute, leafletReady])

  // Fly to chapter-specific map view when active chapter changes
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    const chapter = chapters.find((c) => c.id === activeChapter)
    if (chapter?.mapView) {
      map.flyTo(chapter.mapView.center, chapter.mapView.zoom, { duration: 1.2 })
    }
  }, [activeChapter])

  // Highlight marker + pan when active stop changes
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    route.stops.forEach((stop, idx) => {
      const marker = markersRef.current[idx]
      if (!marker) return
      const icon = buildIcon(stop, stop.name === activeStopName)
      if (icon) marker.setIcon(icon)
    })

    if (activeStopName) {
      const stop = route.stops.find((s) => s.name === activeStopName)
      if (stop) {
        map.panTo([stop.lat, stop.lng], { animate: true })
      }
    }
  }, [activeStopName, buildIcon])

  return (
    <div className="trip-map" ref={mapRef} />
  )
}
