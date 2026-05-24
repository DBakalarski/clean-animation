'use client';

import { MaskReveal } from '@/components/ui/MaskReveal';
import { Marquee } from '@/components/ui/Marquee';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

type ServiceItem = { title: string; body: string };

function ServiceColumn({
  kicker,
  heading,
  lead,
  items,
}: {
  kicker: string;
  heading: string;
  lead?: string;
  items: readonly ServiceItem[];
}) {
  return (
    <div>
      {/* Column header */}
      <header className="mb-10 md:mb-14">
        <MaskReveal>
          <p className="caption-mono text-mint">— {kicker}</p>
        </MaskReveal>
        <MaskReveal delay={0.05}>
          <h3
            className="mt-4 font-serif text-ink leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            {heading}
          </h3>
        </MaskReveal>
        {lead && (
          <MaskReveal delay={0.1}>
            <p className="mt-4 font-serif text-ink/70 text-base md:text-lg leading-relaxed max-w-md">
              {lead}
            </p>
          </MaskReveal>
        )}
      </header>

      {/* Service list — hairline rows */}
      <ul className="border-t border-ink/15" role="list">
        {items.map((item, i) => (
          <MaskReveal
            key={item.title}
            as="li"
            delay={i * STAGGER.tight}
            className="block border-b border-ink/15"
          >
            <article className="py-6 md:py-8">
              <h4 className="font-serif text-ink leading-snug tracking-tight text-lg md:text-xl">
                {item.title}
              </h4>
              <p className="mt-2 font-serif text-ink/65 text-sm md:text-base leading-relaxed max-w-prose">
                {item.body}
              </p>
            </article>
          </MaskReveal>
        ))}
      </ul>
    </div>
  );
}

export function Services() {
  const s = copy.services;

  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 md:py-28 overflow-hidden">
      {/* Eyebrow marquee — slow editorial typography flow */}
      <MaskReveal as="div" className="mb-16 md:mb-24">
        <Marquee speed={70} direction="left">
          {s.marquee.map((item, i) => (
            <span key={i} className="inline-flex items-baseline">
              <span
                className="font-serif text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-tighter text-ink/80 whitespace-nowrap px-4"
              >
                {item}
              </span>
              <span
                className="font-mono text-[clamp(1rem,3vw,3rem)] text-mint select-none"
                aria-hidden="true"
              >
                ·
              </span>
            </span>
          ))}
        </Marquee>
      </MaskReveal>

      <div className="shell">
        {/* Section heading */}
        <header className="mb-20 md:mb-28 max-w-3xl">
          <MaskReveal>
            <p className="caption-mono text-ink/50">{s.eyebrow}</p>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              id="services-heading"
              className="mt-4 font-serif text-ink leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {s.title}
            </h2>
          </MaskReveal>
        </header>

        {/* Two-column layout: private + commercial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <ServiceColumn
            kicker={s.private.kicker}
            heading={s.private.heading}
            items={s.private.items}
          />
          <ServiceColumn
            kicker={s.commercial.kicker}
            heading={s.commercial.heading}
            lead={s.commercial.lead}
            items={s.commercial.items}
          />
        </div>

        {/* Additional services — full-width pill list */}
        <div className="mt-24 md:mt-32 border-t border-ink/15 pt-12 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-4">
              <MaskReveal>
                <p className="caption-mono text-mint">— {s.additional.kicker}</p>
              </MaskReveal>
              <MaskReveal delay={0.05}>
                <h3
                  className="mt-4 font-serif text-ink leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                >
                  {s.additional.heading}
                </h3>
              </MaskReveal>
            </div>
            <ul
              className="md:col-span-8 flex flex-wrap gap-x-2.5 gap-y-2.5"
              role="list"
              aria-label={s.additional.heading}
            >
              {s.additional.items.map((item, i) => (
                <MaskReveal
                  key={item}
                  as="li"
                  delay={i * STAGGER.tight}
                  className="inline-flex"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-ink/75 border border-ink/20 rounded-full px-3.5 py-2">
                    {item}
                  </span>
                </MaskReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
