import { MaskReveal } from '@/components/ui/MaskReveal';
import { copy } from '@/lib/copy';

export default function Footer() {
  const f = copy.footer;

  return (
    <footer id="footer" className="py-24 md:py-32 bg-paper border-t border-mint">
      <div className="shell">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 md:mb-28">
          {/* Column 1 — brand + tagline */}
          <div className="md:col-span-5 space-y-4">
            <p className="caption-mono text-ink/60 mb-4">— Marka</p>
            <p
              className="font-serif text-ink leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              {f.company}
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-mint">
              {f.tagline}
            </p>
          </div>

          {/* Column 2 — contact */}
          <address className="md:col-span-4 not-italic space-y-3">
            <p className="caption-mono text-ink/60 mb-4">— {f.contactLabel}</p>
            <div>
              <a
                href={f.phoneHref}
                className="link-underline block font-serif text-lg text-ink/85"
                data-cursor="hover"
              >
                {f.phone}
              </a>
              <span className="hidden md:inline font-mono text-xs text-ink/30 select-none mx-2">·</span>
              <a
                href={`mailto:${f.email}`}
                className="link-underline block md:inline font-mono text-xs text-ink/65 mt-1 md:mt-0"
                data-cursor="hover"
              >
                {f.email}
              </a>
            </div>
            {f.nip && (
              <p className="font-mono text-xs text-ink/55 pt-2">{f.nip}</p>
            )}
          </address>

          {/* Column 3 — area + hours */}
          <div className="md:col-span-3 space-y-3">
            <p className="caption-mono text-ink/60 mb-4">— {f.areaLabel}</p>
            <p className="font-mono text-xs text-ink/75 leading-relaxed">
              {f.area}
            </p>
            <p className="font-mono text-xs text-ink/55 pt-2 leading-relaxed">
              {f.address}
            </p>

            {f.hours && f.hours.length > 0 && (
              <div className="pt-6">
                <p className="caption-mono text-ink/60 mb-3">— {f.hoursLabel}</p>
                {f.hours.map((line) => (
                  <p
                    key={line}
                    className="font-mono text-xs text-ink/65 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Legal line */}
        <p className="caption-mono text-ink/30 mb-16 md:mb-24">{f.legal}</p>

        {/* Large signature — wrapped in MaskReveal */}
        <MaskReveal
          data-signature
          aria-hidden="true"
          className="overflow-hidden"
        >
          <p
            className="font-serif text-ink/[0.07] leading-[0.92] tracking-[-0.02em] select-none whitespace-pre-line"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 8rem)' }}
          >
            {f.signature}
          </p>
        </MaskReveal>
      </div>
    </footer>
  );
}
