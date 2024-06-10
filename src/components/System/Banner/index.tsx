import styles from "./index.module.scss"
import UIIcon from "@/src/components/UI/Icon";

export default function SystemBanner() {
    return (
        <div className={styles.banner}>
            <p>GeneriCon 2023Join us in Denver from June 7 – 9 to see what’s coming next.</p>
            <button type="button" className={styles.bannerButton}>
                <UIIcon name={'XMarkIcon'} smaller/>
            </button>
        </div>
    );
}
