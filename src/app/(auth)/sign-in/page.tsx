'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from '@/src/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import Image from 'next/image';
import logo from '@/public/logo.svg';
import styles from './page.module.scss';
import UIHeader from '@/src/components/UI/Header';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UIButton from '@/src/components/UI/Button';

const schema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8)
});

export type Schema = z.infer<typeof schema>;

export default function SignIn() {
  const {
    register,
    formState: { errors, isValid, isSubmitting, isSubmitted },
    setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  const router = useRouter();

  async function onSubmit(form: Schema) {
    try {
      const response = await signIn(form);

      if (!response.ok) throw response;

      toast.success(response.message);
      router.push('/dashboard');
    } catch (ex: any) {
      if (ex.status === 401) {
        if (ex?.errors) {
          for (const error in ex.errors) {
            setError(error as keyof Schema, { type: 'validate', message: ex.errors[error] });
          }
        }

        return;
      }

      toast.error('Wystąpił błąd podczas logowania');
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" height={120} priority />
      </div>
      <div className={styles.container}>
        <UIHeader>Logowanie</UIHeader>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <UIGroup header="Email" error={errors.email} required>
            <UIInput type="email" placeholder="Wprowadź email" autocomplete="email" {...register('email')} />
          </UIGroup>
          <UIGroup header="Hasło" error={errors.password ?? errors.root} required>
            <UIInput
              type="password"
              placeholder="Wprowadź hasło"
              autocomplete="current-password"
              {...register('password')}
            />
          </UIGroup>
          <UIButton
            type="submit"
            disabled={!isValid && isSubmitted}
            loading={isSubmitting}
            icon="ArrowRightOnRectangleIcon"
          >
            Zaloguj się
          </UIButton>
        </form>
      </div>
    </div>
  );
}
