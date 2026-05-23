'use client';

import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';

export function Process() {
  return (
    <section id="process" className="py-32 md:py-48">
      <div className="shell">
        {/* Eyebrow + heading */}
        <MaskReveal>
          <span className="caption-mono text-ink/50">{copy.process.label}</span>
        </MaskReveal>
        <MaskReveal delay={0.1}>
          <h2 className="font-serif text-ink mt-4 tracking-tighter">
            {copy.process.title ?? 'Jak pracujemy.'}
          </h2>
        </MaskReveal>

        {/* Step rows — full-width editorial table */}
        <div className="mt-20 md:mt-28">
          {copy.process.steps.map((step, i) => (
            <MaskReveal key={step.n} delay={i * 0.08}>
              <article
                className="grid grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-t border-ink/15 last:border-b"
                aria-label={`Krok ${step.n}: ${step.title}`}
              >
                {/* Large number — col 1-3 */}
                <div className="col-span-12 md:col-span-3">
                  <span
                    className="font-mono text-ink/40"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      display: 'inline-block',
                    }}
                  >
                    {step.n}
                  </span>
                  <span className="mint-dot ml-3 align-middle" aria-hidden="true" />
                </div>

                {/* Title + body — col 4-12 */}
                <div className="col-span-12 md:col-span-9 md:pl-8">
                  <h3 className="font-serif text-ink leading-tight">{step.title}</h3>
                  <p className="mt-4 max-w-2xl text-ink/70 font-serif text-lg md:text-xl leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </article>
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
