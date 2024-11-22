export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric'
  });
}

export function formatDateTime(date?: string) {
  if (!date) return '-';

  return new Date(date).toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatCurrency(value?: number, currency: string = 'PLN') {
  if (value == null) return '-';

  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency
  }).format(value);
}

export function dashIfEmpty(value: string | null | number | undefined) {
  return value !== null && value !== undefined && value !== '' ? value : '-';
}
