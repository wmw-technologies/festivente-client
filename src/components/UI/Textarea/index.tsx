'use client';

import { ChangeEventHandler, forwardRef } from 'react';
import styles from './index.module.scss';

type UITextareaProps = {
  name?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
};

const UITextarea = forwardRef<HTMLTextAreaElement, UITextareaProps>(function UITextarea(
  { name, placeholder, rows = 3, disabled, onChange },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      className={styles.textarea}
      onChange={onChange}
    ></textarea>
  );
});

export default UITextarea;
