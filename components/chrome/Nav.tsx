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
      // direction 1 = scrolling down, -1 = scrolling up
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-paper/80 border-b border-ink/[0.06]"
      aria-label="Nawigacja główna"
    >
      <div className="shell flex items-center justify-between h-14 md:h-16">
        {/* Logo — serif, confident, no icon */}
        <a
          href="/"
          className="font-serif text-lg md:text-xl tracking-tight text-ink select-none inline-flex items-center min-h-[44px]"
          aria-label={copy.nav.brand + ' — powrót na górę'}
        >
          {copy.nav.brand}
        </a>

        {/* Primary nav links — mono, hover underline scaleX from left */}
        <ul className="flex items-center gap-6 md:gap-10" role="list">
          {copy.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline font-mono text-xs uppercase tracking-widest text-ink/80 hover:text-ink transition-colors duration-300 inline-flex items-center min-h-[44px] min-w-[44px] justify-center"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
