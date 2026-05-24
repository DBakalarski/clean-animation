'use client';

import { useState } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';

const faqTitle = copy.faq.title;
const faqEyebrow = copy.faq.eyebrow;

function FaqItem({
  item,
  index,
  reduced,
}: {
  item: { q: string; a: string };
  index: number;
  reduced: boolean;
}) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
    // After height change, refresh ScrollTrigger positions
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div
      data-faq-item
      data-index={index}
      className="py-6 md:py-8 border-b border-ink/10 last:border-b-0"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 text-left cursor-pointer min-h-[44px]"
        data-cursor="hover"
      >
        {/* Question — serif */}
        <span
          className="font-serif text-ink leading-[1.1] tracking-[-0.01em]"
          style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)' }}
        >
          {item.q}
        </span>

        {/* Chevron — rotates with Framer Motion */}
        <m.span
          aria-hidden="true"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </m.span>
      </button>

      {/* Answer — animated height */}
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
            }
            style={{ overflow: 'hidden' }}
            onAnimationComplete={() => ScrollTrigger.refresh()}
          >
            <div className="pt-4 md:pt-6 pr-12">
              <p className="font-mono text-sm md:text-base text-ink/70 leading-relaxed tracking-wide">
                {item.a}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const { items } = copy.faq;
  const reduced = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section id="faq" aria-labelledby="faq-heading" className="py-20 md:py-28 bg-paper">
        <div className="shell">
          {/* Section header */}
          <header className="mb-16 md:mb-24 space-y-4">
            <MaskReveal>
              <p className="caption-mono text-ink/50">{faqEyebrow}</p>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h2
                id="faq-heading"
                className="font-serif leading-[1.0] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                {faqTitle}
              </h2>
            </MaskReveal>
          </header>

          {/* Accordion list — Framer Motion animated height */}
          <div className="divide-y divide-ink/10" role="list">
            {items.map((item, index) => (
              <FaqItem key={index} item={item} index={index} reduced={reduced} />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
