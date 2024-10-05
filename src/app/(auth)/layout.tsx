import { ReactNode } from 'react';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import '@/src/styles/styles.scss';
// import styles from './layout.module.scss';
// import SystemBanner from '@/src/components/System/Banner';
// import SystemHeader from '@/src/components/System/Header';
// import SytemMenu from '@/src/components/System/Menu';
// import SystemFooter from '@/src/components/System/Footer';
// import SystemBreadcrumb from '@/src/components/System/Breadcrumb';

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      auth layout
      {children}
    </div>
  );
}
