import { cookies } from 'next/headers';
import { Column } from '@/src/types';
import { ResponseAPI } from '@/src/types';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UITable from '@/src/components/UI/Table';

async function fetchData() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/warehouse/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<any[]> = await response.json();

  return data.data ?? [];
}

export default async function Warehouse() {
  const data = await fetchData();

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Nazwa',
      item: (item: any) => <span>{item.name}</span>
    },
    {
      id: 2,
      header: 'Producent',
      item: (item: any) => <span>{item.manufacturer}</span>
    },
    {
      id: 3,
      header: 'SKU',
      item: (item: any) => <span>{item.skuNumber}</span>
    },
    {
      id: 4,
      header: 'Kategoria',
      item: (item: any) => <span>{item.category}</span>
    },
    {
      id: 5,
      header: 'Ilość',
      item: (item: any) => <span>{item.quantity}</span>
    },
    {
      id: 6,
      header: 'Wartość wynajmu',
      item: (item: any) => <span>{item.rentalValue}</span>
    },
    {
      id: 7,
      header: 'Status',
      item: (item: any) => <span>{item.status}</span>
    },
    {
      id: 8,
      header: '',
      item: (item: any) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/warehouse/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Magazyn">
          <UIButton icon="PlusIcon" href="/warehouse/add">
            Dodaj urządzenie
          </UIButton>
        </UIPanel>
      }
      background={false}
    >
      <UITable columns={columns} data={data} />
    </UICard>
  );
}
