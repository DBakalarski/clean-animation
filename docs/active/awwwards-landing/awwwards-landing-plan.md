# Awwwards Landing — Plan strategiczny

**Branch:** `feature/awwwards-landing`
**Ostatnia aktualizacja:** 2026-05-23

## Podsumowanie wykonawcze

Budowa editorial landing page dla firmy sprzątającej na poziomie Awwwards. Stack: Next.js 14 App Router + TS, Tailwind, GSAP + ScrollTrigger, Lenis, Framer Motion, @react-three/fiber. Cel: 60fps, pełne wsparcie `prefers-reduced-motion`, motyw woda/piana/świeżość, paleta paper #F7F5F0 / ink #0E1A1A / mint #2BD4C4.

Wynik MVP: 13 sekcji z reveal-em sterowanym scrollem, custom cursor, WebGL ripple w hero, magnetic CTA, ScrollTrigger pin w sekcji "Proces", marquee w "Usługach", before/after slider w "Efektach".

## Analiza obecnego stanu

- Repo zostało zainicjalizowane (`main`), feature branch utworzony.
- Brak kodu — w drzewie tylko `CLAUDE.md` (brief stylistyczny) i `PLAN.md` (źródłowy plan implementacji).
- Brak `docs/brainstorms/` ani `docs/plans/` — `PLAN.md` w roocie pełni rolę planu technicznego.
- Brak Figmy / DESIGN.md — paleta i typografia zdefiniowane w `CLAUDE.md`.

## Proponowany stan docelowy

Single-page Next.js 14 (App Router, TS, Tailwind) z 13 sekcjami w jednej trasie `/`, hostowany docelowo na Vercel. Wszystkie animacje synchronizowane przez jedną pętlę RAF (Lenis + ScrollTrigger). Lazy-loading WebGL przez `dynamic({ ssr: false })`. Pełna obsługa reduced-motion + mobile fallback dla canvasa.

## Cele i zakres

**W zakresie:**
- 13 sekcji: Hero, Services (marquee), Effects (before/after), Gallery, Process (pin), Testimonials, Pricing, FAQ, CTA, Footer + global chrome (Nav, Cursor, PageLoader).
- Custom WebGL ripple shader w hero z fallbackiem na mobile.
- UI-only formularz kontaktowy (`console.log`).
- Placeholder assets z Unsplash/picsum.

**Poza zakresem (na później):**
- Backend formularza (Resend / webhook).
- Własne fotografie produktów / referencje wizualne.
- i18n (PL only).
- CMS / MDX.
- Testy E2E (Playwright).

## Fazy wdrożenia

### Faza 1 — Bootstrap & infrastruktura (zależność: brak)

| # | Zadanie | Effort | Kryteria akceptacji |
|---|---------|--------|---------------------|
| 1.1 | `create-next-app@14` (App Router, TS, Tailwind, ESLint), `.gitignore`, `tsconfig.json` paths (`@/*`) | S | `npm run dev` startuje na `localhost:3000` bez błędów |
| 1.2 | Instalacja dep: `gsap @gsap/react framer-motion lenis three @react-three/fiber @react-three/drei @types/three` | S | `package.json` zawiera wszystkie zależności, `npm install` przechodzi |
| 1.3 | Paleta Tailwind (`paper`, `ink`, `mint`), fonty `next/font/google` (Fraunces, JetBrains Mono), `globals.css` z `@layer base` | S | Klasy `bg-paper`, `text-ink`, `text-mint`, `font-serif`, `font-mono` działają w demo komponencie |
| 1.4 | `lib/gsap.ts` (singleton + registerPlugin), `lib/easings.ts` (`gsap.defaults({ ease: 'expo.out' })`), `lib/copy.ts` (PL teksty) | S | Import `gsap` z `@/lib/gsap` zwraca skonfigurowany singleton |
| 1.5 | Hooki: `useReducedMotion`, `useIsMobile`, `useMagnetic` w `hooks/` | M | Hooki zwracają poprawne wartości po zmianie `matchMedia` w DevTools |

### Faza 2 — Providery & global chrome (zależność: Faza 1)

