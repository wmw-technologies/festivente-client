import { ReactNode } from 'react';
import styles from './layout.module.scss';
import SystemFooter from '@/src/components/System/Footer';

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className={`${styles.mainContainer} container`}>{children}</div>;
}
