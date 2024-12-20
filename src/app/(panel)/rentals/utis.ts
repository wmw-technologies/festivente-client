export function getStatus(status: string) {
  switch (status) {
    case 'Scheduled':
      return 'Zaplanowany';
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
    case 'Scheduled':
      return 'info';
    case 'In Progress':
      return 'warning';
    case 'Completed Paid':
      return 'success';
    case 'Complated Not Paid':
      return 'danger';
    default:
      return 'info';
  }
}
