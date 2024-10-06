'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import styles from './index.module.scss';
import { SitemapItem } from '@/src/types';
import { SITEMAP } from '@/src/sitemap';
import Link from 'next/link';
import UIIcon from '@/src/components/UI/Icon';
import { useEffect } from 'react';

export default function SystemBreadcrumb() {
  const [breadcrumbs, setBreadcrumbs] = useState<SitemapItem[]>([]);
  const pathName = usePathname();
  const params = useParams<Record<string, string>>();

  const findBreadcrumbs = (items: SitemapItem[], path: string): SitemapItem[] => {
    for (const item of items) {
      const sitemapItem = { ...item };

      if (Object.keys(params).length) {
        sitemapItem.path = item.path.replace(/:([^/]+)/g, (match, p1) => params[p1] || match);
      }

      if (sitemapItem.path === path) {
        return [sitemapItem];
      }

      if (sitemapItem.children) {
        const children = findBreadcrumbs(sitemapItem.children, path);
        if (children.length) {
          return [sitemapItem, ...children];
        }
      }
    }

    return [];
  };

  useEffect(() => {
    const breadcrumbs = findBreadcrumbs(SITEMAP, pathName);
    setBreadcrumbs(breadcrumbs);
  }, [pathName, params]);

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
