'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import styles from './index.module.scss';
import { SitemapItem } from '@/src/types';
import { SITEMAP } from '@/src/sitemap';
import Link from 'next/link';
import UIIcon from '@/src/components/UI/Icon';
import { useEffect } from 'react';

export default function SystemBreadcrumb() {
  const [breadcrumbs, setBreadcrumbs] = useState<SitemapItem[]>([]);
  const pathName = usePathname();

  const findBreadcrumbs = useCallback((items: SitemapItem[], path: string): SitemapItem[] => {
    for (const item of items) {
      if (item.path === path) {
        return [item];
      }

      if (item.children) {
        const children = findBreadcrumbs(item.children, path);
        if (children.length) {
          return [item, ...children];
        }
      }
    }

    return [];
  }, []);

  useEffect(() => {
    const breadcrumbs = findBreadcrumbs(SITEMAP, pathName);
    setBreadcrumbs(breadcrumbs);
  }, [findBreadcrumbs, pathName]);

  return (
    <nav className={styles.nav}>
      <ol role="list">
        <li>
          <Link href="/">
            <UIIcon name="HomeIcon" smaller />
          </Link>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={index}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
