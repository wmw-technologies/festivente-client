import { ReactNode } from 'react';
import '@/src/styles/styles.scss';
import styles from './layout.module.scss';
import SystemBanner from '@/src/components/System/Banner';
import SystemHeader from '@/src/components/System/Header';
import SytemMenu from '@/src/components/System/Menu';
import SystemFooter from '@/src/components/System/Footer';
import SystemBreadcrumb from '@/src/components/System/Breadcrumb';

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <SystemBanner />
      <div className={styles.mainContainer}>
        {/*<NuxtLoadingIndicator color="red" :height="20" /> */}
        <SystemHeader />
        <div className={styles.mainContent}>
          <SytemMenu />
          <div className={styles.mainContentInner}>
            <SystemBreadcrumb />
            {children}
          </div>
        </div>
      </div>
      <SystemFooter />
    </main>
  );
}
