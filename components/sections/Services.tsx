'use client';

import { MaskReveal } from '@/components/ui/MaskReveal';
import { Marquee } from '@/components/ui/Marquee';
import { copy } from '@/lib/copy';

export function Services() {
  return (
    <section id="services" className="py-32 md:py-48 overflow-hidden">
      <MaskReveal as="div" className="shell mb-12">
        <span className="caption-mono text-ink/50">{copy.services.label}</span>
      </MaskReveal>

      {/* Full-bleed marquee — no shell constraint */}
      <MaskReveal as="div">
        <Marquee speed={100} direction="left">
          {copy.services.items.map((item, i) => (
            <span key={i} className="inline-flex items-baseline">
              <a
                href="#pricing"
                className="font-serif text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-tighter text-ink hover:text-mint transition-colors duration-350 ease-expo-out whitespace-nowrap px-4"
                data-cursor="hover"
              >
                {item}
              </a>
              {/* Separator — mono dash in ink/40 */}
              <span
                className="font-mono text-[clamp(1rem,3vw,3rem)] text-ink/40 select-none"
                aria-hidden="true"
              >
                —
              </span>
            </span>
          ))}
        </Marquee>
      </MaskReveal>
    </section>
  );
}
