'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

let registered = false;

export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: 'expo.out', duration: 1.0 });
  ScrollTrigger.defaults({ markers: false });
  registered = true;
}

// Register eagerly at module-evaluation time (client bundle only).
// This ensures ScrollTrigger is ready before any useGSAP layout-effect fires,
// regardless of the order providers and section components mount.
if (typeof window !== 'undefined') {
  registerGsap();
}

export { gsap, ScrollTrigger, useGSAP };
