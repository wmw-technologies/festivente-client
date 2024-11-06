import { cookies } from 'next/headers';
import { Column, Rental } from '@/src/types';
import { ResponseAPI, Role } from '@/src/types';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import { dashIfEmpty } from '@/src/utils/format';

async function fetchData() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/rentals/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<Rental[]> = await response.json();

  return data.data ?? [];
}

export default async function Rentals() {
  const data = await fetchData();

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Nazwa firmy',
      item: (item: Rental) => <span>{dashIfEmpty(item.companyName)}</span>
    },
    {
      id: 2,
      header: 'Data wypożyczenia',
      item: (item: Rental) => <span>{new Date(item.startDate).toLocaleDateString()}</span>
    },
    {
      id: 3,
      header: 'Data zwrotu',
      item: (item: Rental) => <span>{new Date(item.endDate).toLocaleDateString()}</span>
    },
    {
      id: 4,
      header: 'Wartość',
      item: (item: Rental) => <span>{dashIfEmpty(item.price)}</span>
    },
    {
      id: 5,
      header: 'Zakończone',
      item: (item: Rental) => <span>{item.ended ? 'Tak' : 'Nie'}</span>
    },
    {
      id: 6,
      header: '',
      item: (item: Rental) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/rentals/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Lista wypożyczeń">
          <UIButton href="/rentals/add" icon="PlusIcon">
            Dodaj wypożyczenie
          </UIButton>
        </UIPanel>
      }
      background={false}
    >
      <UITable columns={columns} data={data} />
    </UICard>
  );
}
