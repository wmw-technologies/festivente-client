export function getStatus(status: string) {
  switch (status) {
    case 'Pending':
      return 'W trakcie';
    case 'Confirmed':
      return 'Zaplanowane';
    case 'Completed':
      return 'Zakończone';
    default:
      return 'Nieznany';
  }
}

export function getStatusVariant(status: string) {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Confirmed':
      return 'info';
    case 'Completed':
      return 'success';
    default:
      return 'info';
  }
}
