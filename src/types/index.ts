import { ReactNode } from 'react';
import * as Icons from '@heroicons/react/24/solid';

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

export interface ResponseAPI<T = undefined> {
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

export type WarehouseGroupType = {
  _id: string;
  name: string;
  SKU: string;
  quantity: number;
  rentalValue: number;
  category?: string | undefined;
  description?: string | undefined;
  addedBy?: string | undefined;
  manufacturer?: string | undefined;
  isSerialTracked?: boolean | undefined;
  updatedAt?: Date | undefined;
  createdAt?: Date | undefined;
};

export type WarehouseItemType = {
  _id: string;
  description: string;
  location: string;
  serialNumbers?: string | undefined;
  status?: string | undefined;
  // addedBy?: string | undefined;
  updatedAt?: Date | undefined;
  createdAt?: Date | undefined;
};
