import styles from './index.module.scss';

type UISelectProps = {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
};

export default function UISelect({ type = 'text', placeholder }: UISelectProps) {
  return <input type={type} placeholder={placeholder} className={styles.input} />;
}
