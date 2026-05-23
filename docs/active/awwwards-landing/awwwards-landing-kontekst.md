# Awwwards Landing — Kontekst techniczny

**Branch:** `feature/awwwards-landing`
**Ostatnia aktualizacja:** 2026-05-23

## Powiązane pliki

### Istniejące (źródłowe, nie modyfikujemy)
- `CLAUDE.md` — brief stylistyczny (stack, estetyka, paleta, zasady ruchu, czego unikać).
- `PLAN.md` — pełny plan implementacji (struktura plików, animacje per sekcja, pułapki perf).

### Do utworzenia (główne pliki kodu)
- `app/layout.tsx` — root layout, fonty (Fraunces + JetBrains Mono z `next/font`), `<LenisProvider>`, `<GsapProvider>`, `<Cursor />`, `<PageLoader />`, `<Nav />`.
- `app/page.tsx` — kompozycja 13 sekcji w kolejności scrolla.
- `app/globals.css` — Tailwind dyrektywy, zmienne CSS (`--paper`, `--ink`, `--mint`), `@layer base`.
- `tailwind.config.ts` — `theme.extend.colors` z `paper #F7F5F0`, `ink #0E1A1A`, `mint #2BD4C4`; `fontFamily.serif` (Fraunces var), `fontFamily.mono` (JetBrains Mono var).
- `components/providers/{LenisProvider,GsapProvider}.tsx`.
- `components/chrome/{Cursor,Nav,PageLoader}.tsx`.
- `components/sections/{Hero,Services,Effects,Gallery,Process,Testimonials,Pricing,Faq,CtaForm,Footer}.tsx`.
- `components/ui/{MaskReveal,SplitText,MagneticButton,Marquee}.tsx`.
- `components/webgl/{RippleCanvas,RipplePlane}.tsx` + `ripple.vert.glsl` + `ripple.frag.glsl`.
- `hooks/{useLenis,useReducedMotion,useIsMobile,useMagnetic}.ts`.
- `lib/{gsap,easings,copy}.ts`.

### Konfiguracja
- `next.config.js` — `transpilePackages: ['three']`, `images.remotePatterns` dla `images.unsplash.com` i `picsum.photos`.
- `postcss.config.js` — `tailwindcss` + `autoprefixer`.
- `tsconfig.json` — `paths: { "@/*": ["./*"] }`, `strict: true`.

## Decyzje techniczne

### Architektura

| Decyzja | Wybór | Uzasadnienie |
|---------|-------|--------------|
| Routing | App Router (Next.js 14) | Server Components by default, lepszy streaming, native loading/error boundary |
| Smooth scroll | Lenis (lerp 0.08, `syncTouch: false`) | "Ciężki" scroll editorial vibe; touch native momentum (nie psujemy mobile UX) |
| Animacje scroll | GSAP + ScrollTrigger | Najbardziej dojrzałe API do pinów/scrubu; znacznie bogatsze niż Framer dla scroll-driven |
| Mikro-interakcje | Framer Motion (`m` + `LazyMotion`) | Lekka, deklaratywna, świetnie dla hover/drag/accordion |
| WebGL | @react-three/fiber + drei | React-friendly Three; gotowe loadery i kontroler |
| Cursor | Custom (`mix-blend-difference` + `gsap.quickTo`) | Brak gotowca shadcn-like; visual contrast z dowolnym tłem |
| Fonty | `next/font/google` (Fraunces + JetBrains Mono) | Zero FOUT, automatic preload, CSS vars |

### Synchronizacja Lenis ↔ ScrollTrigger

Krytyczny punkt: jedna pętla `requestAnimationFrame`, w której `lenis.raf(time)` i `ScrollTrigger.update()` wołane są sekwencyjnie. `ScrollTrigger.scrollerProxy(document.body, { ... })` mapuje getter/setter `scrollTop` na Lenis. `lenis.on('scroll', ScrollTrigger.update)` zapewnia, że ScrollTrigger reaguje na manualny `lenis.scrollTo`.

### Reduced motion

Centralny hook `useReducedMotion()` (matchMedia). Każdy provider sprawdza go na początku:
- `LenisProvider` → nie instancjonuje Lenis, pozwala na natywny scroll.
- `GsapProvider` → rejestruje plugin, ale `ScrollTrigger.defaults({ ... })` ustawia `toggleActions: 'play none none none'` bez scrub.
- `MaskReveal` → ustawia stan końcowy natychmiast (bez tween).
- `Marquee` → nie startuje pętli.
- `MagneticButton` → noop.
- `RippleCanvas` → komponent nie jest mountowany (warunek na rendererze, nie w środku).

### WebGL gating

