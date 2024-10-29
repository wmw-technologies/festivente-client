'use client';

import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Role } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// import { create, update } from './actions';
// import styles from './form.module.scss';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';

const schema = z.object({
  name: z.string().min(3).max(64)
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  data: Role | null;
  id: string;
};

export default function Form({ id, isEdit, data }: FormProps) {
  const router = useRouter();
  const title = isEdit ? `Formularz edycji wypożyczenia: ${data?.name}` : 'Formularz dodawania wypożyczenia';

  const {
    register,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setValue,
    setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(form: Schema) {
    try {
      // const response = !isEdit
      //   ? await create({ ...form, permissions: state })
      //   : await update(id, { ...form, permissions: state });
      // if (response?.ok) {
      //   router.push('/administration/roles');
      //   toast.success(response?.message);
      // } else {
      //   setError('name', { message: response?.message });
      // }
    } catch (error) {
      toast.error('Wystąpił błąd podczas zapisywania roli');
    }
  }

  function init() {
    // if (!data) return;
    // setValue('name', data?.name);
    // dispatch({ type: PermissionsActionKind.SET_PERMISSIONS, payload: data.permissions });
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/rentals" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="rentals-form"
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
      <form id="rentals-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <UIGroup header="Nazwa" error={errors.name} required className="col-4">
            <UIInput placeholder="Wprowadź nazwę" autocomplete="name" {...register('name')} />
          </UIGroup>
        </div>
      </form>
    </UICard>
  );
}
