import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/src/styles/styles.scss';
import styles from './layout.module.scss';
import { Toaster, DefaultToastOptions } from 'react-hot-toast';
import HolyLoader from 'holy-loader';
import SystemFooter from '@/src/components/System/Footer';
import { z } from 'zod';

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

// Definiowanie własnej mapy błędów
// const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
//   if (issue.code === z.ZodIssueCode.invalid_type) {
//     if (issue.expected === 'string') {
//       return { message: 'bad type!' };
//     }
//   }
//   if (issue.code === z.ZodIssueCode.too_small && issue.type === 'string') {
//     return { message: `String is too short. Minimum length is ${issue.minimum}` };
//   }
//   if (issue.code === z.ZodIssueCode.custom) {
//     return { message: `less-than-${(issue.params || {}).minimum}` };
//   }
//   return { message: ctx.defaultError };
// };

// z.setErrorMap(customErrorMap);

export const CustonerrorMap: z.ZodErrorMap = (issue, _ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return { message: 'Nieprawidłowy typ' };
    case z.ZodIssueCode.invalid_literal:
      return { message: `Wartość musi być równa ${issue.expected}` };
    case z.ZodIssueCode.unrecognized_keys:
      return { message: 'Nierozpoznane klucze w obiekcie' };
    case z.ZodIssueCode.invalid_union:
      return { message: 'Nieprawidłowa wartość dla unii' };
    case z.ZodIssueCode.invalid_enum_value:
      return { message: `Wartość musi być jedną z: ${issue.options.join(', ')}` };
    case z.ZodIssueCode.invalid_arguments:
      return { message: 'Nieprawidłowe argumenty funkcji' };
    case z.ZodIssueCode.invalid_return_type:
      return { message: 'Nieprawidłowy typ zwracany przez funkcję' };
    case z.ZodIssueCode.invalid_date:
      return { message: 'Nieprawidłowa data' };
    case z.ZodIssueCode.invalid_string:
      return { message: 'Nieprawidłowy ciąg znaków' };
    case z.ZodIssueCode.too_small:
      return { message: `Wartość jest za mała. Minimalna wartość to ${issue.minimum}` };
    case z.ZodIssueCode.too_big:
      return { message: `Wartość jest za duża. Maksymalna wartość to ${issue.maximum}` };
    case z.ZodIssueCode.custom:
      return { message: 'Nieprawidłowa wartość' };
    default:
      return { message: 'Nieprawidłowa wartość' };
  }
};

// Ustawienie globalnej mapy błędów
z.setErrorMap(CustonerrorMap);

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
