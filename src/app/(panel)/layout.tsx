import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import styles from './layout.module.scss';
import SystemBanner from '@/src/components/System/Banner';
import SystemHeader from '@/src/components/System/Header';
import SytemMenu from '@/src/components/System/Menu';
import SystemFooter from '@/src/components/System/Footer';
import SystemBreadcrumb from '@/src/components/System/Breadcrumb';

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return null;

  const accessToken = JSON.parse(authCookie).accessToken;

  const data = await fetch(`${url}/user/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  const json = await data.json();

  return (
    <main className={styles.main}>
      <SystemBanner />
      <div className={`${styles.mainContainer} container`}>
        {/*<NuxtLoadingIndicator color="red" :height="20" /> */}
        <SystemHeader />
        <div className={styles.mainContent}>
          <SytemMenu />
          <div className={styles.mainContentInner}>
            <SystemBreadcrumb />
            {/* {JSON.stringify(json)} */}
            {children}
          </div>
        </div>
      </div>
      <SystemFooter />
    </main>
  );
}
