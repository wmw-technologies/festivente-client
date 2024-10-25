export default class Permissions {
  static readonly ADMINISTRATION = {
    NAME: 'Administracja',
    ACCESS: {
      NAME: 'Dostęp do administracji',
      KEY: 'administration.access'
    }
  };

  static readonly WAREHOUSE = {
    NAME: 'Magazyn',
    ACCESS: {
      NAME: 'Dostęp do magazynu',
      KEY: 'warehouse.access'
    }
  };

  static readonly RENTALS = {
    NAME: 'Wypożyczenia',
    ACCESS: {
      NAME: 'Dostęp do wypożyczeń',
      KEY: 'rentals.access'
    }
  };

  static readonly EMPLOYEES = {
    NAME: 'Pracownicy',
    ACCESS: {
      NAME: 'Dostęp do pracowników',
      KEY: 'employees.access'
    }
  };

  static readonly EVENTS = {
    NAME: 'Imprezy',
    ACCESS: {
      NAME: 'Dostęp do imprez',
      KEY: 'events.access'
    }
  };

  static readonly TRANSPORT = {
    NAME: 'Transport',
    ACCESS: {
      NAME: 'Dostęp do transportu',
      KEY: 'transport.access'
    }
  };

  static readonly SERVICE = {
    NAME: 'Serwis',
    ACCESS: {
      NAME: 'Dostęp do serwisu',
      KEY: 'service.access'
    }
  };
}
