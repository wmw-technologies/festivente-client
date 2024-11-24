import { ReactNode } from 'react';
import { GlobalError } from 'react-hook-form';
import styles from './index.module.scss';

type UIGroupProps = {
  header?: string;
  required?: boolean;
  nospace?: boolean;
  error?: GlobalError;
  help?: string;
  className?: string;
  children: ReactNode;
};

export default function UIGroup({
  header,
  required,
  nospace = false,
  error,
  help,
  className = '',
  children
}: UIGroupProps) {
  return (
    <div className={`${className} ${!nospace ? 'mb-5' : ''}`}>
      <label className={styles.group}>
        {children}
        <span className={styles.label}>
          {header}
          {required && <span className={styles.asterisk}>*</span>}
        </span>
      </label>
      {help && <span className={styles.help}>{help}</span>}
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}
