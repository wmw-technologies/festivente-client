'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { Device, Rental } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import styles from './form.module.scss';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UITextarea from '@/src/components/UI/Textarea';
import RentWidget from './rent-widget';

const WarehouseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  manufacturer: z.string().optional(),
  skuNumber: z.string(),
  rentalValue: z.number(),
  category: z.string().optional(),
  description: z.string().optional(),
  isSerialTracked: z.boolean(),
  status: z.enum(['Available', 'Out of stock']),
  createdBy: z.any(),
  devices: z.array(z.any()), // Assuming devices is an array of any type
  updatedAt: z.string(),
  createdAt: z.string()
});

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
        _id: z.string(),
        serialNumber: z.string().optional(),
        location: z.string(),
        description: z.string().optional(),
        warehouseId: WarehouseSchema,
        rentalId: z.any().optional()
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
  availableDevices: Device[];
  id: string;
};

export default function Form({ id, isEdit, rentalsData, availableDevices }: FormProps) {
  const router = useRouter();
  const title = isEdit
    ? `Formularz edycji wypożyczenia: ${rentalsData?.clientName}`
    : 'Formularz dodawania wypożyczenia';

  const {
    register,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setValue,
    trigger,
    getValues,
    setError,
    control,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'devices'
  });

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
    console.log(rentalsData);

    setValue('clientName', rentalsData.clientName);
    setValue('clientPhone', rentalsData.clientPhone);
    setValue('rentalDate', new Date(rentalsData.rentalDate).toISOString().split('T')[0]);
    setValue('returnDate', new Date(rentalsData.returnDate).toISOString().split('T')[0]);
    setValue('inTotal', rentalsData.inTotal.toString());
    setValue('clientCity', rentalsData.clientCity);
    setValue('clientStreet', rentalsData.clientStreet);
    setValue('clientPostCode', rentalsData.clientPostCode);
    setValue('clientEmail', rentalsData.clientEmail);
    setValue('notes', rentalsData.notes);

    setValue('devices', rentalsData.devices as any);

    console.log('start value', getValues());
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
          <div className="col-3">
            <UIGroup header="Nazwa klienta" error={errors.clientName} required>
              <UIInput placeholder="Wprowadź nazwę" {...register('clientName')} />
            </UIGroup>
            <UIGroup header="Numer telefonu" error={errors.clientPhone} required>
              <UIInput placeholder="Wprowadź numer telefonu" {...register('clientPhone')} />
            </UIGroup>
            <UIGroup header="Email" error={errors.clientEmail} required>
              <UIInput placeholder="Wprowadź email" {...register('clientEmail')} />
            </UIGroup>
            <UIGroup header="Wartość" error={errors.inTotal} required>
              <UIInput type="number" placeholder="Wprowadź wartość wypożyczenia" {...register('inTotal')} />
            </UIGroup>
          </div>
          <div className="col-3">
            <UIGroup header="Data wypożyczenia" error={errors.rentalDate} required>
              <UIInput type="date" {...register('rentalDate')} />
            </UIGroup>
            <UIGroup header="Data zwrotu" error={errors.returnDate} required>
              <UIInput type="date" {...register('returnDate')} />
            </UIGroup>
          </div>
          <div className="col-3">
            <UIGroup header="Miasto" error={errors.clientCity} required>
              <UIInput placeholder="Wprowadź miasto" {...register('clientCity')} />
            </UIGroup>
            <UIGroup header="Ulica" error={errors.clientStreet} required>
              <UIInput placeholder="Wprowadź ulice" {...register('clientStreet')} />
            </UIGroup>
            <UIGroup header="Kod pocztowy" error={errors.clientPostCode} required>
              <UIInput placeholder="Wprowadź kod pocztowy" {...register('clientPostCode')} />
            </UIGroup>
          </div>
          <div className="col-3">
            <UIGroup header="Uwagi" error={errors.notes}>
              <UITextarea rows={3} placeholder="Uwagi do wypożyczenia" {...register('notes')} />
            </UIGroup>
          </div>
        </div>

        <RentWidget
          isEdit={isEdit}
          rentalsData={rentalsData}
          availableDevices={availableDevices}
          append={append}
          remove={remove}
          trigger={trigger}
          getValues={getValues}
          setError={setError}
          isSubmitted={isSubmitted}
          errors={errors}
        />
      </form>
    </UICard>
  );
}
