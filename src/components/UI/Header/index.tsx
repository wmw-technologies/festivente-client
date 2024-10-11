import { ReactNode } from 'react';
import styles from './index.module.scss';

type UIHeaderProps = {
  size?: 'h1' | 'h2' | 'h3';
  margin?: boolean;
  children: ReactNode;
};

export default function UIIcon({ size = 'h2', margin = true, children }: UIHeaderProps) {
  if (size === 'h1') {
    return <h1 className={`${styles.h1} ${margin ? 'mb-2' : ''}`}>{children}</h1>;
  }
  if (size === 'h2') {
    return <h2 className={`${styles.h2} ${margin ? 'mb-2' : ''}`}>{children}</h2>;
  }

  return <h3 className={`${styles.h3} ${margin ? 'mb-2' : ''}`}>{children}</h3>;
}
