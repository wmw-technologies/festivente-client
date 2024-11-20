import { cookies } from 'next/headers';
import { Column, ResponseAPI, Pager, Pagination, Warehouse } from '@/src/types';
import { getPager } from '@/src/utils/pager';
import { warehouseCategories, warehouseStatuses } from '@/src/constants';
import { formatCurrency, dashIfEmpty } from '@/src/utils/format';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIBadge from '@/src/components/UI/Badge';
import UIPagination from '@/src/components/UI/Pagination';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type WarehouseProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function getCategoryName(value?: string) {
  return warehouseCategories.find((item) => item.value === value)?.text ?? '';
}

function getStatusName(value?: string) {
  return warehouseStatuses.find((item) => item.value === value)?.text ?? '';
}

async function fetchData(pager: Pager) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(
    `${url}/warehouse/list?page=${pager.page}&perPage=${pager.perPage}&sort=${pager.sort}&order=${pager.order}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    }
  );

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Warehouse>> = await response.json();

  pager.total = data.data?.totalRows ?? 0;
  return data.data?.items ?? [];
}

export default async function WarehousePage({ searchParams }: WarehouseProps) {
  const pager = getPager(searchParams);
  const data = await fetchData(pager);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Nazwa',
      item: (item: Warehouse) => <span>{dashIfEmpty(item.name)}</span>,
      sort: 'name'
    },
    {
      id: 2,
      header: 'Producent',
      item: (item: Warehouse) => <span>{dashIfEmpty(item.manufacturer)}</span>,
      sort: 'manufacturer'
    },
    {
      id: 3,
      header: 'SKU',
      item: (item: Warehouse) => <span>{dashIfEmpty(item.skuNumber)}</span>,
      sort: 'skuNumber'
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
      item: (item: Warehouse) => <span>{formatCurrency(item.rentalValue)}</span>,
      sort: 'rentalValue'
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
          <UIDropdownItem href={`/warehouse/${item._id}/details`}>Szczegóły</UIDropdownItem>
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
      footer={<UIPagination pager={pager} />}
      background={false}
    >
      <UITable columns={columns} pager={pager} data={data} />
    </UICard>
  );
}
