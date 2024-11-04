'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { create, update } from './actions';
import { Option, Warehouse } from '@/src/types';
import EditableTable from './editable-table';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UISelect from '@/src/components/UI/Select';
import UITextarea from '@/src/components/UI/Textarea';
import UITogglebox from '@/src/components/UI/Togglebox';

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
  category: z.string().optional(),
  description: z.string().optional(),
  isSerialTracked: z.boolean().optional(),
  devices: z.array(
    z.object({
      _id: z.string().optional(),
      serialNumber: z.string().min(1).optional(),
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
  categories: Array<Option>;
};

export default function Form({ id, isEdit, data, categories }: FormProps) {
  const router = useRouter();
  const [isSerialTracked, setIsSerialTracked] = useState<boolean | undefined>(false);

  const itemSchema = !isSerialTracked
    ? schema.omit({ devices: true }).extend({
        devices: z.array(
          z.object({
            _id: z.string().optional(),
            location: z.string().min(1),
            description: z.string().optional()
          })
        )
      })
    : schema;
  const title = isEdit ? `Edytuj w magazynie: ${data?.name}` : 'Dodaj do magazynu';

  const {
    register,
    watch,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    resetField,
    trigger,
    setError,
    setValue,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(itemSchema)
  });

  async function onSubmit(form: Schema) {
    console.log('form', form);
    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      console.log('response', response);

      if (response?.ok) {
        router.push('/warehouse');
        toast.success(response?.message);
      } else {
        if (response?.errors) {
          Object.keys(response?.errors).map((key) => {
            console.log('key', key);
            setError(key as any, { message: (response?.errors as any)[key] });
          });
        }
      }
    } catch (error) {
      toast.error('Error saving the device');
    }
  }

  function init() {
    console.log('data', data);
    if (!data) return;

    setValue('name', data?.name);
    setValue('manufacturer', data?.manufacturer);
    setValue('skuNumber', data?.skuNumber);
    setValue('rentalValue', data?.rentalValue.toFixed(2));
    setValue('category', data?.category);
    setValue('description', data?.description);
    setValue('isSerialTracked', data?.isSerialTracked);
    setValue('devices', data?.devices);
  }

  useEffect(() => {
    setIsSerialTracked(watch('isSerialTracked', data?.isSerialTracked || false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('isSerialTracked', data?.isSerialTracked || false)]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <UISelect name="category" placeholder="Wybierz kategorię" options={categories} control={control} />
            </UIGroup>
            <UIGroup header="Opis" error={errors.description}>
              <UITextarea placeholder="Wprowadź opis" {...register('description')} />
            </UIGroup>
            <UIGroup header="Występowanie numerów seryjnych" error={errors.isSerialTracked}>
              <UITogglebox {...register('isSerialTracked')} />
            </UIGroup>
          </div>
          <div className="col-8">
            <EditableTable
              register={register}
              resetField={resetField}
              trigger={trigger}
              errors={errors}
              control={control}
              isSerialTracked={isSerialTracked}
              isSubmitted={isSubmitted}
            />
          </div>
        </div>
      </form>
    </UICard>
  );
}
