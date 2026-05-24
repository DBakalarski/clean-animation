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
    caption:
      'Profesjonalne usługi sprzątające dla klientów prywatnych i firmowych.',
    description:
      'Zapewniamy konkretną obsługę, indywidualne podejście i zakres prac dopasowany do rodzaju obiektu oraz oczekiwanego efektu.',
    ctas: [
      { label: 'Zamów wycenę', href: '#cta', kind: 'primary' as const },
      { label: 'Zobacz ofertę', href: '#services', kind: 'ghost' as const },
      { label: 'Zadzwoń', href: `tel:${PHONE_RAW}`, kind: 'outline' as const },
      { label: 'Napisz wiadomość', href: '#cta', kind: 'ghost' as const },
    ],
  },

  about: {
    label: 'O nas',
    eyebrow: '— O nas',
    title: 'Sprzątanie, za którym stoi jakość, estetyka i odpowiedzialność.',
    paragraphs: [
      'Cleaning Service Konin to marka stworzona dla klientów, którzy oczekują realnego efektu, a nie tylko powierzchownego sprzątania. Stawiamy na rzetelność, dokładność, uczciwe podejście i usługę dopasowaną do konkretnych potrzeb.',
      'Działamy konkretnie, sprawnie i z wyczuciem. Zależy nam nie tylko na samym porządku, ale też na komforcie współpracy i tym, żeby klient od początku wiedział, czego może się spodziewać.',
    ],
    objectsLabel: 'Obsługujemy',
    objects: [
      'mieszkania',
      'domy',
      'biura',
      'lokale użytkowe',
      'domki letniskowe',
      'apartamenty na wynajem',
      'obiekty noclegowe',
      'hotele',
      'kampery',
      'nagrobki',
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
          body: 'Regularne oraz jednorazowe sprzątanie dopasowane do potrzeb klienta. Zakres ustalany jest indywidualnie i może obejmować bieżące utrzymanie porządku lub dokładniejsze sprzątanie wybranych pomieszczeń.',
        },
        {
          title: 'Sprzątanie cykliczne',
          body: 'Stała współpraca dla osób, które chcą mieć porządek pod kontrolą bez konieczności organizowania wszystkiego od nowa za każdym razem. Wygodne, regularne, spokojne.',
        },
        {
          title: 'Sprzątanie jednorazowe',
          body: 'Dla osób potrzebujących jednorazowego doprowadzenia wnętrza do porządku, odświeżenia mieszkania lub przygotowania domu na ważną okazję.',
        },
        {
          title: 'Sprzątanie po remoncie',
          body: 'Dokładne usuwanie kurzu, pyłu i zabrudzeń poremontowych. Przygotowujemy wnętrze do użytkowania, dbając o estetykę i wykończenie przestrzeni.',
        },
        {
          title: 'Mycie okien i przeszkleń',
          body: 'Dokładne mycie okien, ram, luster i innych powierzchni szklanych. Czystość, przejrzystość i estetyczny efekt — bez smug.',
        },
        {
          title: 'Pranie tapicerki meblowej',
          body: 'Profesjonalne pranie kanap, narożników, foteli i krzeseł tapicerowanych. Odświeża wygląd mebli i poprawia komfort użytkowania.',
        },
        {
          title: 'Pranie materacy',
          body: 'Dokładne pranie materacy poprawiające higienę codziennego użytkowania i odświeżające powierzchnię do spania.',
        },
        {
          title: 'Pranie wykładzin',
          body: 'Odkurzanie i pranie wykładzin w domach, mieszkaniach i obiektach prywatnych. Świeżość, czystość i estetyka powierzchni tekstylnych.',
        },
        {
          title: 'Sprzątanie domków letniskowych',
          body: 'Przygotowanie obiektu do sezonu, odświeżenie wnętrza po dłuższej przerwie lub uporządkowanie domku po pobycie gości.',
        },
        {
          title: 'Sprzątanie kamperów',
          body: 'Sprzątanie wnętrza oraz mycie zewnętrznej części pojazdu — przed sezonem, po podróży albo przed sprzedażą.',
        },
        {
          title: 'Opieka nad grobami',
          body: 'Sprzątanie i uporządkowanie miejsca, mycie pomników, usuwanie zabrudzeń, wymiana zniczy oraz przygotowanie grobu przed świętami, rocznicami i ważnymi datami.',
        },
        {
          title: 'Renowacja pomników z lastryko',
          body: 'Dokładne wyczyszczenie, utwardzenie i zabezpieczenie przed czynnikami atmosferycznymi — wilgocią, ścieraniem oraz promieniowaniem.',
        },
      ],
    },
    additional: {
      kicker: 'Usługi dodatkowe',
      heading: 'Możesz dobrać konkretne elementy',
      items: [
        'Czyszczenie i dezynfekcja piekarnika',
        'Czyszczenie i dezynfekcja mikrofali',
        'Czyszczenie i dezynfekcja lodówki',
        'Czyszczenie i dezynfekcja zmywarki',
        'Czyszczenie i dezynfekcja pralki',
        'Czyszczenie i dezynfekcja suszarki',
        'Mycie wnętrza szafek',
        'Czyszczenie fug',
        'Impregnacja fug',
        'Mocniej zabrudzone kuchnie',
        'Łazienki wymagające doczyszczenia',
        'Wybrane strefy wymagające większej dokładności',
      ],
    },
    commercial: {
      kicker: 'Segment komercyjny',
      heading: 'Profesjonalne sprzątanie dla firm i obiektów użytkowych',
      lead: 'Czysta przestrzeń ma znaczenie dla komfortu pracowników, pierwszego wrażenia klientów i wizerunku firmy. Do każdego zlecenia podchodzimy odpowiedzialnie i konkretnie.',
      items: [
        {
          title: 'Sprzątanie biur',
          body: 'Regularne lub jednorazowe utrzymanie czystości w biurach i przestrzeniach pracy.',
        },
        {
          title: 'Sprzątanie lokali użytkowych',
          body: 'Usługi dla salonów, punktów usługowych, gabinetów i innych obiektów komercyjnych. Zakres ustalany indywidualnie.',
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
      { n: '01', title: 'Indywidualne podejście', body: 'Każde zlecenie traktujemy osobno — inne potrzeby ma mieszkanie, inne biuro, a jeszcze inne kamper czy nagrobek.' },
      { n: '02', title: 'Dokładność i detale', body: 'Sprzątamy tak, żeby nie trzeba było po nas poprawiać. Zwracamy uwagę na miejsca, o których się zwykle zapomina.' },
      { n: '03', title: 'Estetyczny efekt końcowy', body: 'Nie chodzi tylko o czystość — chodzi o wrażenie, jakie zostaje po wejściu do pomieszczenia.' },
      { n: '04', title: 'Kultura pracy i dyskrecja', body: 'Działamy spokojnie, kulturalnie i z poszanowaniem przestrzeni klienta. Bez chaosu i bez zbędnych pytań.' },
      { n: '05', title: 'Przejrzysta wycena', body: 'Wycena ustalana indywidualnie, ale zawsze konkretna, uczciwa i jasna na samym początku.' },
      { n: '06', title: 'Klient prywatny i firmowy', body: 'Obsługujemy mieszkania, domy, biura, hotele, apartamenty, domki, kampery — pełne spektrum.' },
      { n: '07', title: 'Jednorazowo lub na stałe', body: 'Możliwość pojedynczego zlecenia lub stałej, cyklicznej współpracy dopasowanej do trybu klienta.' },
      { n: '08', title: 'Szeroki zakres usług', body: 'Również usługi specjalistyczne i sezonowe — od prania tapicerki po renowację pomników z lastryko.' },
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
    lead: 'Cena usługi zależy od kilku konkretnych czynników. Dzięki temu otrzymujesz uczciwą wycenę dopasowaną do rzeczywistego zakresu pracy.',
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
    footnote: 'Uczciwa, konkretna wycena dopasowana do rzeczywistego zakresu pracy.',
  },

  area: {
    label: 'Obszar',
    eyebrow: '— Obszar działania',
    title: 'Konin i 100 km w każdą stronę.',
    body: 'Cleaning Service Konin obsługuje klientów prywatnych i firmowych na terenie Konina i okolic, do 100 km w każdą stronę. Szczegóły dojazdu i realizacji ustalane są indywidualnie podczas kontaktu.',
    radiusKm: 100,
    center: 'Konin',
    cities: ['Konin', 'Turek', 'Słupca', 'Koło', 'Kalisz', 'Września', 'Łęczyca', 'Gniezno'],
    note: 'Dojazd ustalany indywidualnie',
  },

  gallery: {
    label: 'Galeria',
    eyebrow: '— Galeria realizacji',
    title: 'Realizacje — przed i po.',
    caption: 'Każde zdjęcie z prawdziwej realizacji.',
    status: 'Galeria w trakcie aktualizacji — zdjęcia z realizacji wkrótce.',
    // TODO: podmień placeholdery Picsum na zdjęcia z prawdziwych realizacji klienta
    items: [
      { before: 'https://picsum.photos/seed/csk1b/600/800', after: 'https://picsum.photos/seed/csk1a/600/800', alt: 'Salon — przed i po', category: 'mieszkanie' },
      { before: 'https://picsum.photos/seed/csk2b/600/700', after: 'https://picsum.photos/seed/csk2a/600/700', alt: 'Kuchnia — przed i po', category: 'mieszkanie' },
      { before: 'https://picsum.photos/seed/csk3b/600/900', after: 'https://picsum.photos/seed/csk3a/600/900', alt: 'Łazienka — przed i po', category: 'po remoncie' },
      { before: 'https://picsum.photos/seed/csk4b/600/650', after: 'https://picsum.photos/seed/csk4a/600/650', alt: 'Biuro — przed i po', category: 'biuro' },
      { before: 'https://picsum.photos/seed/csk5b/600/750', after: 'https://picsum.photos/seed/csk5a/600/750', alt: 'Apartament — przed i po', category: 'apartament' },
      { before: 'https://picsum.photos/seed/csk6b/600/800', after: 'https://picsum.photos/seed/csk6a/600/800', alt: 'Pomnik — przed i po', category: 'nagrobek' },
    ],
  },

  testimonials: {
    label: 'Opinie',
    eyebrow: '— Opinie',
    title: 'Zadowolenie klientów to nasza najlepsza reklama.',
    lead: 'Dobra usługa broni się sama, ale nic nie buduje zaufania tak mocno jak opinie zadowolonych klientów.',
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
        a: 'Tak. Można dobrać konkretne elementy usługi — na przykład piekarnik, mikrofalówkę, lodówkę, zmywarkę, pralkę, suszarkę, wnętrza szafek, czyszczenie fug, impregnację fug albo wybrane strefy wymagające mocniejszego doczyszczenia.',
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
        q: 'Jak najszybciej się skontaktować?',
        a: 'Najszybciej telefonicznie lub przez wiadomość. Wystarczy opisać, jaka usługa Cię interesuje, a ustalimy dalsze szczegóły.',
      },
    ],
  },

  cta: {
    label: 'Kontakt',
    eyebrow: '— Porozmawiajmy',
    title: 'Porozmawiajmy o Twoim zleceniu.',
    caption:
      'Szukasz firmy, która pracuje dokładnie, konkretnie i z wyczuciem? Odpowiadamy szybko — zwykle tego samego dnia.',
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
