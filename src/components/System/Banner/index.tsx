import styles from "./index.module.scss";
import UIIcon from "@/src/components/UI/Icon";

export default function SystemBanner() {
    return (
        <div className={styles.banner}>
            <p>Nowa wersja Festivente 0.0.1 już dostępna!</p>
            <button type="button" className={styles.bannerButton}>
                <UIIcon name={'XMarkIcon'} smaller/>
            </button>
        </div>
    );
}
