import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/src/styles/styles.scss';
import styles from './layout.module.scss';
import HolyLoader from 'holy-loader';
// import SystemBanner from '@/src/components/System/Banner';
import SystemFooter from '@/src/components/System/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Festivente | WMS'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <HolyLoader color="#812538" />
        <main className={styles.main}>
          {/* <SystemBanner /> */}
          {children}
          <SystemFooter />
        </main>
      </body>
    </html>
  );
}
