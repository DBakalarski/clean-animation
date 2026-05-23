'use client';

import { MaskReveal } from '@/components/ui/MaskReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

export default function Pricing() {
  const { plans, label } = copy.pricing;
  // editorial-stylist extended copy keys — fall back gracefully
  const eyebrow = (copy.pricing as Record<string, unknown>).eyebrow as string | undefined;
  const title = (copy.pricing as Record<string, unknown>).title as string | undefined;

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-32 md:py-48 bg-paper">
      <div className="shell">
        {/* Section header */}
        <header className="mb-16 md:mb-24 space-y-4">
          <MaskReveal>
            <p className="caption-mono text-ink/50">{label}{eyebrow ? ` — ${eyebrow}` : ''}</p>
          </MaskReveal>
          {title && (
            <MaskReveal delay={0.1}>
              <h2
                id="pricing-heading"
                className="font-serif leading-[1.0] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
              >
                {title}
              </h2>
            </MaskReveal>
          )}
        </header>

        {/* Pricing cards grid */}
        <ul
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          role="list"
          aria-label="Dostępne pakiety"
        >
          {plans.map((plan, index) => (
            <MaskReveal
              key={plan.name}
              as="li"
              delay={index * STAGGER.loose}
              className="group flex flex-col border border-ink/10 p-8 md:p-10
                         transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                         hover:-translate-y-1.5 hover:shadow-card-hover"
              data-pricing-card
              data-index={index}
            >
              {/* Plan name */}
              <p className="caption-mono text-ink/50 mb-6">{plan.name}</p>

              {/* Price — serif display, the hero of each card */}
              <div className="mb-2">
                <span
                  className="font-serif text-ink leading-[0.9] tracking-[-0.02em] block"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  {plan.price}
                </span>
              </div>

              {/* Price note — mono qualifier under price */}
              {Boolean((plan as Record<string, unknown>).priceNote) && (
                <p className="label-mono text-ink/50 mb-10">{String((plan as Record<string, unknown>).priceNote ?? '')}</p>
              )}

              {/* Feature list — mono with interpunct bullet */}
              <ul className="flex flex-col gap-3 mb-10 flex-1" role="list">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="font-mono text-xs md:text-sm text-ink/70 flex items-center gap-3"
                  >
                    <span className="mint-dot" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA — MagneticButton */}
              <MagneticButton
                strength={0.25}
                onClick={() => {
                  document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full border border-ink text-ink font-mono text-xs uppercase tracking-widest
                           py-3 px-8 self-start
                           bg-paper
                           transition-colors duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                           hover:bg-mint hover:border-mint hover:text-ink
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {(plan as Record<string, unknown>).cta as string ?? 'Wyceń'}
              </MagneticButton>
            </MaskReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
