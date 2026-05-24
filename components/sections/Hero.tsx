'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SplitText } from '@/components/ui/SplitText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { copy } from '@/lib/copy';
import { EASE, DURATION } from '@/lib/easings';
import { pageReady } from '@/lib/pageReady';

const RippleCanvas = dynamic(
  () => import('@/components/webgl/RippleCanvas').then((m) => ({ default: m.RippleCanvas })),
  { ssr: false },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
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
      const tagline = taglineRef.current;
      const caption = captionRef.current;
      const ctaBlock = ctaRef.current;
      if (!section || !tagline || !caption || !ctaBlock) return;

      if (reduced) {
        gsap.set([tagline, caption, ctaBlock], {
          opacity: 1,
          y: 0,
          willChange: 'auto',
          clearProps: 'transform',
        });
        return;
      }

      if (!ready) return;

      gsap.fromTo(
        tagline,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.base,
          ease: EASE.expoOut,
          delay: 0.75,
          onComplete: () => {
            gsap.set(tagline, { willChange: 'auto' });
          },
        },
      );

      gsap.fromTo(
        caption,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.base,
          ease: EASE.expoOut,
          delay: 0.95,
          onComplete: () => {
            gsap.set(caption, { willChange: 'auto' });
          },
        },
      );

      gsap.fromTo(
        ctaBlock,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.base,
          ease: EASE.expoOut,
          delay: 1.15,
          onComplete: () => {
            gsap.set(ctaBlock, { willChange: 'auto' });
          },
        },
      );

      // Subtle parallax — capped at -10% (was -20%) for gentler feel.
      // Skipped on mobile: scrub:1 + per-frame transform of the whole section
      // tanks scroll FPS on touch GPUs, and the WebGL background is already
      // replaced by a static SVG fallback there.
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(section, {
              yPercent: -10 * self.progress,
              opacity: 1 - 0.5 * self.progress,
            });
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [reduced, ready, isMobile] },
  );

  const handleScrollTo = (hash: string) => {
    if (typeof document === 'undefined') return;
    const id = hash.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* WebGL background — softened (lower opacity wrapper) */}
      <div className="absolute inset-0 -z-10 opacity-60" aria-hidden="true">
        <RippleCanvas />
      </div>

      <div className="shell relative z-10 py-20 md:py-28">
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

        {/* Tagline — 4-word company motto */}
        <p
          ref={taglineRef}
          className="mt-10 md:mt-14 font-serif text-ink/85 max-w-2xl leading-tight tracking-tight"
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
            opacity: 0,
            transform: 'translateY(16px)',
            willChange: 'transform, opacity',
          }}
        >
          {copy.hero.tagline}
        </p>

        {/* Mono caption */}
        <p
          ref={captionRef}
          className="mt-6 font-mono text-xs md:text-sm uppercase tracking-widest text-ink/55 max-w-md"
          style={{
            opacity: 0,
            transform: 'translateY(16px)',
            willChange: 'transform, opacity',
          }}
        >
          {copy.hero.caption}
        </p>

        {/* CTA cluster — primary + outline, flex row */}
        <div
          ref={ctaRef}
          className="mt-10 md:mt-14 flex flex-wrap gap-3 md:gap-4"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            willChange: 'transform, opacity',
          }}
        >
          {copy.hero.ctas.map((cta) => {
            const isPrimary = cta.kind === 'primary';
            const isOutline = cta.kind === 'outline';
            const isExternal = cta.href.startsWith('tel:') || cta.href.startsWith('mailto:');

            const baseClass = [
              'inline-flex items-center justify-center text-center',
              'rounded-full font-mono text-xs uppercase tracking-widest',
              'py-3 md:py-4 px-5 md:px-8 min-h-[48px]',
              'transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
            ].join(' ');

            const variantClass = isPrimary
              ? 'bg-mint text-ink hover:bg-ink hover:text-paper'
              : isOutline
                ? 'bg-paper border border-ink text-ink hover:bg-ink hover:text-paper'
                : 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5';

            if (isPrimary) {
              return (
                <MagneticButton
                  key={cta.label}
                  strength={0.15}
                  onClick={() => handleScrollTo(cta.href)}
                  className={`${baseClass} ${variantClass}`}
                >
                  {cta.label}
                </MagneticButton>
              );
            }

            if (isExternal) {
              return (
                <a
                  key={cta.label}
                  href={cta.href}
                  className={`${baseClass} ${variantClass}`}
                  data-cursor="hover"
                >
                  {cta.label}
                </a>
              );
            }

            return (
              <a
                key={cta.label}
                href={cta.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(cta.href);
                }}
                className={`${baseClass} ${variantClass}`}
                data-cursor="hover"
              >
                {cta.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
