uniform float uTime;
uniform float uScrollVelocity;

varying vec2 vUv;
varying float vWave;

void main() {
  vUv = uv;

  vec3 pos = position;

  // Amplitude increases from left (0) to right (1)
  float normalizedX = uv.x;
  float amplitude = 0.15 + abs(uScrollVelocity) * 0.1;

  // Primary wave
  float wave1 = sin(normalizedX * 4.5 + uTime * 2.8) * normalizedX * amplitude;
  // Secondary wave for organic feel
  float wave2 = cos(normalizedX * 2.8 + uTime * 1.6) * normalizedX * amplitude * 0.4;
  // Tertiary micro-wave
  float wave3 = sin(normalizedX * 8.0 + uTime * 3.5) * normalizedX * amplitude * 0.1;

  pos.z += wave1 + wave2 + wave3;

  // Slight y-displacement for cloth drape feel
  pos.y += sin(normalizedX * 3.0 + uTime * 1.2) * normalizedX * 0.02;

  vWave = wave1 + wave2;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
