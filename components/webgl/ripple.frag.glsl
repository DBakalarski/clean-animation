precision mediump float;

uniform float uTime;
uniform vec2  uMouse;       // UV space [0, 1]
uniform vec2  uResolution;  // viewport px
uniform vec3  uColor;       // mint  0.169, 0.831, 0.769
uniform vec3  uBg;          // paper 0.969, 0.961, 0.941

varying vec2 vUv;

// ---- Permutation helpers (classic value-noise basis) ----
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

// 2-D value noise in [-1, 1]
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  // Quintic interpolation
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

  float a = fract(sin(dot(i,              vec2(127.1, 311.7))) * 43758.5453);
  float b = fract(sin(dot(i + vec2(1,0),  vec2(127.1, 311.7))) * 43758.5453);
  float c = fract(sin(dot(i + vec2(0,1),  vec2(127.1, 311.7))) * 43758.5453);
  float d = fract(sin(dot(i + vec2(1,1),  vec2(127.1, 311.7))) * 43758.5453);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 2.0 - 1.0;
}

// FBM — 4 octaves, keep ALU lean for fillrate-bound hero
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2  s = vec2(1.0);
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p * s);
    s  *= 2.0;
    a  *= 0.5;
  }
  return v; // range roughly [-1, 1]
}

void main() {
  // Aspect-correct UV so the noise looks circular, not stretched
  vec2 uv = vUv;
  uv.x *= uResolution.x / uResolution.y;

  // Scale the mouse the same way
  vec2 m = uMouse;
  m.x *= uResolution.x / uResolution.y;

  // Distance to mouse in aspect-correct space
  float d = length(uv - m);

  // Ripple ring emanating from cursor position
  float ripple = sin(d * 30.0 - uTime * 1.5) * exp(-d * 4.0) * 0.5;

  // Slow-moving ambient noise field
  float n = fbm(uv * 2.0 + uTime * 0.1);

  // Combine noise + ripple into a mask
  float mask = smoothstep(0.3, 0.7, n + ripple);

  // Very low-intensity mint blush over paper — no blobs, just breath
  vec3 color = mix(uBg, uColor, mask * 0.18);

  gl_FragColor = vec4(color, 1.0);
}
