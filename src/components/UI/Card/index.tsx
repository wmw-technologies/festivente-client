import { ReactNode } from 'react';
import styles from './index.module.scss';

type UICardProps = {
  header: ReactNode;
  children: ReactNode;
};

export default function UICard({ header, children }: UICardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>{header}</div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}
