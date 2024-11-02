'use client';

import { ChangeEventHandler, forwardRef } from 'react';
import styles from './index.module.scss';
import UIIcon from '@/src/components/UI/Icon';

type UICheckboxProps = {
  name?: string;
  header?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const UICheckbox = forwardRef<HTMLInputElement, UICheckboxProps>(function UICheckbox(
  { name, header, disabled, onChange },
  ref
) {
  return (
    <div className={styles.group}>
      <input
        name={name}
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className={styles.checkbox}
        onChange={onChange}
      />
      <div className={styles.customCheckbox}>
        <UIIcon name="CheckIcon" />
      </div>
      {header && <span>{header}</span>}
    </div>
  );
});

export default UICheckbox;
