'use client';

import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Role } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Permissions from '@/src/permissions';
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

const permissions = [
  {
    name: 'Administracja',
    children: [
      {
        name: 'Dostęp do administracji',
        key: Permissions.ADMINISTRATION.ACCESS
      }
    ]
  },
  {
    name: 'Magazyn',
    children: [
      {
        name: 'Dostęp do magazynu',
        key: Permissions.WAREHOUSE.ACCESS
      },
      {
        name: 'Dodawanie do magazynu',
        key: Permissions.WAREHOUSE.ADD
      }
    ]
  },
  {
    name: 'Wypożyczenia',
    children: [
      {
        name: 'Dostęp do wypożyczeń',
        key: Permissions.RENTALS.ACCESS
      }
    ]
  },
  {
    name: 'Pracownicy',
    children: [
      {
        name: 'Dostęp do pracowników',
        key: Permissions.EMPLOYEES.ACCESS
      }
    ]
  },
  {
    name: 'Imprezy',
    children: [
      {
        name: 'Dostęp do imprez',
        key: Permissions.EVENTS.ACCESS
      }
    ]
  },
  {
    name: 'Transport',
    children: [
      {
        name: 'Dostęp do transportu',
        key: Permissions.TRANSPORT.ACCESS
      }
    ]
  },
  {
    name: 'Serwis',
    children: [
      {
        name: 'Dostęp do serwisu',
        key: Permissions.SERVICE.ACCESS
      }
    ]
  }
];

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
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setValue,
    setError,
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

  function assignedPermissionLengthByGroup(group: Record<string, any>) {
    return state.filter((permission: string) =>
      group.children.map((permission: any) => permission.key).includes(permission)
    ).length;
  }

  async function onSubmit(form: Schema) {
    try {
      const response = !isEdit
        ? await create({ ...form, permissions: state })
        : await update(id, { ...form, permissions: state });

      if (response?.ok) {
        router.push('/administration/roles');
        toast.success(response?.message);
      } else {
        setError('name', { message: response?.message });
      }
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
          <UIButton
            type="submit"
            form="role-form"
            disabled={(!isValid && isSubmitted) || isSubmitting}
            icon="CheckCircleIcon"
            variant="black"
          >
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
        {permissions.map((group, index) => (
          <div key={group.name} className="row">
            <div className="col-12 mb-3">
              <UIAccordion
                variant={index === 0 ? 'primary' : 'gray'}
                header={
                  <>
                    <strong>{group.name}</strong>
                    <span className="small">
                      <span>Przypisane uprawnienia: </span>
                      {assignedPermissionLengthByGroup(group)}/{group.children.length}
                    </span>
                  </>
                }
              >
                <div className={styles.permissions}>
                  {group.children.map((permission) => (
                    <div key={permission.key} className={styles.permission}>
                      <div className={styles.permissionHeader}>
                        <span className={styles.name}>{permission.name}</span>
                        <span className={styles.key}>{permission.key}</span>
                      </div>
                      <div className={styles.permissionButtons}>
                        <UIButton.Action
                          icon="PlusIcon"
                          variant="black"
                          smaller
                          active={state.includes(permission.key)}
                          onClick={() => handleAddPermission(permission.key)}
                        />
                        <UIButton.Action
                          icon="MinusIcon"
                          variant="black"
                          smaller
                          active={!state.includes(permission.key)}
                          onClick={() => handleRemovePermission(permission.key)}
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
