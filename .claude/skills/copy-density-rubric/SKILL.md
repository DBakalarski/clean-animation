---
name: copy-density-rubric
description: Rubryka oceny copy (PL) — signal-to-noise, scanability F-pattern, redundancja między sekcjami, hierarchia komunikatu, długość vs slot, voice consistency. Używana przez copy-auditor i ad hoc do oceny PL landing copy w awwwards-landing. Zwraca per-sekcja ✅/⚠️/🔴 + konkretne cytaty + heurystyki ratio (hero ≤ 8 słów, body ≤ 25 słów, bullet ≤ 6 słów, mono caption ≤ 4 słowa).
---

# Copy Density Rubric

Rubryka oceny copy dla landing page `awwwards-landing` (Cleaning Service Konin, lang = PL). Używaj jej deterministycznie — nie „wibracje", konkretne pomiary z cytatami z `lib/copy.ts`.

## Kiedy jej używać

- `copy-auditor` odpala ją jako pierwszy ruch po wczytaniu `lib/copy.ts`.
- Ad hoc gdy main Claude potrzebuje szybkiego sprawdzenia czy dany fragment copy jest OK.
- Nie używaj jej do oceny EN tekstu (brak heurystyk dla EN) ani do oceny SEO keyword density (→ `seo-strategist`).

## Setup

1. Wczytaj `lib/copy.ts` całe (typowo ~400 linii).
2. Zmapuj klucze do sekcji z `app/page.tsx` (kolejność wizualna).
3. Dla każdej sekcji policz słowa per pole (headline, tagline, body, bullets, captions).
4. Przejdź 6 wymiarów poniżej.

## 6 wymiarów oceny

Skala uniwersalna: **✅ OK** / **⚠️ wątpliwie** / **🔴 problem**.
Każde znalezisko z cytatem `path:line` + cytatem treści.

### 1. Signal-to-noise per sekcja

**Pytanie:** Ile linii w sekcji to konkret (usługa, liczba, lokalizacja, korzyść mierzalna), a ile to wypełniacz?

**Filler-words flagi** (rozszerz po obserwacji):
- „profesjonalnie / profesjonalna obsługa"
- „z dbałością o szczegóły"
- „indywidualne podejście" (bez konkretu jak)
- „kompleksowe rozwiązania"
- „najwyższa jakość"
- „doświadczenie i pasja"

