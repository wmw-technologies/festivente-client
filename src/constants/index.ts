import { Option } from '@/src/types';

export const warehouseStatuses: Option[] = [
  {
    text: 'W magazynie',
    value: 'Available'
  },
  {
    text: 'Brak w magazynie',
    value: 'Out of stock'
  }
];

export const warehouseCategories: Option[] = [
  {
    text: 'Elektronika',
    value: 'Electronics'
  },
  {
    text: 'Meble',
    value: 'Furniture'
  },
  {
    text: 'Audio',
    value: 'Audio Equipment'
  },
  {
    text: 'Sprzęt oświetleniowy',
    value: 'Lighting Equipment'
  },
  {
    text: 'Sprzęt fotograficzny',
    value: 'Photography Equipment'
  }
];

export const positions: Array<Option> = [
  { value: 'technician', text: 'Technik' },
  { value: 'producer', text: 'Realizator' },
  { value: 'stageHand', text: 'Stage hand' }
];

export const vehicleTypes: Array<Option> = [
  { value: 'van', text: 'Van' },
  { value: 'bus', text: 'Autobus' },
  { value: 'truck', text: 'Ciężarówka' },
  { value: 'car', text: 'Samochód' },
  { value: 'other', text: 'Inny' }
];
