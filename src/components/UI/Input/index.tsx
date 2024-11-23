'use client';

import { ChangeEventHandler, forwardRef, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';
import styles from './index.module.scss';

type UIInputProps = {
  type?: HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const UIInput = forwardRef<HTMLInputElement, UIInputProps>(function UIInput(
  { type = 'text', name, placeholder, disabled, autocomplete, onChange },
  ref
) {
  return (
    <input
      name={name}
      ref={ref}
      type={type}
      min={type === 'number' ? 0 : undefined}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autocomplete}
      className={styles.input}
      step={type === 'number' ? 'any' : undefined}
      onChange={onChange}
    />
  );
});

export default UIInput;
