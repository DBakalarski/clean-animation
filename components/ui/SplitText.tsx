'use client';

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE, DURATION, STAGGER } from '@/lib/easings';
import { pageReady } from '@/lib/pageReady';

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type SplitTextTrigger = 'load' | 'scroll';

type SplitTextProps = {
  children: string;
  as?: React.ElementType;
  split?: 'words' | 'chars';
  stagger?: number;
  delay?: number;
  trigger?: SplitTextTrigger;
  className?: string;
};

// padding-bottom + negative margin: rozszerza widoczny obszar maski o 0.25em
// w dół (mieści descender y/j/g/p) bez wpływu na rytm wierszy h1.
const MASK_STYLE: React.CSSProperties = {
  overflow: 'hidden',
  display: 'inline-block',
  paddingBottom: '0.25em',
  marginBottom: '-0.25em',
  verticalAlign: 'top',
  lineHeight: 'inherit',
};

export function SplitText({
  children,
  as: Tag = 'span',
  split = 'words',
  stagger = STAGGER.base,
  delay = 0,
  trigger = 'scroll',
  className,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Pre-paint: ukryj spany przez gsap.set bezpośrednio (zamiast vanilla DOM)
  // — żeby GSAP miał spójny stan i fromTo nie kolidowało z naszymi styles.
  useIsoLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;
    const el = containerRef.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>('[data-split-token]');
    gsap.set(spans, { yPercent: 150, opacity: 0, willChange: 'transform, opacity' });
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    let cancelled = false;
    const waitFor =
      trigger === 'load'
        ? Promise.all([pageReady, document.fonts.ready])
        : document.fonts.ready;
    waitFor.then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [trigger]);

  // Animacja — plain useEffect zamiast useGSAP, żeby uniknąć gsap.context.revert
  // w trakcie tweena podczas StrictMode double-mount w dev.
  useEffect(() => {
    if (!ready) return;
    const el = containerRef.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLSpanElement>('[data-split-token]');
    if (!spans.length) return;

    if (reduced) {
      spans.forEach((s) => {
        s.style.transform = 'none';
        s.style.opacity = '1';
        s.style.willChange = 'auto';
      });
      return;
    }

    let tween: gsap.core.Tween | null = null;
    let st: ScrollTrigger | null = null;

    const tweenSpans = () => {
      tween = gsap.fromTo(
        spans,
        { yPercent: 150, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: DURATION.slow,
          ease: EASE.expoOut,
          stagger,
          delay,
          onComplete: () => {
            spans.forEach((s) => {
              s.style.willChange = 'auto';
            });
          },
        },
      );
    };

    if (trigger === 'load') {
      tweenSpans();
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: tweenSpans,
      });
    }

    return () => {
      // Kill tylko OUR tween/ScrollTrigger — nie ruszamy inline styles.
      // Jeśli tween był mid-flight, spany zostają w intermediate state;
      // na remount nowy fromTo zaczyna od yPercent:150 i animacja gra od nowa.
      tween?.kill();
      st?.kill();
    };
  }, [ready, reduced, stagger, delay, trigger]);

  const tokens: string[] =
    split === 'words' ? children.split(/(\s+)/) : children.split('');

  return (
    <Tag ref={containerRef as React.RefObject<HTMLSpanElement>} className={className} aria-label={children}>
      {tokens.map((token, i) => {
        if (split === 'words' && /^\s+$/.test(token)) {
          return <span key={i} aria-hidden="true">{token}</span>;
        }
        return (
          <span key={i} style={MASK_STYLE} aria-hidden="true">
            <span data-split-token style={{ display: 'inline-block' }}>
              {token}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
