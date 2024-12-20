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
            path: '/administration/users/add',
            visible: false
          },
          {
            name: 'Edytuj użytkownika',
            path: '/administration/users/:id',
            visible: false
          },
          {
            name: 'Zmiana hasła',
            path: '/administration/users/:id/change-password',
            visible: false
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
            path: '/administration/roles/add',
            visible: false
          },
          {
            name: 'Edytuj rolę',
            path: '/administration/roles/:id',
            visible: false
          }
        ]
      }
    ]
  },
  {
    name: 'Magazyn',
    icon: 'CubeIcon',
    path: '/warehouse',
    permissions: [Permissions.WAREHOUSE.ACCESS],
    children: [
      {
        name: 'Dodaj do magazynu',
        path: '/warehouse/add',
        visible: false
      },
      {
        name: 'Edytuj w magazynie',
        path: '/warehouse/:id',
        visible: false
      },
      {
        name: 'Szczegóły wydarzenia',
        path: '/warehouse/:id/details',
        visible: false
      }
    ]
  },
  {
    name: 'Wypożyczenia',
    icon: 'ArrowsRightLeftIcon',
    path: '/rentals',
    permissions: [Permissions.RENTALS.ACCESS],
    children: [
      {
        name: 'Dodaj wypożyczenie',
        path: '/rentals/add',
        visible: false
      },
      {
        name: 'Edytuj wypożyczenie',
        path: '/rentals/:id',
        visible: false
      },
      {
        name: 'Szczegóły wydarzenia',
        path: '/rentals/:id/details',
        visible: false
      }
    ]
  },
  {
    name: 'Pracownicy',
    icon: 'UsersIcon',
    path: '/employees',
    permissions: [Permissions.EMPLOYEES.ACCESS],
    children: [
      {
        name: 'Dodaj pracownika',
        path: '/employees/add',
        visible: false
      },
      {
        name: 'Edytuj pracownika',
        path: '/employees/:id',
        visible: false
      }
    ]
  },
  {
    name: 'Imprezy',
    icon: 'StarIcon',
    path: '/events',
    permissions: [Permissions.EVENTS.ACCESS],
    children: [
      {
        name: 'Dodaj wydarzenie',
        path: '/events/add',
        visible: false
      },
      {
        name: 'Edytuj wydarzenie',
        path: '/events/:id',
        visible: false
      },
      {
        name: 'Szczegóły wydarzenia',
        path: '/events/:id/details',
        visible: false
      }
    ]
  },
  {
    name: 'Pojazdy',
    icon: 'TruckIcon',
    path: '/vehicles',
    permissions: [Permissions.VEHICLES.ACCESS],
    children: [
      {
        name: 'Dodaj pojazd',
        path: '/vehicles/add',
        visible: false
      },
      {
        name: 'Edytuj pojazd',
        path: '/vehicles/:id',
        visible: false
      },
      {
        name: 'Szczegóły pojazdu',
        path: '/vehicles/:id/details',
        visible: false
      }
    ]
  },
  {
    name: 'Transport',
    icon: 'MapPinIcon',
    path: '/transport',
    permissions: [Permissions.TRANSPORT.ACCESS],
    children: [
      {
        name: 'Dodaj transport',
        path: '/transport/add',
        visible: false
      },
      {
        name: 'Edytuj transport',
        path: '/transport/:id',
        visible: false
      },
      {
        name: 'Szczegóły transportu',
        path: '/transport/:id/details',
        visible: false
      }
    ]
  },
  {
    name: 'Serwis',
    icon: 'Cog6ToothIcon',
    path: '/service',
    permissions: [Permissions.SERVICE.ACCESS],
    children: [
      {
        name: 'Dodaj urządzenie do serwisu',
        path: '/service/add',
        visible: false
      },
      {
        name: 'Edytuj urządzenie w serwisie',
        path: '/service/:id',
        visible: false
      },
      {
        name: 'Szczegóły serwisu',
        path: '/service/:id/details',
        visible: false
      }
    ]
  }
];
