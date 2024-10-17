import { ReactNode } from 'react';
import styles from './index.module.scss';
import UIHeader from '@/src/components/UI/Header';

type UIPanelProps = {
  header?: string;
  children?: ReactNode;
};

export default function UIInput({ header, children }: UIPanelProps) {
  return (
    <div className={styles.panel}>
      {header && <UIHeader margin={!!children}>{header}</UIHeader>}
      {children && <div className={styles.bar}>{children}</div>}
    </div>
  );
}
