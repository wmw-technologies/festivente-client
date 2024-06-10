import styles from "./index.module.scss";
import {SITEMAP} from "@/sitemap";
import Link from 'next/link';

export default function SystemMenu() {
    const isMenuCollapsed = false;
    const openedTab = '';

    return (
        <aside className={`${styles.sidebar} ${isMenuCollapsed ? styles.collapsed : styles.expanded}`}>
            <div className="flex flex-col whitespace-nowrap">
                {!isMenuCollapsed && (
                    <div className={styles.info}>
                        <p>Imię i nazwisko: <span className="font-medium">Wojciech Skirło</span></p>
                        <p>Nr albumu: <span className="font-medium">14001</span></p>
                        <p>Kierunek: <span className="font-medium">Informatyka Stosowana</span></p>
                    </div>
                )}
                <nav>
                    <ul>
                        {SITEMAP.map((item) => (
                            <li key={item.path}>
                                <Link href={item.path ?? '/'}>
                                    {/*<a*/}
                                    {/*    title={item.name}*/}
                                    {/*    className={`flex items-center justify-between px-6 py-3 rounded-full ${styles.link} ${item.path === openedTab ? 'active' : ''}`}*/}
                                    {/*>*/}
                                    {/*    <div className="flex items-center">*/}
                                    {/*        /!*{item.icon && <BaseIcon name={item.icon}/>}*!/*/}
                                    {/*        {!isMenuCollapsed && (*/}
                                    {/*            <>*/}
                                    {/*                <span className="ml-3 mr-2 leading-5">{item.name}</span>*/}
                                    {/*                /!*{item.info && <BaseBadge>{item.info}</BaseBadge>}*!/*/}
                                    {/*            </>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*    /!*{item.children?.length && !isMenuCollapsed && (*!/*/}
                                    {/*    /!*    // <BaseToggleButton*!/*/}
                                    {/*    /!*    //     isOpen={item.route === openedTab}*!/*/}
                                    {/*    /!*    //     onClick={(e) => {*!/*/}
                                    {/*    /!*    //         e.preventDefault();*!/*/}
                                    {/*    /!*    //         changeTab(item.route);*!/*/}
                                    {/*    /!*    //     }}*!/*/}
                                    {/*    /!*    // />*!/*/}
                                    {/*    /!*)}*!/*/}
                                    {/*</a>*/}
                                </Link>
                                {/*{item.children?.length && item.route === openedTab && !isMenuCollapsed && (*/}
                                {/*    <ul className="flex flex-col gap-1 mt-3 mb-1 ml-10">*/}
                                {/*        {item.children.map((el) => (*/}
                                {/*            <li key={el.route}>*/}
                                {/*                <Link href={el.route ?? '/'}>*/}
                                {/*                    <a className="cursor-pointer hover:text-accent hover:font-semibold">*/}
                                {/*                        {el.name}*/}
                                {/*                    </a>*/}
                                {/*                </Link>*/}
                                {/*            </li>*/}
                                {/*        ))}*/}
                                {/*    </ul>*/}
                                {/*)}*/}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
