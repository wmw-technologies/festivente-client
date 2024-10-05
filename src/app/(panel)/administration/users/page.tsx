'use client';

import { useRouter } from 'next/navigation';
import UIHeader from '@/src/components/UI/Header';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';

export default function AdministrationUsers() {
  const router = useRouter();

  const columns = [
    {
      id: 1,
      header: 'ID',
      item: (item: any) => <span>{item.id}</span>
    },
    {
      id: 2,
      header: 'Login',
      item: (item: any) => <span>{item.login}</span>
    },
    {
      id: 3,
      header: 'Imię',
      item: (item: any) => <span>{item.name}</span>
    },
    {
      id: 4,
      header: 'Nazwisko',
      item: (item: any) => <span>{item.surname}</span>
    },
    {
      id: 5,
      header: 'Email',
      item: (item: any) => <span>{item.email || '-'}</span>
    }
  ];

  const data = [
    {
      id: 1,
      login: 'admin',
      name: 'Admin',
      surname: 'Admin',
      email: ''
    },
    {
      id: 2,
      login: 'adm3123in',
      name: 'Admasdin',
      surname: 'asd',
      email: ''
    }
  ];

  function handleAddUser() {
    router.push('/administration/users/add');
  }

  return (
    <>
      <UIHeader>Lista użytkowników</UIHeader>
      <div style={{ width: '100%', marginBottom: 8 }}></div>
      <UIButton icon="PlusIcon" onClick={handleAddUser}>
        Dodaj użytkownika
      </UIButton>
      <div style={{ width: '100%', marginBottom: 16 }}></div>
      <UITable columns={columns} data={data} />
    </>
  );
}
