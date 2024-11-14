import { ReactNode } from 'react';
import styles from './index.module.scss';

type UICardProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  background?: boolean;
  variant?: 'primary' | 'gray';
};

export default function UICard({ header, footer, children, background = true, variant = 'gray' }: UICardProps) {
  const variantClass = styles[variant];

  return (
    <div className={styles.card}>
      {header && <div>{header}</div>}
      <div className={`${styles.cardBody} ${variantClass} ${!background ? styles.noBackground : ''}`}>{children}</div>
      {footer && <div>{footer}</div>}
    </div>
  );
}
