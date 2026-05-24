'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
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

      gsap.set(el, { clipPath: clipFrom });

      ScrollTrigger.create({
        trigger: el,
        start: trigger,
        once: true,
        onEnter: () => {
          gsap.set(el, { willChange: 'clip-path' });
          gsap.to(el, {
            clipPath: clipTo,
            duration: DURATION.reveal,
            ease: EASE.expoOut,
            delay,
            onComplete: () => {
              gsap.set(el, { willChange: 'auto' });
            },
          });
        },
      });
    },
    { scope: containerRef, dependencies: [reduced, delay, from, trigger] },
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
