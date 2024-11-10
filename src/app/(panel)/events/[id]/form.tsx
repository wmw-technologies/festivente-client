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

const schema = z.object({
  eventName: z.string().min(3).max(64),
  clientName: z.string().min(3).max(64),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(9).max(16),
  date: z.string().date(),
  description: z.string().max(256).optional(),
  location: z.string().min(3).max(64),
  // budget: z.number().min(0),
  budget: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Must be a valid PLN amount (e.g., 99 or 999.99)' })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, { message: 'Amount must be positive' })
    .refine((val) => val <= 100000, { message: 'Amount must be less than or equal to 100,000 PLN' }),
  // .transform((val) => val.toFixed(2)),
  assignedEmployees: z.array(z.string()).min(1),
  estimatedHours: z.string().optional(),
  actualHours: z.string().optional(),
  notes: z.string().max(256).optional()
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

  async function onSubmit(form: Schema) {
    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      if (response?.ok) {
        router.push('/events');
        toast.success(response?.message);
      } else {
        if (response?.errors) {
          Object.keys(response?.errors).map((key) => {
            setError(key as any, { message: (response?.errors as any)[key] });
          });
        }
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas zapisywania wydarzenia');
    }
  }

  function init() {
    if (!data) return;
    setValue('eventName', data?.eventName);
    setValue('clientName', data?.clientName);
    setValue('clientEmail', data?.clientEmail);
    setValue('clientPhone', data?.clientPhone);
    setValue('date', data?.date ? data.date.toISOString().split('T')[0] : '');
    setValue('description', data?.description);
    setValue('location', data?.location);
    setValue('budget', data?.budget);
    // setValue('assignedEmployees', data?.assignedEmployees);
    // setValue('estimatedHours', data?.estimatedHours);
    // setValue('actualHours', data?.actualHours);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="row">
          <div className="col-4">
            <UIGroup header="Nazwa wydarzenia" error={errors.eventName} required>
              <UIInput placeholder="Wprowadź nazwę" autocomplete="name" {...register('eventName')} />
            </UIGroup>
            <UIGroup header="Data wydarzenia" error={errors.date} required>
              <UIInput type="date" placeholder="Wprowadź data wydarzenia" {...register('date')} />
            </UIGroup>
            <UIGroup header="Miejsce wydarzenia" error={errors.location} required>
              <UIInput placeholder="Wprowadź miejsce wydarzenia" autocomplete="name" {...register('location')} />
            </UIGroup>
            <UIGroup header="Opis wydarzenia" error={errors.description}>
              <UITextarea rows={3} placeholder="Wprowadź opis wydarzenia" {...register('description')} />
            </UIGroup>
            <UIGroup header="Nazwa klienta" error={errors.clientName} required>
              <UIInput placeholder="Wprowadź nazwę klienta" autocomplete="name" {...register('clientName')} />
            </UIGroup>
            <UIGroup header="Email klienta" error={errors.clientEmail} required>
              <UIInput placeholder="Wprowadź email klienta" autocomplete="name" {...register('clientEmail')} />
            </UIGroup>
            <UIGroup header="Numer telefonu klienta" error={errors.clientPhone} required>
              <UIInput placeholder="Wprowadź numer telefonu klienta" autocomplete="name" {...register('clientPhone')} />
            </UIGroup>
          </div>
          <div className="col-4">
            <UIGroup header="Budżet" error={errors.budget} required>
              <UIInput placeholder="Wprowadź budżet" type="number" autocomplete="name" {...register('budget')} />
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
                autocomplete="name"
                {...register('estimatedHours')}
              />
            </UIGroup>
            <UIGroup header="Rzeczywisty czas w godzinach" error={errors.actualHours}>
              <UIInput
                type="number"
                placeholder="Wprowadź rzeczywisty czas"
                autocomplete="name"
                {...register('actualHours')}
              />
            </UIGroup>
            <UIGroup header="Uwagi" error={errors.notes}>
              <UITextarea rows={3} placeholder="Wprowadź uwagi" {...register('notes')} />
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
