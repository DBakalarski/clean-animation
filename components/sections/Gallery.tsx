'use client';

import Image from 'next/image';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

// Picsum placeholder pairs: each item = { before, after, alt }
const GALLERY_ITEMS = [
  {
    before: 'https://picsum.photos/seed/clean1b/600/800',
    after: 'https://picsum.photos/seed/clean1a/600/800',
    alt: 'Salon — przed i po',
  },
  {
    before: 'https://picsum.photos/seed/clean2b/600/700',
    after: 'https://picsum.photos/seed/clean2a/600/700',
    alt: 'Kuchnia — przed i po',
  },
  {
    before: 'https://picsum.photos/seed/clean3b/600/900',
    after: 'https://picsum.photos/seed/clean3a/600/900',
    alt: 'Łazienka — przed i po',
  },
  {
    before: 'https://picsum.photos/seed/clean4b/600/650',
    after: 'https://picsum.photos/seed/clean4a/600/650',
    alt: 'Biuro — przed i po',
  },
  {
    before: 'https://picsum.photos/seed/clean5b/600/750',
    after: 'https://picsum.photos/seed/clean5a/600/750',
    alt: 'Sypialnia — przed i po',
  },
  {
    before: 'https://picsum.photos/seed/clean6b/600/800',
    after: 'https://picsum.photos/seed/clean6a/600/800',
    alt: 'Korytarz — przed i po',
  },
];

function GalleryCard({
  item,
  index,
  reduced,
}: {
  item: (typeof GALLERY_ITEMS)[0];
  index: number;
  reduced: boolean;
}) {
  return (
    <MaskReveal
      as="div"
      delay={index * STAGGER.loose}
      className="relative overflow-hidden"
    >
      <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
        {/* After image — base layer */}
        <Image
          src={item.after}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Before image — hover reveal (no transition for reduced-motion) */}
        {reduced ? null : (
          <m.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={item.before}
              alt={`${item.alt} — przed`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* "Przed" label */}
            <span className="absolute bottom-4 left-4 caption-mono text-paper bg-ink/60 px-2 py-1">
              przed
            </span>
          </m.div>
        )}

        {/* "Po" label — always visible */}
        <span className="absolute bottom-4 right-4 caption-mono text-paper bg-ink/60 px-2 py-1">
          po
        </span>
      </div>
    </MaskReveal>
  );
}

export function Gallery() {
  const reduced = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section id="gallery" className="py-32 md:py-48">
        <div className="shell">
          <MaskReveal>
            <span className="caption-mono text-ink/50">{copy.gallery.label}</span>
          </MaskReveal>
          <MaskReveal delay={0.1} className="mt-4 mb-16">
            <h2 className="font-serif text-ink">{copy.gallery.title}</h2>
          </MaskReveal>

          {/* Masonry-ish 3-column grid */}
          <div className="columns-1 md:columns-3 gap-4 space-y-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className="break-inside-avoid">
                <GalleryCard item={item} index={i} reduced={reduced} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
