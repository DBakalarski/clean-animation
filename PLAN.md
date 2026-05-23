# Landing page — firma sprzątająca (poziom Awwwards)

## Context

Greenfield project w `/Users/dawidbakalarski/Documents/projekty/cc_agents_animation/` — w katalogu jest dziś tylko `CLAUDE.md` z wytycznymi stylistycznymi. Cel: zbudować editorial landing page (Next.js 14 App Router + TS) na poziomie Awwwards, z motywem wody/piany/świeżości, kinetyczną typografią, WebGL ripple w hero, Lenis smooth scroll i ScrollTrigger pinami.

Decyzje doprecyzowane z użytkownikiem:
- Sekcje: Hero, Usługi, Efekty (before/after), Galeria przed/po, Proces, Opinie, Cennik, FAQ, CTA, Footer z mapą.
- Formularz CTA: UI-only mock z `console.log` (bez `<form>`, własne handlery na onClick).
- Assety: placeholdery Unsplash/picsum.
- `prefers-reduced-motion`: pełne wsparcie — wyłączamy piny, marquee i WebGL ripple.
- Język UI: PL (z CLAUDE.md i wiadomości).

## Struktura plików

```
cc_agents_animation/
├── app/
│   ├── layout.tsx                  # html lang="pl", fonty (next/font), <Providers>, <Cursor/>
│   ├── page.tsx                    # kompozycja sekcji w kolejności scrolla
│   ├── globals.css                 # Tailwind + zmienne CSS + base typografia
│   └── api/                        # (brak — formularz jest UI-only)
│
├── components/
│   ├── providers/
│   │   ├── LenisProvider.tsx       # globalny Lenis (client), raf loop, expose context
│   │   └── GsapProvider.tsx        # rejestracja ScrollTrigger, sync z Lenis (scrollerProxy)
│   │
│   ├── chrome/
│   │   ├── Cursor.tsx              # custom cursor (mix-blend-difference, blob na hoverach)
│   │   ├── Nav.tsx                 # editorial nav: logo + 3 linki, hide-on-scroll-down
│   │   └── PageLoader.tsx          # mask reveal całej strony na page-load
│   │
│   ├── sections/
│   │   ├── Hero.tsx                # kinetyczna typografia + canvas R3F
│   │   ├── Services.tsx            # infinite marquee zwalniający na hover
│   │   ├── Effects.tsx             # before/after slider (drag + scroll-driven)
│   │   ├── Gallery.tsx             # masonry/parallax galeria przed/po
│   │   ├── Process.tsx             # ScrollTrigger pin + stagger kroków 01-04
│   │   ├── Testimonials.tsx        # cytaty z mask-reveal i drag-scroll
│   │   ├── Pricing.tsx             # 3 karty pakietów z reveal staggerem
│   │   ├── Faq.tsx                 # accordion (Framer Motion AnimateHeight)
│   │   ├── CtaForm.tsx             # editorial "formularz" bez <form>, magnetic submit
│   │   └── Footer.tsx              # NIP/tel/godziny + statyczna mapa (iframe lub <img>)
│   │
│   ├── ui/
│   │   ├── MagneticButton.tsx      # ref + mousemove, gsap.quickTo dla x/y
│   │   ├── MaskReveal.tsx          # wrapper: clip-path 0→100% z ScrollTrigger
│   │   ├── SplitText.tsx           # split na słowa/litery + stagger reveal
│   │   └── Marquee.tsx             # GSAP infinite x, slowdown na pointerenter
│   │
│   └── webgl/
│       ├── RippleCanvas.tsx        # <Canvas dpr={[1,1.5]}> + ScrollControls
│       ├── RipplePlane.tsx         # mesh + ShaderMaterial, uMouse, uTime
│       ├── ripple.vert.glsl        # passthrough
│       └── ripple.frag.glsl        # noise-based ripple, displace UV
│
├── hooks/
│   ├── useLenis.ts                 # konsumpcja contextu z LenisProvider
│   ├── useReducedMotion.ts         # matchMedia('(prefers-reduced-motion: reduce)')
│   ├── useIsMobile.ts              # matchMedia('(max-width: 768px)') — gate WebGL
│   └── useMagnetic.ts              # logika magnetic buttona (reużywalna)
│
├── lib/
│   ├── gsap.ts                     # singleton: gsap.registerPlugin(ScrollTrigger)
│   ├── easings.ts                  # CustomEase mapy (expo.out, power4.out aliasy)
│   └── copy.ts                     # cała kopia (PL) — jeden plik, łatwo edytować
│
├── public/
│   └── images/                     # (na razie puste — używamy zewnętrznych URL Unsplash)
│
├── tailwind.config.ts              # ink #0E1A1A, paper #F7F5F0, mint #2BD4C4, fontFamily
├── postcss.config.js
├── next.config.js                  # transpilePackages: ['three'], images.domains
├── tsconfig.json
└── package.json
```

