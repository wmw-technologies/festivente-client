'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Vehicle } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UIDatepicker from '@/src/components/UI/Datepicker';
import UITextarea from '@/src/components/UI/Textarea';

const schema = z.object({
  brand: z
    .string()
    .min(3, { message: 'Marka musi mieć co najmniej 3 znaki' })
    .max(64, { message: 'Marka może mieć maksymalnie 64 znaki' }),
  model: z.string().max(64, { message: 'Model może mieć maksymalnie 64 znaki' }).optional(),
  registrationNumber: z
    .string()
    .min(5, { message: 'Numer rejestracyjny musi mieć co najmniej 5 znaków' })
    .max(15, { message: 'Numer rejestracyjny może mieć maksymalnie 15 znaków' }),
  pricePerKm: z
    .number({ message: 'Wartość musi być liczbą' })
    .min(0, { message: 'Cena za kilometr musi być dodatnia' }),
  inspectionDate: z.date().optional(),
  insuranceDate: z.date().optional(),
  description: z.string().max(256, { message: 'Opis może mieć maksymalnie 256 znaków' }).optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  id: string;
  isEdit: boolean;
  data: Vehicle | null;
};

export default function Form({ id, isEdit, data }: FormProps) {
  const router = useRouter();
  const title = isEdit ? `Formularz edycji pojazdu: ${data?.registrationNumber}` : 'Formularz dodawania pojazdu';

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

      const vehicleId = response?.data?._id as any;

      router.push(`/vehicles/${vehicleId}/details`);
      toast.success(response?.message);
    } catch (ex: any) {
      if (ex.status === 422 && ex?.errors) {
        Object.keys(ex?.errors).map((key) => {
          setError(key as any, { message: (ex.errors as any)[key] });
        });

        return;
      }

      toast.error('Wystąpił błąd podczas zapisywania pojazdu');
    }
  }

  function init() {
    if (!data) return;

    setValue('brand', data.brand);
    setValue('model', data.model);
    setValue('registrationNumber', data.registrationNumber);
    setValue('pricePerKm', data.pricePerKm);
    setValue('inspectionDate', data.inspectionDate ? new Date(data.inspectionDate) : undefined);
    setValue('insuranceDate', data.insuranceDate ? new Date(data.insuranceDate) : undefined);
    setValue('description', data.description);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/vehicles" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="vehicles-form"
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
      <form id="vehicles-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <UIGroup header="Marka pojazdu" error={errors.brand} required>
              <UIInput placeholder="Wprowadź markę pojazdu" {...register('brand')} />
            </UIGroup>
            <UIGroup header="Model pojazdu" error={errors.model}>
              <UIInput placeholder="Wprowadź model pojazdu" {...register('model')} />
            </UIGroup>
            <UIGroup header="Numer rejestracyjny" error={errors.registrationNumber} required>
              <UIInput placeholder="Wprowadź numer rejestracyjny" {...register('registrationNumber')} />
            </UIGroup>
            <UIGroup header="Cena za km (PLN)" error={errors.pricePerKm} required>
              <UIInput
                type="number"
                placeholder="Wprowadź numer rejestracyjny"
                {...register('pricePerKm', { valueAsNumber: true })}
              />
            </UIGroup>
            <UIGroup header="Data przeglądu" error={errors.inspectionDate}>
              <UIDatepicker name="inspectionDate" placeholder="Wybierz datę przeglądu" control={control} />
            </UIGroup>
            <UIGroup header="Data ubezpieczenia" error={errors.insuranceDate}>
              <UIDatepicker name="insuranceDate" placeholder="Wybierz datę ubezpieczenia" control={control} />
            </UIGroup>
            <UIGroup header="Opis" error={errors.description}>
              <UITextarea rows={3} placeholder="Wprowadź opis" {...register('description')} />
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
