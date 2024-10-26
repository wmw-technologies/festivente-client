import { cookies } from 'next/headers';
import { Column } from '@/src/types';
import { ResponseAPI, Role } from '@/src/types';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

async function fetchData() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/role/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<Role[]> = await response.json();

  return data.data ?? [];
}

export default async function AdministrationRoles() {
  const data = await fetchData();

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Nazwa',
      item: (item) => <span>{(item as Role).name}</span>,
      sortable: true
    },
    {
      id: 2,
      header: '',
      item: (item: any) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/administration/roles/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Lista roli">
          <UIButton href="/administration/roles/add" icon="PlusIcon">
            Dodaj rolę
          </UIButton>
        </UIPanel>
      }
      background={false}
    >
      <UITable columns={columns} data={data} />
    </UICard>
  );
}
