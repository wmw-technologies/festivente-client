import { cookies } from 'next/headers';
import { Column, ResponseAPI, Pager, Pagination, Service } from '@/src/types';
import { getPager } from '@/src/utils/pager';
import { formatDateTime, formatCurrency } from '@/src/utils/format';
import { getStatus, getStatusVariant } from './utils';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIPagination from '@/src/components/UI/Pagination';
import UIBadge from '@/src/components/UI/Badge';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type ServiceProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function fetchData(pager: Pager) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(
    `${url}/service/list?page=${pager.page}&perPage=${pager.perPage}&sort=${pager.sort}&order=${pager.order}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    }
  );

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Service>> = await response.json();

  pager.total = data.data?.totalRows ?? 0;
  return data.data?.items ?? [];
}

export default async function ServicePage({ searchParams }: ServiceProps) {
  const pager = getPager(searchParams);
  const data = await fetchData(pager);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'ID',
      item: (item: Service) => <span>{item.device._id}</span>
    },
    {
      id: 2,
      header: 'Numer seryjny',
      item: (item: Service) => <span>{item.device.serialNumber}</span>
    },
    {
      id: 3,
      header: 'Data przyjęcia urządzenia',
      item: (item: Service) => <span>{formatDateTime(item.returnDate)}</span>
    },
    {
      id: 4,
      header: 'Data zakończenia serwisu',
      item: (item: Service) => <span>{formatDateTime(item.serviceDate)}</span>
    },
    {
      id: 5,
      header: 'Koszt naprawy',
      item: (item: Service) => <span>{formatCurrency(item.repairPrice)}</span>
    },
    {
      id: 6,
      header: 'Status',
      item: (item: Service) => <UIBadge variant={getStatusVariant(item.status)}>{getStatus(item.status)}</UIBadge>
    },
    {
      id: 7,
      header: '',
      item: (item: Service) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/service/${item._id}/details`}>Szczegóły</UIDropdownItem>
          <UIDropdownItem href={`/service/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Lista urządzeń serwisowanych">
          <UIButton href="/service/add" icon="PlusIcon">
            Dodaj urządzenie do serwisu
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
