'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';

export default function AdministrationUsersForm() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <UICard
      header={
        <UIPanel header="Formularz dodawania użytkownika">
          <UIButton icon="ArrowLongLeftIcon" variant="gray" onClick={handleBack}>
            Powrót
          </UIButton>
          <UIButton icon="CheckCircleIcon" variant="black">
            Zapisz
          </UIButton>
        </UIPanel>
      }
    >
      <form className={styles.form}>
        <div>
          <UIGroup header="Nazwa użytkownika" required>
            <UIInput placeholder="Wprowadź nazwę użytkownika" />
          </UIGroup>
          <UIGroup header="Imię" required>
            <UIInput placeholder="Wprowadź imię" />
          </UIGroup>
          <UIGroup header="Nazwisko" required>
            <UIInput placeholder="Wprowadź nazwisko" />
          </UIGroup>
          <UIGroup header="Email" nospace required>
            <UIInput placeholder="Wprowadź email" />
          </UIGroup>
        </div>
        <div>
          <UIGroup header="Hasło" required>
            <UIInput placeholder="Wprowadź hasło" type="password" />
          </UIGroup>
          <UIGroup header="Powtórz hasło" required>
            <UIInput placeholder="Wprowadź powtórz hasło" type="password" />
          </UIGroup>
        </div>
      </form>
    </UICard>
  );
}
