'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { Device, Rental } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// import { create, update } from './actions';
import styles from './form.module.scss';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UITextarea from '@/src/components/UI/Textarea';
import UIIcon from '@/src/components/UI/Icon';
import { create, update } from './actions';

const schema = z.object({
  clientName: z.string().min(1, 'Nazwa klienta jest wymagana'),
  clientCity: z.string().min(1, 'Miasto jest wymagane'),
  clientStreet: z.string().min(1, 'Ulica jest wymagana'),
  clientPostCode: z.string().min(1, 'Kod pocztowy jest wymagany'),
  clientPhone: z.string().min(1, 'Numer telefonu jest wymagany'),
  clientEmail: z.string().email('Nieprawidłowy adres e-mail'),
  rentalDate: z.string().date().min(1, 'Data wypożyczenia jest wymagana'),
  returnDate: z.string().date().min(1, 'Data zwrotu jest wymagana'),
  devices: z
    .array(
      z.object({
        _id: z.string().optional(),
        serialNumber: z.string().min(1).optional(),
        location: z.string().min(1),
        description: z.string().optional()
      })
    )
    .nonempty({
      message: 'Wypożyczenie musi zawierać przynajmniej jedno urządzenie'
    }),
  inTotal: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Must be a valid PLN amount (e.g., 99 or 999.99)' })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, { message: 'Amount must be positive' })
    .refine((val) => val <= 100000, { message: 'Amount must be less than or equal to 100,000 PLN' })
    .transform((val) => val.toFixed(2)),
  notes: z.string().optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  rentalsData: Rental | null;
  warehouseListDevices: Device[];
  id: string;
};

export default function Form({ id, isEdit, rentalsData, warehouseListDevices }: FormProps) {
  const router = useRouter();
  const title = isEdit
    ? `Formularz edycji wypożyczenia: ${rentalsData?.companyName}`
    : 'Formularz dodawania wypożyczenia';

  const {
    register,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setValue,
    getValues,
    setError,
    control,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'devices'
  });

  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [inCartDevices, setInCartDevices] = useState<Device[]>(isEdit ? (rentalsData?.devices ?? []) : []);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (rentalsData) {
      const rentalDeviceIds = new Set(rentalsData.devices.map((device) => device._id));
      const available = warehouseListDevices.filter((device) => !rentalDeviceIds.has(device._id));
      setAvailableDevices(available);
    } else {
      setAvailableDevices(warehouseListDevices);
    }
  }, []);

  useEffect(() => {
    const filtered = availableDevices.filter(
      (device) =>
        // device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // device.skuNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (device.serialNumber && device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredDevices(filtered);
  }, [searchQuery, availableDevices]);

  const addDeviceToRental = (device: Device) => {
    setAvailableDevices(availableDevices.filter((d) => d._id !== device._id));
    setFilteredDevices(filteredDevices.filter((d) => d._id !== device._id));
    setInCartDevices([...inCartDevices, device]);
    append({ ...device });
    console.log({ device });
  };

  const removeDeviceFromRental = (device: Device) => {
    setInCartDevices(inCartDevices.filter((d) => d._id !== device._id));
    setAvailableDevices([...availableDevices, device]);
    setFilteredDevices([...filteredDevices, device]);
    const index = inCartDevices.findIndex((d) => d._id === device._id);
    if (index !== -1) remove(index);
  };

  async function onSubmit(form: Schema) {
    console.log(form);

    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      if (response?.ok) {
        router.push('/rentals');
        toast.success(response?.message);
      } else {
        if (response?.errors) {
          Object.keys(response?.errors).map((key) => {
            setError(key as any, { message: (response?.errors as any)[key] });
          });
        }
      }
    } catch (error) {
      toast.error('Error saving the device');
    }
  }

  function init() {
    if (!rentalsData) return;

    setValue('clientName', rentalsData.companyName);
    setValue('clientPhone', rentalsData.phone);
    setValue('rentalDate', new Date(rentalsData.startDate).toISOString().split('T')[0]);
    setValue('returnDate', new Date(rentalsData.endDate).toISOString().split('T')[0]);
    setValue('inTotal', rentalsData.price.toString());
    const devices = rentalsData.devices.map((device) => ({
      _id: device._id,
      serialNumber: device.serialNumber,
      location: device.location,
      description: device.description
    }));
    rentalsData.devices.forEach((device) => {
      append({ ...device });
    });
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/rentals" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="rentals-form"
            loading={isSubmitting}
            disabled={!isValid && isSubmitted}
            icon="CheckCircleIcon"
            variant="black"
          >
            Zapisz
          </UIButton>
        </UIPanel>
      }
    >
      <form id="rentals-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className={`${styles['form-inputs']} row`}>
            <UIGroup header="Nazwa klienta" error={errors.clientName} required>
              <UIInput placeholder="Wprowadź nazwę" {...register('clientName')} />
            </UIGroup>
            <UIGroup header="Miasto" error={errors.clientCity} required>
              <UIInput placeholder="Wprowadź miasto" {...register('clientCity')} />
            </UIGroup>
            <UIGroup header="Ulica" error={errors.clientStreet} required>
              <UIInput placeholder="Wprowadź ulice" {...register('clientStreet')} />
            </UIGroup>
            <UIGroup header="Kod pocztowy" error={errors.clientPostCode} required>
              <UIInput placeholder="Wprowadź kod pocztowy" {...register('clientPostCode')} />
            </UIGroup>
            <UIGroup header="Email" error={errors.clientEmail} required>
              <UIInput placeholder="Wprowadź email" {...register('clientEmail')} />
            </UIGroup>
            <UIGroup header="Numer telefonu" error={errors.clientPhone} required>
              <UIInput placeholder="Wprowadź numer telefonu" {...register('clientPhone')} />
            </UIGroup>
            <UIGroup header="Warotść" error={errors.inTotal} required>
              <UIInput type="number" placeholder="Wprowadź wartość wypożyczenia" {...register('inTotal')} />
            </UIGroup>
            <UIGroup header="Data wypożyczenia" error={errors.rentalDate} required>
              <UIInput type="date" {...register('rentalDate')} />
            </UIGroup>
            <UIGroup header="Data zwrotu" error={errors.returnDate} required>
              <UIInput type="date" {...register('returnDate')} />
            </UIGroup>
            <UIGroup header="Uwagi" error={errors.notes} required>
              <UITextarea rows={2} placeholder="Uwagi do wypożyczenia" {...register('notes')} />
            </UIGroup>
          </div>
          <div className={`${styles['form-items']} row`}>
            <div className={`col-6 ${styles['form-items__col']}`}>
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
                    {/* <span>Nazwa: {device.name}</span>
                    <span>SKU: {device.skuNumber}</span>
                    <span>Wartoćś wypożyczenia: {device.rentalValue} PLN</span> */}
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
            <div className={`col-6 ${styles['form-items__col']}`}>
              <h3 className={styles['form-items__header']}>Urządzenia w koszyku</h3>
              {errors.devices && <span className={styles['form-items__error']}>{errors.devices.message}</span>}
              {inCartDevices.map((device) => (
                <div className={`${styles['items-card']} ${styles['items-card--in-cart']}`} key={device._id}>
                  <div className={styles['items-card__props']}>
                    {/* <span>Nazwa: {device.name}</span>
                    <span>SKU: {device.skuNumber}</span>
                    <span>Wartoćś wypożyczenia: {device.rentalValue} PLN</span> */}
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
        </div>
      </form>
    </UICard>
  );
}
