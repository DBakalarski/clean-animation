import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F7F5F0',
        ink: '#0E1A1A',
        mint: '#2BD4C4',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: '1440px',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        tight: '-0.015em',
        // mono captions signature
        widest: '0.1em',
        wider: '0.08em',
      },
      spacing: {
        // section vertical rhythm tokens
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        // expo.out equivalent for CSS transitions
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'power4-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      transitionDuration: {
        '350': '350ms',
        '450': '450ms',
        '600': '600ms',
      },
      boxShadow: {
        // editorial card hover — no color outside palette
        'card-hover': '0 8px 40px -12px rgba(14, 26, 26, 0.18)',
        'card-base': '0 2px 16px -6px rgba(14, 26, 26, 0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
