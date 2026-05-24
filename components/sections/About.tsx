'use client';

import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

export function About() {
  const a = copy.about;

  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 md:py-28">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Eyebrow column */}
          <div className="md:col-span-4">
            <MaskReveal>
              <p className="caption-mono text-ink/60">{a.eyebrow}</p>
            </MaskReveal>
          </div>

          {/* Heading + paragraphs */}
          <div className="md:col-span-8">
            <MaskReveal delay={0.05}>
              <h2
                id="about-heading"
                className="font-serif text-ink leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)' }}
              >
                {a.title}
              </h2>
            </MaskReveal>

            <div className="mt-10 md:mt-14 space-y-6 max-w-2xl">
              {a.paragraphs.map((para, i) => (
                <MaskReveal key={i} delay={0.15 + i * STAGGER.base}>
                  <p className="font-serif text-ink/75 text-lg md:text-xl leading-relaxed">
                    {para}
                  </p>
                </MaskReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Obsługiwane obiekty — pill-list editorial */}
        <div className="mt-24 md:mt-32 border-t border-ink/15 pt-10 md:pt-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16">
            <div className="md:col-span-4">
              <MaskReveal>
                <p className="caption-mono text-ink/60">— {a.objectsLabel}</p>
              </MaskReveal>
            </div>
            <MaskReveal className="md:col-span-8" delay={0.1}>
              <p className="font-serif italic text-ink/70 text-lg md:text-xl leading-relaxed">
                {a.objects.join(' · ')}
              </p>
            </MaskReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
