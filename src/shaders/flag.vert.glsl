uniform float uTime;
uniform float uScrollVelocity;

varying vec2 vUv;
varying float vWave;

void main() {
  vUv = uv;

  vec3 pos = position;

  float amplitude = 0.15 + abs(uScrollVelocity) * 0.1;

  // Uniform wave across the whole flag (no pole anchor)
  float wave1 = sin(uv.x * 4.5 + uTime * 2.8) * amplitude;
  float wave2 = cos(uv.x * 2.8 + uTime * 1.6) * amplitude * 0.4;
  float wave3 = sin(uv.x * 8.0 + uTime * 3.5) * amplitude * 0.1;

  pos.z += wave1 + wave2 + wave3;

  // Slight y-displacement for cloth drape feel
  pos.y += sin(uv.x * 3.0 + uTime * 1.2) * 0.02;

  vWave = wave1 + wave2;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
