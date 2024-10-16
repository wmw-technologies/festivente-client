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
      {header && <UIHeader>{header}</UIHeader>}
      <div className={styles.bar}>{children}</div>
    </div>
  );
}
