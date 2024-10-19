import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { AuthProvider } from '@/src/context/auth';
import { Response, User } from '@/src/types';
import styles from './layout.module.scss';
import SystemHeader from '@/src/components/System/Header';
import SytemMenu from '@/src/components/System/Menu';
import SystemBreadcrumb from '@/src/components/System/Breadcrumb';

export default async function PanelLayout({
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

  const json: Response<{ user: User }> = await data.json();

  return (
    <AuthProvider value={json.data.user}>
      <div className={`${styles.mainContainer} container`}>
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
    </AuthProvider>
  );
}
