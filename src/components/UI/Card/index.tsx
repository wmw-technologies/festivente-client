import { ReactNode } from 'react';
import styles from './index.module.scss';

type UICardProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  background?: boolean;
};

export default function UICard({ header, footer, children, background = true }: UICardProps) {
  return (
    <div className={styles.card}>
      {header && <div>{header}</div>}
      <div className={`${styles.cardBody} ${background ? styles.background : ''}`}>{children}</div>
      {footer && <div>{footer}</div>}
    </div>
  );
}
