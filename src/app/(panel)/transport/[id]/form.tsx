'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Transport, Option } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UISelect from '@/src/components/UI/Select';
import UIInput from '@/src/components/UI/Input';
import UIDatepicker from '@/src/components/UI/Datepicker';
import UITextarea from '@/src/components/UI/Textarea';

const schema = z.object({
  vehicles: z.array(z.string()).min(1),
  event: z.string(),
  departureTime: z.date(),
  arrivalTime: z.date().optional(),
  departureLocation: z.string().min(3).max(64),
  destinationLocation: z.string().min(3).max(64),
  phoneNumber: z.string().optional(),
  notes: z.string().max(256).optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  id: string;
  isEdit: boolean;
  data: Transport | null;
  events: Option[];
  vehicles: Option[];
};

export default function Form({ id, isEdit, data, vehicles, events }: FormProps) {
  const router = useRouter();
  const title = isEdit
    ? `Formularz edycji transportu: ${data?.departureLocation} - ${data?.destinationLocation} | ${(data?.vehicles ?? []).map((v) => v.registrationNumber).join(', ')}`
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

  function init() {
    if (!data) return;
    setValue(
      'vehicles',
      data.vehicles.map((v) => v._id)
    );
    setValue('event', data.event._id);
    setValue('departureTime', new Date(data.departureTime));
    setValue('arrivalTime', data.arrivalTime ? new Date(data.arrivalTime) : undefined);
    setValue('departureLocation', data.departureLocation);
    setValue('destinationLocation', data.destinationLocation);
    setValue('phoneNumber', data.phoneNumber ?? '');
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
            <UIGroup header="Pojazd/y" error={errors.vehicles} required>
              <UISelect
                name="vehicles"
                placeholder="Wybierz typ pojazdu"
                multiselect
                options={vehicles}
                control={control}
              />
            </UIGroup>
            <UIGroup header="Wydarzenie" error={errors.event} required>
              <UISelect name="event" placeholder="Wybierz wydarzenie" options={events} control={control} />
            </UIGroup>
            <UIGroup header="Odjazd" error={errors.departureTime} required>
              <UIDatepicker name="departureTime" type="datetime" placeholder="Wybierz datę odjazu" control={control} />
            </UIGroup>
            <UIGroup header="Przyjazd" error={errors.arrivalTime}>
              <UIDatepicker name="arrivalTime" type="datetime" placeholder="Wybierz datę przyjazdu" control={control} />
            </UIGroup>
            <UIGroup header="Miejsce odjazdu" error={errors.departureLocation} required>
              <UIInput placeholder="Wprowadź miejsce odjazdu" {...register('departureLocation')} />
            </UIGroup>
            <UIGroup header="Miejsce przyjazdu" error={errors.destinationLocation} required>
              <UIInput placeholder="Wprowadź miejsce odjazdu" {...register('destinationLocation')} />
            </UIGroup>
            <UIGroup
              header="Numer telefonu do kierowcy/ów"
              error={errors.phoneNumber}
              help="Numery powinny być oddzielone przecinkiem"
            >
              <UIInput placeholder="Wprowadź numer telefonu do kierowcy/ów" {...register('phoneNumber')} />
            </UIGroup>
          </div>
          <div className="col-4">
            <UIGroup header="Notatki" error={errors.notes}>
              <UITextarea rows={3} placeholder="Wprowadź opis wydarzenia" {...register('notes')} />
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
