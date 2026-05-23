# Awwwards Landing — Checklist zadań

**Branch:** `feature/awwwards-landing`
**Ostatnia aktualizacja:** 2026-05-23

Legenda effort: **S** = ≤2h · **M** = pół dnia · **L** = dzień · **XL** = >dzień.

---

## Faza 1 — Bootstrap & infrastruktura

### 1.1 Scaffold Next.js (S)
- [ ] `npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"`
- [ ] `.gitignore` (node_modules, .next, .env*.local)
- [ ] `tsconfig.json`: `strict: true`, alias `@/*`
- [ ] Smoke: `npm run dev` → `localhost:3000` zwraca stronę bez błędów

### 1.2 Zależności (S)
- [ ] `npm i gsap @gsap/react framer-motion lenis three @react-three/fiber @react-three/drei`
- [ ] `npm i -D @types/three`
- [ ] `package.json` skontrolowany pod zgodność wersji

### 1.3 Tailwind + paleta + fonty (S)
- [ ] `tailwind.config.ts` — `colors: { paper, ink, mint }`, `fontFamily: { serif, mono }`
- [ ] `next/font/google` import Fraunces + JetBrains Mono w `app/layout.tsx`
- [ ] `app/globals.css` — `@tailwind` directives + `:root` vars + `@layer base { body { @apply bg-paper text-ink font-serif } }`
- [ ] Test wizualny: tymczasowy `<h1 className="text-mint font-serif">` renderuje się poprawnie

### 1.4 Lib utilsy (S)
- [ ] `lib/gsap.ts` — singleton z `registerPlugin(ScrollTrigger)`, `gsap.defaults({ ease: 'expo.out' })`
- [ ] `lib/easings.ts` — eksportowane stałe (`EASE_EXPO_OUT`, `EASE_POWER4_OUT`)
- [ ] `lib/copy.ts` — PL teksty per sekcja (nagłówki, listy usług, opinie, FAQ, footer)

### 1.5 Hooki (M)
- [ ] `hooks/useReducedMotion.ts` — `matchMedia('(prefers-reduced-motion: reduce)')`
- [ ] `hooks/useIsMobile.ts` — `matchMedia('(max-width: 768px)')`
- [ ] `hooks/useMagnetic.ts` — pointer logic z `gsap.quickTo`
- [ ] `hooks/useLenis.ts` — konsumpcja contextu (placeholder dopóki LenisProvider gotowy)

---

## Faza 2 — Providery & global chrome

### 2.1 LenisProvider (M)
- [ ] `components/providers/LenisProvider.tsx` z `'use client'`
- [ ] `new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false })`
- [ ] Jedna pętla RAF wołająca `lenis.raf(time)` + `ScrollTrigger.update()`
- [ ] Honor `useReducedMotion()` — nie inicjalizuj instancji
- [ ] Context expose: instancja + `scrollTo`
- [ ] Cleanup: `lenis.destroy()` w return effectu

### 2.2 GsapProvider (M)
- [ ] `components/providers/GsapProvider.tsx`
- [ ] `ScrollTrigger.scrollerProxy(document.body, { ... })` mapowany na Lenis
- [ ] `lenis.on('scroll', ScrollTrigger.update)`
- [ ] `ScrollTrigger.defaults({ markers: false })`
- [ ] Cleanup: `ScrollTrigger.killAll()`

### 2.3 Custom cursor (M)
- [ ] `components/chrome/Cursor.tsx` z `'use client'`
- [ ] `position: fixed`, `mix-blend-mode: difference`, `pointer-events: none`
- [ ] `gsap.quickTo` dla x/y, lerpowane
- [ ] Hover scale-up na `[data-cursor="hover"]` (querySelectorAll + delegated event)
- [ ] `dynamic` import w `app/layout.tsx` z `ssr: false`
- [ ] Reduced-motion: kursor nie montowany

### 2.4 PageLoader (M)
- [ ] `components/chrome/PageLoader.tsx`
- [ ] Overlay `paper`, full viewport
- [ ] Timeline GSAP startuje po `document.fonts.ready`
- [ ] Mask reveal (clip-path inset 0%→100%)
- [ ] Usuwa się z drzewa po `onComplete`

### 2.5 Nav (M)
- [ ] `components/chrome/Nav.tsx` — logo + 3 linki (Usługi, Efekty, Kontakt)
- [ ] Show/hide based on Lenis `direction` event
- [ ] Smooth scroll-to przez `lenis.scrollTo('#section-id')`
- [ ] Hover underline animation per link