| # | Zadanie | Effort | Kryteria akceptacji |
|---|---------|--------|---------------------|
| 2.1 | `LenisProvider` z `lerp: 0.08`, jednolitą pętlą RAF, honorującą `useReducedMotion` | M | Scroll płynny, brak desyncu z ScrollTrigger; w reduced-motion natywny scroll |
| 2.2 | `GsapProvider` z `scrollerProxy` mapowanym na Lenis, `lenis.on('scroll', ScrollTrigger.update)` | M | ScrollTrigger reveal odpalają się na poprawnych progach |
| 2.3 | `<Cursor />` z `mix-blend-difference`, `gsap.quickTo`, skalowanie na `data-cursor="hover"`, dynamic ssr:false | M | Kursor podąża za pointerem z lekkim opóźnieniem, powiększa się na linkach i przyciskach |
| 2.4 | `<PageLoader />` — overlay paper, mask reveal po `document.fonts.ready` | M | Po reloadzie overlay znika z mask animation, brak FOUT |
| 2.5 | `<Nav />` — logo + 3 linki, hide-on-scroll-down, smooth scroll-to przez Lenis | M | Nav chowa się przy scrollu w dół, pojawia w górę; kliknięcie linku przewija sekcji |

### Faza 3 — Building blocks UI (zależność: Faza 2)

| # | Zadanie | Effort | Kryteria akceptacji |
|---|---------|--------|---------------------|
| 3.1 | `<MaskReveal />` wrapper (clip-path 100%→0%, ScrollTrigger `start: 'top 85%'`, prop `as`) | S | Element odsłania się od dołu w 85% viewportu, semantyczny tag zachowany |
| 3.2 | `<SplitText />` — custom split na słowa/litery, `inline-block` + parent `overflow: hidden` | M | Stagger reveal działa per word i per char |
| 3.3 | `<MagneticButton />` — ref + mousemove w bbox, `gsap.quickTo`, reset na leave, noop w reduced-motion | M | Przycisk przyciąga kursor w promieniu ~80px, wraca po leave |
| 3.4 | `<Marquee />` — GSAP infinite x, slowdown na pointerenter (`timeScale: 0.2`) | M | Marquee jedzie bez przeskoków, zwalnia płynnie na hover |

### Faza 4 — Sekcje contentowe (zależność: Faza 3)

Kolejność implementacji = kolejność scrolla.

| # | Sekcja | Effort | Najważniejsze animacje | Kryteria akceptacji |
|---|--------|--------|------------------------|---------------------|
| 4.1 | **Hero** | XL | SplitText page-load, scroll parallax (`yPercent: -20`), WebGL ripple z `uMouse` lerp | Tekst odsłania się po fontach; ripple reaguje na kursor; mobile = statyczne SVG noise |
| 4.2 | **Services** (marquee) | M | Marquee mono text, hover slowdown, mask reveal containera | Lista usług scrolluje się płynnie; hover daje 5x wolniej |
| 4.3 | **Effects** (before/after) | L | Drag slider (pointer events), scroll-driven parallax obrazów, ARIA `role="slider"` | Slider działa myszą i touchem; `aria-valuenow` aktualizowane |
| 4.4 | **Gallery przed/po** | M | Masonry 3-col, hover crossfade, stagger MaskReveal per karta | 6+ par zdjęć, na mobile 1 kolumna; crossfade smooth |
| 4.5 | **Process** (pinned) | XL | ScrollTrigger pin `end: '+=300%'`, counter 01→04 z `snap: 1`, stagger kroków | Sekcja zatrzymuje się; cyfra zmienia się na breakpointach; po skończonym scroll-end pin się zwalnia |
| 4.6 | **Testimonials** | M | Framer Motion drag z constraint, auto-slow marquee, clip-path reveal | Karty można przeciągać, automatycznie sunią; cytat serif, autor mono |
| 4.7 | **Pricing** | M | Stagger reveal 3 kart, hover translateY + cień, magnetic CTA w karcie | 3 pakiety; hover daje lift; CTA przyciąga kursor |
| 4.8 | **FAQ** | M | Framer Motion `AnimatePresence` accordion (height 0→auto), rotacja strzałki | 6 pytań, jedno otwarte naraz, easing `expo.out` |
| 4.9 | **CTA "form"** | M | `useState` + walidacja regex, `console.log`, toast entry, mask reveal pól | Wpis maila + click → log w DevTools + toast widoczny |
| 4.10 | **Footer** | S | Trzy kolumny, statyczna mapa (OSM iframe/img), sygnatura mask reveal | NIP/tel/godziny widoczne, mapa renderowana, sygnatura odsłania się |

### Faza 5 — Hardening (zależność: Faza 4)

