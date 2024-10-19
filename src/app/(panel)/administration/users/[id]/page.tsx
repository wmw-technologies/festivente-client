'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './page.module.scss';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UISelect from '@/src/components/UI/Select';

const schema = z.object({
  username: z.string().min(3).max(64),
  firstName: z.string().min(3).max(64),
  lastName: z.string().min(3).max(64),
  email: z.string().email().trim(),
  password: z.string().min(8),
  repeatPassword: z.string().min(8)
});

type Schema = z.infer<typeof schema>;

export default function AdministrationUsersForm() {
  const {
    register,
    formState: { errors },
    // setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  const router = useRouter();

  function handleBack() {
    router.back();
  }

  async function onSubmit(form: Schema) {
    try {
      console.log('form', form);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <UICard
      header={
        <UIPanel header="Formularz dodawania użytkownika">
          <UIButton icon="ArrowLongLeftIcon" variant="gray" onClick={handleBack}>
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
          <UIGroup header="Rola" nospace required>
            <UISelect placeholder="Wprowadź email" />
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
