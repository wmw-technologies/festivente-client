import styles from './index.module.scss';

export default function SystemFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">Festivente | WMS v0.1 © {year}. Wszelkie prawa zastrzeżone.</div>
    </footer>
  );
}