| # | Zadanie | Effort | Kryteria akceptacji |
|---|---------|--------|---------------------|
| 5.1 | Audit reduced-motion — wszystkie sekcje sprawdzone w DevTools emulator | M | Marquee, pin, ripple, mask reveal wyłączone; natywny scroll; brak janku |
| 5.2 | Mobile audit (iPhone 12 / Pixel 7 viewport) — WebGL fallback, touch slider, responsywność | M | Canvas zamieniony na SVG noise; slider działa touchem; layout nie przepełnia |
| 5.3 | Performance budget — Chrome Perf 5s scroll, FPS ≥ 55, brak long task >50ms | L | Profil potwierdza budżet; `will-change` zdejmowane po tweenach |
| 5.4 | Lighthouse (mobile, throttled 4G): Perf ≥ 80, A11y ≥ 95 | M | Raport spełnia progi; obrazy `next/image`, alty obecne |
| 5.5 | Hydration check — brak `Hydration failed` w konsoli | S | Hero nie miga; provider'y client-side; ssr:false na canvas/cursor |

## Ocena ryzyka i strategie mitygacji

| Ryzyko | Wpływ | Prawdopod. | Mitygacja |
|--------|-------|------------|-----------|
| **Lenis ↔ ScrollTrigger desync** (piny się przesuwają, reveal odpala się w złym miejscu) | Wysoki | Średnie | Jedna pętla RAF dla obu; `scrollerProxy`; `ScrollTrigger.refresh()` po dynamicznych zmianach wysokości (FAQ, image load) |
| **WebGL drainuje baterię / crashuje na mobile** | Wysoki | Wysokie | `useIsMobile()` gate → fallback SVG noise; `dpr={[1, 1.5]}`; `frameloop="demand"`; cleanup dispose w `useEffect` return |
| **Janky scroll przy 60fps** (zwłaszcza na Pricing/Process) | Średni | Średnie | Tylko `transform`/`opacity` w scroll-driven; `scrub: 1` numeryczny; `will-change` chwilowo; jedna pętla RAF |
| **Hydration mismatch przy fontach / cursor** | Średni | Wysokie | `next/font` (zero FOUT); `dynamic({ ssr: false })` dla `<Cursor />`, `<RippleCanvas />`; reveal startuje po `document.fonts.ready` |
| **Bundle size eksploduje przez Three** | Średni | Średnie | `dynamic` import `RippleCanvas`; `LazyMotion` + `m` z Framer; tree-shaking sprawdzony przez `next build` |
| **Reduced-motion nie wyłącza wszystkich animacji** | Średni | Średnie | Centralny `useReducedMotion()` → guard w każdym providerze i komponencie; manualny audit w Fazie 5.1 |
| **FOUT migający SplitText przy fallback fontach** | Niski | Wysokie | Animacje hero startują dopiero po `document.fonts.ready`; `next/font` `display: 'swap'` z preloadem |
| **Marquee dryfuje przy resize** | Niski | Średnie | Recalc szerokości na `resize` event; reset progress tweena |

## Mierniki sukcesu

- **Performance**: Lighthouse mobile Performance ≥ 80, Accessibility ≥ 95.
- **FPS**: Chrome Performance pokazuje FPS ≥ 55 przez cały scroll (5s rejestracji).
- **Bundle**: pierwszy chunk JS (poza Three) ≤ 250 KB gzipped.
- **A11y**: pełna nawigacja Tab + Esc; reduced-motion działa zgodnie z auditem.
- **Wow factor**: subiektywnie — landing nadaje się do submitu na Awwwards SOTD (sprawdza się "no generic AI vibes" jako self-test).

## Wymagane zasoby i zależności

- Node 18+ / pnpm lub npm.
- Konto Vercel (opcjonalnie na deploy preview).
- Brak płatnych pluginów GSAP (SplitText buildujemy własny).
- Brak zewnętrznych API (mapa = OSM staticmap bez API key).

## Szacunki czasowe

| Faza | Effort | Szacunek (solo dev) |
|------|--------|---------------------|
| 1. Bootstrap & infrastruktura | M | 0.5 dnia |
| 2. Providery & chrome | L | 1 dzień |
| 3. Building blocks UI | L | 1 dzień |
| 4. Sekcje contentowe | XL | 3–4 dni |
| 5. Hardening | L | 1 dzień |
| **Razem** | — | **~6–7 dni** |

## Źródła

- Requirements doc: brak (`docs/brainstorms/` nieobecne)
- Plan techniczny: brak w `docs/plans/`; źródłem jest `PLAN.md` w roocie repozytorium oraz `CLAUDE.md`
