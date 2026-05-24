'use client';

import { useState, useId } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { copy } from '@/lib/copy';
import { STAGGER } from '@/lib/easings';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export default function CtaForm() {
  const c = copy.cta;

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [emailError, setEmailError] = useState(false);
  const [sent, setSent] = useState(false);

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const serviceId = useId();
  const messageId = useId();
  const emailErrorId = useId();

  function handleChange<K extends keyof FormState>(field: K) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (field === 'email') setEmailError(false);
    };
  }

  function handleSubmit() {
    if (!EMAIL_REGEX.test(form.email)) {
      setEmailError(true);
      return;
    }
    // TODO: zastąp console.log integracją z /api/contact (Resend / Formspree)
    console.log(form);
    setSent(true);
  }

  if (sent) {
    return (
      <LazyMotion features={domAnimation}>
        <section id="cta" aria-labelledby="cta-heading" className="py-20 md:py-28 bg-paper">
          <div className="shell">
            <AnimatePresence>
              <m.div
                className="max-w-xl space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                role="status"
                aria-live="polite"
              >
                <p className="caption-mono text-mint">{c.eyebrow}</p>
                <p
                  id="cta-heading"
                  className="font-serif text-ink leading-[1.0] tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  {c.success}
                </p>
              </m.div>
            </AnimatePresence>
          </div>
        </section>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <section id="cta" aria-labelledby="cta-heading" className="py-20 md:py-28 bg-paper">
        <div className="shell">
          {/* Section heading */}
          <header className="mb-16 md:mb-24 max-w-3xl space-y-4">
            <MaskReveal>
              <p className="caption-mono text-ink/50">{c.eyebrow}</p>
            </MaskReveal>
            <MaskReveal delay={0.05}>
              <h2
                id="cta-heading"
                className="font-serif text-ink leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                {c.title}
              </h2>
            </MaskReveal>
            <MaskReveal delay={0.15}>
              <p className="font-serif text-ink/75 text-lg md:text-xl leading-relaxed">
                {c.caption}
              </p>
            </MaskReveal>
          </header>

          {/* Two-column layout: channels + form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* LEFT — contact channels */}
            <div className="lg:col-span-5">
              <MaskReveal>
                <p className="caption-mono text-mint mb-8">— Wybierz wygodny kanał</p>
              </MaskReveal>

              <ul className="space-y-3" role="list">
                {c.channels.map((channel, i) => {
                  const isExternal =
                    channel.href.startsWith('http') ||
                    channel.href.startsWith('tel:') ||
                    channel.href.startsWith('sms:') ||
                    channel.href.startsWith('mailto:');

                  return (
                    <MaskReveal
                      key={channel.kind}
                      as="li"
                      delay={i * STAGGER.tight}
                    >
                      <a
                        href={channel.href}
                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                        rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        data-cursor="hover"
                        className="group flex items-center gap-5 border border-ink/15 rounded-2xl
                                   px-5 md:px-6 py-5 min-h-[80px]
                                   transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                   hover:border-ink hover:bg-ink/[0.02]
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                        aria-label={`${channel.label}: ${channel.sublabel}`}
                      >
                        {/* Glyph */}
                        <span
                          aria-hidden="true"
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-mint/15 text-ink font-serif text-xl shrink-0
                                     transition-colors duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                     group-hover:bg-mint"
                        >
                          {channel.glyph}
                        </span>

                        {/* Label */}
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-ink text-lg leading-tight">
                            {channel.label}
                          </p>
                          <p className="font-mono text-xs text-ink/55 mt-1 truncate">
                            {channel.sublabel}
                          </p>
                        </div>

                        {/* Arrow */}
                        <span
                          aria-hidden="true"
                          className="font-mono text-ink/40 group-hover:text-ink transition-colors"
                        >
                          →
                        </span>
                        {isExternal && <span className="sr-only">(otwiera w nowej karcie)</span>}
                      </a>
                    </MaskReveal>
                  );
                })}
              </ul>
            </div>

            {/* RIGHT — form */}
            <div className="lg:col-span-7">
              <MaskReveal>
                <p className="caption-mono text-mint mb-3">— {c.formTitle}</p>
              </MaskReveal>
              <MaskReveal delay={0.05}>
                <p className="font-serif text-ink/65 mb-10 max-w-lg leading-relaxed">
                  {c.formCaption}
                </p>
              </MaskReveal>

              <div className="space-y-10 md:space-y-12 max-w-xl">
                {/* Name */}
                <MaskReveal delay={0}>
                  <FloatingField
                    id={nameId}
                    label={c.fields.name}
                    value={form.name}
                    onChange={handleChange('name')}
                    autoComplete="name"
                  />
                </MaskReveal>

                {/* Phone + Email — 2 columns on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
                  <MaskReveal delay={0.05}>
                    <FloatingField
                      id={phoneId}
                      label={c.fields.phone}
                      value={form.phone}
                      onChange={handleChange('phone')}
                      type="tel"
                      autoComplete="tel"
                    />
                  </MaskReveal>

                  <MaskReveal delay={0.1}>
                    <div className="space-y-1">
                      <FloatingField
                        id={emailId}
                        label={c.fields.email}
                        value={form.email}
                        onChange={handleChange('email')}
                        type="email"
                        autoComplete="email"
                        hasError={emailError}
                        aria-describedby={emailError ? emailErrorId : undefined}
                      />
                      {emailError && (
                        <p
                          id={emailErrorId}
                          className="font-mono text-xs text-ink/60 pt-2"
                          role="alert"
                        >
                          {c.errorEmail}
                        </p>
                      )}
                    </div>
                  </MaskReveal>
                </div>

                {/* Service select */}
                <MaskReveal delay={0.15}>
                  <FloatingSelect
                    id={serviceId}
                    label={c.fields.service}
                    value={form.service}
                    onChange={handleChange('service')}
                    options={c.serviceOptions as readonly string[]}
                  />
                </MaskReveal>

                {/* Message */}
                <MaskReveal delay={0.2}>
                  <FloatingTextarea
                    id={messageId}
                    label={c.fields.message}
                    value={form.message}
                    onChange={handleChange('message')}
                  />
                </MaskReveal>

                {/* Submit */}
                <MaskReveal delay={0.25}>
                  <MagneticButton
                    strength={0.15}
                    onClick={handleSubmit}
                    className="rounded-full bg-mint text-ink font-mono text-xs uppercase tracking-widest
                               py-4 px-10 min-h-[48px] mt-4 inline-flex items-center
                               transition-colors duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                               hover:bg-ink hover:text-paper
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    {c.submit}
                  </MagneticButton>
                </MaskReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

// ─── Floating label input ────────────────────────────────────────────────────

interface FloatingFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  hasError?: boolean;
  'aria-describedby'?: string;
}

function FloatingField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  hasError = false,
  'aria-describedby': ariaDescribedby,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const isLifted = focused || value.length > 0;

  return (
    <div className="relative pt-5">
      <label
        htmlFor={id}
        className={[
          'absolute left-0 font-mono uppercase tracking-widest text-ink/50',
          'transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none',
          isLifted
            ? 'top-0 text-[0.65rem] text-ink/40'
            : 'top-5 text-xs',
        ].join(' ')}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-describedby={ariaDescribedby}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          'w-full bg-transparent font-serif text-ink text-lg pb-3',
          'border-b outline-none',
          hasError ? 'border-ink/50' : 'border-ink/20',
          focused ? 'border-ink' : '',
          'transition-colors duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        ].join(' ')}
      />
    </div>
  );
}

