'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Transport, Option } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import { vehicleTypes } from '@/src/constants';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UISelect from '@/src/components/UI/Select';
import UIInput from '@/src/components/UI/Input';
import UITextarea from '@/src/components/UI/Textarea';

const schema = z.object({
  vehicleType: z.string(),
  vehicleDetails: z.object({
    brand: z.string().min(3).max(64),
    model: z.string().min(3).max(64),
    registrationNumber: z.string().min(3).max(64)
  }),
  driver: z.string(),
  event: z.string(),
  departureTime: z.date(),
  arrivalTime: z.any().optional().nullable(),
  departureLocation: z.string().min(3).max(64),
  destinationLocation: z.string().min(3).max(64),
  notes: z.string().max(256).optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  id: string;
  isEdit: boolean;
  data: Transport | null;
  employees: Option[];
  events: Option[];
};

export default function Form({ id, isEdit, data, employees, events }: FormProps) {
  const router = useRouter();
  const title = isEdit
    ? `Formularz edycji transportu: ${data?.departureLocation} - ${data?.destinationLocation} | ${data?.vehicleDetails.registrationNumber}`
    : 'Formularz dodawania transportu';

  const {
    register,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setValue,
    setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(form: Schema) {
    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      if (!response?.ok) throw response;

      router.push('/transport');
      toast.success(response.message);
    } catch (ex: any) {
      if (ex.status === 422 && ex?.errors) {
        Object.keys(ex?.errors).map((key) => {
          setError(key as any, { message: (ex.errors as any)[key] });
        });

        return;
      }

      toast.error('Wystąpił błąd podczas zapisywania transportu');
    }
  }

  function localZone(date?: string) {
    if (!date) return;

    const utcDate = new Date(date);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

    return localDate.toISOString().slice(0, 16);
  }

  function init() {
    if (!data) return;

    setValue('vehicleType', data.vehicleType);
    setValue('vehicleDetails.brand', data.vehicleDetails.brand);
    setValue('vehicleDetails.model', data.vehicleDetails.model);
    setValue('vehicleDetails.registrationNumber', data.vehicleDetails.registrationNumber);
    setValue('driver', data.driver._id);
    setValue('event', data.event._id);
    setValue('departureTime', localZone(data.departureTime) as any);
    setValue('arrivalTime', localZone(data.arrivalTime) as any);
    setValue('departureLocation', data.departureLocation);
    setValue('destinationLocation', data.destinationLocation);
    setValue('notes', data.notes ?? '');
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/transport" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="transport-form"
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
      <form id="transport-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <UIGroup header="Typ pojazdu" error={errors.vehicleType} required>
              <UISelect name="vehicleType" placeholder="Wybierz typ pojazdu" options={vehicleTypes} control={control} />
            </UIGroup>
            <UIGroup header="Marka pojazdu" error={errors.vehicleDetails?.brand} required>
              <UIInput placeholder="Wprowadź markę pojazdu" {...register('vehicleDetails.brand')} />
            </UIGroup>
            <UIGroup header="Model pojazdu" error={errors.vehicleDetails?.model} required>
              <UIInput placeholder="Wprowadź model pojazdu" {...register('vehicleDetails.model')} />
            </UIGroup>
            <UIGroup header="Rejestracja pojazdu" error={errors.vehicleDetails?.registrationNumber} required>
              <UIInput placeholder="Wprowadź rejestrację pojazdu" {...register('vehicleDetails.registrationNumber')} />
            </UIGroup>
            <UIGroup header="Kierowca" error={errors.driver} required>
              <UISelect name="driver" placeholder="Wybierz kierowcę" options={employees} control={control} />
            </UIGroup>
            <UIGroup header="Wydarzenie" error={errors.event} required>
              <UISelect name="event" placeholder="Wybierz wydarzenie" options={events} control={control} />
            </UIGroup>
          </div>
          <div className="col-4">
            <UIGroup header="Odjazd" error={errors.departureTime} required>
              <UIInput type="datetime-local" {...register('departureTime', { valueAsDate: true })} />
            </UIGroup>
            <UIGroup header="Przyjazd" error={errors.arrivalTime}>
              <UIInput type="datetime-local" {...register('arrivalTime', { valueAsDate: true })} />
            </UIGroup>
            <UIGroup header="Miejsce odjazdu" error={errors.departureLocation} required>
              <UIInput placeholder="Wprowadź miejsce odjazdu" {...register('departureLocation')} />
            </UIGroup>
            <UIGroup header="Miejsce przyjazdu" error={errors.destinationLocation} required>
              <UIInput placeholder="Wprowadź miejsce odjazdu" {...register('destinationLocation', {})} />
            </UIGroup>
            <UIGroup header="Notatki" error={errors.notes}>
              <UITextarea rows={3} placeholder="Wprowadź opis wydarzenia" {...register('notes')} />
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
