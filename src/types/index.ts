import { ReactNode } from 'react';
import * as Icons from '@heroicons/react/24/solid';

export type Icon = keyof typeof Icons;

export interface SitemapItem {
  name: string;
  path: string;
  icon?: Icon;
  permissions?: Array<string>;
  visible?: boolean;
  children?: Array<SitemapItem>;
}

export interface Column {
  id: number;
  header?: any;
  item: (item: any, index: number) => ReactNode;
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

export interface Warehouse {
  _id: string;
  name: string;
  manufacturer?: string | undefined;
  skuNumber: string;
  rentalValue: number;
  category?: string;
  description?: string | undefined;
  isSerialTracked: boolean;
  status: 'Available' | 'Out of stock';
  createdBy: User;
  devices: Array<Device>;
  updatedAt: Date;
  createdAt: Date;
}

export interface Device {
  _id: string;
  serialNumber?: string;
  location: string;
  description?: string;
}

export interface Rental {
  _id: string;
  startDate: Date;
  endDate: Date;
  companyName: string;
  phone: string;
  issuedBy?: string;
  receivedBy?: string;
  price: number;
  discount?: number;
  ended?: boolean;
  devices: Array<Device>; // Assuming devices are referenced by their ObjectId as strings
  createdAt: Date;
  updatedAt: Date;
}
