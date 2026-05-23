'use client';

import React, { useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type MagneticButtonProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
};

export function MagneticButton({
  children,
  strength = 0.3,
  className,
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  // quickTo refs — initialised lazily on first mousemove so they share the ref lifecycle
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  const initQuickTo = useCallback(() => {
    if (!buttonRef.current || quickX.current) return;
    quickX.current = gsap.quickTo(buttonRef.current, 'x', {
      duration: 0.4,
      ease: 'power3.out',
    });
    quickY.current = gsap.quickTo(buttonRef.current, 'y', {
      duration: 0.4,
      ease: 'power3.out',
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reduced) return;
      initQuickTo();
      const el = buttonRef.current;
      if (!el || !quickX.current || !quickY.current) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      quickX.current(dx);
      quickY.current(dy);
    },
    [reduced, strength, initQuickTo],
  );

  const handleMouseLeave = useCallback(() => {
    if (reduced) return;
    if (quickX.current && quickY.current) {
      quickX.current(0);
      quickY.current(0);
    }
  }, [reduced]);

  return (
    <button
      ref={buttonRef}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
