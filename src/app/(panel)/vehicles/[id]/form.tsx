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
// import UISelect from '@/src/components/UI/Select';
import UITextarea from '@/src/components/UI/Textarea';

const schema = z.object({
  registrationNumber: z.string().min(5).max(15),
  // deviceType: z.string().min(1).max(15),
  pricePerKm: z.number().min(0),
  inspectionDate: z.string().datetime(),
  insuranceDate: z.string().datetime(),
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
  const title = isEdit ? `Formularz edycji pojazdu: ${data?._id}` : 'Formularz dodawania pojazdu';

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
    setValue('registrationNumber', data.registrationNumber);
    setValue('pricePerKm', data.pricePerKm);
    setValue('inspectionDate', data.inspectionDate);
    setValue('insuranceDate', data.insuranceDate);
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
            {/* <UIGroup header="Kategoria prawa jazdy" error={errors.deviceType} required>
              <UIInput
                type="number"
                placeholder="Wprowadź numer rejestracyjny"
                {...register('pricePerKm', { valueAsNumber: true })}
              />
            </UIGroup> */}
            <UIGroup header="Cena za km (PLN)" error={errors.pricePerKm} required>
              <UIInput
                type="number"
                placeholder="Wprowadź numer rejestracyjny"
                {...register('pricePerKm', { valueAsNumber: true })}
              />
            </UIGroup>
            <UIGroup header="Data przeglądu" error={errors.inspectionDate}>
              <UIInput placeholder="Wprowadź " {...register('inspectionDate')} />
            </UIGroup>
            <UIGroup header="Data ubezpieczenia" error={errors.insuranceDate}>
              <UIInput placeholder="Wprowadź numer rejestracyjny" {...register('insuranceDate')} />
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
