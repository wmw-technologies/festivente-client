import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/src/styles/styles.scss';
import styles from './layout.module.scss';
import { Toaster, DefaultToastOptions } from 'react-hot-toast';
import HolyLoader from 'holy-loader';
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

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  success: {
    iconTheme: {
      primary: 'var(--f-green-light)',
      secondary: 'var(--f-green)'
    },
    style: {
      borderRadius: '9999px',
      padding: '10px 20px',
      background: 'var(--f-green-light)',
      color: 'var(--f-green)',
      boxShadow: 'none'
    }
  },
  error: {
    iconTheme: {
      primary: 'var(--f-red-light)',
      secondary: 'var(--f-red)'
    },
    style: {
      borderRadius: '9999px',
      padding: '10px 16px',
      background: 'var(--f-red-light)',
      color: 'var(--f-red)',
      boxShadow: 'none'
    }
  }
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl">
      <body className={`${inter.className} ${styles.body}`}>
        <HolyLoader color="#812538" />
        <Toaster toastOptions={toastOptions} />
        <main className={styles.main}>{children}</main>
        <SystemFooter />
      </body>
    </html>
  );
}
