import styles from "./index.module.scss"

export default function SystemHeader() {
    const isMenuCollapsed = false;

    // function handleToggleMenu() {
    //     // isMenuCollapsed = !isMenuCollapsed;
    // }
    //
    // function logout() {
    //     // window.location.href = '/logout';
    // }

    return (
        <header className={styles.header}>
            <div className={`${styles.headerLeft} ${!isMenuCollapsed ? styles.expanded : styles.collapsed}`}>
                {/*:class="!store.$state.isMenuCollapsed ? 'w-72' : 'w-[100px]'"*/}
                {/*    <NuxtLink*/}
                {/*    :to="{ name: 'index' }"*/}
                {/*    class="h-16 shrink-0"*/}
                {/*    :class="!store.$state.isMenuCollapsed ? 'w-56' : 'w-16'"*/}
                {/*    >*/}
                {/*    <img*/}
                {/*        v-show="!store.$state.isMenuCollapsed"*/}
                {/*        src="/logo.png"*/}
                {/*        alt="logo"*/}
                {/*        class="object-contain w-full h-full"*/}
                {/*    />*/}
                {/*    <img*/}
                {/*        v-show="store.$state.isMenuCollapsed"*/}
                {/*        src="/logomark.png"*/}
                {/*        alt="logo-mini"*/}
                {/*        class="object-contain w-full h-full"*/}
                {/*    />*/}
                {/*</NuxtLink>*/}
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
