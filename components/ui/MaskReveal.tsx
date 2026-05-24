'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { EASE, DURATION } from '@/lib/easings';

type MaskRevealFrom = 'bottom' | 'left';

// Use HTMLAttributes so all standard HTML + data-* attrs are accepted without polluting
// the children type. The `as` prop controls the rendered host element.
export interface MaskRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  delay?: number;
  from?: MaskRevealFrom;
  trigger?: string;
}

export function MaskReveal({
  children,
  as: Tag = 'div',
  delay = 0,
  from = 'bottom',
  trigger = 'top 92%',
  className,
  style,
  ...rest
}: MaskRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Reduced-motion: jump to final state instantly
      if (reduced) {
        gsap.set(el, { clipPath: 'inset(0 0 0% 0)' });
        return;
      }

      const clipFrom = from === 'bottom' ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)';
      const clipTo = 'inset(0 0 0% 0)';

      // Mobile: fire later (element further in view) and resolve ~30% faster.
      // Only override start when caller is using the default — preserves custom triggers.
      const effectiveTrigger = isMobile && trigger === 'top 92%' ? 'top 82%' : trigger;
      const effectiveDuration = isMobile ? DURATION.reveal * 0.7 : DURATION.reveal;

      gsap.set(el, { clipPath: clipFrom });

      ScrollTrigger.create({
        trigger: el,
        start: effectiveTrigger,
        once: true,
        onEnter: () => {
          gsap.set(el, { willChange: 'clip-path' });
          gsap.to(el, {
            clipPath: clipTo,
            duration: effectiveDuration,
            ease: EASE.expoOut,
            delay,
            onComplete: () => {
              gsap.set(el, { willChange: 'auto' });
            },
          });
        },
      });
    },
    { scope: containerRef, dependencies: [reduced, isMobile, delay, from, trigger] },
  );

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as any}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
