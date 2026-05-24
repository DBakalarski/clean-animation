'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';
import { EASE, STAGGER } from '@/lib/easings';

// 4 ring distances: 25, 50, 75, 100 km — scaled so 100 km = 240 px radius
const RING_KM = [25, 50, 75, 100];
// 100 km maps to 240 px → 1 km = 2.4 px
const PX_PER_KM = 2.4;
// SVG centre
const CX = 300;
const CY = 300;

/**
 * Angle convention used throughout RadialMap:
 *   0°   = East  (right)
 *   90°  = South (down)
 *   180° = West  (left)
 *   270° = North (up)
 * Clockwise, matching SVG y-down coordinate space.
 */
function cityPosition(angle: number, km: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    cx: CX + km * PX_PER_KM * Math.cos(rad),
    cy: CY + km * PX_PER_KM * Math.sin(rad),
    rad,
  };
}

/**
 * Editorial radial map — concentric rings centred on Konin.
 * Pure SVG, no external map provider. Each ring = 25 km.
 * Cities from copy.area.cities are plotted as ink dots with mono labels.
 */
function RadialMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const cities = copy.area.cities;

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      const rings = svg.querySelectorAll<SVGCircleElement>('[data-ring]');
      const labels = svg.querySelectorAll<SVGGElement>('[data-label]');
      const center = svg.querySelector<SVGCircleElement>('[data-center]');
      const cityDots = svg.querySelectorAll<SVGCircleElement>('[data-city-dot]');
      const cityLabels = svg.querySelectorAll<SVGTextElement>('[data-city-label]');

      if (reduced) {
        // Immediately show end-state — no animation
        rings.forEach((r) => {
          r.style.strokeDasharray = 'none';
          r.style.strokeDashoffset = '0';
          r.style.opacity = '1';
        });
        labels.forEach((l) => (l.style.opacity = '1'));
        if (center) center.style.opacity = '1';
        cityDots.forEach((d) => {
          d.style.opacity = '1';
          d.style.transform = 'scale(1)';
        });
        cityLabels.forEach((l) => {
          l.style.opacity = '1';
        });
        return;
      }

      // Setup initial states — rings drawn via dasharray
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
      gsap.set(cityDots, { opacity: 0, scale: 0, transformOrigin: 'center center' });
      gsap.set(cityLabels, { opacity: 0, y: 4 });

      const factor = isMobile ? 0.7 : 1;

      ScrollTrigger.create({
        trigger: svg,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          if (center) {
            tl.to(center, { opacity: 1, scale: 1, duration: 0.6 * factor, ease: EASE.expoOut });
          }

          tl.to(
            rings,
            {
              strokeDashoffset: 0,
              duration: 1.4 * factor,
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
              duration: 0.6 * factor,
              ease: EASE.expoOut,
              stagger: STAGGER.tight,
            },
            '-=0.8',
          );

          // City dots pop in after rings finish drawing
          tl.to(
            cityDots,
            {
              opacity: 1,
              scale: 1,
              duration: 0.5 * factor,
              ease: EASE.expoOut,
              stagger: STAGGER.tight,
            },
            '-=0.6',
          );

          tl.to(
            cityLabels,
            {
              opacity: 1,
              y: 0,
              duration: 0.5 * factor,
              ease: EASE.expoOut,
              stagger: STAGGER.tight,
            },
            '-=0.4',
          );
        },
      });
    },
    { scope: svgRef, dependencies: [reduced, isMobile] },
  );

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
          cx={CX}
          cy={CY}
          r={km * PX_PER_KM}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={km === 100 ? 0.35 : 0.12}
          strokeWidth={km === 100 ? 1.25 : 0.75}
        />
      ))}

      {/* Cardinal axis hairlines */}
      <line x1={CX} y1="60" x2={CX} y2="540" stroke="var(--color-ink)" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="60" y1={CY} x2="540" y2={CY} stroke="var(--color-ink)" strokeOpacity="0.06" strokeWidth="0.5" />

      {/* Distance labels on east axis */}
      {RING_KM.map((km) => (
        <g key={`lbl-${km}`} data-label transform={`translate(${CX + km * PX_PER_KM} ${CY - 4})`}>
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

      {/* Konin marker — centre (mint, rendered above rings but below city dots) */}
      <g>
        <circle
          data-center
          cx={CX}
          cy={CY}
          r="6"
          fill="var(--color-mint)"
        />
        <g data-label transform={`translate(${CX} ${CY - 18})`}>
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

      {/* Satellite city dots + labels — all cities with km > 0 */}
      {cities
        .filter((c) => c.km > 0)
        .map((city, i) => {
          const { cx, cy, rad } = cityPosition(city.angle, city.km);
          // Label sits 12 px beyond the dot, away from centre
          const LABEL_GAP = 12;
          const lx = cx + LABEL_GAP * Math.cos(rad);
          const ly = cy + LABEL_GAP * Math.sin(rad);
          // textAnchor: if dot is on right half of SVG (cos > 0) → start; left half → end
          const anchor = Math.cos(rad) >= 0 ? 'start' : 'end';
          // Font size: outer cities (≥60 km) get 10px, inner get 9px — both legible after scale
          const fontSize = city.km >= 60 ? 10 : 9;

          return (
            <g key={city.name} data-city-index={i}>
              <circle
                data-city-dot
                cx={cx}
                cy={cy}
                r="3.5"
                fill="var(--color-ink)"
                fillOpacity="0.75"
              />
              <text
                data-city-label
                x={lx}
                y={ly}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize={fontSize}
                fill="var(--color-ink)"
                fillOpacity="0.7"
                letterSpacing="0.08em"
                textAnchor={anchor}
                dominantBaseline="middle"
              >
                {city.name.toUpperCase()}
              </text>
            </g>
          );
        })}
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
              <p className="caption-mono text-ink/60">{a.eyebrow}</p>
            </MaskReveal>
            <MaskReveal delay={0.05}>
              <h2
                id="area-heading"
                className="font-serif text-ink leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
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

          {/* Map column — city dots are rendered inside RadialMap SVG */}
          <div className="md:col-span-7">
            <RadialMap />
          </div>
        </div>
      </div>
    </section>
  );
}
