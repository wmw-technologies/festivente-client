import styles from "./index.module.scss"
import Link from 'next/link';

export default function SystemHeader() {
    const isMenuCollapsed = false;

    return (
        <header className={styles.header}>
            <div className={`${styles.headerLeft} ${isMenuCollapsed ? styles.collapsed : styles.expanded}`}>
                <Link href="/" className={`${styles.logoLink} ${isMenuCollapsed ? styles.collapsed : styles.expanded}`}>
                    <img src={isMenuCollapsed ? '/logomark.png' : '/logo.png'} alt="logo" className={styles.logo}/>
                </Link>
            </div>
            <div className={styles.headerRight}>
                {/*        <BaseActionButton*/}
                {/*            icon="Bars3Icon"*/}
                {/*        :title="!store.$state.isMenuCollapsed ? 'Zwiń menu' : 'Rozwiń menu'"*/}
                {/*        @click="store.toggleMenu"*/}
                {/*        />*/}
                {/*        <BaseDropdown variant="black" icon="Cog6ToothIcon" v-slot="{ close }">*/}
                {/*            <BaseDropdownItem @click="$router.push({ name: 'my-account' }), close()"> Moje konto </BaseDropdownItem>*/}
                {/*        <BaseDropdownItem @click="logout(), close()">Wyloguj się</BaseDropdownItem>*/}
                {/*</BaseDropdown>*/}
            </div>
        </header>
    );
}
