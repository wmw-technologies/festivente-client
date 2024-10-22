import { SitemapItem } from '@/src/types';

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
    path: '/warehouse'
  },
  {
    name: 'Wypożyczenia',
    icon: 'ArrowsRightLeftIcon',
    path: '/rentals'
  },
  {
    name: 'Pracownicy',
    icon: 'UsersIcon',
    path: '/employees'
  },
  {
    name: 'Imprezy',
    icon: 'StarIcon',
    path: '/events'
  },
  {
    name: 'Transport',
    icon: 'TruckIcon',
    path: '/transport'
  },
  {
    name: 'Serwis',
    icon: 'Cog6ToothIcon',
    path: '/service'
  }
];
