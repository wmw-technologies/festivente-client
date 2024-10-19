// 'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Pager from '@/src/utils/pager';
import { cookies } from 'next/headers';
import { Column } from '@/src/types';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UIDropdown from '@/src/components/UI/Dropdown';
import UITable from '@/src/components/UI/Table';
import UIPagination from '@/src/components/UI/Pagination';

export default async function AdministrationUsers() {
  // const router = useRouter();
  // const [pager, setPager] = useState(new Pager(1, 3));

  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return null;

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/user/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data: any = await response.json();

  console.log('data', data);

  const columns: Array<Column> = [
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
    // {
    //   id: 6,
    //   header: '',
    //   item: (item: any) => (
    //     <UIDropdown icon="EllipsisVerticalIcon" smaller>
    //       <UIDropdown.Item onClick={() => handleEdit(item.id)}>Edytuj</UIDropdown.Item>
    //     </UIDropdown>
    //   ),
    //   width: 36
    // }
  ];

  // const data = [
  //   {
  //     id: 1,
  //     login: 'admin',
  //     name: 'Admin',
  //     surname: 'Admin',
  //     email: ''
  //   },
  //   {
  //     id: 2,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   },
  //   {
  //     id: 3,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   },
  //   {
  //     id: 4,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   },
  //   {
  //     id: 5,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   },
  //   {
  //     id: 6,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   },
  //   {
  //     id: 7,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   },
  //   {
  //     id: 8,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   },
  //   {
  //     id: 9,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   },
  //   {
  //     id: 10,
  //     login: 'adm3123in',
  //     name: 'Admasdin',
  //     surname: 'asd',
  //     email: ''
  //   }
  // ];
  // pager.setTotal(data.length);

  // function handleEdit(id: number) {
  //   // router.push(`/administration/users/${id}`);
  // }

  return (
    <UICard
      header={
        <UIPanel header="Lista użytkowników">
          <UIButton href="/administration/users/add" icon="PlusIcon">
            Dodaj użytkownika
          </UIButton>
        </UIPanel>
      }
      // footer={<UIPagination pager={pager} setPager={setPager} />}
      background={false}
    >
      <UITable
        columns={columns}
        // data={data.slice((pager.getPage() - 1) * pager.getPerPage(), pager.getPage() * pager.getPerPage())}
        data={[]}
      />
    </UICard>
  );
}
