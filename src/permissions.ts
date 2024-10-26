import { Permission } from '@/src/types';

export default class Permissions {
  static readonly ADMINISTRATION: Permission = {
    NAME: 'Administracja',
    ACCESS: {
      NAME: 'Dostęp do administracji',
      KEY: 'administration.access'
    }
  };

  static readonly WAREHOUSE: Permission = {
    NAME: 'Magazyn',
    ACCESS: {
      NAME: 'Dostęp do magazynu',
      KEY: 'warehouse.access'
    },
    ADD: {
      NAME: 'Dodawanie do magazynu',
      KEY: 'warehouse.add'
    }
  };

  static readonly RENTALS: Permission = {
    NAME: 'Wypożyczenia',
    ACCESS: {
      NAME: 'Dostęp do wypożyczeń',
      KEY: 'rentals.access'
    }
  };

  static readonly EMPLOYEES: Permission = {
    NAME: 'Pracownicy',
    ACCESS: {
      NAME: 'Dostęp do pracowników',
      KEY: 'employees.access'
    }
  };

  static readonly EVENTS: Permission = {
    NAME: 'Imprezy',
    ACCESS: {
      NAME: 'Dostęp do imprez',
      KEY: 'events.access'
    }
  };

  static readonly TRANSPORT: Permission = {
    NAME: 'Transport',
    ACCESS: {
      NAME: 'Dostęp do transportu',
      KEY: 'transport.access'
    }
  };

  static readonly SERVICE: Permission = {
    NAME: 'Serwis',
    ACCESS: {
      NAME: 'Dostęp do serwisu',
      KEY: 'service.access'
    }
  };
}