---

## Faza 3 — Building blocks UI

### 3.1 MaskReveal (S)
- [ ] `components/ui/MaskReveal.tsx` — wrapper z prop `as` (default `'div'`)
- [ ] `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)` przez ScrollTrigger
- [ ] `start: 'top 85%'`, `toggleActions: 'play none none none'`
- [ ] Reduced-motion: ustaw stan końcowy natychmiast

### 3.2 SplitText (M)
- [ ] `components/ui/SplitText.tsx` — custom split na `<span>` per word/char
- [ ] `display: inline-block`, parent `overflow: hidden`
- [ ] Prop: `as`, `splitBy: 'words' | 'chars'`, `stagger`
- [ ] Action po `document.fonts.ready` żeby uniknąć FOUT layout shift

### 3.3 MagneticButton (M)
- [ ] `components/ui/MagneticButton.tsx` — ref + `mousemove` w bbox
- [ ] `gsap.quickTo(el, 'x'/'y', { duration: 0.4, ease: 'power3.out' })`
- [ ] `mouseleave` → reset do (0, 0)
- [ ] Prop: `strength` (default 0.4), `children`, `onClick`
- [ ] Reduced-motion: noop

### 3.4 Marquee (M)
- [ ] `components/ui/Marquee.tsx` — GSAP infinite x tween
- [ ] Duplikacja contentu dla seamless loop
- [ ] `pointerenter` → `gsap.to(tl, { timeScale: 0.2 })`
- [ ] `pointerleave` → `gsap.to(tl, { timeScale: 1 })`
- [ ] Recalc na `resize` event
- [ ] Reduced-motion: statyczne stop

---

## Faza 4 — Sekcje contentowe

### 4.1 Hero (XL)
- [ ] `components/sections/Hero.tsx` — kompozycja layoutu
- [ ] Display serif `<h1>` ("Czysto. Spokojnie. / Bez resztek.")
- [ ] Mono caption pod heroem
- [ ] SplitText page-load stagger reveal
- [ ] Scroll parallax `yPercent: -20` na end
- [ ] `components/webgl/RippleCanvas.tsx` — `<Canvas dpr={[1, 1.5]} frameloop="demand">`
- [ ] `components/webgl/RipplePlane.tsx` — mesh + ShaderMaterial
- [ ] `ripple.vert.glsl` — passthrough UV
- [ ] `ripple.frag.glsl` — FBM noise + uMouse displacement
- [ ] Mobile fallback: SVG noise z `mask-position` animation
- [ ] `dynamic` import w Hero z `ssr: false`

### 4.2 Services (M)
- [ ] `components/sections/Services.tsx`
- [ ] Lista usług z `lib/copy.ts` w `<Marquee>`
- [ ] Ogromny mono text (`text-[clamp(4rem,12vw,11rem)]`)
- [ ] Klikalne etykiety scrollują do Pricing
- [ ] `MaskReveal` containera sekcji

### 4.3 Effects (L)
- [ ] `components/sections/Effects.tsx`
- [ ] Dwa `<Image>` (after + before z clip-path)
- [ ] Drag handler na uchwycie (pointerdown/move/up)
- [ ] ScrollTrigger `scrub: 1` parallax `y` obu warstw
- [ ] Linia podziału + uchwyt `mint`
- [ ] `role="slider"`, `aria-valuenow`, keyboard arrow keys support

### 4.4 Gallery (M)
- [ ] `components/sections/Gallery.tsx`
- [ ] Grid masonry CSS (`grid-template-columns: repeat(3, 1fr)`)
- [ ] Karta z dwoma `<Image>` (before + after) i hover crossfade
- [ ] `MaskReveal` per karta + stagger przy wejściu w viewport
- [ ] Mobile: 1 kolumna

### 4.5 Process (XL)
- [ ] `components/sections/Process.tsx` — wrapper `min-h-screen`
- [ ] ScrollTrigger.create({ pin: true, scrub: 1, end: '+=300%' })
- [ ] Counter 01→04 z `gsap.to({ textContent }, { snap: 1 })`
- [ ] Stagger kroków z indywidualnymi triggerami
- [ ] Cztery teksty kroków z `lib/copy.ts`
- [ ] Reduced-motion: zwykły stack pionowy bez pina

