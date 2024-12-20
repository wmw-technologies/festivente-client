export function getStatus(status: string) {
  console.log('status', status);
  switch (status) {
    case 'Accepted':
      return 'Przyjęty';
    case 'In Progress':
      return 'W trakcie';
    case 'Completed':
      return 'Zakończony';
    default:
      return 'Nieznany';
  }
}

export function getStatusVariant(status: string) {
  switch (status) {
    case 'Accepted':
      return 'info';
    case 'In Progress':
      return 'warning';
    case 'Completed':
      return 'success';
    default:
      return 'info';
  }
}
