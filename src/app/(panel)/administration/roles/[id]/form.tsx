'use client';

import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Role } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Permissions from '@/src/permissions';
import { Permission } from '@/src/types';
import { create, update } from './actions';
import styles from './form.module.scss';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UIAccordion from '@/src/components/UI/Accordion';

const schema = z.object({
  name: z.string().min(3).max(64)
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  data: Role | null;
  id: string;
};

enum PermissionsActionKind {
  ADD_PERMISSION = 'ADD_PERMISSION',
  REMOVE_PERMISSION = 'REMOVE_PERMISSION',
  SET_PERMISSIONS = 'SET_PERMISSIONS'
}

interface PermissionsAction {
  type: PermissionsActionKind;
  payload: string | string[];
}

type PermissionsState = string[];

function permissionsReducer(state: PermissionsState, action: PermissionsAction): PermissionsState {
  switch (action.type) {
    case PermissionsActionKind.ADD_PERMISSION: {
      if (typeof action.payload === 'string' && state.includes(action.payload)) return state;
      return [...state, action.payload as string];
    }
    case PermissionsActionKind.REMOVE_PERMISSION:
      return state.filter((permission: string) => permission !== action.payload);
    case PermissionsActionKind.SET_PERMISSIONS:
      return action.payload as string[];
    default:
      return state;
  }
}

export default function Form({ id, isEdit, data }: FormProps) {
  const [state, dispatch] = useReducer(permissionsReducer, []);
  const router = useRouter();
  const title = isEdit ? 'Formularz edycji roli' : 'Formularz dodawania roli';

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  function handleAddPermission(permission: string) {
    dispatch({ type: PermissionsActionKind.ADD_PERMISSION, payload: permission });
  }

  function handleRemovePermission(permission: string) {
    dispatch({ type: PermissionsActionKind.REMOVE_PERMISSION, payload: permission });
  }

  function assignedPermissionLengthByGroup(permission: Permission) {
    const permissions = Object.entries(permission)
      .filter(([subKey]) => subKey !== 'NAME' && subKey !== 'KEY')
      .map(([_, subPermission]) => (subPermission as Permission).KEY);

    return state.filter((permission: string) => permissions.includes(permission)).length;
  }

  function allPermissionsLengthByGroup(permission: Permission) {
    return Object.entries(permission).filter(([subKey]) => subKey !== 'NAME' && subKey !== 'KEY').length;
  }

  async function onSubmit(form: Schema) {
    try {
      if (!isEdit) {
        const response = await create({ ...form, permissions: state });
        toast.success(response?.message);

        console.log('response created', response);
      } else {
        const response = await update(id, { ...form, permissions: state });
        toast.success(response?.message);

        console.log('response updated', response);
      }

      router.push('/administration/roles');
    } catch (error) {
      toast.error('Wystąpił błąd podczas zapisywania roli');
    }
  }

  function init() {
    if (!data) return;
    setValue('name', data?.name);
    dispatch({ type: PermissionsActionKind.SET_PERMISSIONS, payload: data.permissions });
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/administration/roles" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton type="submit" form="role-form" disabled={isSubmitting} icon="CheckCircleIcon" variant="black">
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
        {Object.entries(Permissions).map(([key, permission]: [string, Permission], index) => (
          <div key={key} className="row">
            <div className="col-12 mb-3">
              <UIAccordion
                variant={index === 0 ? 'primary' : 'gray'}
                header={
                  <>
                    <strong>{permission.NAME}</strong>
                    <span className="small">
                      <span>Przypisane uprawnienia: </span>
                      {assignedPermissionLengthByGroup(permission)}/{allPermissionsLengthByGroup(permission)}
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
                          <UIButton.Action
                            icon="PlusIcon"
                            variant="black"
                            smaller
                            active={state.includes(subPermission.KEY)}
                            onClick={() => handleAddPermission(subPermission.KEY)}
                          />
                          <UIButton.Action
                            icon="MinusIcon"
                            variant="black"
                            smaller
                            active={!state.includes(subPermission.KEY)}
                            onClick={() => handleRemovePermission(subPermission.KEY)}
                          />
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
