import * as THREE from 'three'

export function createFlagTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 900
  canvas.height = 600
  const ctx = canvas.getContext('2d')

  // White background
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, 900, 600)

  // Large red cross
  ctx.fillStyle = '#FF0000'
  ctx.fillRect(382, 0, 136, 600) // vertical
  ctx.fillRect(0, 232, 900, 136) // horizontal

  // Bolnisi crosses in each quadrant
  const drawBolnisi = (cx, cy, s) => {
    ctx.fillStyle = '#FF0000'
    // Main cross bars
    ctx.fillRect(cx - s * 0.12, cy - s * 0.5, s * 0.24, s)
    ctx.fillRect(cx - s * 0.5, cy - s * 0.12, s, s * 0.24)
    // Flared ends (top/bottom)
    const f = s * 0.18
    ctx.fillRect(cx - f, cy - s * 0.5, f * 2, s * 0.08)
    ctx.fillRect(cx - f, cy + s * 0.42, f * 2, s * 0.08)
    // Flared ends (left/right)
    ctx.fillRect(cx - s * 0.5, cy - f, s * 0.08, f * 2)
    ctx.fillRect(cx + s * 0.42, cy - f, s * 0.08, f * 2)
  }

  drawBolnisi(191, 116, 105)
  drawBolnisi(641, 116, 105)
  drawBolnisi(191, 484, 105)
  drawBolnisi(641, 484, 105)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
