// Cała kopia PL dla Cleaning Service Konin.
// Single source of truth — sekcje czytają wyłącznie stąd.
// Klucze stabilne — nie zmieniaj nazw bez aktualizacji komponentów.
//
// ─── PLACEHOLDERY DO PODMIANY PRZEZ KLIENTA ────────────────────────────────
// - copy.cta.channels.messenger.href   → link do Messengera
// - copy.cta.channels.whatsapp.href    → link do WhatsApp (format: https://wa.me/48518169491)
// - copy.cta.channels.email.sublabel   → docelowy adres email
// - copy.footer.email                  → docelowy adres email
// - copy.footer.nip                    → numer NIP
// - copy.footer.address                → adres ulicy (jeśli klient chce wyświetlać)
// - copy.gallery.items                 → zdjęcia przed/po z prawdziwych realizacji
// - copy.testimonials.items            → prawdziwe opinie z Google / Facebook
// ───────────────────────────────────────────────────────────────────────────

const PHONE_RAW = '518169491';
const PHONE_DISPLAY = '518 169 491';

export const copy = {
  nav: {
    brand: 'Cleaning Service Konin',
    brandShort: 'CSK',
    links: [
      { href: '#about', label: 'O nas' },
      { href: '#services', label: 'Oferta' },
      { href: '#pricing', label: 'Wycena' },
      { href: '#gallery', label: 'Galeria' },
      { href: '#cta', label: 'Kontakt' },
    ],
    phone: {
      display: PHONE_DISPLAY,
      href: `tel:${PHONE_RAW}`,
      label: 'Zadzwoń',
    },
  },

  hero: {
    headlineTop: 'Cleaning Service',
    headlineBottom: 'Konin',
    tagline: 'Sprawnie. Dokładnie. Dyskretnie. Przystępnie.',
    caption: `Konin · 100 km w każdą stronę · tel. ${PHONE_DISPLAY}`,
    ctas: [
      { label: 'Zamów wycenę', href: '#cta', kind: 'primary' as const },
      { label: 'Zadzwoń', href: `tel:${PHONE_RAW}`, kind: 'outline' as const },
    ],
  },

  about: {
    label: 'O nas',
    eyebrow: '— O nas',
    title: 'Sprzątanie, za którym stoi jakość, estetyka i odpowiedzialność.',
    paragraphs: [
      'Konin i okolice do 100 km — klienci prywatni i firmowi. Własny sprzęt, sprawdzone ekipy, zakres ustalany przed każdą realizacją.',
      'Bez presji — zakres i cenę ustalamy podczas kontaktu. Ekipa wchodzi po uzgodnieniu szczegółów.',
    ],
    objectsLabel: 'Obsługujemy',
    objects: [
      'mieszkania',
      'biura',
      'hotele',
      'biura coworkingowe',
      'lokale gastronomiczne',
      'obiekty po remoncie',
    ],
  },

  services: {
    label: 'Oferta',
    eyebrow: '— Zakres usług',
    title: 'Sprzątanie dopasowane do tego, czego naprawdę potrzebujesz.',
    // Eyebrow marquee — krótkie hasła
    marquee: [
      'mieszkania',
      'biura',
      'po remoncie',
      'okna',
      'tapicerki',
      'apartamenty',
      'domki letniskowe',
      'kampery',
      'nagrobki',
    ],
    private: {
      kicker: 'Klient prywatny',
      heading: 'Usługi dla domu i przestrzeni prywatnej',
      items: [
        {
          title: 'Sprzątanie mieszkań i domów',
          body: 'Zakres ustalany indywidualnie — bieżące utrzymanie porządku lub dokładne sprzątanie wybranych pomieszczeń.',
        },
        {
          title: 'Sprzątanie cykliczne',
          body: 'Stała współpraca w rytmie dopasowanym do Twojego trybu. Raz ustalony zakres, bez organizowania od nowa.',
        },
        {
          title: 'Sprzątanie jednorazowe',
          body: 'Jednorazowe doprowadzenie wnętrza do porządku — przed ważną okazją lub po dłuższej przerwie.',
        },
        {
          title: 'Po remoncie',
          body: 'Usuwanie kurzu, pyłu i zabrudzeń poremontowych. Wnętrze gotowe do użytkowania.',
        },
        {
          title: 'Okna i przeszklenia',
          body: 'Mycie okien, ram, luster i powierzchni szklanych. Bez smug, bez pozostałości.',
        },
        {
          title: 'Tapicerki meblowe',
          body: 'Pranie kanap, narożników, foteli i krzeseł tapicerowanych. Odświeżony wygląd, lepsza higiena.',
        },
        {
          title: 'Materace',
          body: 'Pranie materacy przywracające higienę powierzchni do spania.',
        },
        {
          title: 'Wykładziny',
          body: 'Odkurzanie i pranie wykładzin w domach i mieszkaniach. Świeżość tekstylnych powierzchni podłogowych.',
        },
        {
          title: 'Domki letniskowe',
          body: 'Przygotowanie do sezonu, odświeżenie po dłuższej przerwie lub porządek po pobycie gości.',
        },
        {
          title: 'Kampery',
          body: 'Wnętrze i zewnętrzna część pojazdu — przed sezonem, po podróży lub przed sprzedażą.',
        },
        {
          title: 'Opieka nad grobami',
          body: 'Mycie pomników, usuwanie zabrudzeń, wymiana zniczy. Przygotowanie przed świętami i ważnymi datami.',
        },
        {
          title: 'Renowacja pomników z lastryko',
          body: 'Czyszczenie, utwardzenie i zabezpieczenie przed wilgocią oraz czynnikami atmosferycznymi.',
        },
      ],
    },
    additional: {
      kicker: 'Usługi dodatkowe',
      heading: 'Możesz dobrać konkretne elementy',
      items: [
        { label: 'AGD', bullets: ['piekarnik', 'mikrofala', 'lodówka', 'zmywarka', 'pralka', 'suszarka'] as const },
        { label: 'Mycie wnętrza szafek' },
        { label: 'Czyszczenie fug' },
        { label: 'Impregnacja fug' },
        { label: 'Mocniej zabrudzone kuchnie' },
        { label: 'Łazienki wymagające doczyszczenia' },
        { label: 'Wybrane strefy wymagające większej dokładności' },
      ],
    },
    commercial: {
      kicker: 'Segment komercyjny',
      heading: 'Profesjonalne sprzątanie dla firm i obiektów użytkowych',
      items: [
        {
          title: 'Sprzątanie biur',
          body: 'Regularne lub jednorazowe utrzymanie czystości w biurach i przestrzeniach pracy.',
        },
        {
          title: 'Sprzątanie lokali użytkowych',
          body: 'Salony, punkty usługowe, gabinety i inne obiekty komercyjne. Zakres ustalany indywidualnie.',
        },
        {
          title: 'Sprzątanie apartamentów na wynajem',
          body: 'Przygotowanie obiektów do kolejnych gości, sprzątanie po pobytach i dbanie o standard, który wpływa na opinie klientów.',
        },
        {
          title: 'Odkurzanie i pranie wykładzin',
          body: 'Profesjonalne odkurzanie oraz pranie wykładzin w hotelach, pensjonatach i obiektach noclegowych.',
        },
        {
          title: 'Pranie tapicerki w obiektach komercyjnych',
          body: 'Odświeżanie mebli tapicerowanych w hotelach, apartamentach, biurach i poczekalniach.',
        },
        {
          title: 'Sprzątanie obiektów noclegowych',
          body: 'Obsługa domków, apartamentów, pensjonatów i innych miejsc przeznaczonych na wynajem krótkoterminowy lub sezonowy.',
        },
        {
          title: 'Sprzątanie kamperów dla firm',
          body: 'Dla firm wynajmujących lub sprzedających pojazdy rekreacyjne. Sprzątanie wnętrza oraz mycie zewnętrznej części pojazdu.',
        },
        {
          title: 'Współpraca stała dla firm',
          body: 'Stała współpraca dopasowana do trybu pracy obiektu, częstotliwości sprzątania i realnych potrzeb klienta biznesowego.',
        },
      ],
    },
  },

  whyUs: {
    label: 'Dlaczego my',
    eyebrow: '— Dlaczego my',
    title: 'Pracujemy konkretnie, z wyczuciem i dbałością o detale.',
    items: [
      { n: '01', title: 'Przejrzysta wycena', body: 'Zakres i cena ustalane przed wejściem ekipy. Żadnych kosztów, które pojawiają się po fakcie.' },
      { n: '02', title: 'Dyskrecja i kultura pracy', body: 'Ekipa nie hałasuje i nie wychodzi poza ustalony zakres. Twoja przestrzeń pozostaje Twoja.' },
      { n: '03', title: 'Jednorazowo lub na stałe', body: 'Możliwość pojedynczego zlecenia albo stałej współpracy w rytmie dopasowanym do Twojego trybu.' },
      { n: '04', title: 'Sprzęt i specjalistyka', body: 'Tapicerki, lastryko, AGD parowe — narzędzia i metody, których gospodarka domowa nie zapewnia.' },
    ],
  },

  process: {
    label: 'Współpraca',
    eyebrow: '— Jak wygląda współpraca',
    title: 'Pięć kroków od kontaktu do gotowej przestrzeni.',
    steps: [
      { n: '01', title: 'Kontakt', body: 'Kontaktujesz się z nami telefonicznie lub wiadomością. Opisujesz, czego potrzebujesz.' },
      { n: '02', title: 'Ustalenia', body: 'Ustalamy rodzaj usługi, zakres prac i Twoje potrzeby. Bez presji, bez sztywnych formularzy.' },
      { n: '03', title: 'Wycena', body: 'Przygotowujemy indywidualną wycenę dopasowaną do rzeczywistego zakresu pracy.' },
      { n: '04', title: 'Termin', body: 'Ustalamy termin realizacji wygodny dla Ciebie — jednorazowo lub w cyklu.' },
      { n: '05', title: 'Realizacja', body: 'Wykonujemy usługę sprawnie, dokładnie i estetycznie. Tak, żeby efekt mówił sam za siebie.' },
    ],
  },

  pricing: {
    label: 'Wycena',
    eyebrow: '— Wycena',
    title: 'Każda wycena ustalana jest indywidualnie.',
    factors: [
      'rodzaj obiektu',
      'wielkość powierzchni',
      'zakres prac',
      'stopień zabrudzenia',
      'częstotliwość współpracy',
      'ilość detali do doczyszczenia',
      'ilość przeszkleń',
      'rodzaj powierzchni',
      'usługi dodatkowe',
    ],
    cta: {
      label: 'Zamów wycenę',
      href: '#cta',
    },
  },

  area: {
    label: 'Obszar',
    eyebrow: '— Obszar działania',
    title: 'Konin i 100 km w każdą stronę.',
    body: 'Cleaning Service Konin obsługuje klientów prywatnych i firmowych na terenie Konina i okolic, do 100 km w każdą stronę. Szczegóły dojazdu i realizacji ustalane są indywidualnie podczas kontaktu.',
    radiusKm: 100,
    center: 'Konin',
    // Angle convention: 0° = East (right), 90° = South (down), 180° = West (left), 270° = North (up).
    // Clockwise, matching SVG y-down coordinate system.
    // km = approximate straight-line distance from Konin centre.
    cities: [
      { name: 'Konin',    angle:   0, km:  0 }, // centrum — renderowany osobno jako mint dot
      { name: 'Koło',     angle: 330, km: 30 }, // NE (~30 km): faktycznie na NE od Konina
      { name: 'Turek',    angle: 130, km: 35 }, // SE (~35 km): Turek leży na SE od Konina
      { name: 'Słupca',   angle: 185, km: 30 }, // W (~30 km): Słupca na zachód, lekko S
      { name: 'Łęczyca',  angle:  95, km: 70 }, // E/SE (~70 km): Łęczyca na wschód od Konina
      { name: 'Kalisz',   angle: 220, km: 65 }, // SW (~65 km): Kalisz na SW od Konina
      { name: 'Września', angle: 250, km: 55 }, // WSW (~55 km): Września na zachód, lekko S
      { name: 'Gniezno',  angle: 305, km: 75 }, // NW (~75 km): Gniezno na NW od Konina
    ] as const,
    note: 'Dojazd ustalany indywidualnie',
  },

  gallery: {
    label: 'Galeria',
    eyebrow: '— Galeria realizacji',
    title: 'Przed i po.',
    note: 'Schematyczne podglądy — zdjęcia z realizacji uzupełnimy w najbliższych dniach.',
    beforeLabel: 'PRZED',
    afterLabel: 'PO',
    // TODO(photos): gdy klient dostarczy zdjęcia — uzupełnić pola `before` i `after`
    // w każdej pozycji poniżej. Struktura siatki w Gallery.tsx pozostaje identyczna.
    items: [
      { caption: 'Mieszkanie po remoncie', meta: '62 m² · Konin · 4h' },
      { caption: 'Biuro po malowaniu', meta: '120 m² · Konin · 6h' },
      { caption: 'Kanapa z tkaniny', meta: 'Pranie ekstrakcyjne · 2h' },
      { caption: 'Posadzka lastryko', meta: 'Polerowanie · 45 m²' },
      { caption: 'Kuchnia po pracach', meta: 'AGD parowe · 5h' },
      { caption: 'Materac', meta: 'Pranie ozonowe · 1 szt' },
    ],
  },

  testimonials: {
    label: 'Opinie',
    eyebrow: '— Opinie',
    title: 'Zadowolenie klientów to nasza najlepsza reklama.',
    status: 'Opinie z Google i Facebooka pojawią się tutaj wkrótce.',
    // TODO: podmień na prawdziwe opinie klientów (Google / Facebook)
    items: [
      { quote: 'Profesjonalnie, dokładnie i bez chaosu. Mieszkanie wyglądało lepiej niż po wprowadzeniu.', author: 'Klient prywatny', role: 'sprzątanie po remoncie' },
      { quote: 'Stała współpraca od kilku miesięcy. Biuro zawsze gotowe, zero zmartwień.', author: 'Klient biznesowy', role: 'biuro · współpraca stała' },
      { quote: 'Apartament na wynajem zawsze przygotowany na czas. Goście zostawiają świetne opinie.', author: 'Klientka', role: 'apartament na wynajem' },
    ],
  },

  faq: {
    label: 'FAQ',
    eyebrow: '— Najczęstsze pytania',
    title: 'Najczęstsze pytania.',
    items: [
      {
        q: 'Jak wygląda wycena?',
        a: 'Każda wycena dopasowywana jest indywidualnie do rodzaju obiektu, zakresu prac, wielkości powierzchni i stopnia zabrudzenia.',
      },
      {
        q: 'Czy można zamówić pojedyncze usługi dodatkowe?',
        a: 'Tak. AGD, fugi, wnętrza szafek, wybrane strefy — każdy element można dobrać osobno. Zakres ustalamy podczas wyceny.',
      },
      {
        q: 'Czy obsługiwani są tylko klienci prywatni?',
        a: 'Nie. Obsługujemy również firmy, biura, lokale użytkowe, apartamenty na wynajem, domki letniskowe, hotele i inne obiekty komercyjne.',
      },
      {
        q: 'Czy można zamówić stałą współpracę?',
        a: 'Tak. Oferujemy zarówno zlecenia jednorazowe, jak i współpracę cykliczną dopasowaną do potrzeb klienta.',
      },
      {
        q: 'Co konkretnie obejmuje sprzątanie po remoncie?',
        a: 'Wszystkie powierzchnie kontaktowe, AGD, okna i fugi po pracach budowlanych. Pełny zakres — kuchnia, łazienki, posadzki, taras — ustalamy podczas wyceny.',
      },
      {
        q: 'Jak najszybciej się skontaktować?',
        a: 'Najszybciej telefonicznie lub przez wiadomość. Wystarczy opisać, jaka usługa Cię interesuje, a ustalimy dalsze szczegóły.',
      },
    ],
  },

  cta: {
    label: 'Kontakt',
    eyebrow: '— Porozmawiajmy',
    title: 'Porozmawiajmy o Twoim zleceniu.',
    caption: 'Odpowiadamy szybko — zwykle tego samego dnia.',
    channels: [
      {
        kind: 'phone' as const,
        label: 'Zadzwoń',
        sublabel: PHONE_DISPLAY,
        href: `tel:${PHONE_RAW}`,
        glyph: '☎',
      },
      {
        kind: 'sms' as const,
        label: 'Napisz SMS',
        sublabel: PHONE_DISPLAY,
        href: `sms:${PHONE_RAW}`,
        glyph: '✎',
      },
      {
        kind: 'whatsapp' as const,
        label: 'WhatsApp',
        sublabel: 'napisz na WhatsApp',
        // TODO: podmień na docelowy link, np. https://wa.me/48518169491
        href: `https://wa.me/48${PHONE_RAW}`,
        glyph: '◐',
      },
      {
        kind: 'messenger' as const,
        label: 'Messenger',
        sublabel: 'napisz na Facebooku',
        // TODO: podmień na docelowy link do strony FB / Messenger
        href: '#',
        glyph: '◊',
      },
      {
        kind: 'email' as const,
        label: 'Email',
        // TODO: podmień na docelowy adres email
        sublabel: 'kontakt@cleaningservicekonin.pl',
        href: 'mailto:kontakt@cleaningservicekonin.pl',
        glyph: '✉',
      },
    ],
    formTitle: 'Wypełnij formularz',
    formCaption: 'Opisz krótko, jaka usługa Cię interesuje. Odezwiemy się z konkretną wyceną.',
    fields: {
      name: 'Imię i nazwisko',
      phone: 'Telefon (opcjonalnie)',
      email: 'Email',
      service: 'Rodzaj usługi',
      message: 'Wiadomość',
    },
    serviceOptions: [
      'Wybierz usługę',
      'Sprzątanie mieszkania / domu',
      'Sprzątanie po remoncie',
      'Mycie okien',
      'Pranie tapicerki / materacy',
      'Sprzątanie biura / lokalu',
      'Apartament na wynajem',
      'Domek letniskowy / kamper',
      'Opieka nad grobem',
      'Inne / nie wiem',
    ],
    submit: 'Wyślij zapytanie',
    success: 'Dzięki. Odezwiemy się wkrótce.',
    errorEmail: 'Podaj poprawny adres email.',
  },

  footer: {
    company: 'Cleaning Service Konin',
    tagline: 'Sprawnie · Dokładnie · Dyskretnie · Przystępnie',
    // TODO: NIP do uzupełnienia gdy klient dostarczy
    nip: '',
    phone: PHONE_DISPLAY,
    phoneHref: `tel:${PHONE_RAW}`,
    // TODO: docelowy email
    email: 'kontakt@cleaningservicekonin.pl',
    area: 'Konin · 100 km w każdą stronę',
    // TODO: godziny pracy do uzupełnienia gdy klient potwierdzi
    hours: ['Pn–Pt: 8:00–18:00', 'Sb: 9:00–14:00'],
    address: 'Konin, woj. wielkopolskie',
    contactLabel: 'Kontakt',
    areaLabel: 'Obszar działania',
    hoursLabel: 'Godziny',
    legal: `© ${new Date().getFullYear()} Cleaning Service Konin. Wszelkie prawa zastrzeżone.`,
    // Mask-reveal podpis — utrzymuje 4-słowy slogan firmy
    signature: 'Sprawnie.\nDokładnie.\nDyskretnie.\nPrzystępnie.',
  },
} as const;

export type Copy = typeof copy;
