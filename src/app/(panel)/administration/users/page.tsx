import { ResponseAPI, User } from '@/src/types';
import { cookies } from 'next/headers';
import { Column } from '@/src/types';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIBadge from '@/src/components/UI/Badge';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

async function fetchData() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/user/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<User[]> = await response.json();

  return data.data ?? [];
}

export default async function AdministrationUsers() {
  const data = await fetchData();

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Imię',
      item: (item: any) => <span>{(item as User).first_name || '-'}</span>
    },
    {
      id: 2,
      header: 'Nazwisko',
      item: (item: any) => <span>{(item as User).last_name || '-'}</span>
    },
    {
      id: 3,
      header: 'Email',
      item: (item: any) => <span>{(item as User).email || '-'}</span>
    },
    {
      id: 4,
      header: 'Numer telefonu',
      item: (item: any) => <span>{(item as User).phone || '-'}</span>
    },
    {
      id: 5,
      header: 'Rola',
      item: (item: any) => <UIBadge>{(item as User).role?.name || '-'}</UIBadge>
    },
    {
      id: 6,
      header: '',
      item: (item: any) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/administration/users/${item._id}`}>Edytuj</UIDropdownItem>
          <UIDropdownItem href={`/administration/users/${item._id}/change-password`}>Zmień hasło</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Lista użytkowników">
          <UIButton href="/administration/users/add" icon="PlusIcon">
            Dodaj użytkownika
          </UIButton>
        </UIPanel>
      }
      background={false}
    >
      <UITable columns={columns} data={data} />
    </UICard>
  );
}
