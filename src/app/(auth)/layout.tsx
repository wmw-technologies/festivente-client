import { ReactNode } from 'react';
import styles from './layout.module.scss';
import SystemFooter from '@/src/components/System/Footer';

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>{children}</div>
      <SystemFooter />
    </main>
  );
}
