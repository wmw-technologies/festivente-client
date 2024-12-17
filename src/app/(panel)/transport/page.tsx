import { cookies } from 'next/headers';
import { getPager } from '@/src/utils/pager';
import { ResponseAPI, Column, Pager, Pagination, Transport } from '@/src/types';
import { formatDateTime, dashIfEmpty } from '@/src/utils/format';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIPagination from '@/src/components/UI/Pagination';
import UIBadge from '@/src/components/UI/Badge';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type TransportProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function getStatus(status: string) {
  switch (status) {
    case 'Scheduled':
      return 'Zaplanowany';
    case 'In Progress':
      return 'W trakcie';
    case 'Completed':
      return 'Zakończony';
    default:
      return 'Nieznany';
  }
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'Scheduled':
      return 'info';
    case 'In Progress':
      return 'warning';
    case 'Completed':
      return 'success';
    default:
      return 'info';
  }
}

async function fetchData(pager: Pager) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(
    `${url}/transport/list?page=${pager.page}&perPage=${pager.perPage}&sort=${pager.sort}&order=${pager.order}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    }
  );

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Transport>> = await response.json();

  pager.total = data.data?.totalRows ?? 0;
  return data.data?.items ?? [];
}

export default async function TransportPage({ searchParams }: TransportProps) {
  const pager = getPager(searchParams);
  const data = await fetchData(pager);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Odjazd',
      item: (item: Transport) => <span>{formatDateTime(item.departureTime)}</span>,
      sort: 'departureTime'
    },
    {
      id: 2,
      header: 'Przyjazd',
      item: (item: Transport) => <span>{formatDateTime(item.arrivalTime)}</span>,
      sort: 'arrivalTime'
    },
    {
      id: 3,
      header: 'Skąd',
      item: (item: Transport) => <span>{item.departureLocation}</span>,
      sort: 'departureLocation'
    },
    {
      id: 4,
      header: 'Dokąd',
      item: (item: Transport) => <span>{item.destinationLocation}</span>,
      sort: 'destinationLocation'
    },
    {
      id: 5,
      header: 'Kontakt (numer telefonu)',
      item: (item: Transport) => <span>{dashIfEmpty(item.phoneNumber)}</span>
    },
    {
      id: 6,
      header: 'Wydarzenie',
      item: (item: Transport) => <span>{item.event.eventName}</span>
    },
    {
      id: 7,
      header: 'Status',
      item: (item: Transport) => <UIBadge variant={getStatusVariant(item.status)}>{getStatus(item.status)}</UIBadge>
    },
    {
      id: 8,
      header: '',
      item: (item: Transport) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/transport/${item._id}/details`}>Szczegóły</UIDropdownItem>
          <UIDropdownItem href={`/transport/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Lista transportów">
          <UIButton href="/transport/add" icon="PlusIcon">
            Dodaj transport
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
