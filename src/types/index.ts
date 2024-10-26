import { ReactNode } from 'react';
import * as Icons from '@heroicons/react/24/solid';
import Permissions from '@/src/permissions';

export type Icon = keyof typeof Icons;

export interface SitemapItem {
  name: string;
  path: string;
  icon?: Icon;
  permissions?: Array<string>;
  children?: Array<SitemapItem>;
}

export interface Column {
  id: number;
  header?: any;
  item: (item: unknown, index: number) => ReactNode;
  width?: number;
  sortable?: boolean;
}

export interface ResponseAPI<T> {
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: Role;
}

export interface Role {
  _id: string;
  name: string;
  permissions: Array<string>;
}

export interface Option {
  text: string;
  value: string;
}

export interface Permission {
  NAME?: string;
  KEY?: string;
  [key: string]: string | undefined | Permission;
}
