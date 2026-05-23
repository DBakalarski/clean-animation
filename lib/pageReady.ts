// Globalny sygnał "strona ujawniona" — rozwiązuje się gdy PageLoader skończy outro
// (lub natychmiast w reduced-motion). Sekcje z animacją on-load (Hero) czekają na ten
// sygnał zamiast na document.fonts.ready, żeby animacje nie odpalały się za zasłoną.

let resolveReady: () => void = () => {};
let alreadyResolved = false;

export const pageReady: Promise<void> = new Promise<void>((r) => {
  resolveReady = r;
});

export function markPageReady() {
  if (alreadyResolved) return;
  alreadyResolved = true;
  resolveReady();
}

// Safety net — gdyby PageLoader z jakiegoś powodu nigdy nie zawołał markPageReady
// (błąd, custom hostowanie bez Loadera), zwalniamy po 5s żeby Hero nie wisiał na zawsze.
if (typeof window !== 'undefined') {
  window.setTimeout(() => markPageReady(), 5000);
}
