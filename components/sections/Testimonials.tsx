'use client';

import { useRef, useEffect } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';
import { EASE, DURATION, STAGGER } from '@/lib/easings';

// Duplicate items for a seamless visual marquee behind drag
const ITEMS = [...copy.testimonials.items, ...copy.testimonials.items];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useReducedMotion();

  // Slow background GSAP marquee — paused during drag via timeScale
  useGSAP(
    () => {
      if (reduced) return;
      const track = trackRef.current;
      if (!track) return;

      const trackWidth = track.scrollWidth / 2;
      tweenRef.current = gsap.to(track, {
        x: -trackWidth,
        duration: trackWidth / 40, // slow auto-scroll: 40px/s
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  if (reduced) {
    // Simple grid, no drag, no auto-marquee
    return (
      <section id="testimonials" className="py-32 md:py-48">
        <div className="shell">
          <MaskReveal>
            <span className="caption-mono text-ink/50">{copy.testimonials.label}</span>
          </MaskReveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.testimonials.items.map((item, i) => (
              <MaskReveal key={i} delay={i * STAGGER.loose}>
                <blockquote className="p-8 border border-ink/10">
                  <p className="font-serif text-xl text-ink leading-snug">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="font-mono text-xs text-ink/50 mt-4">— {item.author}</footer>
                </blockquote>
              </MaskReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} id="testimonials" className="py-32 md:py-48 overflow-hidden">
        <div className="shell mb-12">
          <MaskReveal>
            <span className="caption-mono text-ink/50">{copy.testimonials.label}</span>
          </MaskReveal>
        </div>

        {/* Drag container — Framer Motion handles constraints */}
        <m.div
          drag="x"
          dragConstraints={{
            left: -(copy.testimonials.items.length * 400),
            right: 0,
          }}
          dragElastic={0.05}
          className="cursor-grab active:cursor-grabbing"
          onDragStart={() => {
            if (tweenRef.current) {
              gsap.to(tweenRef.current, { timeScale: 0, duration: 0.3, ease: EASE.expoOut });
            }
          }}
          onDragEnd={() => {
            if (tweenRef.current) {
              gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: EASE.expoOut });
            }
          }}
        >
          <div
            ref={trackRef}
            className="flex gap-6 px-6 md:px-12"
            style={{ width: 'max-content' }}
          >
            {ITEMS.map((item, i) => (
              <m.div
                key={i}
                className="flex-shrink-0 w-[min(80vw,400px)]"
                initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                whileInView={{
                  clipPath: 'inset(0% 0 0 0)',
                  opacity: 1,
                  transition: {
                    duration: DURATION.slow,
                    ease: [0.16, 1, 0.3, 1],
                    delay: (i % copy.testimonials.items.length) * STAGGER.loose,
                  },
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <blockquote className="p-8 border border-ink/10 h-full flex flex-col justify-between">
                  <p className="font-serif text-xl text-ink leading-snug">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="font-mono text-xs text-ink/50 mt-6">— {item.author}</footer>
                </blockquote>
              </m.div>
            ))}
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
