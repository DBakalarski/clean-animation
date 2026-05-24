'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useLenis } from '@/hooks/useLenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { copy } from '@/lib/copy';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !lenis) return;

    const onScroll = ({ direction }: { direction: number }) => {
      const nav = navRef.current;
      if (!nav) return;
      gsap.to(nav, {
        y: direction === 1 ? -80 : 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis, reduced]);

  return (
    <nav
      ref={navRef}
      data-nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-paper/85 border-b border-ink/[0.06]"
      aria-label="Nawigacja główna"
    >
      <div className="shell flex items-center justify-between gap-4 h-14 lg:h-16">
        {/* Brand — full name on lg+, short CSK below lg */}
        <a
          href="/"
          className="font-serif tracking-tight text-ink select-none inline-flex items-center min-h-[44px] shrink-0"
          aria-label={`${copy.nav.brand} — powrót na górę`}
        >
          <span className="hidden lg:inline text-lg lg:text-xl">
            {copy.nav.brand}
          </span>
          <span className="lg:hidden text-lg font-semibold">
            {copy.nav.brandShort}
          </span>
        </a>

        {/* Primary nav links — visible only on lg+ where layout has room */}
        <ul className="hidden lg:flex items-center gap-8" role="list">
          {copy.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline font-mono text-xs uppercase tracking-widest text-ink/80 hover:text-ink transition-colors duration-300 inline-flex items-center min-h-[44px]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Sticky phone CTA — always visible; number text from md+ so pill stays single-line */}
        <a
          href={copy.nav.phone.href}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest
                     bg-mint text-ink rounded-full px-4 py-2 min-h-[40px]
                     transition-colors duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                     hover:bg-ink hover:text-paper
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          aria-label={`Zadzwoń: ${copy.nav.phone.display}`}
          data-cursor="hover"
        >
          <span aria-hidden="true">☎</span>
          <span className="hidden md:inline">{copy.nav.phone.display}</span>
          <span className="md:hidden">Zadzwoń</span>
        </a>
      </div>
    </nav>
  );
}
