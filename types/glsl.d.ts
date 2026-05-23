// Webpack `asset/source` loader turns .glsl/.vert/.frag into plain strings.
declare module '*.glsl' {
  const src: string;
  export default src;
}
declare module '*.vert' {
  const src: string;
  export default src;
}
declare module '*.frag' {
  const src: string;
  export default src;
}
