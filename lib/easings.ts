export const EASE = {
  expoOut: 'expo.out',
  power4Out: 'power4.out',
  power3Out: 'power3.out',
  power2InOut: 'power2.inOut',
} as const;

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  reveal: 1.0,
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
} as const;
