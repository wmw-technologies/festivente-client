import { SitemapItem } from '@/src/types';
import Permissions from '@/src/permissions';

export const SITEMAP: Array<SitemapItem> = [
  {
    name: 'Dashboard',
    icon: 'Squares2X2Icon',
    path: '/dashboard'
  },
  {
    name: 'Moje konto',
    icon: 'UserCircleIcon',
    path: '/my-account'
  },
  {
    name: 'Administracja',
    icon: 'CommandLineIcon',
    path: '/administration',
    permissions: [Permissions.ADMINISTRATION.ACCESS],
    children: [
      {
        name: 'Użytkownicy',
        icon: 'UsersIcon',
        path: '/administration/users',
        children: [
          {
            name: 'Dodaj użytkownika',
            path: '/administration/users/add'
          },
          {
            name: 'Edytuj użytkownika',
            path: '/administration/users/:id'
          },
          {
            name: 'Zmiana hasła',
            path: '/administration/users/:id/change-password'
          }
        ]
      },
      {
        name: 'Role',
        icon: 'UsersIcon',
        path: '/administration/roles',
        children: [
          {
            name: 'Dodaj rolę',
            path: '/administration/roles/add'
          },
          {
            name: 'Edytuj rolę',
            path: '/administration/roles/:id'
          }
        ]
      }
    ]
  },
  {
    name: 'Magazyn',
    icon: 'CubeIcon',
    path: '/warehouse',
    permissions: [Permissions.WAREHOUSE.ACCESS]
  },
  {
    name: 'Wypożyczenia',
    icon: 'ArrowsRightLeftIcon',
    path: '/rentals',
    permissions: [Permissions.RENTALS.ACCESS]
  },
  {
    name: 'Pracownicy',
    icon: 'UsersIcon',
    path: '/employees',
    permissions: [Permissions.EMPLOYEES.ACCESS]
  },
  {
    name: 'Imprezy',
    icon: 'StarIcon',
    path: '/events',
    permissions: [Permissions.EVENTS.ACCESS]
  },
  {
    name: 'Transport',
    icon: 'TruckIcon',
    path: '/transport',
    permissions: [Permissions.TRANSPORT.ACCESS]
  },
  {
    name: 'Serwis',
    icon: 'Cog6ToothIcon',
    path: '/service',
    permissions: [Permissions.SERVICE.ACCESS]
  }
];
