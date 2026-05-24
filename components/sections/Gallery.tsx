'use client';

import Image from 'next/image';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

type GalleryItem = (typeof copy.gallery.items)[number];

function GalleryCard({
  item,
  index,
  reduced,
}: {
  item: GalleryItem;
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
            <span className="absolute bottom-4 left-4 caption-mono text-paper bg-ink/60 px-2 py-1">
              przed
            </span>
          </m.div>
        )}

        {/* "Po" label */}
        <span className="absolute bottom-4 right-4 caption-mono text-paper bg-ink/60 px-2 py-1">
          po
        </span>

        {/* Category label */}
        {item.category && (
          <span className="absolute top-4 left-4 caption-mono text-ink bg-paper/85 px-2 py-1">
            {item.category}
          </span>
        )}
      </div>
    </MaskReveal>
  );
}

export function Gallery() {
  const reduced = useReducedMotion();
  const g = copy.gallery;

  return (
    <LazyMotion features={domAnimation}>
      <section id="gallery" aria-labelledby="gallery-heading" className="py-20 md:py-28">
        <div className="shell">
          <header className="mb-16 md:mb-20 max-w-3xl space-y-4">
            <MaskReveal>
              <span className="caption-mono text-ink/50">{g.eyebrow}</span>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h2
                id="gallery-heading"
                className="font-serif text-ink leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                {g.title}
              </h2>
            </MaskReveal>
            <MaskReveal delay={0.2}>
              <p className="caption-mono text-ink/50">{g.caption}</p>
            </MaskReveal>
          </header>

          {/* Masonry-ish 3-column grid */}
          <div className="columns-1 md:columns-3 gap-4 space-y-4">
            {g.items.map((item, i) => (
              <div key={i} className="break-inside-avoid">
                <GalleryCard item={item} index={i} reduced={reduced} />
              </div>
            ))}
          </div>

          <p className="caption-mono text-ink/40 mt-10">{g.status}</p>
        </div>
      </section>
    </LazyMotion>
  );
}
