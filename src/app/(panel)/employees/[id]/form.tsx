'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Employee } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import { positions } from '@/src/constants';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UISelect from '@/src/components/UI/Select';

const schema = z.object({
  firstName: z.string().min(3).max(64),
  lastName: z.string().min(3).max(64),
  email: z.string().email().optional(),
  phone: z.string().min(9).max(16).optional().or(z.literal('')),
  position: z.string(),
  dailyRate: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Must be a valid PLN amount (e.g., 99 or 999.99)' })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, { message: 'Amount must be positive' })
    .refine((val) => val <= 100000, { message: 'Amount must be less than or equal to 100,000 PLN' })
    .transform((val) => val.toFixed(2))
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  data: Employee | null;
  id: string;
};

export default function Form({ id, isEdit, data }: FormProps) {
  const router = useRouter();
  const title = isEdit
    ? `Formularz edycji pracownika: ${data?.firstName} ${data?.lastName}`
    : 'Formularz dodawania pracownika';

  const {
    register,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    watch,
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
        router.push('/employees');
        toast.success(response?.message);
      } else {
        if (response?.errors) {
          Object.keys(response?.errors).map((key) => {
            setError(key as any, { message: (response?.errors as any)[key] });
          });
        }
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas zapisywania roli');
    }
  }

  function init() {
    if (!data) return;
    setValue('firstName', data?.firstName);
    setValue('lastName', data?.lastName);
    setValue('email', data?.email);
    setValue('phone', data?.phone ?? '');
    setValue('position', data?.position);
    setValue('dailyRate', data?.dailyRate?.toFixed?.(2) ?? '');
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/employees" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="employees-form"
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
      <form id="employees-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <UIGroup header="Imię" error={errors.firstName} required>
              <UIInput placeholder="Wprowadź imię" autocomplete="name" {...register('firstName')} />
            </UIGroup>
            <UIGroup header="Nazwisko" error={errors.lastName} required>
              <UIInput placeholder="Wprowadź nazwisko" autocomplete="family-name" {...register('lastName')} />
            </UIGroup>
            <UIGroup header="Email" error={errors.email} required>
              <UIInput placeholder="Wprowadź email" autocomplete="email" {...register('email')} />
            </UIGroup>
            <UIGroup header="Numer telefonu" error={errors.phone}>
              <UIInput type="tel" placeholder="Wprowadź numer telefonu" autocomplete="tel" {...register('phone')} />
            </UIGroup>
            <UIGroup header="Stanowisko" error={errors.position} required>
              <UISelect name="position" placeholder="Wybierz stanowisko" options={positions} control={control} />
            </UIGroup>
            <UIGroup header="Stawka dzienna (PLN)" error={errors.dailyRate} required>
              <UIInput type="number" placeholder="Wprowadź stawkę dzienną" {...register('dailyRate')} />
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
