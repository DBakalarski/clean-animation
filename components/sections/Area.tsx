'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';
import { EASE, STAGGER } from '@/lib/easings';

/**
 * Editorial radial map — concentric rings centred on Konin.
 * Pure SVG, no external map provider. Each ring = 25 km.
 */
function RadialMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      const rings = svg.querySelectorAll<SVGCircleElement>('[data-ring]');
      const labels = svg.querySelectorAll<SVGGElement>('[data-label]');
      const center = svg.querySelector<SVGCircleElement>('[data-center]');

      if (reduced) {
        rings.forEach((r) => {
          r.style.strokeDasharray = 'none';
          r.style.strokeDashoffset = '0';
          r.style.opacity = '1';
        });
        labels.forEach((l) => (l.style.opacity = '1'));
        if (center) center.style.opacity = '1';
        return;
      }

      // Setup initial states — rings drawn as dasharray
      rings.forEach((ring) => {
        const r = parseFloat(ring.getAttribute('r') ?? '0');
        const c = 2 * Math.PI * r;
        gsap.set(ring, {
          strokeDasharray: c,
          strokeDashoffset: c,
          opacity: 0.6,
        });
      });
      gsap.set(labels, { opacity: 0, y: 8 });
      if (center) gsap.set(center, { opacity: 0, scale: 0, transformOrigin: 'center center' });

      ScrollTrigger.create({
        trigger: svg,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          if (center) {
            tl.to(center, { opacity: 1, scale: 1, duration: 0.6, ease: EASE.expoOut });
          }
          tl.to(
            rings,
            {
              strokeDashoffset: 0,
              duration: 1.4,
              ease: EASE.expoOut,
              stagger: STAGGER.base,
            },
            '-=0.3',
          );
          tl.to(
            labels,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: EASE.expoOut,
              stagger: STAGGER.tight,
            },
            '-=0.8',
          );
        },
      });
    },
    { scope: svgRef, dependencies: [reduced] },
  );

  // 4 ring distances: 25, 50, 75, 100 km — scaled so 100km = 240px (radius)
  const RING_KM = [25, 50, 75, 100];
  const PX_PER_KM = 2.4;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 600"
      role="img"
      aria-label="Zasięg działania: Konin i okolice do 100 km w każdą stronę"
      className="w-full h-auto max-w-[600px] mx-auto"
    >
      {/* Concentric range rings */}
      {RING_KM.map((km) => (
        <circle
          key={km}
          data-ring
          cx="300"
          cy="300"
          r={km * PX_PER_KM}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={km === 100 ? 0.35 : 0.12}
          strokeWidth={km === 100 ? 1.25 : 0.75}
        />
      ))}

      {/* Cardinal axis hairlines */}
      <line x1="300" y1="60" x2="300" y2="540" stroke="var(--color-ink)" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="60" y1="300" x2="540" y2="300" stroke="var(--color-ink)" strokeOpacity="0.06" strokeWidth="0.5" />

      {/* Distance labels on east axis */}
      {RING_KM.map((km) => (
        <g key={`lbl-${km}`} data-label transform={`translate(${300 + km * PX_PER_KM} 296)`}>
          <text
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="10"
            fill="var(--color-ink)"
            fillOpacity="0.45"
            letterSpacing="0.1em"
            textAnchor="start"
            dx="4"
          >
            {km} km
          </text>
        </g>
      ))}

      {/* Konin marker — centre */}
      <g>
        <circle
          data-center
          cx="300"
          cy="300"
          r="6"
          fill="var(--color-mint)"
        />
        <g data-label transform="translate(300 282)">
          <text
            fontFamily="var(--font-fraunces), Georgia, serif"
            fontSize="18"
            fill="var(--color-ink)"
            fontWeight="500"
            letterSpacing="-0.01em"
            textAnchor="middle"
          >
            Konin
          </text>
        </g>
      </g>
    </svg>
  );
}

export function Area() {
  const a = copy.area;

  return (
    <section id="area" aria-labelledby="area-heading" className="py-20 md:py-28">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Text column */}
          <div className="md:col-span-5 md:sticky md:top-32 space-y-8">
            <MaskReveal>
              <p className="caption-mono text-ink/50">{a.eyebrow}</p>
            </MaskReveal>
            <MaskReveal delay={0.05}>
              <h2
                id="area-heading"
                className="font-serif text-ink leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                {a.title}
              </h2>
            </MaskReveal>
            <MaskReveal delay={0.15}>
              <p className="font-serif text-ink/75 text-lg md:text-xl leading-relaxed max-w-lg">
                {a.body}
              </p>
            </MaskReveal>
            <MaskReveal delay={0.25}>
              <p className="caption-mono text-ink/40">— {a.note}</p>
            </MaskReveal>
          </div>

          {/* Map column */}
          <div className="md:col-span-7">
            <RadialMap />

            {/* City list under map */}
            <ul
              className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-3 max-w-xl mx-auto"
              role="list"
              aria-label="Przykładowe miejscowości w zasięgu"
            >
              {a.cities.map((city, i) => (
                <MaskReveal
                  key={city}
                  as="li"
                  delay={i * STAGGER.tight}
                  className="inline-flex"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-ink/60 border border-ink/15 rounded-full px-3 py-1.5">
                    {city}
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