## Zależności do instalacji

```bash
# core
next@14 react@18 react-dom@18 typescript

# styling
tailwindcss postcss autoprefixer

# animacje
gsap @gsap/react                    # useGSAP hook = cleanup-safe
framer-motion
lenis                               # nowsza nazwa (wcześniej @studio-freight/lenis)

# webgl
three @react-three/fiber @react-three/drei

# typy / dev
@types/node @types/react @types/three eslint eslint-config-next
```

Fonty: `next/font/google` — `Fraunces` (display, opsz dla większych rozmiarów) + `JetBrains Mono` (mono). Bez ręcznego `<link>`.

## Konfiguracja Lenis + GSAP

**`components/providers/LenisProvider.tsx`** (client component):
- `new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false })` — `syncTouch: false` na mobile (smooth scroll na touch psuje native momentum i jest źródłem jankingu).
- Pojedyncza pętla `requestAnimationFrame`: `lenis.raf(time); ScrollTrigger.update()` — jedna pętla dla obu, żeby uniknąć desynchronizacji.
- Kontekstem udostępnia instancję (potrzebne np. dla "scroll-to" w nav).
- Honoruje `useReducedMotion()` → jeśli `true`, **nie inicjalizuje Lenis** i pozwala na natywny scroll.

**`components/providers/GsapProvider.tsx`** (client):
- `gsap.registerPlugin(ScrollTrigger, useGSAP)` raz, na mount.
- `ScrollTrigger.scrollerProxy(document.body, { ... })` mapowany na Lenis (getter/setter `scrollTop`).
- `lenis.on('scroll', ScrollTrigger.update)`.
- `ScrollTrigger.defaults({ markers: false, scroller: document.body })`.
- Na unmount: `ScrollTrigger.killAll()`, `lenis.destroy()`.

Owijają w `app/layout.tsx`:
```
<LenisProvider><GsapProvider>{children}</GsapProvider></LenisProvider>
```

## Kolejność budowy — sekcja po sekcji

Buduję top-down (kolejność scrolla = kolejność implementacji), ale infrastrukturę (1–3) zakładam najpierw.

### 1. Bootstrap projektu
`create-next-app` (App Router, TS, Tailwind, ESLint), wpięcie fontów, paleta w `tailwind.config.ts` (`paper`, `ink`, `mint`), `globals.css` z `:root` zmiennymi i `@layer base` dla `body { @apply bg-paper text-ink font-serif }`.

### 2. Providery + cursor + page loader
- `LenisProvider`, `GsapProvider`, `useReducedMotion`, `useIsMobile`.
- `Cursor.tsx` — `fixed`, `mix-blend-mode: difference`, `gsap.quickTo` dla x/y. Skala-up na elementach z `data-cursor="hover"`.
- `PageLoader.tsx` — overlay paper, mask reveal 0→100% (clip-path inset), timeline GSAP po `document.fonts.ready`.

### 3. Nav + utilsy UI
- `Nav.tsx` — show/hide na scroll direction (Lenis `direction` event).
- `MaskReveal`, `SplitText`, `MagneticButton`, `Marquee` — gotowe na potem.

### 4. Hero
**Layout:** dwa wiersze display serif ("Czysto. Spokojnie. / Bez resztek."), pod nimi mono caption. Po prawej: `<RippleCanvas>` w `absolute inset-0 -z-10`.

**Animacje:**
- Page-load: `SplitText` na słowa, każde słowo masked (clip-path), `stagger: 0.08`, `ease: 'expo.out'`, `duration: 1.2`. Caption mono fade-in z opóźnieniem.
- Scroll: `y` parallax tekstu (`yPercent: -20` na end), opacity easing.
- WebGL: shader frag z FBM noise; `uMouse` lerpowany z pozycji kursora; ripple displace UV. Tło canvasa = `paper`, ripple maluje się w `mint` z niskim alfa. `dpr={[1, 1.5]}`, `frameloop="demand"` z `useFrame` invalidate, gate przez `useIsMobile()` → na mobile renderujemy statyczne SVG noise zamiast canvasa.