// ─── Floating label textarea ─────────────────────────────────────────────────

interface FloatingTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function FloatingTextarea({ id, label, value, onChange }: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const isLifted = focused || value.length > 0;

  return (
    <div className="relative pt-5">
      <label
        htmlFor={id}
        className={[
          'absolute left-0 font-mono uppercase tracking-widest text-ink/50',
          'transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none',
          isLifted
            ? 'top-0 text-[0.65rem] text-ink/40'
            : 'top-5 text-xs',
        ].join(' ')}
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={4}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          'w-full bg-transparent font-serif text-ink text-lg pt-2 pb-3 resize-none',
          'border-b outline-none',
          focused ? 'border-ink' : 'border-ink/20',
          'transition-colors duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        ].join(' ')}
      />
    </div>
  );
}

// ─── Floating label select ───────────────────────────────────────────────────

interface FloatingSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
}

function FloatingSelect({ id, label, value, onChange, options }: FloatingSelectProps) {
  const [focused, setFocused] = useState(false);
  const isLifted = focused || value.length > 0;

  return (
    <div className="relative pt-5">
      <label
        htmlFor={id}
        className={[
          'absolute left-0 font-mono uppercase tracking-widest text-ink/50',
          'transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none',
          isLifted
            ? 'top-0 text-[0.65rem] text-ink/40'
            : 'top-5 text-xs',
        ].join(' ')}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          'w-full bg-transparent font-serif text-ink text-lg pb-3 pr-8',
          'border-b outline-none appearance-none cursor-pointer',
          focused ? 'border-ink' : 'border-ink/20',
          'transition-colors duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        ].join(' ')}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%230E1A1A' stroke-opacity='0.55' stroke-width='1.25' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.25rem center',
        }}
      >
        {options.map((opt, i) => (
          <option key={opt} value={i === 0 ? '' : opt} disabled={i === 0}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
