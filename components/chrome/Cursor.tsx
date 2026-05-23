'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const dot = dotRef.current;
    if (!dot) return;

    const qx = gsap.quickTo(dot, 'x', { duration: 0.3, ease: 'power3.out' });
    const qy = gsap.quickTo(dot, 'y', { duration: 0.3, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      qx(e.clientX);
      qy(e.clientY);
    };

    // Delegate hover detection on data-cursor="hover" targets
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor="hover"]');
      if (target) {
        gsap.to(dot, { scale: 3, duration: 0.35, ease: 'power3.out' });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor="hover"]');
      if (target) {
        gsap.to(dot, { scale: 1, duration: 0.35, ease: 'power3.out' });
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [reduced]);

  // Do not mount for reduced-motion users
  if (reduced) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: -6,
        left: -6,
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: 'var(--color-mint)',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        // Start off-screen until first mousemove
        transform: 'translate(-100px, -100px)',
      }}
    />
  );
}
