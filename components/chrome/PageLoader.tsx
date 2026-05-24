'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE } from '@/lib/easings';
import { markPageReady } from '@/lib/pageReady';

export function PageLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      markPageReady();
      setMounted(false);
      return;
    }

    const overlay = overlayRef.current;
    const word = wordRef.current;
    if (!overlay || !word) return;

    // Prepare initial states
    gsap.set(overlay, { clipPath: 'inset(0 0 0% 0)' }); // overlay fully visible
    gsap.set(word, { clipPath: 'inset(0 0 100% 0)' }); // word hidden

    const runIntro = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          markPageReady();
          setMounted(false);
        },
      });

      // 1. Reveal word "Konin" upward mask — faster
      tl.to(word, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.6,
        ease: EASE.expoOut,
      });

      // 2. Short pause
      tl.to({}, { duration: 0.2 });

      // 3. Slide entire overlay upward
      tl.to(overlay, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: EASE.expoOut,
        onStart: () => {
          gsap.set(overlay, { willChange: 'clip-path' });
        },
        onComplete: () => {
          gsap.set(overlay, { willChange: 'auto' });
        },
      });
    };

    document.fonts.ready.then(() => {
      // setTimeout(0) — let browser paint fonts before animating
      setTimeout(runIntro, 0);
    });
  }, [reduced]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-paper)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <span
        ref={wordRef}
        style={{
          fontFamily: 'var(--font-fraunces), Georgia, serif',
          fontSize: 'clamp(3rem, 10vw, 9rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          fontOpticalSizing: 'auto' as React.CSSProperties['fontOpticalSizing'],
          color: 'var(--color-ink)',
          // overflow:clip + overflowClipMargin pozwala descenderom (y/j/g/p) wyjść
          // poza box maski bez przycinania, mimo line-height: 0.95
          overflow: 'clip',
          overflowClipMargin: '0.3em',
          display: 'inline-block',
        }}
      >
        Konin.
      </span>
    </div>
  );
}
