'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const ITEMS = copy.testimonials.items;
const ITEM_COUNT = ITEMS.length;

// Card widths — one dominant card visible, one peeking from the right on
// desktop.  On mobile the card fills the full track width (no peek).
// Values are defined as CSS logical widths; the track is sized accordingly.
const CARD_GAP_PX = 24; // gap-6 = 1.5rem = 24 px

// ---------------------------------------------------------------------------
// Shared card markup
// ---------------------------------------------------------------------------
function TestimonialCard({
  item,
  isActive,
}: {
  item: (typeof ITEMS)[number];
  isActive: boolean;
}) {
  return (
    <blockquote
      className="p-8 border border-ink/10 h-full flex flex-col justify-between bg-paper transition-opacity duration-500"
      style={{ opacity: isActive ? 1 : 0.45 }}
      aria-hidden={!isActive}
    >
      <p className="font-serif text-xl text-ink leading-snug">
        &ldquo;{item.quote}&rdquo;
      </p>
      <footer className="font-mono text-xs text-ink/50 mt-6">
        — {item.author}
        {item.role && (
          <span className="block text-ink/40 mt-1 normal-case">{item.role}</span>
        )}
      </footer>
    </blockquote>
  );
}

// ---------------------------------------------------------------------------
// Static header
// ---------------------------------------------------------------------------
function TestimonialsHeader() {
  return (
    <header className="mb-16 md:mb-20 max-w-3xl space-y-4">
      <MaskReveal>
        <span className="caption-mono text-ink/60">{copy.testimonials.eyebrow}</span>
      </MaskReveal>
      <MaskReveal delay={0.1}>
        <h2
          id="testimonials-heading"
          className="font-serif text-ink leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)' }}
        >
          {copy.testimonials.title}
        </h2>
      </MaskReveal>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Static grid — reduced-motion AND mobile fallback
// ---------------------------------------------------------------------------
function StaticGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {ITEMS.map((item, i) => (
        <MaskReveal key={i} delay={i * STAGGER.loose}>
          {/* In static mode every card is "active" (full opacity) */}
          <TestimonialCard item={item} isActive />
        </MaskReveal>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dot indicators
// ---------------------------------------------------------------------------
function Dots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Przejdź do opinii"
      className="flex items-center gap-3 justify-center mt-10"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-label={`Opinia ${i + 1}`}
          aria-current={active === i ? 'true' : undefined}
          onClick={() => onSelect(i)}
          className={[
            'w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mint',
            active === i
              ? 'bg-mint scale-125'
              : 'bg-ink/30 hover:bg-ink/50',
          ].join(' ')}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Arrow buttons (editorial minimal — mono glyphs)
// ---------------------------------------------------------------------------
function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Poprzednia opinia' : 'Następna opinia'}
      className={[
        'font-mono text-base text-ink/50 hover:text-ink transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
        'disabled:opacity-20 disabled:pointer-events-none select-none',
      ].join(' ')}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  );
}

// ---------------------------------------------------------------------------
// The carousel engine — shared between desktop and mobile animation branches
// ---------------------------------------------------------------------------
function CarouselTrack({
  isMobile,
  reduced,
}: {
  isMobile: boolean;
  reduced: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  // Ref to track the x position at drag start so we can compute offset
  const dragStartXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay disabled for reduced-motion users; timing differs by device.
  const autoplayMs = isMobile ? 8000 : 6000;
  const shouldAutoplay = !reduced && !isPaused && !isDragging;

  const advance = useCallback(
    () => setIndex((i) => (i + 1) % ITEM_COUNT),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + ITEM_COUNT) % ITEM_COUNT),
    [],
  );

  // setInterval autoplay with full cleanup
  useEffect(() => {
    if (!shouldAutoplay) return;
    const id = setInterval(advance, autoplayMs);
    return () => clearInterval(id);
  }, [shouldAutoplay, autoplayMs, advance]);

  // ── Slide width calculation ──────────────────────────────────────────────
  // Desktop: card takes 72% of container, remainder is the peek.
  // Mobile:  card takes 100% (no peek).
  const cardWidthPercent = isMobile ? 100 : 72;

  // Track translate is computed from card widths in percent of *track* width.
  // Track total width = ITEM_COUNT * (cardWidthPercent% + gap).
  // We position via translateX in pixels relative to the card width fraction.
  // To keep it simple we use a CSS custom property driven by JS.
  // Framer-motion animate={{ x }} in pixels requires knowing containerWidth.
  // We derive it after mount via ResizeObserver.
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Card width in px; gap is only between cards (not before first / after last)
  // so the slide offset is (cardPx + gap) per step.
  const cardPx = containerWidth * (cardWidthPercent / 100);
  const slideOffsetPx = cardPx + CARD_GAP_PX;
  const trackX = -index * slideOffsetPx;

  // Framer spring transition for snapping
  const snapTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 38,
    mass: 0.9,
  };

  // ── Drag handling ────────────────────────────────────────────────────────
  function handleDragStart(_: unknown, info: { point: { x: number } }) {
    setIsDragging(true);
    dragStartXRef.current = info.point.x;
  }

  function handleDragEnd(
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) {
    setIsDragging(false);
    const THRESHOLD_PX = 50;
    const THRESHOLD_VEL = 400; // px/s

    if (info.offset.x < -THRESHOLD_PX || info.velocity.x < -THRESHOLD_VEL) {
      setIndex((i) => Math.min(i + 1, ITEM_COUNT - 1));
    } else if (info.offset.x > THRESHOLD_PX || info.velocity.x > THRESHOLD_VEL) {
      setIndex((i) => Math.max(i - 1, 0));
    }
    // else snap back to current — Framer animate will restore trackX
  }

  // ── Layout ───────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Overflow clip — only in x direction so vertical content breathes */}
      <div className="overflow-hidden">
        <m.div
          drag="x"
          // Constrain drag so the track cannot fly far off-screen
          dragConstraints={{
            left: -(slideOffsetPx * (ITEM_COUNT - 1) + slideOffsetPx * 0.5),
            right: slideOffsetPx * 0.5,
          }}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={{ x: containerWidth > 0 ? trackX : 0 }}
          transition={snapTransition}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ gap: CARD_GAP_PX }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 select-none"
              style={{
                // Use px width derived from containerWidth so flex children
                // are sized relative to the outer container, not the
                // scrolling track (which would create a circular dependency).
                // Falls back to percent string before containerWidth is known.
                width: cardPx > 0 ? cardPx : `${cardWidthPercent}%`,
              }}
            >
              <TestimonialCard item={item} isActive={index === i} />
            </div>
          ))}
        </m.div>
      </div>

      {/* Controls row: arrows flanking the dots */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <ArrowButton
          direction="prev"
          onClick={prev}
          disabled={index === 0}
        />
        <Dots count={ITEM_COUNT} active={index} onSelect={setIndex} />
        <ArrowButton
          direction="next"
          onClick={advance}
          disabled={index === ITEM_COUNT - 1}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export function Testimonials() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  // ── Reduced-motion branch ────────────────────────────────────────────────
  // All cards visible, no autoplay, no slide animation — user controls only.
  if (reduced) {
    return (
      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="py-20 md:py-28"
      >
        <div className="shell">
          <TestimonialsHeader />
          <StaticGrid />
          <p className="caption-mono text-ink/40 mt-12">{copy.testimonials.status}</p>
        </div>
      </section>
    );
  }

  // ── Mobile carousel ──────────────────────────────────────────────────────
  // Same carousel engine: 1 card wide, 8 s autoplay, swipe supported.
  if (isMobile) {
    return (
      <LazyMotion features={domAnimation}>
        <section
          id="testimonials"
          aria-labelledby="testimonials-heading"
          className="py-20"
        >
          <div className="shell">
            <TestimonialsHeader />
            <div className="mt-12">
              <CarouselTrack isMobile reduced={reduced} />
            </div>
            <p className="caption-mono text-ink/40 mt-12">{copy.testimonials.status}</p>
          </div>
        </section>
      </LazyMotion>
    );
  }

  // ── Desktop carousel ─────────────────────────────────────────────────────
  // 1 dominant card (72 % container width) + peek of next card on the right.
  // Autoplay 6 s, pause on hover, drag to swipe, dot + arrow navigation.
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="py-20 md:py-28"
      >
        <div className="shell">
          <TestimonialsHeader />
          <div className="mt-12">
            <CarouselTrack isMobile={false} reduced={reduced} />
          </div>
          <p className="caption-mono text-ink/40 mt-12">{copy.testimonials.status}</p>
        </div>
      </section>
    </LazyMotion>
  );
}
