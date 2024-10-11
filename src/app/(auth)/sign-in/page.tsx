'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/public/logo.svg';
import styles from './page.module.scss';
import UIHeader from '@/src/components/UI/Header';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UIButton from '@/src/components/UI/Button';

export default function SignIn() {
  const router = useRouter();

  function handleSignIn() {
    router.push('/');
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" height={192} priority />
      </div>
      <div className={styles.container}>
        <form className={styles.form}>
          <UIHeader>Logowanie</UIHeader>
          <UIGroup header="Login">
            <UIInput placeholder="Wprowadź login" />
          </UIGroup>
          <UIGroup header="Hasło">
            <UIInput placeholder="Wprowadź hasło" />
          </UIGroup>
          <UIButton icon="ArrowRightOnRectangleIcon" onClick={handleSignIn}>
            Zaloguj się
          </UIButton>
        </form>
      </div>
    </div>
  );
}
