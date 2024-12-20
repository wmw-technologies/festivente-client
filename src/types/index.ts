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
  sort?: string;
  align?: 'left' | 'center' | 'right';
}

export interface Option {
  text: string;
  value: string;
}

export interface Pager {
  page: number;
  perPage: number;
  total: number;
  sort: string;
  order: 'ASC' | 'DESC';
}

export interface ResponseAPI<T = undefined> {
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export interface Pagination<T = undefined> {
  items: Array<T>;
  totalRows: number;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  _id: string;
  name: string;
  permissions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface Warehouse {
  _id: string;
  name: string;
  manufacturer?: string | undefined;
  skuNumber: string;
  rentalValue: number;
  category?: string;
  description?: string | undefined;
  devices: Array<Device>;
  devicesInService: number;
  devicesInRental: number;
  status: 'Available' | 'Out of stock';
  createdBy: User;
  updatedAt: string;
  createdAt: string;
}

export interface Device {
  _id: string;
  serialNumber: string;
  location: string;
  description?: string;
  warehouseId: Warehouse;
  createdAt: string;
  updatedAt: string;
}

export interface Rental {
  _id: string;
  clientName: string;
  clientNIP: string;
  clientPhone: string;
  clientEmail: string;
  clientCity: string;
  clientStreet: string;
  clientPostCode: string;
  rentalDate: string;
  returnDate: string;
  paymentForm: 'cash' | 'transfer' | 'card' | 'other';
  isPaid: boolean;
  devices: Array<Device>;
  inTotal: number;
  notes?: string;
  status: string;
  discount: number;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  dailyRate: number;
  overtime: {
    first: number;
    second: number;
    third: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id: string;
  eventName: string;
  city: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  description?: string;
  location: string;
  budget: number;
  assignedEmployees: Array<Employee>;
  estimatedHours?: number;
  actualHours?: number;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  registrationNumber: string;
  pricePerKm: number;
  insuranceDate: string;
  inspectionDate: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transport {
  _id: string;
  vehicles: Array<Vehicle>;
  event: Event;
  departureTime: string;
  arrivalTime?: string;
  departureLocation: string;
  destinationLocation: string;
  phoneNumber?: string;
  notes?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  returnDate: string;
  serviceDate?: string;
  repairPrice?: number;
  servicePerson?: Employee;
  device: Device;
  description: string;
  status: 'Accepted' | 'Completed' | 'In Progress';
  createdAt: string;
  updatedAt: string;
}
