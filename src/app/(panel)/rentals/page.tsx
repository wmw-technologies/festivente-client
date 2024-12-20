import { cookies } from 'next/headers';
import { Column, Rental, Pager, Pagination, ResponseAPI } from '@/src/types';
import { getPager } from '@/src/utils/pager';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIBadge from '@/src/components/UI/Badge';
import UIPagination from '@/src/components/UI/Pagination';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import { dashIfEmpty, formatCurrency, formatDate, formatDateTime } from '@/src/utils/format';
import { getStatus, getStatusVariant } from './utis';

type RentalsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function fetchData(pager: Pager) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(
    `${url}/rental/list?page=${pager.page}&perPage=${pager.perPage}&sort=${pager.sort}&order=${pager.order}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    }
  );

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Rental[]>> = await response.json();

  pager.total = data.data?.totalRows ?? 0;
  return data.data?.items ?? [];
}

export default async function Rentals({ searchParams }: RentalsProps) {
  const pager = getPager(searchParams);
  const data = await fetchData(pager);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'ID',
      item: (item: Rental) => <span>{item._id}</span>,
      sort: '_id'
    },
    {
      id: 2,
      header: 'Nazwa kilenta',
      item: (item: Rental) => <span>{dashIfEmpty(item.clientName)}</span>,
      sort: 'clientName'
    },
    {
      id: 3,
      header: 'Data wypożyczenia',
      item: (item: Rental) => <span>{formatDateTime(item.rentalDate)}</span>,
      sort: 'rentalDate'
    },
    {
      id: 4,
      header: 'Data zwrotu',
      item: (item: Rental) => <span>{formatDateTime(item.returnDate)}</span>,
      sort: 'returnDate'
    },
    {
      id: 5,
      header: 'Wartość',
      item: (item: Rental) => <span>{formatCurrency(item.inTotal)}</span>,
      sort: 'inTotal'
    },
    {
      id: 6,
      header: 'Status',
      item: (item: Rental) => <UIBadge variant={getStatusVariant(item.status)}>{getStatus(item.status)}</UIBadge>
    },
    {
      id: 7,
      header: '',
      item: (item: Rental) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/rentals/${item._id}/details`}>Szczegóły</UIDropdownItem>
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
      footer={<UIPagination pager={pager} />}
      background={false}
    >
      <UITable columns={columns} pager={pager} data={data} />
    </UICard>
  );
}
