'use client';

/**
 * RippleCanvas
 * ============
 * Client-only WebGL hero background.
 *
 * Gate hierarchy (evaluated BEFORE Three enters the module graph):
 *   1. prefers-reduced-motion → null (no GPU, no CSS animation)
 *   2. isMobile              → <RippleFallback /> (SVG + CSS, zero Three)
 *   3. desktop               → <Canvas> with <RipplePlane />
 *
 * animation-architect imports this via:
 *   dynamic(() => import('@/components/webgl/RippleCanvas'), { ssr: false })
 * so Three stays in its own lazy chunk and never touches SSR.
 */

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import RipplePlane from './RipplePlane';

// ─── Mobile / reduced-motion fallback ────────────────────────────────────────
// Zero JS, zero GPU.  Static SVG feTurbulence noise with a glacially slow
// CSS mask-position drift that `@media (prefers-reduced-motion)` halts.

export function RippleFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -10,
        overflow: 'hidden',
        backgroundColor: '#F7F5F0', // paper
      }}
    >
      {/* SVG noise layer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <filter id="ripple-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              seed="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grey"
            />
            <feBlend in="SourceGraphic" in2="grey" mode="screen" />
          </filter>
        </defs>
        {/* Mint-tinted rectangle drawn through the noise filter */}
        <rect
          width="100%"
          height="100%"
          fill="#2BD4C4"
          fillOpacity="0.08"
          filter="url(#ripple-noise)"
          style={{
            // Slow drift to give a living-noise feel without JS
            // animation: 'noise-drift 60s linear infinite' — defined below
            animationName: 'rippleFallbackDrift',
            animationDuration: '60s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
      </svg>

      {/* Keyframe injection via a <style> tag — no global CSS file touched */}
      <style>{`
        @keyframes rippleFallbackDrift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-8px, 4px); }
          50%  { transform: translate(6px, -6px); }
          75%  { transform: translate(-4px, 8px); }
          100% { transform: translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          rect[filter="url(#ripple-noise)"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

interface RippleCanvasProps {
  /** Pass Tailwind / custom classes to override default positioning. */
  className?: string;
}

export function RippleCanvas({ className }: RippleCanvasProps) {
  const reduced  = useReducedMotion();
  const isMobile = useIsMobile();

  // Rule 1: prefers-reduced-motion → nothing at all
  if (reduced) return null;

  // Rule 2: mobile / low-end hardware → static SVG fallback
  if (isMobile) return <RippleFallback />;

  // Rule 3: desktop → full WebGL canvas
  const containerClass = className ?? 'absolute inset-0 -z-10';

  return (
    <div aria-hidden="true" className={containerClass}>
      {/*
       * frameloop="demand" — canvas only repaints when invalidate() is called.
       * dpr capped at 1.5   — reduces fillrate 44% vs 2× retina, imperceptible on noise.
       * antialias: false    — FBM noise has no hard edges; MSAA is waste.
       * alpha: true         — allows the paper background to show through if needed.
       */}
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ antialias: false, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Background color set in scene to avoid flash-of-wrong-colour */}
        <color attach="background" args={['#F7F5F0']} />

        <Suspense fallback={null}>
          <RipplePlane />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RippleCanvas;