**Konkret-words (sygnały dobrego copy):**
- nazwa usługi („po remoncie", „tapicerki", „okna wysokie")
- liczba (m², zł, godzin, lat)
- lokalizacja („Konin", konkretne dzielnice)
- konkretny obiekt („mieszkanie po remoncie", „biuro coworkingowe")

**Próg:** signal / total ≥ 60% per sekcja = ✅. 40–60% = ⚠️. <40% = 🔴.

### 2. Scanability (F-pattern test)

**Pytanie:** Czy pierwsze 2 słowa każdego nagłówka i każdego bulleta to nośnik treści, czy filler?

**Test:** zakryj wszystko poza pierwszymi 2 słowami każdego H/bullet. Czy nadal wiadomo, o czym jest sekcja?

- ✅: „Po remoncie. Sprzątanie…" — wiem.
- 🔴: „Profesjonalne usługi…" — nie wiem nic.
- 🔴: „Z dbałością o…" — nie wiem.
- ⚠️: „Nasza oferta…" — kierunek OK, ale generyczne.

### 3. Redundancja między sekcjami

**Pytanie:** Czy Hero / About / WhyUs / Services / Process / CTA mówią to samo różnymi słowami?

**Workflow:**
1. Wypisz **główny komunikat** każdej sekcji w 1 zdaniu z własnych słów.
2. Porównaj parami. Powtórzenia = problem.
3. Dla każdej duplikującej się pary: **kto ma to powiedzieć?**

**Format wyniku:**

| Komunikat | Występuje w | Zostaw w | Skróć / usuń z |
|---|---|---|---|
| „Sprzątamy obiekty po remoncie" | Hero (tagline), About, Services | Services | Hero, About |
| „Indywidualne podejście" | About, WhyUs, CTA | WhyUs (z konkretem) | About, CTA |

**Próg:** 0 duplikatów = ✅. 1–2 duplikaty = ⚠️. ≥3 = 🔴.

### 4. Hierarchia komunikatu

**Pytanie:** Czy klient w 5 sekund (above-the-fold, scroll = 0) wyłapie: **co robicie / dla kogo / Konin / jak zadzwonić**?

**Test:**
- Czy headline mówi CO? (sprzątanie, nie „rozwiązania")
- Czy widoczna jest lokalizacja Konin?
- Czy widać CTA (numer telefonu / przycisk)?
- Czy widać dla kogo (prywatni / firmy / oba)?

Brak któregokolwiek above-the-fold = **🔴 critical**, nie ⚠️.

### 5. Długość vs slot

**Heurystyki ratio** (PL, landing editorial):

| Element | Próg |
|---|---|
| Hero headline | ≤ 8 słów (idealnie 3–5) |
| Hero tagline | ≤ 12 słów lub 4 krótkie zdania-akcenty („Czysto. Spokojnie. Bez resztek.") |
| Section heading | ≤ 6 słów |
| Body paragraph | ≤ 25 słów lub ≤ 3 zdania |
| Bullet point | ≤ 6 słów |
| Mono caption / label | ≤ 4 słowa |
| FAQ question | ≤ 12 słów |
| FAQ answer | ≤ 30 słów (1–2 zdania, laconic) |
| CTA label | 2–3 słowa, czasownik na początku („Zamów wycenę", „Zadzwoń teraz") |

**Slot test (mobile):** czy headline mieści się w 1 linii na 375 px (przy fluid clamp typography)? Jeśli łamie na 3 linie — sygnał, że za długi.

Próg: ≥80% pól w sekcji w normie = ✅. 60–80% = ⚠️. <60% = 🔴.

### 6. Voice consistency

**Pytanie:** Czy ton jest editorial — krótkie zdania, kropki jako rytm, zero salesy, zero stockowych fraz?

**Pożądane:**
- Krótkie zdania, czasem fragmenty z kropką jako rytmem.
- Konkrety przed przymiotnikami („50 m² mieszkanie po remoncie", nie „kompleksowe sprzątanie powierzchni mieszkalnych").
- Editorial spokój — bez „!!!", bez emoji, bez „💪", bez „Sprawimy że…".
- Lekki dystans, profesjonalizm. Nie kumpelsko, nie korpo.

**Niepożądane (flaguj):**
- „Sprawimy że…", „Zadbamy o to żeby…" — salesy filler.
- „Kompleksowe rozwiązania" — korpo-pustka.
- „Najwyższa jakość", „lider na rynku" — stockowe.
- Wykrzykniki, emoji, capslock dla emfazy.
- „My", „nasz" więcej niż 1× na zdanie.

## Output template

Po przejściu wszystkich 6 wymiarów dla wszystkich sekcji, zwróć:

```
## Copy Density Rubric — Wyniki

### Per sekcja
| Sekcja | Signal/Noise | Scanability | Redundancja | Hierarchia | Długość | Voice |
|---|---|---|---|---|---|---|
| Hero | ✅ | ✅ | ⚠️ (dubel z About) | 🔴 (brak Konina above-the-fold) | ✅ | ✅ |
| About | ... | ... | ... | ... | ... | ... |
| ... | | | | | | |

### Lista znalezisk z cytatami
- 🔴 [Hero / Hierarchia] `lib/copy.ts:42` — `tagline: "Sprawnie. Dokładnie. Dyskretnie."` — brak Konin above-the-fold. Sugestia: dodać lokalizację do tagline lub mono captionu pod headline.
- ⚠️ [About / Redundancja] `lib/copy.ts:118` — duplikat komunikatu z `Hero:42`. Zostaw w Hero, skróć About do innego kąta (np. proces vs efekt).
- [...]

### Rekomendacja długości (per sekcja)
- Hero: OK
- About: skróć do 2 zdań (obecnie 5)
- WhyUs: usuń 2 z 6 bulletów (duble z Services)
- [...]
```

## Heurystyki finalne

- **Domyśl: tnij.** Editorial landing wymaga oddechu nie tylko w spacing, ale i w copy. Jak masz wątpliwość czy skrócić — skróć.
- **Konkret > epitet.** „50 m² po remoncie, 3 godziny" bije „kompleksowe sprzątanie powierzchni mieszkalnych".
- **Lokalność.** Słowo „Konin" musi się pojawić ≥ 3× na stronie (hero, footer, jeszcze raz w środku — about/area). Bez przesady.
- **Telefon must.** Numer telefonu widoczny above-the-fold + w CTA + w footer = 3 punkty kontaktu, minimum.
