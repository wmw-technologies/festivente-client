import { Icon } from '@/src/types';

interface SitemapItem {
  name: string;
  icon: Icon;
  path: string;
  children?: Array<SitemapItem>;
}

export const SITEMAP = [
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
        path: '/administration/users'
      },
      {
        name: 'Uprawnienia',
        icon: 'UsersIcon',
        path: '/administration/permissions'
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
] as Array<SitemapItem>;
