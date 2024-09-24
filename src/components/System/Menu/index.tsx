'use client';

import { usePathname } from 'next/navigation';
import styles from './index.module.scss';
import { SITEMAP } from '@/sitemap';
import Link from 'next/link';
import UIIcon from '@/src/components/UI/Icon';
import UIToggleButton from '@/src/components/UI/ToggleButton';

export default function SystemMenu() {
    const pathName = usePathname();
    const isMenuCollapsed = false;

    return (
        <aside className={`${styles.sidebar} ${isMenuCollapsed ? styles.collapsed : styles.expanded}`}>
            <div className='flex flex-col whitespace-nowrap'>
                {!isMenuCollapsed && (
                    <div className={styles.info}>
                        <p>
                            Użytkownik: <strong>Wojciech Skirło</strong>
                        </p>
                        <p>
                            E-mail: <strong>wojciech.skirlo@microsoft.pl</strong>
                        </p>
                    </div>
                )}
                <nav className={styles.nav}>
                    <ul>
                        {SITEMAP.map((item) => {
                            const isActive = pathName.startsWith(item.path);

                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        title={item.name}
                                        className={`${styles.link} ${isActive && styles.active}`}
                                    >
                                        <div>
                                            <UIIcon name={item.icon} />
                                            {!isMenuCollapsed && <span>{item.name}</span>}
                                        </div>
                                        {item.children?.length && <UIToggleButton isOpen={true} />}
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
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
