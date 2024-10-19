import { ReactNode } from 'react';
import * as Icons from '@heroicons/react/24/solid';

export type Icon = keyof typeof Icons;

export interface SitemapItem {
  name: string;
  path: string;
  icon?: Icon;
  children?: Array<SitemapItem>;
}

export interface Column {
  id: number;
  header?: any;
  item: (item: unknown, index: number) => ReactNode;
  width?: number;
}

export interface Response<T> {
  data: T;
  message: string;
}

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: any;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}
