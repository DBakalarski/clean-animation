varying vec2 vUv;

void main() {
  vUv = uv;
  // Fullscreen plane in clip-space — skip modelViewMatrix gymnastics.
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
