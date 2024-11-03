'use client';

import { ChangeEventHandler, forwardRef } from 'react';
import styles from './index.module.scss';

type UIToggleboxProps = {
  name?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const UITogglebox = forwardRef<HTMLInputElement, UIToggleboxProps>(function UITogglebox(
  { name, disabled, onChange },
  ref
) {
  return (
    <div className={styles.togglebox}>
      <input
        name={name}
        ref={ref}
        type={'checkbox'}
        disabled={disabled}
        className={styles.togglebox__input}
        onChange={onChange}
      />
    </div>
  );
});

export default UITogglebox;
