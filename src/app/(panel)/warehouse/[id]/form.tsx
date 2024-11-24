'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { warehouseCategories } from '@/src/constants';
import { create, update } from './actions';
import { Warehouse } from '@/src/types';
import EditableTable from './editable-table';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UISelect from '@/src/components/UI/Select';
import UITextarea from '@/src/components/UI/Textarea';

const schema = z.object({
  name: z.string().min(3).max(64),
  manufacturer: z.string().optional(),
  skuNumber: z.string().min(1),
  rentalValue: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Must be a valid PLN amount (e.g., 99 or 999.99)' })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, { message: 'Amount must be positive' })
    .refine((val) => val <= 100000, { message: 'Amount must be less than or equal to 100,000 PLN' })
    .transform((val) => val.toFixed(2)),
  category: z.string().optional().nullable(),
  description: z.string().optional(),
  devices: z.array(
    z.object({
      _id: z.string().optional(),
      serialNumber: z.string().min(1),
      location: z.string().min(1),
      description: z.string().optional()
    })
  )
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  id: string;
  isEdit: boolean;
  data: Warehouse | null;
};

export default function Form({ id, isEdit, data }: FormProps) {
  const router = useRouter();
  const title = isEdit ? `Edytuj w magazynie: ${data?.name}` : 'Dodaj do magazynu';

  const {
    register,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    resetField,
    trigger,
    setError,
    setValue,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(form: Schema) {
    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      if (!response?.ok) throw response;

      router.push('/warehouse');
      toast.success(response?.message);
    } catch (ex: any) {
      if (ex.status === 422 && ex?.errors) {
        Object.keys(ex?.errors).map((key) => {
          setError(key as any, { message: (ex.errors as any)[key] });
        });

        return;
      }
      toast.error('Wystąpił błąd podczas zapisywania urządzenia');
    }
  }

  function init() {
    if (!data) return;

    setValue('name', data?.name);
    setValue('manufacturer', data?.manufacturer);
    setValue('skuNumber', data?.skuNumber);
    setValue('rentalValue', data?.rentalValue.toFixed(2));
    setValue('category', data?.category);
    setValue('description', data?.description);
    setValue('devices', data?.devices);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/warehouse" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="warehouse-form"
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
      <form id="warehouse-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <UIGroup header="Nazwa" error={errors.name} required>
              <UIInput placeholder="Wprowadź nazwę" {...register('name')} />
            </UIGroup>
            <UIGroup header="Producent" error={errors.manufacturer}>
              <UIInput placeholder="Wprowadź producenta" {...register('manufacturer')} />
            </UIGroup>
            <UIGroup header="Numer SKU" error={errors.skuNumber} required>
              <UIInput placeholder="Wprowadź numer SKU" {...register('skuNumber')} />
            </UIGroup>
            <UIGroup header="Wartość wyjściowa (PLN)" error={errors.rentalValue} required>
              <UIInput type="number" placeholder="Wprowadź wartość wynajmu" {...register('rentalValue')} />
            </UIGroup>
            <UIGroup header="Kategoria" error={errors.category}>
              <UISelect
                name="category"
                placeholder="Wybierz kategorię"
                options={warehouseCategories}
                control={control}
              />
            </UIGroup>
            <UIGroup header="Opis" error={errors.description}>
              <UITextarea rows={3} placeholder="Wprowadź opis" {...register('description')} />
            </UIGroup>
          </div>
          <div className="col-8">
            <EditableTable
              register={register}
              resetField={resetField}
              trigger={trigger}
              errors={errors}
              control={control}
              isSubmitted={isSubmitted}
            />
          </div>
        </div>
      </form>
    </UICard>
  );
}
