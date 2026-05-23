// Cała kopia PL. Klucze stabilne — nie zmieniaj nazw.
// Importują: animation-architect, webgl-craftsman i wszystkie sekcje.

export const copy = {
  nav: {
    brand: 'Czystość',
    links: [
      { href: '#services', label: 'Usługi' },
      { href: '#pricing', label: 'Cennik' },
      { href: '#cta', label: 'Kontakt' },
    ],
  },

  hero: {
    headlineTop: 'Czysto. Spokojnie.',
    headlineBottom: 'Bez resztek.',
    caption: 'Sprzątanie editorial — bez agresywnej chemii, z oddechem.',
    // Secondary detail shown under caption in mono
    detail: 'Warszawa · od 180 zł · bez umowy',
  },

  services: {
    label: 'Usługi',
    items: [
      'Sprzątanie domu',
      'Biura',
      'Po remoncie',
      'Okna',
      'Tapicerki',
      'Generalne',
    ],
    // Eyebrow above marquee
    eyebrow: '— zakres usług',
  },

  effects: {
    label: 'Efekty',
    title: 'Zobacz różnicę.',
    caption: 'Przeciągnij suwak.',
    // Labels rendered over the two image halves
    before: 'Przed',
    after: 'Po',
  },

  gallery: {
    label: 'Galeria',
    title: 'Przed i po — bez retuszu.',
    caption: 'Każde zdjęcie z realizacji.',
  },

  process: {
    label: 'Proces',
    title: 'Jak pracujemy.',
    steps: [
      {
        n: '01',
        title: 'Brief',
        body: 'Krótka rozmowa — co, gdzie, kiedy. Bez formularzy.',
      },
      {
        n: '02',
        title: 'Wycena',
        body: 'Stała cena przed wizytą. Bez ukrytych kosztów.',
      },
      {
        n: '03',
        title: 'Sprzątanie',
        body: 'Nasz zespół, nasze narzędzia, pełna dyskrecja.',
      },
      {
        n: '04',
        title: 'Odbiór',
        body: 'Sprawdzamy razem. Poprawki gratis, bez pytań.',
      },
    ],
  },

  testimonials: {
    label: 'Opinie',
    items: [
      {
        quote: 'Profesjonalnie i bezboleśnie. Dom pachniał spokojem.',
        author: 'Maja K.',
        role: 'klientka od 2 lat',
      },
      {
        quote: 'Po remoncie wyglądało jak nowe. Polecam bez wahania.',
        author: 'Tomasz R.',
        role: 'jednorazowe zlecenie',
      },
      {
        quote: 'Biuro lśni od trzech miesięcy. Stała współpraca.',
        author: 'Anna W.',
        role: 'abonament miesięczny',
      },
    ],
  },

  pricing: {
    label: 'Cennik',
    eyebrow: '— trzy pakiety',
    title: 'Przejrzyste stawki.',
    plans: [
      {
        name: 'Dom',
        price: 'od 180 zł',
        // Short qualifier shown under price in mono
        priceNote: 'do 60 m²',
        features: [
          'wszystkie pomieszczenia',
          'bezzapachowa chemia',
          'mycie okien gratis',
        ],
        cta: 'Wybierz',
      },
      {
        name: 'Biuro',
        price: 'od 260 zł',
        priceNote: 'do 100 m²',
        features: [
          'po godzinach pracy',
          'faktura VAT 23%',
          'stała obsługa w abonamencie',
        ],
        cta: 'Wybierz',
      },
      {
        name: 'Po remoncie',
        price: 'od 420 zł',
        priceNote: 'wycena indywidualna',
        features: [
          'usuwanie pyłu remontowego',
          'mycie okien i ram',
          'dezynfekcja powierzchni',
        ],
        cta: 'Zapytaj',
      },
    ],
  },

  faq: {
    label: 'FAQ',
    title: 'Pytania.',
    items: [
      {
        q: 'Czy macie własne środki czystości?',
        a: 'Tak. Pracujemy wyłącznie ze środkami bezzapachowymi, hipoalergicznymi i ekologicznymi.',
      },
      {
        q: 'Czy muszę być w domu podczas sprzątania?',
        a: 'Nie. Działamy na podstawie przekazanego klucza lub kodu dostępu na umówiony okres.',
      },
      {
        q: 'Jak długo trwa standardowe sprzątanie?',
        a: 'Dom do 60 m² — około 2–4h. Sprzątanie po remoncie — 4–8h, zależnie od stanu.',
      },
      {
        q: 'Czy wystawiacie fakturę VAT?',
        a: 'Tak, na życzenie. Obsługujemy zarówno klientów indywidualnych, jak i firmy.',
      },
      {
        q: 'Czy oferujecie stałą współpracę?',
        a: 'Tak. Abonament tygodniowy lub miesięczny z rabatem 15% od trzeciej wizyty.',
      },
      {
        q: 'Jaki jest wasz obszar działania?',
        a: 'Warszawa i gminy ościenne do 25 km od centrum. Dojazd bezpłatny.',
      },
    ],
  },

  cta: {
    label: 'Kontakt',
    eyebrow: '— porozmawiajmy',
    title: 'Porozmawiajmy.',
    caption: 'Oddzwaniamy w ciągu 24 godzin.',
    fields: {
      name: 'Imię',
      email: 'Email',
      message: 'Wiadomość',
    },
    submit: 'Wyślij',
    success: 'Dzięki. Odezwiemy się wkrótce.',
    // Validation error copy
    errorEmail: 'Podaj poprawny adres email.',
  },

  footer: {
    company: 'Czystość sp. z o.o.',
    nip: 'NIP: 000-000-00-00',
    phone: '+48 000 000 000',
    email: 'kontakt@czystosc.pl',
    hours: ['Pn–Pt: 8:00–18:00', 'Sb: 9:00–14:00'],
    address: 'ul. Przykładowa 1, 00-001 Warszawa',
    // Map column heading
    mapLabel: 'Znajdź nas',
    // Legal line
    legal: `© ${new Date().getFullYear()} Czystość sp. z o.o. Wszelkie prawa zastrzeżone.`,
    // Large signature — animation-architect adds mask-reveal via data-signature
    signature: 'Czysto.\nSpokojnie.\nBez resztek.',
  },
} as const;

export type Copy = typeof copy;
