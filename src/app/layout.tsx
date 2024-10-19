import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/src/styles/styles.scss';
import styles from './layout.module.scss';
import SystemBanner from '@/src/components/System/Banner';
import SystemFooter from '@/src/components/System/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Festivente | WMS'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <main className={styles.main}>
          <SystemBanner />
          {children}
          <SystemFooter />
        </main>
      </body>
    </html>
  );
}
