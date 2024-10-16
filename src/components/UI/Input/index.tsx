import { ChangeEventHandler, forwardRef } from 'react';
import styles from './index.module.scss';

type UIInputProps = {
  type?: 'text' | 'password' | 'email';
  name?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const UIInput = forwardRef<HTMLInputElement, UIInputProps>(function UIInput(
  { type = 'text', name, placeholder, onChange },
  ref
) {
  return (
    <input name={name} ref={ref} type={type} placeholder={placeholder} className={styles.input} onChange={onChange} />
  );
});

export default UIInput;
