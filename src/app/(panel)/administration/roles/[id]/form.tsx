'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Permissions from '@/src/permissions';
import styles from './page.module.scss';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UIAccordion from '@/src/components/UI/Accordion';

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
      <form id="role-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <UIGroup header="Nazwa roli" error={errors.name} required className="col-4">
            <UIInput placeholder="Wprowadź nazwę roli" autocomplete="name" {...register('name')} />
          </UIGroup>
        </div>
        {Object.entries(Permissions).map(([key, permission]: [string, any], index) => (
          <div key={key} className="row">
            <div className="col-12 mb-3">
              <UIAccordion
                variant={index === 0 ? 'primary' : 'gray'}
                header={
                  <>
                    <strong>{permission.NAME}</strong>
                    <span className="small">
                      Przypisane uprawnienia: 0/
                      {Object.entries(permission).filter(([subKey]) => subKey !== 'NAME' && subKey !== 'KEY').length}
                    </span>
                  </>
                }
              >
                <div className={styles.permissions}>
                  {Object.entries(permission)
                    .filter(([subKey]) => subKey !== 'NAME' && subKey !== 'KEY')
                    .map(([subKey, subPermission]: [string, any]) => (
                      <div key={subKey} className={styles.permission}>
                        <div className={styles.permissionHeader}>
                          <span className={styles.name}>{subPermission.NAME}</span>
                          <span className={styles.key}>{subPermission.KEY}</span>
                        </div>
                        <div className={styles.permissionButtons}>
                          <UIButton icon="PlusIcon" variant="black" />
                          <UIButton icon="MinusIcon" variant="black" />
                        </div>
                      </div>
                    ))}
                </div>
              </UIAccordion>
            </div>
          </div>
        ))}
      </form>
    </UICard>
  );
}
