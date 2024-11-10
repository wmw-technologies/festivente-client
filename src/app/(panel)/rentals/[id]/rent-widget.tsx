import { useState } from 'react';
import { Device } from '@/src/types';
import { Schema } from './form';
import { FieldErrors, useController, Control } from 'react-hook-form';
import { formatCurrency } from '@/src/utils/format';
import styles from './rent-widget.module.scss';
import UIInput from '@/src/components/UI/Input';
import UIIcon from '@/src/components/UI/Icon';

type RentWidegetProps = {
  availableDevices: Device[];
  control: Control<Schema>;
  errors: FieldErrors<Schema>;
};

export default function RentWidget({ availableDevices, control, errors }: RentWidegetProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { field } = useController({
    control,
    name: 'devices',
    defaultValue: []
  });

  const filteredDevices = availableDevices.filter(
    (device) =>
      (searchQuery === '' ||
        device.warehouseId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.warehouseId.skuNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.serialNumber?.toLowerCase?.().includes?.(searchQuery.toLowerCase())) &&
      !field.value.includes(device._id)
  );

  const addedDevices = availableDevices.filter((device) => field.value.some((id: string) => id === device._id));

  const addDeviceToRental = (device: Device) => {
    const isDeviceAdded = field.value.some((id: string) => id === device._id);

    if (isDeviceAdded) return;

    field.onChange([...field.value, device._id]);
  };

  const removeDeviceFromRental = (device: Device) => {
    const isDeviceAdded = field.value.some((id: string) => id === device._id);

    if (!isDeviceAdded) return;

    field.onChange(field.value.filter((id: string) => id !== device._id));
  };

  return (
    <div className="row">
      <div className="col-6">
        <h3 className={styles['form-items__header']}>Dostępne urządzenia</h3>
        <div className={styles['form-items__input']}>
          <UIInput
            placeholder="Wyszukaj urządzenie"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        {filteredDevices.map((device) => (
          <div className={styles['items-card']} key={device._id}>
            <div className={styles['items-card__props']}>
              <span>Nazwa: {device.warehouseId.name}</span>
              <span>SKU: {device.warehouseId.skuNumber}</span>
              <span>Wartość wypożyczenia: {formatCurrency(device.warehouseId.rentalValue)}</span>
              <span>Lokalizacja: {device.location}</span>
              {device.serialNumber && <span>Numer seryjny: {device.serialNumber}</span>}
              {device.description && <span>Opis: {device.description}</span>}
            </div>
            <button
              type="button"
              className={`${styles['items-card__button']} ${styles['items-card__button--add']}`}
              onClick={() => addDeviceToRental(device)}
            >
              <UIIcon name="PlusIcon" smaller />
            </button>
          </div>
        ))}
      </div>
      <div className="col-6">
        <h3 className={styles['form-items__header']}>Urządzenia w koszyku</h3>
        {errors.devices && <span className={styles['form-items__error']}>{errors.devices.message}</span>}
        {addedDevices.map((device) => (
          <div className={`${styles['items-card']} ${styles['items-card--in-cart']}`} key={device._id}>
            <div className={styles['items-card__props']}>
              <span>Nazwa: {device.warehouseId.name}</span>
              <span>SKU: {device.warehouseId.skuNumber}</span>
              <span>Wartoćś wypożyczenia: {formatCurrency(device.warehouseId.rentalValue)}</span>
              <span>Lokalizacja: {device.location}</span>
              {device.serialNumber && <span>Numer seryjny: {device.serialNumber}</span>}
              {device.description && <span>Opis: {device.description}</span>}
            </div>
            <button
              type="button"
              className={`${styles['items-card__button']} ${styles['items-card__button--remove']}`}
              onClick={() => removeDeviceFromRental(device)}
            >
              <UIIcon name="MinusIcon" smaller />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
