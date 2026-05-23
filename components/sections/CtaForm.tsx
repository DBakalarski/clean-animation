'use client';

import { useState, useId } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { MaskReveal } from '@/components/ui/MaskReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { copy } from '@/lib/copy';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function CtaForm() {
  const { title, caption, fields, submit, success } = copy.cta;
  // editorial-stylist extended copy keys — fall back gracefully
  const eyebrow = (copy.cta as Record<string, unknown>).eyebrow as string | undefined;
  const errorEmail = (copy.cta as Record<string, unknown>).errorEmail as string | undefined ?? 'Niepoprawny adres email.';

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [emailError, setEmailError] = useState(false);
  const [sent, setSent] = useState(false);

  // Unique IDs for aria associations
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const emailErrorId = useId();

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (field === 'email') setEmailError(false);
    };
  }

  function handleSubmit() {
    if (!EMAIL_REGEX.test(form.email)) {
      setEmailError(true);
      return;
    }
    console.log({ name: form.name, email: form.email, message: form.message });
    setSent(true);
  }

  if (sent) {
    return (
      <LazyMotion features={domAnimation}>
        <section id="cta" aria-labelledby="cta-heading" className="py-32 md:py-48 bg-paper">
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
                {eyebrow && <p className="caption-mono text-ink/50">{eyebrow}</p>}
                <p
                  id="cta-heading"
                  className="font-serif text-ink leading-[0.95] tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
                >
                  {success}
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
      <section id="cta" aria-labelledby="cta-heading" className="py-32 md:py-48 bg-paper">
        <div className="shell">
          <header className="mb-16 md:mb-24 space-y-4">
            {eyebrow && (
              <MaskReveal>
                <p className="caption-mono text-ink/50">{eyebrow}</p>
              </MaskReveal>
            )}
            <MaskReveal delay={0.1}>
              <h2
                id="cta-heading"
                className="font-serif text-ink leading-[1.0] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
              >
                {title}
              </h2>
            </MaskReveal>
            <MaskReveal delay={0.2}>
              <p className="caption-mono text-ink/50">{caption}</p>
            </MaskReveal>
          </header>

          {/* Field stack — editorial, no boxed inputs */}
          <div className="max-w-xl space-y-12 md:space-y-16">
            {/* Name field */}
            <MaskReveal delay={0}>
              <FloatingField
                id={nameId}
                label={fields.name}
                value={form.name}
                onChange={handleChange('name')}
                type="text"
                autoComplete="given-name"
              />
            </MaskReveal>

            {/* Email field */}
            <MaskReveal delay={0.08}>
              <div className="space-y-1">
                <FloatingField
                  id={emailId}
                  label={fields.email}
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
                    {errorEmail}
                  </p>
                )}
              </div>
            </MaskReveal>

            {/* Message field */}
            <MaskReveal delay={0.16}>
              <FloatingTextarea
                id={messageId}
                label={fields.message}
                value={form.message}
                onChange={handleChange('message')}
              />
            </MaskReveal>

            {/* Submit — MagneticButton */}
            <MaskReveal delay={0.24}>
              <MagneticButton
                strength={0.3}
                onClick={handleSubmit}
                className="rounded-full bg-mint text-ink font-mono text-xs uppercase tracking-widest
                           py-4 px-10 mt-4
                           transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                           hover:bg-ink hover:text-paper
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {submit}
              </MagneticButton>
            </MaskReveal>
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
