'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './page.module.scss';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
// import UISelect from '@/src/components/UI/Select';

const schema = z.object({
  name: z.string().min(3).max(64)
});

type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  data: any;
};

export default function Form({ isEdit, data }: FormProps) {
  const title = isEdit ? 'Formularz edycji roli' : 'Formularz dodawania roli';

  const {
    register,
    formState: { errors },
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

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/administration/roles" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton type="submit" form="role-form" icon="CheckCircleIcon" variant="black">
            Zapisz
          </UIButton>
        </UIPanel>
      }
    >
      <form id="role-form" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <UIGroup header="Nazwa roli" error={errors.name} required>
            <UIInput placeholder="Wprowadź nazwę roli" autocomplete="name" {...register('name')} />
          </UIGroup>
          {/* <UIGroup header="Nazwisko" error={errors.lastName} required>
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
          </UIGroup> */}
        </div>
        {/* <div>
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
        </div> */}
      </form>
    </UICard>
  );
}
