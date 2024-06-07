import styles from "./index.module.scss"

export default function SystemFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>Festivente | WMS v0.1 © 2024. Wszelkie prawa zastrzeżone.
            </div>
        </footer>
    );
}
