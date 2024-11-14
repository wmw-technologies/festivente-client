import { useEffect, useState } from 'react';
import { Device } from '@/src/types';
import { Schema } from './form';
import { FieldErrors, useController, Control, UseFormSetValue } from 'react-hook-form';
import { formatCurrency } from '@/src/utils/format';
import styles from './rent-widget.module.scss';
import UIInput from '@/src/components/UI/Input';
import UIIcon from '@/src/components/UI/Icon';
import UITooltip from '@/src/components/UI/Tooltip';

type RentWidegetProps = {
  availableDevices: Device[];
  control: Control<Schema>;
  errors: FieldErrors<Schema>;
  setValue: UseFormSetValue<Schema>;
};

export default function RentWidget({ availableDevices, control, errors, setValue }: RentWidegetProps) {
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
  const countInTotal = addedDevices.reduce((acc, device) => acc + device.warehouseId.rentalValue, 0);

  useEffect(() => {
    setValue('inTotal', countInTotal);
  }, [addedDevices]);

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
              <UITooltip overlowing overflowWidth={232} text={device.warehouseId.name}>
                <span className={styles['items-card__item']}>Nazwa: {device.warehouseId.name}</span>
              </UITooltip>
              <UITooltip overlowing overflowWidth={232} text={device.location}>
                <span className={styles['items-card__item']}>Lokalizacja: {device.location}</span>
              </UITooltip>
              <UITooltip overlowing overflowWidth={232} text={device.warehouseId.skuNumber}>
                <span className={styles['items-card__item']}>SKU: {device.warehouseId.skuNumber}</span>
              </UITooltip>

              <UITooltip overlowing overflowWidth={232} text={formatCurrency(device.warehouseId.rentalValue)}>
                <span className={styles['items-card__item']}>
                  Wartość wypożyczenia: {formatCurrency(device.warehouseId.rentalValue)}
                </span>
              </UITooltip>
              {device.serialNumber && (
                <UITooltip overlowing overflowWidth={232} text={device.serialNumber}>
                  <span className={styles['items-card__item']}>Numer seryjny: {device.serialNumber}</span>
                </UITooltip>
              )}
              {device.description && (
                <UITooltip overlowing overflowWidth={232} text={device.description}>
                  <span className={styles['items-card__item']}>Opis: {device.description}</span>
                </UITooltip>
              )}
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
        <h3 className={`${styles['form-items__header']} ${styles['form-items__header--in-cart']}`}>
          Urządzenia w koszyku
        </h3>
        {errors.devices && <span className={styles['form-items__error']}>{errors.devices.message}</span>}
        {addedDevices.map((device) => (
          <div className={`${styles['items-card']} ${styles['items-card--in-cart']}`} key={device._id}>
            <div className={styles['items-card__props']}>
              <UITooltip overlowing overflowWidth={232} text={device.warehouseId.name}>
                <span className={styles['items-card__item']}>Nazwa: {device.warehouseId.name}</span>
              </UITooltip>

              <UITooltip overlowing overflowWidth={232} text={device.location}>
                <span className={styles['items-card__item']}>Lokalizacja: {device.location}</span>
              </UITooltip>
              <UITooltip overlowing overflowWidth={232} text={device.warehouseId.skuNumber}>
                <span className={styles['items-card__item']}>SKU: {device.warehouseId.skuNumber}</span>
              </UITooltip>
              <UITooltip overlowing overflowWidth={232} text={formatCurrency(device.warehouseId.rentalValue)}>
                <span className={styles['items-card__item']}>
                  Wartoćś wypożyczenia: {formatCurrency(device.warehouseId.rentalValue)}
                </span>
              </UITooltip>
              {device.serialNumber && (
                <UITooltip overlowing overflowWidth={232} text={device.serialNumber}>
                  <span className={styles['items-card__item']}>Numer seryjny: {device.serialNumber}</span>
                </UITooltip>
              )}
              {device.description && (
                <UITooltip overlowing overflowWidth={232} text={device.description}>
                  <span className={styles['items-card__item']}>Opis: {device.description}</span>
                </UITooltip>
              )}
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
