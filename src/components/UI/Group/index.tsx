import { ReactNode } from 'react';
import styles from './index.module.scss';

type UIGroupProps = {
  header: string;
  required?: boolean;
  nospace?: boolean;
  children: ReactNode;
};

export default function UIGroup({ header, required, nospace = false, children }: UIGroupProps) {
  return (
    <label className={`${styles.group} ${!nospace ? 'mb-5' : ''}`}>
      {children}
      <span className={styles.label}>
        {header}
        {required && <span className={styles.asterisk}>*</span>}
      </span>
    </label>
  );
}
