'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Option, WarehouseItem } from '@/src/types';
import { create, update } from './actions';
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
  model: z.string().optional(),
  // quantity: z.number().min(1),
  // serialNumbers: z.array(z.string()),
  skuNumber: z.string().min(1),
  rentalValue: z.number().min(0),
  // location: z.string().min(1),
  // warrantyEndDate: z.date().optional(),
  category: z.string().optional(),
  description: z.string().optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  id: string;
  isEdit: boolean;
  data: WarehouseItem | null;
  categories: Array<Option>;
};

export default function Form({ id, isEdit, data, categories }: FormProps) {
  const router = useRouter();
  const itemSchema = schema;
  const title = isEdit ? `Edytuj urządzenie: ${data?.name}` : 'Dodaj urządzenie';

  const {
    register,
    watch,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setValue,
    setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(itemSchema)
  });

  // const quantity = watch('quantity', data?.quantity || 1);
  // const [serialNumbers, setSerialNumbers] = useState<string[]>(Array(quantity).fill(''));

  // useEffect(() => {
  //   setSerialNumbers(Array(quantity).fill(''));
  // }, [quantity]);

  async function onSubmit(form: Schema) {
    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      if (response?.ok) {
        router.push('/warehouse');
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
    if (!data) return;
    setValue('name', data?.name);
    setValue('manufacturer', data?.manufacturer);
    setValue('model', data?.model);
    // setValue('quantity', data?.quantity);
    // setValue('serialNumbers', data.serialNumbers);
    setValue('skuNumber', data?.skuNumber);
    setValue('rentalValue', data?.rentalValue);
    // setValue('location', data?.location);
    // setValue('warrantyEndDate', data?.warrantyEndDate);
    setValue('category', data?.category);
    setValue('description', data?.description);
  }

  useEffect(() => {
    init();
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
            form="item-form"
            disabled={(!isValid && isSubmitted) || isSubmitting}
            icon="CheckCircleIcon"
            variant="black"
          >
            Zapisz
          </UIButton>
        </UIPanel>
      }
    >
      <form id="item-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <UIGroup header="Nazwa" error={errors.name} required>
              <UIInput placeholder="Wprowadź nazwę" {...register('name')} />
            </UIGroup>
            <UIGroup header="Producent" error={errors.manufacturer}>
              <UIInput placeholder="Wprowadź producenta" {...register('manufacturer')} />
            </UIGroup>
            <UIGroup header="Model" error={errors.model}>
              <UIInput placeholder="Wprowadź model" {...register('model')} />
            </UIGroup>
            {/* <UIGroup header="Ilość" error={errors.quantity} required>
              <UIInput type="number" placeholder="Wprowadź ilość" {...register('quantity')} />
            </UIGroup> */}
            <UIGroup header="Numer SKU" error={errors.skuNumber} required>
              <UIInput placeholder="Wprowadź numer SKU" {...register('skuNumber')} />
            </UIGroup>
            {/* {Array.from({ length: quantity }).map((_, index) => (
              <UIGroup key={index} header={`Numer seryjny ${index + 1}`} error={errors.serialNumbers?.[index]} required>
                <UIInput placeholder={`Wprowadź numer seryjny ${index + 1}`} {...register(`serialNumbers.${index}`)} />
              </UIGroup>
            ))} */}
            <UIGroup header="Wartość wynajmu" error={errors.rentalValue} required>
              <UIInput type="number" placeholder="Wprowadź wartość wynajmu" {...register('rentalValue')} />
            </UIGroup>
            {/* <UIGroup header="Lokalizacja" error={errors.location} required>
              <UIInput placeholder="Wprowadź lokalizację" {...register('location')} />
            </UIGroup> */}
            {/* <UIGroup header="Data końca gwarancji" error={errors.warrantyEndDate}>
              <UIInput type="date" placeholder="Wprowadź datę końca gwarancji" {...register('warrantyEndDate')} />
            </UIGroup> */}
            <UIGroup header="Kategoria" error={errors.category}>
              <UISelect name="category" placeholder="Wybierz kategorię" options={categories} control={control} />
            </UIGroup>
            <UIGroup header="Opis" error={errors.description}>
              <UITextarea placeholder="Wprowadź opis" {...register('description')} />
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
