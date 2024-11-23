'use client';

import { ChangeEventHandler, forwardRef, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';
import styles from './index.module.scss';

type UIInputProps = {
  type?: HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  step?: string | number;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const UIInput = forwardRef<HTMLInputElement, UIInputProps>(function UIInput(
  { type = 'text', name, placeholder, disabled, step = 'any', autocomplete, onChange },
  ref
) {
  return (
    <input
      name={name}
      ref={ref}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autocomplete}
      className={styles.input}
      step={type === 'number' ? step : undefined}
      onChange={onChange}
    />
  );
});

export default UIInput;
