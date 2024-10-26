'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@/src/types';
import toast from 'react-hot-toast';
import { create, update } from './actions';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UISelect from '@/src/components/UI/Select';

const schema = z.object({
  first_name: z.string().min(3).max(64),
  last_name: z.string().min(3).max(64),
  email: z.string().email().trim(),
  phone: z.string().min(9).max(16).optional(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
  role: z.string().min(1, { message: 'Wybierz rolę' })
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  id: string;
  isEdit: boolean;
  data: User | null;
  roles: any;
};

export default function Form({ id, isEdit, data, roles }: FormProps) {
  const router = useRouter();
  const title = isEdit ? 'Formularz edycji użytkownika' : 'Formularz dodawania użytkownika';

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
      const response = !isEdit ? await create(form) : await update(id, form);

      if (response?.ok) {
        router.push('/administration/users');
        toast.success(response?.message);
      } else {
        if (response?.errors) {
          Object.keys(response?.errors).map((key) => {
            setError(key as any, { message: (response?.errors as any)[key] });
          });
        }
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas zapisywania użytkownika');
    }
  }

  function init() {
    if (!data) return;
    setValue('first_name', data?.first_name);
    setValue('last_name', data?.last_name);
    setValue('email', data?.email);
    setValue('phone', data?.phone);
    setValue('role', data?.role?._id);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/administration/users" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="user-form"
            disabled={(!isValid && isSubmitted) || isSubmitting}
            icon="CheckCircleIcon"
            variant="black"
          >
            Zapisz
          </UIButton>
        </UIPanel>
      }
    >
      <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <UIGroup header="Imię" error={errors.first_name} required>
              <UIInput placeholder="Wprowadź imię" autocomplete="name" {...register('first_name')} />
            </UIGroup>
            <UIGroup header="Nazwisko" error={errors.last_name} required>
              <UIInput placeholder="Wprowadź nazwisko" autocomplete="family-name" {...register('last_name')} />
            </UIGroup>
            <UIGroup header="Email" error={errors.email} required>
              <UIInput placeholder="Wprowadź email" disabled={isEdit} autocomplete="email" {...register('email')} />
            </UIGroup>
            <UIGroup header="Numer telefonu" error={errors.phone}>
              <UIInput type="tel" placeholder="Wprowadź numer telefonu" autocomplete="tel" {...register('phone')} />
            </UIGroup>
            <UIGroup header="Rola" nospace error={errors.role} required>
              <UISelect placeholder="Wybierz rolę" options={roles} {...register('role')} />
            </UIGroup>
          </div>
          <div className="col-4">
            <UIGroup header="Hasło" error={errors.password} required>
              <UIInput
                placeholder="Wprowadź hasło"
                type="password"
                autocomplete="new-password"
                {...register('password')}
              />
            </UIGroup>
            <UIGroup header="Powtórz hasło" error={errors.confirm_password} required>
              <UIInput
                placeholder="Wprowadź powtórz hasło"
                type="password"
                autocomplete="new-password"
                {...register('confirm_password')}
              />
            </UIGroup>
          </div>
        </div>
      </form>
    </UICard>
  );
}
