import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { GsapProvider } from '@/components/providers/GsapProvider';

const Cursor = dynamic(
  () => import('@/components/chrome/Cursor').then((m) => m.Cursor),
  { ssr: false }
);
const PageLoader = dynamic(
  () => import('@/components/chrome/PageLoader').then((m) => m.PageLoader),
  { ssr: false }
);

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Cleaning Service Konin — sprzątanie sprawnie, dokładnie, dyskretnie',
  description:
    'Profesjonalne usługi sprzątające dla klientów prywatnych i firmowych. Konin i 100 km w każdą stronę. Telefon: 518 169 491.',
  keywords: [
    'sprzątanie Konin',
    'firma sprzątająca Konin',
    'sprzątanie po remoncie',
    'mycie okien Konin',
    'sprzątanie biur Konin',
    'pranie tapicerki',
    'opieka nad grobami',
    'sprzątanie apartamentów',
  ],
  openGraph: {
    title: 'Cleaning Service Konin',
    description:
      'Sprawnie. Dokładnie. Dyskretnie. Przystępnie. Profesjonalne usługi sprzątające — Konin i 100 km w każdą stronę.',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Service Konin',
    description:
      'Sprawnie. Dokładnie. Dyskretnie. Przystępnie. Profesjonalne usługi sprzątające.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LenisProvider>
          <GsapProvider>
            <PageLoader />
            <Cursor />
            {children}
          </GsapProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
