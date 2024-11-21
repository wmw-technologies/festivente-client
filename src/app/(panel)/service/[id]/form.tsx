'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Service, Option } from '@/src/types';
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
import UIDatepicker from '@/src/components/UI/Datepicker';
import UITextarea from '@/src/components/UI/Textarea';

const schema = z.object({
  returnDate: z.date(),
  serviceDate: z.date().optional(),
  repairPrice: z.number().min(0).optional(),
  servicePerson: z.string().optional(),
  device: z.string(),
  description: z.string().max(256).optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  id: string;
  isEdit: boolean;
  data: Service | null;
  employees: Option[];
  devices: Option[];
};

export default function Form({ id, isEdit, data, employees, devices }: FormProps) {
  const router = useRouter();
  const title = isEdit
    ? `Formularz edycji urządzenia serwisowanego: ${data?.device?.warehouseId}`
    : 'Formularz dodawania urządzenia w serwisie';

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
      console.log('form', form);
      const response = !isEdit ? await create(form) : await update(id, form);

      if (!response?.ok) throw response;

      router.push('/service');
      toast.success(response.message);
    } catch (ex: any) {
      if (ex.status === 422 && ex?.errors) {
        Object.keys(ex?.errors).map((key) => {
          setError(key as any, { message: (ex.errors as any)[key] });
        });

        return;
      }

      toast.error('Wystąpił błąd podczas zapisywania serwisu');
    }
  }

  function init() {
    if (!data) {
      setValue('returnDate', new Date());
      return;
    }

    setValue('returnDate', new Date(data.returnDate));
    setValue('serviceDate', data.serviceDate ? new Date(data.serviceDate) : undefined);
    setValue('repairPrice', data.repairPrice);
    setValue('servicePerson', data.servicePerson?._id);
    setValue('device', data.device?._id);
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
          <UIButton href="/service" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="service-form"
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
      <form id="service-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <UIGroup header="Data przyjęcia urządzenia" error={errors.returnDate} required>
              <UIDatepicker
                name="returnDate"
                type="datetime"
                placeholder="Wybierz datę przyjęcia urządzenia"
                control={control}
              />
            </UIGroup>
            <UIGroup header="Data zakończenia serwisu" error={errors.serviceDate}>
              <UIDatepicker
                name="serviceDate"
                type="datetime"
                placeholder="Wybierz datę zakończenia serwisu"
                control={control}
              />
            </UIGroup>
            <UIGroup header="Koszt naprawy (PLN)" error={errors.repairPrice}>
              <UIInput
                placeholder="Wprowadź koszt naprawy"
                type="number"
                {...register('repairPrice', { setValueAs: (v) => (v ? parseFloat(v) : undefined) })}
              />
            </UIGroup>
            <UIGroup header="Osoba serwisująca" error={errors.servicePerson}>
              <UISelect
                name="servicePerson"
                placeholder="Wybierz osobę serwisującą"
                options={employees}
                control={control}
              />
            </UIGroup>
            <UIGroup header="Urządzenie serwisowane" error={errors.device} required>
              <UISelect
                name="device"
                placeholder="Wybierz urządzenie serwisowane"
                options={devices}
                control={control}
              />
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
