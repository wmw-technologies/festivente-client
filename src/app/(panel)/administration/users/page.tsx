import { ResponseAPI, Pagination, User } from '@/src/types';
import { cookies } from 'next/headers';
import { Column, Pager } from '@/src/types';
import { getPager } from '@/src/utils/pager';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIBadge from '@/src/components/UI/Badge';
import UIPagination from '@/src/components/UI/Pagination';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type AdministrationUsersProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function fetchData(pager: Pager) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(
    `${url}/user/list?page=${pager.page}&perPage=${pager.perPage}&sort=${pager.sort}&order=${pager.order}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    }
  );

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<User>> = await response.json();

  pager.total = data.data?.totalRows ?? 0;
  return data.data?.items ?? [];
}

export default async function AdministrationUsers({ searchParams }: AdministrationUsersProps) {
  const pager = getPager(searchParams);
  const data = await fetchData(pager);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Imię',
      item: (item: User) => <span>{item.first_name || '-'}</span>,
      sort: 'first_name'
    },
    {
      id: 2,
      header: 'Nazwisko',
      item: (item: User) => <span>{item.last_name || '-'}</span>,
      sort: 'last_name'
    },
    {
      id: 3,
      header: 'Email',
      item: (item: User) => <span>{item.email || '-'}</span>,
      sort: 'email'
    },
    {
      id: 4,
      header: 'Numer telefonu',
      item: (item: User) => <span>{item.phone || '-'}</span>
    },
    {
      id: 5,
      header: 'Rola',
      item: (item: User) => <UIBadge>{item.role?.name || '-'}</UIBadge>
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
      footer={<UIPagination pager={pager} />}
      background={false}
    >
      <UITable columns={columns} pager={pager} data={data} />
    </UICard>
  );
}
