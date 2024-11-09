import styles from './index.module.scss';
import packageJSON from '@/package.json';

export default function SystemFooter() {
  const year = new Date().getFullYear();
  const version = packageJSON.version;

  return (
    <footer className={styles.footer}>
      <div className="container">
        Festivente | WMS v{version} © {year}. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
