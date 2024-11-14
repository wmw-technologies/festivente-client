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

const schema = z.object({
  returnDate: z.any().optional().nullable(),
  serviceDate: z.date(),
  servicePerson: z.array(z.string()).min(1),
  devices: z.array(z.string()).min(1)
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
    ? `Formularz edycji urządzenia serwisowanego: ${data?._id}`
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
    if (!data) return;

    setValue(
      'servicePerson',
      data.servicePerson.map((item) => item._id)
    );
    setValue(
      'devices',
      data.devices.map((item) => item._id)
    );
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
            <UIGroup header="Data zwrotu urządzenia" error={errors.returnDate}>
              <UIInput
                type="datetime-local"
                placeholder="Wprowadź zwrotu urządzenia"
                autocomplete="name"
                {...register('returnDate', { valueAsDate: true })}
              />
            </UIGroup>
            <UIGroup header="Data serwisu" error={errors.serviceDate} required>
              <UIInput
                type="datetime-local"
                placeholder="Wprowadź datę serwisu"
                autocomplete="name"
                {...register('serviceDate', { valueAsDate: true })}
              />
            </UIGroup>
            <UIGroup header="Osoba serwisująca" error={errors.servicePerson} required>
              <UISelect
                name="servicePerson"
                placeholder="Wybierz pracownika/ów"
                multiselect
                options={employees}
                control={control}
              />
            </UIGroup>
            <UIGroup header="Urządzenia serwisowane" error={errors.devices} required>
              <UISelect
                name="devices"
                placeholder="Wybierz pracownika/ów"
                multiselect
                options={devices}
                control={control}
              />
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