`useIsMobile()` (`max-width: 768px` || `navigator.hardwareConcurrency < 4`) → fallback `<RippleFallback />` = statyczny SVG noise z animowanym CSS `mask-position`. Decyzja podjęta na poziomie `RippleCanvas`, nie wewnątrz canvasa, żeby Three w ogóle nie wszedł w bundle dla mobile users (osiągane przez `dynamic` import z warunkiem).

### Bundle strategy

- `dynamic(() => import('@/components/webgl/RippleCanvas'), { ssr: false })`.
- `dynamic(() => import('@/components/chrome/Cursor'), { ssr: false })`.
- Framer Motion: import `LazyMotion` + `m` zamiast `motion`, w providerze `domAnimation` features.
- `next/image` dla wszystkich foto.
- Tailwind JIT — tylko używane klasy w bundle.

## Zależności

### Stack (z `package.json`)
```
"dependencies": {
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "gsap": "^3.12.0",
  "@gsap/react": "^2.1.0",
  "framer-motion": "^11.0.0",
  "lenis": "^1.1.0",
  "three": "^0.165.0",
  "@react-three/fiber": "^8.16.0",
  "@react-three/drei": "^9.108.0"
},
"devDependencies": {
  "typescript": "^5.4.0",
  "@types/node": "^20.0.0",
  "@types/react": "^18.3.0",
  "@types/three": "^0.165.0",
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0",
  "eslint": "^8.57.0",
  "eslint-config-next": "^14.2.0"
}
```

### Wewnętrzne zależności między fazami
- Faza 2 ← Faza 1 (potrzebuje `lib/gsap`, hooków, palety).
- Faza 3 ← Faza 2 (komponenty UI używają providerów).
- Faza 4 ← Faza 3 (sekcje używają `MaskReveal`, `SplitText`, etc.).
- Faza 5 ← Faza 4 (audit po pełnej kompozycji).

### Wewnątrz Fazy 4
- Hero (4.1) ← `MaskReveal`, `SplitText`, `RippleCanvas`.
- Services (4.2) ← `Marquee`, `MaskReveal`.
- Effects (4.3) ← `MaskReveal` + custom pointer logic.
- Process (4.5) ← najbardziej skomplikowane, robić po wprawce z 4.1-4.4.
- Pricing (4.7) ← `MagneticButton`, `MaskReveal`.
- FAQ (4.8) ← Framer Motion `AnimatePresence`.

### Zewnętrzne
- Obrazy: `images.unsplash.com`, `picsum.photos` (no auth wymagany).
- Mapa: `staticmap.openstreetmap.de` (no API key) lub `<iframe>` z OSM.
- Brak zewnętrznych API.

## Pułapki do uniknięcia (z PLAN.md, sekcja Performance)

1. **Nigdy** `top`/`left`/`width` w scroll-driven; tylko `transform`/`opacity`.
2. **Nigdy** `setInterval`/per-element RAF dla marquee — jedna pętla GSAP.
3. **Nigdy** `will-change` na stałe — zdejmuj po tweenie.
4. **Zawsze** `'use client'` w komponentach używających `window`/`gsap`/`Lenis`.
5. **Zawsze** `dispose()` na renderer/geometry/material w `useEffect` return.
6. **Zawsze** `ScrollTrigger.refresh()` po dynamicznych zmianach wysokości (FAQ open).

## Konwencje kodu

- Komponenty: PascalCase, jeden komponent per plik.
- Hooki: `useFoo`, default export, plik `hooks/useFoo.ts`.
- Importy z aliasem `@/` (configed w `tsconfig.json`).
- `'use client'` zawsze pierwsza linia w kliencie.
- Tailwind: prefer composition (`max-w-[1440px] mx-auto px-6 md:px-12`) nad custom CSS.
- Display typography: `clamp()` dla fluid scaling.
- Nazwy testów (gdy dodamy w przyszłości): `*.test.tsx` obok komponentu.

## Co JEST a co NIE JEST w MVP

| Element | MVP | Później |
|---------|-----|---------|
| 13 sekcji content | ✅ | — |
| Custom cursor + page loader | ✅ | — |
| WebGL ripple + mobile fallback | ✅ | — |
| ScrollTrigger pin Process | ✅ | — |
| Marquee Services | ✅ | — |
| Before/after slider | ✅ | — |
| Reduced-motion support | ✅ | — |
| Form UI (`console.log`) | ✅ | Resend backend |
| Placeholder Unsplash | ✅ | Foto klientów |
| i18n | ❌ | EN copy |
| CMS / MDX | ❌ | Sanity |
| Playwright E2E | ❌ | Smoke tests |
| Analytics | ❌ | Plausible / Vercel |
| Cookie banner | ❌ | RODO if needed |

## Źródła

- Requirements doc: brak (`docs/brainstorms/` nieobecne)
- Plan techniczny: brak w `docs/plans/`; źródłem jest `/PLAN.md` w roocie repozytorium oraz `/CLAUDE.md`
