# Projekt: Landing page firmy sprzątającej — poziom Awwwards

## Stack (obowiązkowy)
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger (scroll animations, pinning, timelines)
- Lenis (globalny smooth scroll)
- Framer Motion (micro-interakcje, transitions)
- @react-three/fiber + drei (WebGL hero — fluid/ripple shader)

## Estetyka
- Editorial, mnóstwo whitespace, oddech między sekcjami
- Typografia: duży display serif (np. "Fraunces") + mono dla detali (np. "JetBrains Mono")
- Paleta: off-white #F7F5F0 jako baza, głęboki atrament #0E1A1A, jeden świeży akcent — chłodny mięta/azur #2BD4C4. ZERO gradientowych blobów.
- Hero: kinetyczna typografia + subtelny WebGL ripple w tle reagujący na kursor

## Zasady ruchu
- Każda sekcja MUSI mieć scroll-triggered reveal (mask reveal lub stagger)
- Easing domyślny: expo.out / power4.out, NIE linear
- Lenis lerp ~0.08 dla "ciężkiego" scrolla
- CTA = magnetic button (przyciąga kursor)
- Sekcja usług: infinite marquee zwalniający przy hoverze
- Sekcja "efekty": before/after slider sterowany scrollem lub dragiem

## Czego unikać
- Generycznych komponentów shadcn
- Stockowych ikon "miotła + bańka"
- Płaskich fade-inów bez transformacji
- Corporate blue
