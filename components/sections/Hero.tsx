'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SplitText } from '@/components/ui/SplitText';
import { copy } from '@/lib/copy';
import { EASE, DURATION } from '@/lib/easings';
import { pageReady } from '@/lib/pageReady';

// WebGL canvas — loaded only on client, ssr: false
const RippleCanvas = dynamic(
  () => import('@/components/webgl/RippleCanvas').then((m) => ({ default: m.RippleCanvas })),
  { ssr: false },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    pageReady.then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const caption = captionRef.current;
      if (!section || !caption) return;

      if (reduced) {
        gsap.set(caption, { opacity: 1, y: 0, willChange: 'auto', clearProps: 'transform' });
        return;
      }

      if (!ready) return;

      // fromTo: explicitne wartości startowe niezależne od CSS w DOM.
      gsap.fromTo(
        caption,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.base,
          ease: EASE.expoOut,
          delay: 0.9, // ~75% przez SplitText animation
          onComplete: () => { gsap.set(caption, { willChange: 'auto' }); },
        },
      );

      // Scroll parallax on hero section
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(section, {
            yPercent: -20 * self.progress,
            opacity: 1 - 0.6 * self.progress,
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced, ready] },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* WebGL background — absolute behind text */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <RippleCanvas />
      </div>

      <div className="shell relative z-10 py-32 md:py-48">
        {/* Display headline — two rows */}
        <h1 className="font-serif leading-[0.95] tracking-tighter text-ink">
          <SplitText
            as="span"
            split="words"
            trigger="load"
            delay={0.1}
            className="block"
          >
            {copy.hero.headlineTop}
          </SplitText>
          <SplitText
            as="span"
            split="words"
            trigger="load"
            delay={0.3}
            className="block"
          >
            {copy.hero.headlineBottom}
          </SplitText>
        </h1>

        {/* Mono caption — pre-hidden inline żeby PageLoader zjeżdżając nie odsłonił
            captiona w final state ZANIM useGSAP zdąży go schować. */}
        <p
          ref={captionRef}
          className="mt-8 font-mono text-sm uppercase tracking-widest text-ink/60 max-w-sm"
          style={{ opacity: 0, transform: 'translateY(20px)', willChange: 'transform, opacity' }}
        >
          {copy.hero.caption}
        </p>
      </div>
    </section>
  );
}
