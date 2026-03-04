uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;
varying float vWave;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);

  // Dynamic shading based on wave slope
  float shadow = 1.0 + vWave * 2.5;
  shadow = clamp(shadow, 0.7, 1.25);

  // Subtle ambient light variation
  float ambient = 0.95 + sin(uTime * 0.5) * 0.05;

  vec3 color = texColor.rgb * shadow * ambient;

  gl_FragColor = vec4(color, texColor.a);
}
