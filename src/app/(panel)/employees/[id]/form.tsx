'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Employee, Column } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import { positions } from '@/src/constants';
import styles from './form.module.scss';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UISelect from '@/src/components/UI/Select';
import UITable from '@/src/components/UI/Table';

const schema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'Imię musi mieć co najmniej 3 znaki' })
    .max(64, { message: 'Imię może mieć maksymalnie 64 znaki' }),
  lastName: z
    .string()
    .min(3, { message: 'Nazwisko musi mieć co najmniej 3 znaki' })
    .max(64, { message: 'Nazwisko może mieć maksymalnie 64 znaki' }),
  email: z.string().email({ message: 'Nieprawidłowy adres e-mail' }).optional(),
  phone: z
    .string()
    .min(9, { message: 'Numer telefonu musi mieć co najmniej 9 znaków' })
    .max(16, { message: 'Numer telefonu może mieć maksymalnie 16 znaków' })
    .optional()
    .or(z.literal('')),
  position: z.string({ message: 'Stanowisko jest wymagane' }).min(1),
  dailyRate: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Musi być prawidłową kwotą PLN (np. 99 lub 999.99)' })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, { message: 'Kwota musi być dodatnia' })
    .refine((val) => val <= 100000, { message: 'Kwota musi być mniejsza lub równa 100 000 PLN' })
    .transform((val) => val.toFixed(2)),
  overtime: z.object({
    first: z
      .number({ message: 'Wartość musi być liczbą' })
      .min(0, { message: 'Wartość musi być większa lub równa 0' })
      .max(10, { message: 'Wartość musi być mniejsza lub równa 10' }),
    second: z
      .number({ message: 'Wartość musi być liczbą' })
      .min(0, { message: 'Wartość musi być większa lub równa 0' })
      .max(10, { message: 'Wartość musi być mniejsza lub równa 10' }),
    third: z
      .number({ message: 'Wartość musi być liczbą' })
      .min(0, { message: 'Wartość musi być większa lub równa 0' })
      .max(10, { message: 'Wartość musi być mniejsza lub równa 10' })
  })
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  data: Employee | null;
  id: string;
};

const overtimeData = [
  {
    id: 1,
    header: '12h - 16h'
  },
  {
    id: 2,
    header: '16h - 22h'
  },
  {
    id: 3,
    header: '22h - x'
  }
];

export default function Form({ id, isEdit, data }: FormProps) {
  const router = useRouter();
  const title = isEdit
    ? `Formularz edycji pracownika: ${data?.firstName} ${data?.lastName}`
    : 'Formularz dodawania pracownika';

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

  const overtimeColumns: Array<Column> = [
    {
      id: 1,
      item: (item) => <span className="mark">{item.header}</span>,
      width: 100
    },
    {
      id: 2,
      item: (_, index) => (
        <UIGroup error={errors.overtime?.[index === 0 ? 'first' : index === 1 ? 'second' : 'third']} nospace>
          <UIInput
            type="number"
            step={0.1}
            placeholder="Wprowadź mnożnik stawki"
            {...register(index === 0 ? 'overtime.first' : index === 1 ? 'overtime.second' : 'overtime.third', {
              valueAsNumber: true
            })}
          />
        </UIGroup>
      )
    }
  ];

  async function onSubmit(form: Schema) {
    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      if (!response?.ok) throw response;

      router.push('/employees');
      toast.success(response?.message);
    } catch (ex: any) {
      if (ex.status === 422 && ex?.errors) {
        Object.keys(ex?.errors).map((key) => {
          setError(key as any, { message: (ex.errors as any)[key] });
        });

        return;
      }

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
    setValue('overtime.first', data?.overtime?.first ?? '');
    setValue('overtime.second', data?.overtime?.second ?? '');
    setValue('overtime.third', data?.overtime?.third ?? '');
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
            <UIGroup header="Stawka dzienna (PLN)" help="Stawka dzienna = 12h" error={errors.dailyRate} required>
              <UIInput type="number" placeholder="Wprowadź stawkę dzienną" {...register('dailyRate')} />
            </UIGroup>
            <UIGroup
              header="Nadgodziny"
              help="Obliczanie stawki w przypadku kiedy dzień pracy przekroczy 12h np. dla 12h - 16h wartość mnożnika może wynosić '1.1'"
              required
            >
              <div className={styles.overtime}>
                <UITable data={overtimeData} columns={overtimeColumns} noHeader />
              </div>
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
