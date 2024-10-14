'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

type Schema = z.infer<typeof schema>;

export default function SignIn() {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });
  const router = useRouter();

  async function onSubmit(form: Schema) {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        // localStorage.setItem('token', json.token);
        router.push('/dashboard');
      } else {
        setError('password', { message: data.message });
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" height={80} priority />
      </div>
      <div className={styles.container}>
        <UIHeader>Logowanie</UIHeader>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <UIGroup header="Email" error={errors.email} required>
            <UIInput placeholder="Wprowadź email" {...register('email')} />
          </UIGroup>
          <UIGroup header="Hasło" error={errors.password} required>
            <UIInput type="password" placeholder="Wprowadź hasło" {...register('password')} />
          </UIGroup>
          <UIButton type="submit" icon="ArrowRightOnRectangleIcon">
            Zaloguj się
          </UIButton>
        </form>
      </div>
    </div>
  );
}
