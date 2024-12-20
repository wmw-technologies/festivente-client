'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Event, Option } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UISelect from '@/src/components/UI/Select';
import UITextarea from '@/src/components/UI/Textarea';
import UIDatepicker from '@/src/components/UI/Datepicker';

const schema = z.object({
  eventName: z
    .string()
    .min(3, { message: 'Nazwa wydarzenia musi mieć co najmniej 3 znaki' })
    .max(64, { message: 'Nazwa wydarzenia może mieć maksymalnie 64 znaki' }),
  city: z
    .string()
    .min(3, { message: 'Miasto musi mieć co najmniej 3 znaki' })
    .max(64, { message: 'Miasto może mieć maksymalnie 64 znaki' }),
  location: z
    .string()
    .min(3, { message: 'Miejsce musi mieć co najmniej 3 znaki' })
    .max(64, { message: 'Miejsce może mieć maksymalnie 64 znaki' }),
  date: z.date({ message: 'Nieprawidłowa data' }),
  clientName: z
    .string()
    .min(3, { message: 'Nazwa klienta musi mieć co najmniej 3 znaki' })
    .max(64, { message: 'Nazwa klienta może mieć maksymalnie 64 znaki' }),
  clientEmail: z.string().email({ message: 'Nieprawidłowy adres e-mail' }),
  clientPhone: z
    .string()
    .min(9, { message: 'Numer telefonu musi mieć co najmniej 9 znaków' })
    .max(16, { message: 'Numer telefonu może mieć maksymalnie 16 znaków' }),
  description: z.string().max(256, { message: 'Opis może mieć maksymalnie 256 znaków' }).optional(),
  budget: z
    .number({ message: 'Wartość musi być liczbą' })
    .refine((val) => val >= 0, { message: 'Kwota musi być dodatnia' })
    .refine((val) => val <= 100000, { message: 'Kwota musi być mniejsza lub równa 100 000 PLN' }),
  assignedEmployees: z.array(z.string(), { message: 'Musi być przypisany przynajmniej jeden pracownik' }).min(1),
  estimatedHours: z
    .union([
      z.number({ message: 'Wartość musi być liczbą' }).int().min(0, { message: 'Wartość musi być dodatnia' }),
      z.nan()
    ])
    .optional(),
  actualHours: z
    .union([
      z.number({ message: 'Wartość musi być liczbą' }).int().min(0, { message: 'Wartość musi być dodatnia' }),
      z.nan()
    ])
    .optional(),
  notes: z.string().max(256, { message: 'Notatki mogą mieć maksymalnie 256 znaków' }).optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  id: string;
  isEdit: boolean;
  data: Event | null;
  employees: Option[];
};

export default function Form({ id, isEdit, data, employees }: FormProps) {
  const router = useRouter();
  const title = isEdit ? `Formularz edycji wydarzenia: ${data?.eventName}` : 'Formularz dodawania wydarzenia';

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

  const disabled = isSubmitting || data?.status === 'Pending' || data?.status === 'Completed';

  async function onSubmit(form: Schema) {
    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      if (!response?.ok) throw response;

      const eventId = response?.data?._id as any;

      router.push(`/events/${eventId}/details`);
      toast.success(response?.message);
    } catch (ex: any) {
      if (ex.status === 422 && ex?.errors) {
        Object.keys(ex?.errors).map((key) => {
          setError(key as any, { message: (ex.errors as any)[key] });
        });

        return;
      }

      toast.error('Wystąpił błąd podczas zapisywania wydarzenia');
    }
  }

  function init() {
    if (!data) return;
    setValue('eventName', data.eventName);
    setValue('city', data.city);
    setValue('clientName', data.clientName);
    setValue('clientEmail', data.clientEmail);
    setValue('clientPhone', data.clientPhone);
    setValue('date', new Date(data.date));
    setValue('description', data.description);
    setValue('location', data.location);
    setValue('budget', data.budget);
    setValue(
      'assignedEmployees',
      data.assignedEmployees?.map?.((el) => el._id)
    );
    data.estimatedHours != null && setValue('estimatedHours', data.estimatedHours);
    data.actualHours != null && setValue('actualHours', data.actualHours);
    setValue('notes', data.notes);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/events" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="events-form"
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
      <form id="events-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={disabled}>
          <div className="row">
            <div className="col-4">
              <UIGroup header="Nazwa wydarzenia" error={errors.eventName} required>
                <UIInput placeholder="Wprowadź nazwę wydarzenia" autocomplete="name" {...register('eventName')} />
              </UIGroup>
              <UIGroup header="Miasto wydarzenia" error={errors.city} required>
                <UIInput placeholder="Wprowadź miasto wydarzenia" {...register('city')} />
              </UIGroup>
              <UIGroup header="Miejsce wydarzenia" error={errors.location} required>
                <UIInput
                  placeholder="Wprowadź miejsce wydarzenia"
                  autocomplete="street-address"
                  {...register('location')}
                />
              </UIGroup>
              <UIGroup header="Data wydarzenia" error={errors.date} required>
                <UIDatepicker name="date" placeholder="Wprowadź data wydarzenia" control={control} />
              </UIGroup>
              <UIGroup header="Opis wydarzenia" error={errors.description}>
                <UITextarea rows={3} placeholder="Wprowadź opis wydarzenia" {...register('description')} />
              </UIGroup>
              <UIGroup header="Nazwa klienta" error={errors.clientName} required>
                <UIInput placeholder="Wprowadź nazwę klienta" autocomplete="name" {...register('clientName')} />
              </UIGroup>
              <UIGroup header="Email klienta" error={errors.clientEmail} required>
                <UIInput placeholder="Wprowadź email klienta" autocomplete="email" {...register('clientEmail')} />
              </UIGroup>
              <UIGroup header="Numer telefonu klienta" error={errors.clientPhone} required>
                <UIInput
                  placeholder="Wprowadź numer telefonu klienta"
                  autocomplete="tel"
                  {...register('clientPhone')}
                />
              </UIGroup>
            </div>
            <div className="col-4">
              <UIGroup header="Budżet (PLN)" error={errors.budget} required>
                <UIInput placeholder="Wprowadź budżet" type="number" {...register('budget', { valueAsNumber: true })} />
              </UIGroup>
              <UIGroup header="Pracownicy" error={errors.assignedEmployees} required>
                <UISelect
                  name="assignedEmployees"
                  placeholder="Wybierz pracowników"
                  multiselect
                  options={employees}
                  control={control}
                />
              </UIGroup>
              <UIGroup header="Przewidywany czas w godzinach" error={errors.estimatedHours}>
                <UIInput
                  type="number"
                  placeholder="Wprowadź przewidywany czas"
                  {...register('estimatedHours', { valueAsNumber: true })}
                />
              </UIGroup>
              <UIGroup header="Rzeczywisty czas w godzinach" error={errors.actualHours}>
                <UIInput
                  type="number"
                  placeholder="Wprowadź rzeczywisty czas"
                  {...register('actualHours', { valueAsNumber: true })}
                />
              </UIGroup>
              <UIGroup header="Uwagi" error={errors.notes}>
                <UITextarea rows={3} placeholder="Wprowadź uwagi" {...register('notes')} />
              </UIGroup>
            </div>
          </div>
        </fieldset>
      </form>
    </UICard>
  );
}
