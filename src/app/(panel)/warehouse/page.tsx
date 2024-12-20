import { cookies } from 'next/headers';
import { Column, ResponseAPI, Pager, Pagination, Warehouse, Device } from '@/src/types';
import { getPager } from '@/src/utils/pager';
import { warehouseCategories } from '@/src/constants';
import { dashIfEmpty } from '@/src/utils/format';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIPagination from '@/src/components/UI/Pagination';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type WarehouseProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function getCategoryName(value?: string) {
  return warehouseCategories.find((item) => item.value === value)?.text ?? '';
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

// function countRentals(devices: Array<Device>) {
//   if (!devices) return 0;
//   return devices.filter((item) => item.rentalId?._id).length;
// }

// function countServices(devices: Array<Device>) {
//   if (!devices) return 0;
//   return devices.filter((item) => item.serviceId?._id).length;
// }

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
      item: (item: Warehouse) => <span>{item.devices.length}</span>,
      align: 'right'
    },
    // {
    //   id: 6,
    //   header: 'Ilość dostępnych',
    //   item: (item: Warehouse) => (
    //     <span>{item.devices.length - (item.devicesInRental ?? 0) - (item.devicesInService ?? 0)}</span>
    //   ),
    //   align: 'right'
    // },
    // {
    //   id: 7,
    //   header: 'Ilość wypożyczonych',
    //   item: (item: Warehouse) => <span>{item.devicesInRental ?? 0}</span>,
    //   align: 'right'
    // },
    // {
    //   id: 8,
    //   header: 'Ilość w serwisie',
    //   item: (item: Warehouse) => <span>{item.devicesInService ?? 0}</span>,
    //   align: 'right'
    // },
    {
      id: 9,
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