### 5. Services (marquee)
Lista usług ("Sprzątanie domu", "Biura", "Po remoncie", "Okna", "Tapicerki", "Generalne") jako ogromny mono tekst w `Marquee`. GSAP tween x w pętli, `pointerenter` → `gsap.to(tl, { timeScale: 0.2 })`. Każda etykieta klikalna → kotwica do `Pricing`. Reveal sekcji: `MaskReveal` na container.

### 6. Effects (before/after slider)
Dwa absolutnie pozycjonowane `<img>` (after pełne, before z `clip-path: inset(0 X% 0 0)`). Slider:
- **Drag**: pointer events na uchwycie, mapowanie x → procent.
- **Scroll-driven (parallax na obrazach)**: `ScrollTrigger` z `scrub: 1` przesuwa lekko `y` obu warstw.
Subtelna linia podziału + uchwyt z `mint` kółkiem. ARIA: `role="slider"`, `aria-valuenow`.

### 7. Gallery przed/po
Masonry 3-kolumnowa (na mobile 1). Każda para zdjęć ujęta w karcie z hover crossfade (Framer Motion `whileHover`). `MaskReveal` per karta, stagger przy wejściu w viewport.

### 8. Process (pinned)
Sekcja ~3× viewport height, `ScrollTrigger.create({ pin: true, scrub: 1, end: '+=300%' })`. Po lewej duża cyfra "01" → "04" zmieniająca się na breakpointach progresu. Po prawej teksty kroków — każdy odpalany przez `ScrollTrigger` z indywidualnym progiem (`start: 'top top+=Npx'`). Cyfra animowana przez `gsap.to({ textContent })` z `snap: 1` + custom counter.

### 9. Testimonials
Horyzontalne karty cytatów, `drag` (Framer Motion drag z constraint) + auto-slow marquee. Cytat = serif, autor = mono. Reveal: każda karta `clipPath inset(100% 0 0 0)` → `0`.

### 10. Pricing
Trzy karty: "Dom", "Biuro", "Po remoncie". Lista featurów (mono), cena (serif duża). Reveal stagger. Hover: lekkie `translateY(-6px)` + cień + zmiana akcentu na `mint`. Magnetic CTA wewnątrz karty.

### 11. FAQ
6 pytań w accordion. Framer Motion `AnimatePresence` + `motion.div` z `initial={{ height: 0 }}` → `auto` (z `overflow: hidden` na rodzicu, easing `expo.out`). Pytanie = serif, odpowiedź = mono. Strzałka rotacja 90°.

### 12. CTA "form"
Editorial — nie `<form>`, tylko stack `<input>` (kontrolowane przez `useState`) i `<MagneticButton onClick={...}>`. Submit handler: walidacja regex maila → `console.log({...state})` → toast (Framer Motion entry). Reveal: każde pole z osobnym `MaskReveal`. Etykiety floating-label w mono.

### 13. Footer
Trzy kolumny: kontakt (NIP, tel, email), godziny, mapa (statyczna OpenStreetMap embed `<iframe>` lazy-loaded lub `<img>` ze staticmap.openstreetmap.de — bez API key). Duża sygnatura na dole: serif, mask reveal po wejściu.

## Reużywalne building blocks (kluczowe pliki)

- `components/ui/MagneticButton.tsx` — referencja przez ref, `mousemove` w bbox, `gsap.quickTo(el, 'x'/'y', { duration: 0.4, ease: 'power3.out' })`, reset na `mouseleave`. Honoruje reduced motion.
- `components/ui/MaskReveal.tsx` — `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)` przez ScrollTrigger `start: 'top 85%'`. Prop `as` żeby zachować semantykę.
- `components/ui/SplitText.tsx` — własny split (Stable) na `<span>` per word/char z `display: inline-block` i `overflow: hidden` na rodzicu dla mask effect. Nie używamy płatnego GSAP SplitText.
- `lib/easings.ts` — alias `'expo.out'` (`gsap.parseEase`) jako domyślny defaults w `gsap.defaults({ ease: 'expo.out' })`.

## Pułapki wydajnościowe i jak je obejść

**60fps na scrollu:**
- Wszystkie scroll-driven właściwości używają `transform`/`opacity` — NIGDY `top`/`left`/`width`. Filter blur tylko statyczny.
- `ScrollTrigger` z `scrub: 1` (numeryczny, nie `true`) — wygładza i ogranicza spike.
- `will-change` tylko na elementach faktycznie animowanych, ustawiane chwilowo (`gsap.set` na start tweena, zdjąć na end) — stały `will-change: transform` zżera RAM.
- Marquee: jedna pętla GSAP, NIE setInterval ani `requestAnimationFrame` per element.

