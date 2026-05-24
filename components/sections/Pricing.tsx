'use client';

import { MaskReveal } from '@/components/ui/MaskReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

export default function Pricing() {
  const p = copy.pricing;

  const handleCta = () => {
    if (typeof document === 'undefined') return;
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-20 md:py-28 bg-paper"
    >
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left column — header + CTA */}
          <header className="md:col-span-5 md:sticky md:top-32 space-y-6 self-start">
            <MaskReveal>
              <p className="caption-mono text-ink/50">{p.eyebrow}</p>
            </MaskReveal>
            <MaskReveal delay={0.05}>
              <h2
                id="pricing-heading"
                className="font-serif text-ink leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                {p.title}
              </h2>
            </MaskReveal>
            <MaskReveal delay={0.15}>
              <p className="font-serif text-ink/75 text-lg md:text-xl leading-relaxed max-w-md">
                {p.lead}
              </p>
            </MaskReveal>

            <MaskReveal delay={0.25} className="pt-6">
              <MagneticButton
                strength={0.15}
                onClick={handleCta}
                className="rounded-full bg-mint text-ink font-mono text-xs uppercase tracking-widest
                           py-4 px-10 min-h-[48px] inline-flex items-center
                           transition-colors duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                           hover:bg-ink hover:text-paper
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {p.cta.label} →
              </MagneticButton>
            </MaskReveal>

            <MaskReveal delay={0.35}>
              <p className="font-mono text-xs text-ink/45 max-w-xs leading-relaxed pt-2">
                {p.footnote}
              </p>
            </MaskReveal>
          </header>

          {/* Right column — factors list */}
          <div className="md:col-span-7">
            <MaskReveal>
              <p className="caption-mono text-mint">— Cena zależy od</p>
            </MaskReveal>

            <ol
              className="mt-8 border-t border-ink/15"
              role="list"
              aria-label="Czynniki wpływające na cenę"
            >
              {p.factors.map((factor, i) => (
                <MaskReveal
                  key={factor}
                  as="li"
                  delay={i * STAGGER.tight}
                  className="block border-b border-ink/15"
                >
                  <div className="flex items-baseline gap-6 py-6 md:py-7">
                    <span className="font-mono text-xs md:text-sm text-ink/40 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-serif text-ink leading-snug tracking-tight"
                      style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                    >
                      {factor}
                    </span>
                  </div>
                </MaskReveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
