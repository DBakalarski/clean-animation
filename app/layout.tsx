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
  title: 'Czysto. Spokojnie. Bez resztek. — sprzątanie editorial',
  description:
    'Profesjonalne sprzątanie domów, biur i powierzchni po remoncie. Bez chemii, z oddechem.',
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
