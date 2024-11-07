export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric'
  });
}

export function formatCurrency(value: number, currency: string = 'PLN') {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency
  }).format(value);
}

export function dashIfEmpty(value: string | null | number | undefined) {
  return value !== null && value !== undefined && value !== '' ? value : '-';
}
