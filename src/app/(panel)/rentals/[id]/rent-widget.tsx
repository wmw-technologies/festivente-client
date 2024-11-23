import { use, useEffect, useState } from 'react';
import { Device } from '@/src/types';
import { Schema } from './form';
import { FieldErrors, useController, Control, UseFormSetValue, set } from 'react-hook-form';
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
  const { field: deviceIds } = useController({
    control,
    name: 'devices',
    defaultValue: []
  });

  const { field: rentalDate } = useController({
    control,
    name: 'rentalDate'
  });

  const { field: returnDate } = useController({
    control,
    name: 'returnDate'
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedDevices, setAddedDevices] = useState<Device[]>([]);
  const [rentalDays, setRentalDays] = useState<number>(0);

  const filteredDevices = availableDevices.filter(
    (device) =>
      (searchQuery === '' ||
        device.warehouseId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.warehouseId.skuNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.serialNumber?.toLowerCase?.().includes?.(searchQuery.toLowerCase())) &&
      !deviceIds.value.includes(device._id)
  );

  function calculateRentalDays(rentalDate: string, returnDate: string): number {
    const startDate = new Date(rentalDate);
    const endDate = new Date(returnDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return Math.ceil(dayDifference);
  }

  const countInTotal = addedDevices.reduce((acc, device) => acc + device.warehouseId.rentalValue, 0);

  const addDeviceToRental = (device: Device) => {
    const isDeviceAdded = deviceIds.value.some((id: string) => id === device._id);

    if (isDeviceAdded) return;

    deviceIds.onChange([...deviceIds.value, device._id]);
    setAddedDevices([...addedDevices, device]);
    setValue('inTotal', (countInTotal + device.warehouseId.rentalValue) * rentalDays);
    console.log(rentalDays);
  };

  const removeDeviceFromRental = (device: Device) => {
    const isDeviceAdded = deviceIds.value.some((id: string) => id === device._id);

    if (!isDeviceAdded) return;

    deviceIds.onChange(deviceIds.value.filter((id: string) => id !== device._id));
    setAddedDevices(addedDevices.filter((addedDevice) => addedDevice._id !== device._id));
    setValue('inTotal', (countInTotal - device.warehouseId.rentalValue) * rentalDays);
    console.log(rentalDays);
  };

  useEffect(() => {
    // setRentalDays(calculateRentalDays(rentalDate.value, returnDate.value));
    // if (rentalDays) setValue('inTotal', countInTotal * calculateRentalDays(rentalDate.value, returnDate.value));
  }, [rentalDate.value, returnDate.value]);

  useEffect(() => {
    if (deviceIds.value)
      setAddedDevices(availableDevices.filter((device) => deviceIds.value.some((id: string) => id === device._id)));
  }, [deviceIds.value]);

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
