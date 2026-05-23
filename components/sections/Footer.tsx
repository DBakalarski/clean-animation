import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';

// Static map uses staticmap.openstreetmap.de — no API key required.
// Centred on Warsaw centre (52.2297, 21.0122).
const MAP_SRC =
  'https://staticmap.openstreetmap.de/staticmap.php?center=52.2297,21.0122&zoom=13&size=600x400&maptype=mapnik';

export default function Footer() {
  const f = copy.footer;
  // editorial-stylist extended copy keys — fall back gracefully
  const mapLabel = (f as Record<string, unknown>).mapLabel as string | undefined ?? 'Lokalizacja';
  const legal = (f as Record<string, unknown>).legal as string | undefined;

  return (
    <footer id="footer" className="py-32 md:py-48 bg-paper border-t border-mint">
      <div className="shell">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24 md:mb-32">

          {/* Column 1 — contact details */}
          <address className="not-italic space-y-3">
            <p className="caption-mono text-ink/50 mb-6">Kontakt</p>
            <p className="font-mono text-xs text-ink/80 leading-relaxed">{f.company}</p>
            <p className="font-mono text-xs text-ink/60">{f.nip}</p>
            <a
              href={`tel:${f.phone.replace(/\s/g, '')}`}
              className="link-underline block font-mono text-xs text-ink/80 mt-4"
            >
              {f.phone}
            </a>
            <a
              href={`mailto:${f.email}`}
              className="link-underline block font-mono text-xs text-ink/80"
            >
              {f.email}
            </a>
          </address>

          {/* Column 2 — hours + address */}
          <div className="space-y-3">
            <p className="caption-mono text-ink/50 mb-6">Godziny</p>
            {f.hours.map((line) => (
              <p key={line} className="font-mono text-xs text-ink/80 leading-relaxed">
                {line}
              </p>
            ))}
            <p className="font-mono text-xs text-ink/60 pt-4 leading-relaxed">{f.address}</p>
          </div>

          {/* Column 3 — static map */}
          <div className="space-y-4">
            <p className="caption-mono text-ink/50 mb-6">{mapLabel}</p>
            <div className="overflow-hidden" style={{ aspectRatio: '3/2' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MAP_SRC}
                alt="Mapa: lokalizacja Warszawa centrum"
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(1) contrast(1.1)' }}
              />
            </div>
          </div>
        </div>

        {/* Legal line */}
        {legal && <p className="caption-mono text-ink/30 mb-16 md:mb-24">{legal}</p>}

        {/* Large signature — wrapped in MaskReveal */}
        <MaskReveal
          data-signature
          aria-hidden="true"
          className="overflow-hidden"
        >
          <p
            className="font-serif text-ink/[0.07] leading-[0.92] tracking-[-0.02em] select-none whitespace-pre-line"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
          >
            {f.signature}
          </p>
        </MaskReveal>
      </div>
    </footer>
  );
}
