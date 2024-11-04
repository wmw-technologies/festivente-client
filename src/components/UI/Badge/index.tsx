import { ReactNode } from 'react';
import styles from './index.module.scss';

type UIBadgeProps = {
  variant?: 'primary' | 'secondary' | 'success';
  children: ReactNode;
};

export default function UIBadge({ variant = 'primary', children }: UIBadgeProps) {
  const classVariant =
    variant === 'primary' ? styles.primary : variant === 'secondary' ? styles.secondary : styles.success;

  return <div className={`${styles.badge} ${classVariant}`}>{children}</div>;
}
