export const lerp = (a, b, t) => a + (b - a) * t

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}
