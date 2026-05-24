'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe hook for `prefers-reduced-motion`.
 *
 * Always returns `false` on the server and during the first client render so
 * the hydrated HTML matches the SSR HTML exactly (no hydration mismatch).
 * After mount, `useEffect` reads the real media-query value and subscribes to
 * future changes.
 */
export function useReducedMotion(): boolean {
  // Hard-coded `false` as initial state — matches the SSR output.
  // Never pass `readReduced` as a lazy initializer: that executes
  // window.matchMedia synchronously before hydration, causing a structural
  // mismatch when the user has reduced-motion ON.
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Sync to real value immediately after mount (post-hydration).
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
