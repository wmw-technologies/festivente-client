import { Device, Rental } from '@/src/types';
import { useEffect, useState } from 'react';
import { Schema } from './form';
import {
  FieldErrors,
  set,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetError,
  UseFormTrigger
} from 'react-hook-form';
import styles from './rent-widget.module.scss';
import UIInput from '@/src/components/UI/Input';
import UIIcon from '@/src/components/UI/Icon';
import { formatCurrency } from '@/src/utils/format';
import { get } from 'http';

type RentWidegetProps = {
  isEdit: boolean;
  rentalsData: Rental | null;
  availableDevices: Device[];
  isSubmitted: boolean;
  append: UseFieldArrayAppend<Schema>;
  remove: UseFieldArrayRemove;
  trigger: UseFormTrigger<Schema>;
  getValues: UseFormGetValues<Schema>;
  setError: UseFormSetError<Schema>;
  errors: FieldErrors<Schema>;
};

export default function RentWidget({
  isEdit,
  rentalsData,
  availableDevices,
  isSubmitted,
  append,
  remove,
  trigger,
  getValues,
  setError,
  errors
}: RentWidegetProps) {
  const [inCartDevices, setInCartDevices] = useState<Device[]>(isEdit ? (rentalsData?.devices ?? []) : []);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addDeviceToRental = (device: Device) => {
    const isDeviceInCart = inCartDevices.some((d) => d._id === device._id);

    if (isDeviceInCart) {
      // Optionally, you can show a message or handle the case when the device is already in the cart
      console.log('Device is already in the cart');
      setError('devices', { message: 'Urządzenie jest już w koszyku' });
      return;
    }
    setFilteredDevices(filteredDevices.filter((d) => d._id !== device._id));
    setInCartDevices([...inCartDevices, device]);
    append({ ...device });

    if (isSubmitted) {
      trigger('devices');
    }
  };

  const removeDeviceFromRental = (device: Device) => {
    setInCartDevices(inCartDevices.filter((d) => d._id !== device._id));
    setFilteredDevices([...filteredDevices, device]);
    const index = inCartDevices.findIndex((d) => d._id === device._id);
    console.log(inCartDevices);

    if (index !== -1) remove(index);
    if (isSubmitted) {
      trigger('devices');
    }
  };

  useEffect(() => {
    console.log('incart', inCartDevices);

    console.log(getValues());
    console.log('errors', errors);
  }, [inCartDevices]);

  useEffect(() => {
    const filtered = availableDevices.filter(
      (device) =>
        device.warehouseId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.warehouseId.skuNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location?.toLowerCase?.()?.includes?.(searchQuery.toLowerCase()) ||
        (device.serialNumber && device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredDevices(filtered);
  }, [searchQuery, availableDevices]);

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
              <span>Wartoćś wypożyczenia: {formatCurrency(device.warehouseId.rentalValue)}</span>
              <span>Lokalizacja: {device.location}</span>
              {device.serialNumber && <span>Numer seryjny: {device.serialNumber}</span>}
              {device.description && <span>Opis: {device.description}</span>}
            </div>
            <button
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
        {inCartDevices.map((device) => (
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
