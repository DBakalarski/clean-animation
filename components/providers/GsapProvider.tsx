'use client';

import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { registerGsap, ScrollTrigger } from '@/lib/gsap';

export function GsapProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    registerGsap();
  }, []);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.defaults({ scroller: document.body });
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', onScroll);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [lenis]);

  return <>{children}</>;
}