### 4.6 Testimonials (M)
- [ ] `components/sections/Testimonials.tsx`
- [ ] Karty cytatów z drag (Framer Motion `drag="x"` + `dragConstraints`)
- [ ] Auto-slow marquee paralleli
- [ ] Cytat = serif, autor = mono
- [ ] Clip-path reveal per karta

### 4.7 Pricing (M)
- [ ] `components/sections/Pricing.tsx`
- [ ] 3 karty (Dom, Biuro, Po remoncie) z danymi w `lib/copy.ts`
- [ ] Stagger reveal kart
- [ ] Hover: `translateY(-6px)` + cień + akcent mint
- [ ] `MagneticButton` CTA per karta

### 4.8 FAQ (M)
- [ ] `components/sections/Faq.tsx`
- [ ] 6 pytań z `lib/copy.ts`
- [ ] Framer Motion `AnimatePresence` accordion
- [ ] `motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}` + `overflow: hidden`
- [ ] Rotacja strzałki 90°
- [ ] Trigger `ScrollTrigger.refresh()` na expand

### 4.9 CTA "form" (M)
- [ ] `components/sections/CtaForm.tsx` — bez `<form>`, stack `<input>`
- [ ] `useState` dla każdego pola
- [ ] Walidacja regex maila (inline)
- [ ] `MagneticButton onClick={...}` → `console.log({...state})`
- [ ] Toast entry przez Framer Motion `AnimatePresence`
- [ ] Floating-label mono per pole
- [ ] `MaskReveal` per pole

### 4.10 Footer (S)
- [ ] `components/sections/Footer.tsx`
- [ ] Trzy kolumny: kontakt, godziny, mapa
- [ ] Statyczna mapa (iframe OSM lub `<img>` ze `staticmap.openstreetmap.de`) — lazy loaded
- [ ] Sygnatura serif na dole z `MaskReveal`
- [ ] Subtelna linia mint divider

### 4.11 Kompozycja w app/page.tsx (S)
- [ ] Import wszystkich sekcji
- [ ] Kolejność: Hero, Services, Effects, Gallery, Process, Testimonials, Pricing, FAQ, CtaForm, Footer
- [ ] `id` na każdej sekcji dla nav scroll-to
- [ ] Semantyczne `<section>` z `aria-label`

---

## Faza 5 — Hardening

### 5.1 Reduced-motion audit (M)
- [ ] DevTools → Rendering → "Emulate prefers-reduced-motion: reduce"
- [ ] Sprawdź każdą sekcję: brak marquee, brak pina, brak ripple, brak parallax
- [ ] MagneticButton nie reaguje na mousemove
- [ ] Lenis nie aktywny → natywny scroll
- [ ] PageLoader: skip lub instant

### 5.2 Mobile audit (M)
- [ ] iPhone 12 viewport — WebGL fallback widoczny, brak canvasa w bundle
- [ ] Touch drag w Effects działa
- [ ] Marquee gładkie
- [ ] Layout nie przepełnia (sprawdź wszystkie sekcje)
- [ ] Nav działa, mapa się renderuje

### 5.3 Performance (L)
- [ ] Chrome Performance: rejestracja 5s scrolla → FPS ≥ 55
- [ ] Brak long task >50ms
- [ ] `will-change` zdejmowane po tweenach (Inspector → Layers)
- [ ] Memory: idle <100MB, peak <250MB
- [ ] `next build` → bundle size raport sprawdzony

### 5.4 Lighthouse (M)
- [ ] Mobile, throttled 4G
- [ ] Performance ≥ 80
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90 (meta tags, alt, semantic HTML)

### 5.5 Hydration & SSR (S)
- [ ] `npm run dev` → brak `Hydration failed` w konsoli
- [ ] `npm run build && npm start` → produkcja działa
- [ ] Hero nie miga / nie flickeruje
- [ ] Cursor pojawia się dopiero po hydration (ssr:false)

---

## Co wykluczamy z MVP (dla jasności)

- [ ] ~~Backend formularza (Resend / webhook)~~
- [ ] ~~Własne fotografie (placeholder Unsplash)~~
- [ ] ~~i18n (PL only)~~
- [ ] ~~CMS / MDX (treści w `lib/copy.ts`)~~
- [ ] ~~Playwright E2E~~
- [ ] ~~Analytics / cookies banner~~

## Źródła

- Requirements doc: brak (`docs/brainstorms/` nieobecne)
- Plan techniczny: brak w `docs/plans/`; źródłem jest `/PLAN.md` w roocie repozytorium oraz `/CLAUDE.md`
