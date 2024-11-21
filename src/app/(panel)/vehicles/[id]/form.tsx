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
  registrationNumber: z.string().min(5).max(15),
  pricePerKm: z.number().min(0),
  inspectionDate: z.date().optional(),
  insuranceDate: z.date().optional(),
  description: z.string().max(256).optional()
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
    watch,
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

      router.push('/vehicles');
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
