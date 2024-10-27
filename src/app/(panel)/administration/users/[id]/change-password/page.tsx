'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { changePassword } from './actions';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';

const schema = z.object({
  password: z.string().min(8),
  confirm_password: z.string().min(8)
});

export type Schema = z.infer<typeof schema>;

type AdministrationUsersChangePasswordProps = {
  params: {
    id: string;
  };
};

export default function AdministrationUsersChangePassword({ params }: AdministrationUsersChangePasswordProps) {
  const { id } = params;
  const router = useRouter();

  const title = 'Formularz zmiany hasła użytkownika';

  const {
    register,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(form: Schema) {
    try {
      const response = await changePassword(id, form);

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
      toast.error('Wystąpił błąd podczas zmiany hasła użytkownika');
    }
  }

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/administration/users" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="user-change-password-form"
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
      <form id="user-change-password-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
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
