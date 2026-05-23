'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Webpack asset/source loader returns strings
import vertSrc from './ripple.vert.glsl';
import fragSrc from './ripple.frag.glsl';

// Mint  #2BD4C4 → linear RGB (sRGB not corrected, shader works in sRGB space)
const MINT_RGB  = new THREE.Color(0x2bd4c4); // r=0.169 g=0.831 b=0.769
const PAPER_RGB = new THREE.Color(0xf7f5f0); // r=0.969 g=0.961 b=0.941

export default function RipplePlane() {
  const { gl, invalidate, size } = useThree();

  // Stable refs — never recreated inside useFrame to avoid GC churn
  const mouseTarget = useRef<[number, number]>([0.5, 0.5]);
  const mouseCurrent = useRef<[number, number]>([0.5, 0.5]);

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColor:      { value: new THREE.Vector3(MINT_RGB.r,  MINT_RGB.g,  MINT_RGB.b) },
      uBg:         { value: new THREE.Vector3(PAPER_RGB.r, PAPER_RGB.g, PAPER_RGB.b) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // created once; size updates handled below via useEffect
  );

  // Keep uResolution in sync when the canvas is resized
  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height, uniforms.uResolution.value]);

  // Global pointer listener — maps screen → UV [0,1]
  useEffect(() => {
    const canvas = gl.domElement;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseTarget.current[0] = (e.clientX - rect.left) / rect.width;
      // Flip Y: WebGL UV origin is bottom-left, screen origin is top-left
      mouseTarget.current[1] = 1.0 - (e.clientY - rect.top) / rect.height;
      invalidate();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [gl.domElement, invalidate]);

  const geometry = useMemo(() => {
    // Single fullscreen quad in NDC — no camera needed
    return new THREE.PlaneGeometry(2, 2, 1, 1);
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader:   vertSrc,
        fragmentShader: fragSrc,
        uniforms,
        depthWrite: false,
        depthTest:  false,
        transparent: false,
      }),
    [uniforms]
  );

  // Cleanup on unmount (HMR safe; prevents RAM leak on route changes)
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  const LERP = 0.08;
  const MOVE_THRESHOLD = 0.0001;
  // Ambient tick budget: repaint at most every ~50 ms (≈20 fps) so the slow
  // FBM drift stays alive without pegging the GPU when the cursor is still.
  const AMBIENT_INTERVAL_MS = 50;
  const ambientAccum = useRef(0);

  useFrame((_state, delta) => {
    // Lerp mouse toward target
    const dx = mouseTarget.current[0] - mouseCurrent.current[0];
    const dy = mouseTarget.current[1] - mouseCurrent.current[1];

    mouseCurrent.current[0] += dx * LERP;
    mouseCurrent.current[1] += dy * LERP;

    uniforms.uMouse.value.set(mouseCurrent.current[0], mouseCurrent.current[1]);

    // Advance time — drives ambient FBM drift
    uniforms.uTime.value += delta;

    const moving = Math.abs(dx) > MOVE_THRESHOLD || Math.abs(dy) > MOVE_THRESHOLD;
    if (moving) {
      // Cursor is still lerping — request the next frame immediately
      ambientAccum.current = 0; // reset ambient timer while pointer is active
      invalidate();
      return;
    }

    // Cursor settled — fire ambient repaints at ~20 fps so FBM keeps drifting
    ambientAccum.current += delta * 1000; // delta is in seconds
    if (ambientAccum.current >= AMBIENT_INTERVAL_MS) {
      ambientAccum.current = 0;
      invalidate();
    }
  });

  return (
    <mesh geometry={geometry} material={material} frustumCulled={false} />
  );
}
