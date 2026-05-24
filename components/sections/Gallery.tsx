'use client';

// TODO(photos): when client supplies real before/after photos, replace the dot-grid SVG
// inside <BeforeSlot> / <AfterSlot> with <Image src={item.before} /> and <Image src={item.after} />.
// Add tap-toggle for mobile (touch can't hover). The outer <article> + slot structure stays identical —
// swap only the inner fill of each slot. See the `imageUrl` prop scaffold in BeforeSlot / AfterSlot.

import { m, LazyMotion, domAnimation } from 'framer-motion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';

// ─── Dot-grid wireframe primitive ────────────────────────────────────────────
// 16 px dot spacing, ink/15 fill. Intentionally schematic — not a broken image.
// `uid` must be unique per instance so SVG pattern `url(#...)` resolves correctly
// across all 12 slots in the page DOM.
function DotGrid({ uid }: { uid: string }) {
  const patternId = `dot-grid-${uid}`;
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="rgba(14,26,26,0.15)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

// ─── Individual before / after slot ──────────────────────────────────────────
// When photos arrive: add `imageUrl?: string` prop, render <Image> when present,
// fall back to dot-grid when absent.
interface SlotProps {
  label: string;
  uid: string;
  // imageUrl?: string;  // uncomment when photos are available
}

function BeforeSlot({ label, uid }: SlotProps) {
  return (
    <div className="relative overflow-hidden bg-[#F7F5F0] border-r border-ink/10">
      <DotGrid uid={uid} />
      <span className="absolute top-2.5 left-3 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink/40 z-10 select-none">
        {label}
      </span>
    </div>
  );
}

function AfterSlot({ label, uid }: SlotProps) {
  return (
    <div className="relative overflow-hidden bg-[#F7F5F0]">
      <DotGrid uid={uid} />
      <span className="absolute top-2.5 left-3 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink/40 z-10 select-none">
        {label}
      </span>
    </div>
  );
}

// ─── Single gallery card ──────────────────────────────────────────────────────
interface GalleryItem {
  caption: string;
  meta: string;
}

interface GalleryCellProps {
  item: GalleryItem;
  index: number;
  beforeLabel: string;
  afterLabel: string;
}

function GalleryCell({ item, index, beforeLabel, afterLabel }: GalleryCellProps) {
  // Zero-padded numeral — editorial anchor across both slots
  const numeral = String(index + 1).padStart(2, '0');

  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: index * 0.06,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group hover:scale-[1.01] transition-transform duration-300 ease-out"
    >
      {/* Slot container — 4:5 aspect, split 50/50 PRZED/PO */}
      <div className="relative aspect-[4/5] grid grid-cols-2 border border-ink/10">
        <BeforeSlot label={beforeLabel} uid={`${index}-b`} />
        <AfterSlot label={afterLabel} uid={`${index}-a`} />

        {/* Zero-padded numeral — spans both slots, editorial anchor */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-mono text-ink/10 leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          {numeral}
        </span>
      </div>

      {/* Caption block below the slot grid */}
      <div className="mt-4 space-y-1">
        <p className="font-serif text-base text-ink leading-snug">
          {item.caption}
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink/55">
          {item.meta}
        </p>
      </div>
    </m.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Gallery() {
  const g = copy.gallery;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="py-32 md:py-48 border-t border-ink/10"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="space-y-6 md:space-y-8 mb-16 md:mb-24">
            <MaskReveal>
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink/40 block">
                {g.eyebrow}
              </span>
            </MaskReveal>

            <MaskReveal delay={0.1}>
              <h2
                id="gallery-heading"
                className="font-serif text-ink leading-[0.95] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(1.75rem,4vw,3rem)' }}
              >
                {g.title}
              </h2>
            </MaskReveal>

            {/* Visible disclosure — user must see this is a schema, not a real photo */}
            <MaskReveal delay={0.18}>
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.1em] text-ink/55 max-w-prose">
                {g.note}
              </p>
            </MaskReveal>
          </div>

          {/* Wireframe grid — 3×2 desktop, 2×3 tablet, 1×6 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {g.items.map((item, i) => (
              <GalleryCell
                key={item.caption}
                item={item}
                index={i}
                beforeLabel={g.beforeLabel}
                afterLabel={g.afterLabel}
              />
            ))}
          </div>

        </div>
      </section>
    </LazyMotion>
  );
}
