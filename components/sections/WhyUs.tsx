'use client';

import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

export function WhyUs() {
  const w = copy.whyUs;

  return (
    <section id="why-us" aria-labelledby="whyus-heading" className="py-20 md:py-28 bg-paper">
      <div className="shell">
        {/* Header */}
        <header className="mb-16 md:mb-24 space-y-4 max-w-3xl">
          <MaskReveal>
            <p className="caption-mono text-ink/60">{w.eyebrow}</p>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              id="whyus-heading"
              className="font-serif text-ink leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              {w.title}
            </h2>
          </MaskReveal>
        </header>

        {/* 8 reasons — 2 columns desktop, 1 mobile */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16"
          role="list"
        >
          {w.items.map((item, i) => (
            <MaskReveal
              key={item.n}
              as="li"
              delay={i * STAGGER.tight}
              className="grid grid-cols-12 gap-4"
            >
              {/* Number — col 1-3 */}
              <div className="col-span-12 md:col-span-3">
                <span
                  className="font-mono text-ink/40 inline-block"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.n}
                </span>
              </div>
              {/* Title + body — col 4-12 */}
              <div className="col-span-12 md:col-span-9">
                <h3 className="font-serif text-ink leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 font-serif text-ink/70 text-base md:text-lg leading-relaxed">
                  {item.body}
                </p>
              </div>
            </MaskReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