**Hydration:**
- Wszystko co używa `window`/`document`/`gsap`/`Lenis` → `'use client'`. Sekcje są server components, w środku osadzają client component dla animacji (gdy to ma sens).
- `<Cursor />`, `<RippleCanvas />` dynamic-importowane z `ssr: false` — inaczej Three i custom cursor wybuchną przy SSR.
- Fonty przez `next/font` (zero FOUT). Animacje hero startują dopiero po `document.fonts.ready` żeby `SplitText` nie złapał metryk fallback fonta i nie skoczył layoutem.

**WebGL na mobile:**
- `useIsMobile()` (`max-width: 768px` lub `navigator.hardwareConcurrency < 4`) → renderuj statyczne SVG noise z animowanym CSS `mask-position` zamiast `<Canvas>`. Oszczędzamy ~50–100 MB RAM i drainage baterii.
- `<Canvas dpr={[1, 1.5]}>` zamiast domyślnego 2 — wystarcza, redukuje fillrate.
- `frameloop="demand"` + `invalidate()` w `useFrame` tylko gdy `uMouse` faktycznie się zmienił.
- Cleanup: `useEffect` return → `renderer.dispose()`, `geometry.dispose()`, `material.dispose()`, `texture.dispose()` (`drei` `useTexture` woła to samo).

**Lenis ↔ ScrollTrigger sync:**
- Jedna pętla `requestAnimationFrame` (Lenis raf + ScrollTrigger.update) — opisane w sekcji konfiguracji.
- Po dynamicznych zmianach wysokości (FAQ accordion, image load): `ScrollTrigger.refresh()` po `transitionend`/`load`.

**Reduced motion (`prefers-reduced-motion: reduce`):**
- `useReducedMotion()` → wyłącz Lenis (natywny scroll), zamień `MaskReveal` na natychmiastowy stan końcowy, wyłącz marquee tween, nie montuj `RippleCanvas`, ScrollTrigger pin `Process` → zwykły stack pionowy.
- `MagneticButton` → noop (cursor wraca natychmiast).

**Bundle size:**
- `dynamic(() => import('@/components/webgl/RippleCanvas'), { ssr: false })` — Three w osobnym chunku, lazy.
- Framer Motion: `m` zamiast `motion` + `LazyMotion` w providerze, importujemy tylko features `domAnimation`.

## Wytyczne stylistyczne (krótko, do trzymania się przy implementacji)

- Bazowa siatka: `max-w-[1440px] mx-auto px-6 md:px-12`. Hojny `py-32 md:py-48`.
- Typografia: `text-[clamp(3rem,10vw,9rem)] font-serif leading-[0.95] tracking-[-0.02em]` dla display.
- Hover na linkach: underline rysowany od lewej (`scaleX` 0→1, `transform-origin: left`).
- Bez `border-radius` na większych blokach (editorial), tylko subtelne `rounded-full` na buttonach i akcentach mint.

## Verification (jak sprawdzimy że działa)

1. `pnpm dev` (lub `npm run dev`) → otwórz `localhost:3000`.
2. Smoke test każdej sekcji w **Chrome DevTools → Performance**: rejestrujemy 5 s scrolla, sprawdzamy że FPS nie spada poniżej 55 i nie ma długich tasków >50 ms.
3. **Reduced motion**: DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" → strona ma scrollować natywnie, brak marquee, brak ripple, sekcja Process bez pina.
4. **Mobile**: DevTools device toolbar (iPhone 12) → WebGL canvas zastąpiony statycznym fallbackiem, marquee gładkie, slider before/after sterowalny touchem.
5. **Hydration**: brak warning "Hydration failed" w konsoli; sekcja Hero nie miga.
6. **Lighthouse** (mobile, throttled 4G): cel Performance ≥ 80, Accessibility ≥ 95.
7. **Klikalność magnetic button + form**: wpis maila + click → `console.log` z payloadem widoczny w DevTools.

## Co zostawiamy poza scope (na później)

- Realny backend formularza (Resend / webhook).
- Własne zdjęcia (placeholder Unsplash teraz, podmiana 1:1 później).
- i18n (PL only).
- CMS / MDX (treści w `lib/copy.ts`).
- Testy E2E (Playwright dostępny, ale nie wpinamy w tym etapie).
