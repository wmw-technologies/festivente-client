import { ReactNode } from 'react';
import styles from './index.module.scss';

type UIHeaderProps = {
  size?: 'h1' | 'h2' | 'h3';
  children: ReactNode;
};

export default function UIIcon({ size = 'h2', children }: UIHeaderProps) {
  if (size === 'h1') {
    return <h1 className={styles.h1}>{children}</h1>;
  }
  if (size === 'h2') {
    return <h2 className={styles.h2}>{children}</h2>;
  }

  return <h3 className={styles.h3}>{children}</h3>;
}
