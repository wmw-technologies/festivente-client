import { ReactNode } from 'react';
import styles from './index.module.scss';

type UIBadgeProps = {
  children: ReactNode;
};

export default function UIBadge({ children }: UIBadgeProps) {
  return <div className={styles.badge}>{children}</div>;
}
