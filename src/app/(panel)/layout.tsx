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
  const response = await fetch(`${url}/user/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data: Response<{ user: User }> = await response.json();

  return (
    <AuthProvider value={data.data?.user ?? null}>
      <div className={`${styles.mainContainer} container`}>
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
