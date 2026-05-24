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

## Audyt landinga — pattern orkiestracji
Gdy user prosi o pełny / wielowymiarowy audit landinga („sprawdź landing", „przejrzyj z 3 perspektyw", „audyt copy + UX + mobile"), odpal w jednej wiadomości RÓWNOLEGLE 3 agenty:
- `copy-auditor` — perspektywa tekstu (`lib/copy.ts` density, scanability, redundancja)
- `ux-auditor` — perspektywa visual / spacing / hierarchii (3 viewporty, Playwright)
- `mobile-motion-auditor` — perspektywa motion na 375 px (płynność animacji, touch, reduced-motion)

Każdy zwraca samodzielny raport. Syntetyzujesz w finalny **TL;DR + Critical (P0) + Important (P1) + Handoff matrix** wskazujący dla każdej rekomendacji agenta-wykonawcę (`editorial-stylist`, `animation-architect`, `webgl-craftsman`, `quality-gate`, `seo-strategist`).

Warunek: dev server na `:3000` (jeśli brak — agenty same odpalą `npm run dev`).
