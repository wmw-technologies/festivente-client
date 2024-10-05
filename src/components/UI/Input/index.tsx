import styles from './index.module.scss';

type UIInputProps = {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
};

export default function UIInput({ type = 'text', placeholder }: UIInputProps) {
  return <input type={type} placeholder={placeholder} className={styles.input} />;
}
