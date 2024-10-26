'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@/src/types';
import styles from './page.module.scss';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UISelect from '@/src/components/UI/Select';

const schema = z.object({
  firstName: z.string().min(3).max(64),
  lastName: z.string().min(3).max(64),
  email: z.string().email().trim(),
  phone: z.string().min(9).max(16).optional(),
  password: z.string().min(8),
  repeatPassword: z.string().min(8),
  // role: z.string().refine((value) => ['user', 'admin'].includes(value))
  role: z.string()
});

type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  data: User | null;
  id: string;
};

const roles = [
  { text: 'Użytkownik', value: 'user' },
  { text: 'Administrator', value: 'admin' }
];

export default function Form({ id, isEdit, data }: FormProps) {
  const title = isEdit ? 'Formularz edycji użytkownika' : 'Formularz dodawania użytkownika';

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(form: Schema) {
    try {
      console.log('form', form);
    } catch (error) {
      console.log('error', error);
    }
  }

  function init() {
    if (!data) return;
    // setValue('firstName', data?.name);
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
          <UIButton type="submit" form="user-form" icon="CheckCircleIcon" variant="black">
            Zapisz
          </UIButton>
        </UIPanel>
      }
    >
      <form id="user-form" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <UIGroup header="Imię" error={errors.firstName} required>
            <UIInput placeholder="Wprowadź imię" autocomplete="name" {...register('firstName')} />
          </UIGroup>
          <UIGroup header="Nazwisko" error={errors.lastName} required>
            <UIInput placeholder="Wprowadź nazwisko" autocomplete="family-name" {...register('lastName')} />
          </UIGroup>
          <UIGroup header="Email" error={errors.email} required>
            <UIInput placeholder="Wprowadź email" autocomplete="email" {...register('email')} />
          </UIGroup>
          <UIGroup header="Numer telefonu" error={errors.phone}>
            <UIInput placeholder="Wprowadź numer telefonu" autocomplete="tel" {...register('phone')} />
          </UIGroup>
          <UIGroup header="Rola" nospace error={errors.role} required>
            <UISelect placeholder="Wybierz rolę" options={roles} {...register('role')} />
          </UIGroup>
        </div>
        <div>
          <UIGroup header="Hasło" error={errors.password} required>
            <UIInput
              placeholder="Wprowadź hasło"
              type="password"
              autocomplete="new-password"
              {...register('password')}
            />
          </UIGroup>
          <UIGroup header="Powtórz hasło" error={errors.repeatPassword} required>
            <UIInput
              placeholder="Wprowadź powtórz hasło"
              type="password"
              autocomplete="new-password"
              {...register('repeatPassword')}
            />
          </UIGroup>
        </div>
      </form>
    </UICard>
  );
}
