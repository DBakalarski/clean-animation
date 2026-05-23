'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE } from '@/lib/easings';

type MarqueeProps = {
  children: React.ReactNode;
  speed?: number; // px/s
  direction?: 'left' | 'right';
  className?: string;
};

export function Marquee({ children, speed = 80, direction = 'left', className }: MarqueeProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useReducedMotion();

  // Build / rebuild the tween (called after mount and on resize)
  const buildTween = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    tweenRef.current?.kill();

    // Track contains 2× content. We slide by half the total scrollWidth to loop.
    const singleWidth = track.scrollWidth / 2;
    const duration = singleWidth / speed;
    const xTarget = direction === 'left' ? -singleWidth : singleWidth;

    gsap.set(track, { willChange: 'transform' });

    tweenRef.current = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: xTarget,
        duration,
        ease: 'none',
        repeat: -1,
      },
    );
  }, [speed, direction]);

  useEffect(() => {
    if (reduced) return;

    // Defer to next frame so DOM is laid out and scrollWidth is correct
    const id = requestAnimationFrame(() => buildTween());

    const observer = new ResizeObserver(() => buildTween());
    if (outerRef.current) observer.observe(outerRef.current);

    return () => {
      cancelAnimationFrame(id);
      tweenRef.current?.kill();
      const track = trackRef.current;
      if (track) gsap.set(track, { willChange: 'auto' });
      observer.disconnect();
    };
  }, [reduced, buildTween]);

  const handlePointerEnter = useCallback(() => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.4, ease: EASE.expoOut });
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: EASE.expoOut });
  }, []);

  if (reduced) {
    // Static render — no animation, no tween
    return (
      <div className={className} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-flex' }}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* track: 2× duplicated content for seamless loop */}
      <div ref={trackRef} style={{ display: 'inline-flex' }}>
        <div style={{ display: 'inline-flex', flexShrink: 0 }}>{children}</div>
        <div style={{ display: 'inline-flex', flexShrink: 0 }} aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
