'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';

// Unsplash placeholder pairs — clean room before / after
const BEFORE_IMG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80';
const AFTER_IMG = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1200&q=80';

export function Effects() {
  const sectionRef = useRef<HTMLElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const afterLayerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const isDragging = useRef(false);
  const reduced = useReducedMotion();

  // Scroll-driven parallax on both image layers
  useGSAP(
    () => {
      if (reduced) return;

      const before = beforeLayerRef.current;
      const after = afterLayerRef.current;
      const section = sectionRef.current;
      if (!before || !after || !section) return;

      gsap.set([before, after], { willChange: 'transform' });

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const y = -40 * self.progress;
          gsap.set(before, { y });
          gsap.set(after, { y });
        },
        onLeave: () => { gsap.set([before, after], { willChange: 'auto' }); },
        onLeaveBack: () => { gsap.set([before, after], { willChange: 'auto' }); },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  // Pointer drag logic
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setPercent(Math.round(x * 100));
    },
    [],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerMove]);

  const handleHandlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      isDragging.current = true;
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [handlePointerMove, handlePointerUp],
  );

  // Keyboard accessibility for slider
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPercent((p) => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setPercent((p) => Math.min(100, p + 5));
    if (e.key === 'Home') setPercent(0);
    if (e.key === 'End') setPercent(100);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <section ref={sectionRef} id="effects" className="py-32 md:py-48">
      <div className="shell mb-12">
        <MaskReveal>
          <span className="caption-mono text-ink/50">{copy.effects.label}</span>
        </MaskReveal>
        <MaskReveal delay={0.1}>
          <h2 className="font-serif text-ink mt-4">{copy.effects.title}</h2>
        </MaskReveal>
        <MaskReveal delay={0.2}>
          <p className="font-mono text-sm text-ink/50 mt-3">{copy.effects.caption}</p>
        </MaskReveal>
      </div>

      {/* Slider container */}
      <MaskReveal className="shell">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-none select-none"
          role="slider"
          aria-label="Suwak przed/po"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* After layer — full width, base */}
          <div ref={afterLayerRef} className="absolute inset-0">
            <Image
              src={AFTER_IMG}
              alt="Po sprzątaniu"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
            />
          </div>

          {/* Before layer — clipped from right */}
          <div
            ref={beforeLayerRef}
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
          >
            <Image
              src={BEFORE_IMG}
              alt="Przed sprzątaniem"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-paper/80 pointer-events-none"
            style={{ left: `${percent}%` }}
            aria-hidden="true"
          />

          {/* Drag handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-ew-resize touch-none"
            style={{ left: `${percent}%` }}
            onPointerDown={handleHandlePointerDown}
            aria-hidden="true"
          >
            <div
              className="w-10 h-10 rounded-full bg-mint flex items-center justify-center shadow-lg"
              data-cursor="hover"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10"
                  stroke="var(--color-ink)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </MaskReveal>
    </section>
  );
}
