'use client';

import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Role } from '@/src/types';
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

const schema = z.object({
  clientName: z.string().min(1, 'Nazwa klienta jest wymagana'),
  clientCity: z.string().min(1, 'Miasto jest wymagany'),
  clientStreet: z.string().min(1, 'Ulica jest wymagany'),
  clientPostCode: z.string().min(1, 'Kod pocztowy jest wymagany'),
  clientPhone: z.string().min(1, 'Numer telefonu jest wymagany'),
  clientEmail: z.string().email('Nieprawidłowy adres e-mail'),
  rentalDate: z.string().min(1, 'Data wypożyczenia jest wymagana'),
  returnDate: z.string().min(1, 'Data zwrotu jest wymagana'),
  items: z
    .array(
      z.object({
        id: z.string().min(1, 'ID przedmiotu jest wymagane')
      })
    )
    .nonempty('Musisz dodać co najmniej jeden przedmiot'),
  inTotal: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Must be a valid PLN amount (e.g., 99 or 999.99)' })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, { message: 'Amount must be positive' })
    .refine((val) => val <= 100000, { message: 'Amount must be less than or equal to 100,000 PLN' }),
  notes: z.string().optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  data: Role | null;
  id: string;
};

type Device = {
  id: string;
  name: string;
  serialNumber?: string;
  location: string;
  manufacturer?: string | undefined;
  skuNumber: string;
  rentalValue: number;
  category?: string;
};

async function fetchDevices(): Promise<Device[]> {
  // Fetch devices from the database
  return [
    {
      id: '1',
      name: 'Urządzenie do robienia dymu z dupy',
      location: 'Magazyn',
      skuNumber: 'SKU-1',
      rentalValue: 100
    },
    {
      id: '2',
      name: 'Urządzenie 2',
      location: 'Magazyn',
      skuNumber: 'SKU-2',
      rentalValue: 200
    },
    {
      id: '3',
      name: 'Urządzenie 3',
      location: 'Magazyn',
      skuNumber: 'SKU-3',
      rentalValue: 300,
      serialNumber: 'SN-3322'
    }
  ];
}

export default function Form({ id, isEdit, data }: FormProps) {
  const router = useRouter();
  const title = isEdit ? `Formularz edycji wypożyczenia: ${data?.name}` : 'Formularz dodawania wypożyczenia';

  const {
    register,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setValue,
    setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [inCartDevices, setInCartDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function loadDevices() {
      const devices = await fetchDevices();
      setAvailableDevices(devices);
    }

    loadDevices();
  }, []);

  useEffect(() => {
    const filtered = availableDevices.filter(
      (device) =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.skuNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (device.serialNumber && device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredDevices(filtered);
    console.log(filtered, searchQuery);
  }, [searchQuery, availableDevices]);

  const addDeviceToRental = (device: Device) => {
    setAvailableDevices(availableDevices.filter((d) => d.id !== device.id));
    setFilteredDevices(filteredDevices.filter((d) => d.id !== device.id));
    setInCartDevices([...inCartDevices, device]);
  };

  const removeDeviceFromRental = (device: Device) => {
    setInCartDevices(inCartDevices.filter((d) => d.id !== device.id));
    setAvailableDevices([...availableDevices, device]);
    setFilteredDevices([...filteredDevices, device]);
  };

  async function onSubmit(form: Schema) {
    try {
      // const response = !isEdit
      //   ? await create({ ...form, permissions: state })
      //   : await update(id, { ...form, permissions: state });
      // if (response?.ok) {
      //   router.push('/administration/roles');
      //   toast.success(response?.message);
      // } else {
      //   setError('name', { message: response?.message });
      // }
    } catch (error) {
      toast.error('Wystąpił błąd podczas zapisywania roli');
    }
  }

  function init() {
    // if (!data) return;
    // setValue('name', data?.name);
    // dispatch({ type: PermissionsActionKind.SET_PERMISSIONS, payload: data.permissions });
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
                <div className={styles['items-card']} key={device.id}>
                  <div className={styles['items-card__props']}>
                    <span>Nazwa: {device.name}</span>
                    <span>SKU: {device.skuNumber}</span>
                    <span>Wartoćś wypożyczenia: {device.rentalValue} PLN</span>
                    <span>Lokalizacja: {device.location}</span>
                    {device.serialNumber && <span>Numer seryjny: {device.serialNumber}</span>}
                  </div>
                  <button className={styles['items-card__button']} onClick={() => addDeviceToRental(device)}>
                    <UIIcon name="PlusIcon" smaller />
                  </button>
                </div>
              ))}
            </div>
            <div className={`col-6 ${styles['form-items__col']}`}>
              <h3 className={styles['form-items__header']}>Urządzenia w koszyku</h3>
              {inCartDevices.map((device) => (
                <div className={styles['items-card']} key={device.id}>
                  <div className={styles['items-card__props']}>
                    <span>Nazwa: {device.name}</span>
                    <span>SKU: {device.skuNumber}</span>
                    <span>Wartoćś wypożyczenia: {device.rentalValue} PLN</span>
                    <span>Lokalizacja: {device.location}</span>
                    {device.serialNumber && <span>Numer seryjny: {device.serialNumber}</span>}
                  </div>
                  <button className={styles['items-card__button']} onClick={() => removeDeviceFromRental(device)}>
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
