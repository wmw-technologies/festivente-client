'use client';

import { ChangeEventHandler, forwardRef } from 'react';
import styles from './index.module.scss';

type UICheckboxProps = {
  name?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const UICheckbox = forwardRef<HTMLInputElement, UICheckboxProps>(function UICheckbox(
  { name, disabled, onChange },
  ref
) {
  return (
    <input
      name={name}
      ref={ref}
      type={'checkbox'}
      disabled={disabled}
      className={styles.checkbox}
      onChange={onChange}
    />
  );
});

export default UICheckbox;
