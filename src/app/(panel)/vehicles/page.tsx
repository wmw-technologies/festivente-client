import { cookies } from 'next/headers';
import { Column, ResponseAPI, Vehicle, Pager, Pagination } from '@/src/types';
import { getPager } from '@/src/utils/pager';
import { dashIfEmpty, formatCurrency } from '@/src/utils/format';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIPagination from '@/src/components/UI/Pagination';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type VehiclesProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function fetchData(pager: Pager) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(
    `${url}/vehicle/list?page=${pager.page}&perPage=${pager.perPage}&sort=${pager.sort}&order=${pager.order}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    }
  );

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Vehicle>> = await response.json();

  pager.total = data.data?.totalRows ?? 0;
  return data.data?.items ?? [];
}

export default async function Vehicles({ searchParams }: VehiclesProps) {
  const pager = getPager(searchParams);
  const data = await fetchData(pager);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Marka',
      item: (item: Vehicle) => <span>{dashIfEmpty(item.brand)}</span>,
      sort: 'brand'
    },
    {
      id: 2,
      header: 'Model',
      item: (item: Vehicle) => <span>{dashIfEmpty(item.model)}</span>,
      sort: 'model'
    },
    {
      id: 3,
      header: 'Numer rejestracyjny',
      item: (item: Vehicle) => <span>{dashIfEmpty(item.registrationNumber)}</span>,
      sort: 'registrationNumber'
    },
    {
      id: 4,
      header: 'Cena za km (PLN)',
      item: (item: Vehicle) => <span>{formatCurrency(item.pricePerKm)}</span>,
      sort: 'pricePerKm'
    },
    {
      id: 5,
      header: '',
      item: (item: Vehicle) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/vehicles/${item._id}/details`}>Szczegóły</UIDropdownItem>
          <UIDropdownItem href={`/vehicles/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Lista pojazdów">
          <UIButton href="/vehicles/add" icon="PlusIcon">
            Dodaj pojazd
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
