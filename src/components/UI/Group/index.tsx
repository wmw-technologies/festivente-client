import { ReactNode } from 'react';
import styles from './index.module.scss';

type UIGroupProps = {
  header: string;
  required?: boolean;
  children: ReactNode;
};

export default function UIGroup({ header, required, children }: UIGroupProps) {
  return (
    <label className={styles.group}>
      {children}
      <span className={styles.label}>
        {header}
        {required && <span className={styles.asterisk}>*</span>}
      </span>
    </label>
  );
}
