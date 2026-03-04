uniform float uTime;
uniform float uIntensity;
uniform vec2 uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Animated noise
  float noise = fract(sin(dot(uv * uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);

  float grain = (noise - 0.5) * uIntensity;

  gl_FragColor = vec4(vec3(grain + 0.5), 0.06 * uIntensity);
}
