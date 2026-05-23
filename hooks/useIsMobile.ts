'use client';

import { useEffect, useState } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    const lowCores =
      typeof navigator !== 'undefined' &&
      'hardwareConcurrency' in navigator &&
      navigator.hardwareConcurrency < 4;
    const update = () => setIsMobile(mq.matches || lowCores);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
}
