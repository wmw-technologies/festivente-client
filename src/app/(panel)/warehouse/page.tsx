import { cookies } from 'next/headers';
import { Column } from '@/src/types';
import { ResponseAPI, Warehouse } from '@/src/types';
import { warehouseCategories, warehouseStatuses } from '@/src/constants';
import { formatCurrency, dashIfEmpty } from '@/src/utils/format';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UITable from '@/src/components/UI/Table';
import UIBadge from '@/src/components/UI/Badge';

function getCategoryName(value?: string) {
  return warehouseCategories.find((item) => item.value === value)?.text ?? '';
}

function getStatusName(value?: string) {
  return warehouseStatuses.find((item) => item.value === value)?.text ?? '';
}

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

  const data: ResponseAPI<Warehouse[]> = await response.json();

  return data.data ?? [];
}

export default async function Page() {
  const data = await fetchData();

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Nazwa',
      item: (item: Warehouse) => <span>{dashIfEmpty(item.name)}</span>
    },
    {
      id: 2,
      header: 'Producent',
      item: (item: Warehouse) => <span>{dashIfEmpty(item.manufacturer)}</span>
    },
    {
      id: 3,
      header: 'SKU',
      item: (item: Warehouse) => <span>{dashIfEmpty(item.skuNumber)}</span>
    },
    {
      id: 4,
      header: 'Kategoria',
      item: (item: Warehouse) => <span>{dashIfEmpty(getCategoryName(item.category))}</span>
    },
    {
      id: 5,
      header: 'Ilość',
      item: (item: Warehouse) => <span>{item.devices?.length ?? 0}</span>
    },
    {
      id: 6,
      header: 'Wartość wynajmu',
      item: (item: Warehouse) => <span>{formatCurrency(item.rentalValue)}</span>
    },
    {
      id: 7,
      header: 'Status',
      item: (item: Warehouse) => (
        <UIBadge variant={item.status === 'Available' ? 'success' : 'secondary'}>
          {getStatusName(item.status) ?? '-'}
        </UIBadge>
      )
    },
    {
      id: 8,
      header: '',
      item: (item: Warehouse) => (
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
            Dodaj do magazynu
          </UIButton>
        </UIPanel>
      }
      background={false}
    >
      <UITable columns={columns} data={data} />
    </UICard>
  );
}
