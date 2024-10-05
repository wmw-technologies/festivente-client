'use client';

import { useEffect, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './index.module.scss';
import { SITEMAP } from '@/src/sitemap';
import Link from 'next/link';
import UIIcon from '@/src/components/UI/Icon';
import UIButton from '@/src/components/UI/Button';

export default function SystemMenu() {
  const [openedTab, setOpenedTab] = useState<string | null>(null);
  const pathName = usePathname();
  const isMenuCollapsed = false;

  const isActive = (path: string) => pathName.startsWith(path);
  const handleChangeTab = useCallback((tab: string) => setOpenedTab((prev) => (prev === tab ? null : tab)), []);

  useEffect(() => {
    SITEMAP.forEach((item) => {
      if (item.children) {
        item.children.forEach((el) => {
          if (isActive(el.path)) {
            setOpenedTab(item.path);
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className={`${styles.sidebar} ${isMenuCollapsed ? styles.collapsed : styles.expanded}`}>
      <div className="flex flex-col whitespace-nowrap">
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
          <ul className={styles.levelone}>
            {SITEMAP.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  title={item.name}
                  className={`${styles.link} ${isActive(item.path) && styles.active}`}
                >
                  <div>
                    <UIIcon name={item.icon} />
                    {!isMenuCollapsed && <span>{item.name}</span>}
                  </div>
                  {item.children?.length && (
                    <UIButton.Toggle isOpened={item.path === openedTab} onClick={() => handleChangeTab(item.path)} />
                  )}
                </Link>
                {item.children?.length && item.path === openedTab && !isMenuCollapsed && (
                  <ul className={styles.leveltwo}>
                    {item.children.map((el) => (
                      <li key={el.path}>
                        <Link
                          href={el.path}
                          title={el.name}
                          className={`${styles.link} ${isActive(el.path) && styles.active}`}
                        >
                          {el.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
