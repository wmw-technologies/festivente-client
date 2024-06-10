import styles from "./index.module.scss"
import Link from 'next/link';
import UIIcon from "@/src/components/UI/Icon";

export default function SystemBreadcrumb() {
    const breadcrumbs: any[] = [];

    return (
        <nav className={styles.nav}>
            <ol role="list">
                <li>
                    <Link href="/">
                        <UIIcon name={'HomeIcon'} smaller/>
                    </Link>
                </li>
                {breadcrumbs.map((item, index) => (
                    <li key={index}>
                        <Link href={item.route}>
                            <a>{item.name}</a>
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
