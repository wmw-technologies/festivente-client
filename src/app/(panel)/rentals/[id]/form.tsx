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
};

async function fetchDevices(): Promise<Device[]> {
  // Fetch devices from the database
  return [
    { id: '1', name: 'Device 1' },
    { id: '2', name: 'Device 2' },
    { id: '3', name: 'Device 3' }
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
  const [rentalDevices, setRentalDevices] = useState<Device[]>([]);

  useEffect(() => {
    async function loadDevices() {
      const devices = await fetchDevices();
      setAvailableDevices(devices);
    }
    loadDevices();
  }, []);

  const addDeviceToRental = (device: Device) => {
    setAvailableDevices(availableDevices.filter((d) => d.id !== device.id));
    setRentalDevices([...rentalDevices, device]);
  };

  const removeDeviceFromRental = (device: Device) => {
    setRentalDevices(rentalDevices.filter((d) => d.id !== device.id));
    setAvailableDevices([...availableDevices, device]);
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
            <div className="col-6">
              <h3>Dostępne urządzenia</h3>
              <ul>
                {availableDevices.map((device) => (
                  <li key={device.id}>
                    {device.name}
                    <button type="button" onClick={() => addDeviceToRental(device)}>
                      Dodaj
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6">
              <h3>Urządzenia do wypożyczenia</h3>
              <ul>
                {rentalDevices.map((device) => (
                  <li key={device.id}>
                    {device.name}
                    <button type="button" onClick={() => removeDeviceFromRental(device)}>
                      Usuń
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </UICard>
  );
}
