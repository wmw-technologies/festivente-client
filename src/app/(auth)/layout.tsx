import { ReactNode } from 'react';
import styles from './layout.module.scss';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className={`${styles.mainContainer} container`}>{children}</div>;
}
