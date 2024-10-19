import { ReactNode } from 'react';
import styles from './layout.module.scss';

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className={`${styles.mainContainer} container`}>{children}</div>;
}
