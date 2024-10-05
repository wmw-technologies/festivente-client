import * as Icons from '@heroicons/react/24/solid';

export type Icon = keyof typeof Icons;

export interface SitemapItem {
  name: string;
  icon: Icon;
  path: string;
  children?: Array<SitemapItem>;
}
