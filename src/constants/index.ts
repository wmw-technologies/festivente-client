import { Option } from '@/src/types';

export const warehouseCategories: Option[] = [
  {
    text: 'Elektronika',
    value: 'Electronics'
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
  },
  {
    text: 'Inne',
    value: 'Other'
  }
];

export const positions: Array<Option> = [
  { value: 'technician', text: 'Technik' },
  { value: 'producer', text: 'Realizator' },
  { value: 'stageHand', text: 'Stage hand' }
];

export const paymentForms: Array<Option> = [
  { value: 'cash', text: 'Gotówka' },
  { value: 'transfer', text: 'Przelew' },
  { value: 'card', text: 'Karta' },
  { value: 'other', text: 'Inny' }
];
