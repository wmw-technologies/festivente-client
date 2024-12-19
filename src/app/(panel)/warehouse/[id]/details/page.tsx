import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { cookies } from 'next/headers';
import { Column, Device, ResponseAPI, Warehouse } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
import UITable from '@/src/components/UI/Table';
import UIDetails from '@/src/components/UI/Details';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type DetailsProps = {
  params: {
    id: string;
  };
};

async function fetchData(id: string) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return null;

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/warehouse/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });
  if (!response.ok) return null;

  const data: ResponseAPI<Warehouse> = await response.json();
  return data.data ?? null;
}

const columns: Array<Column> = [
  {
    id: 1,
    header: 'Id urządzenia',
    item: (item: Device) => <span>{item._id}</span>
  },
  {
    id: 2,
    header: 'Id wynajmu',
    item: (item: Device) => <span>{dashIfEmpty(String(item.rentalId))}</span>
  },
  {
    id: 3,
    header: 'Lokalizacja',
    item: (item: Device) => <span>{item.location}</span>
  },
  {
    id: 4,
    header: 'Numer seryjny',
    item: (item: Device) => <span>{dashIfEmpty(item.serialNumber)}</span>
  },
  {
    id: 5,
    header: 'Ostatnia aktualizacja',
    item: (item: Device) => <span>{formatDateTime(item.updatedAt)}</span>
  },
  {
    id: 6,
    header: 'Opis',
    item: (item: Device) => <span>{dashIfEmpty(item.description)}</span>
  },
  {
    id: 7,
    header: '',
    item: (item: Device) => (
      <UIDropdown icon="EllipsisHorizontalIcon" smaller>
        <UIDropdownItem href={`/rentals/${item.rentalId}/details`}>Edytuj</UIDropdownItem>
      </UIDropdown>
    ),
    width: 36
  }
];

export default async function WarehouseDetailsPage({ params }: DetailsProps) {
  const { id } = params;
  const data = await fetchData(id);

  const details = [
    { detailName: 'Producent', detailData: data?.manufacturer },
    { detailName: 'SKU', detailData: data?.skuNumber },
    { detailName: 'Kategoria', detailData: data?.category },
    { detailName: 'Wartość wynajmu za dzień', detailData: formatCurrency(data?.rentalValue ?? 0) },
    { detailName: 'Dodane przez', detailData: `${data?.createdBy.first_name} ${data?.createdBy.last_name}` },
    { detailName: 'Data dodania', detailData: formatDateTime(data?.createdAt) },
    { detailName: 'Data ostatniej aktualizacji', detailData: formatDateTime(data?.updatedAt) },
    { detailName: 'Status', detailData: data?.status },
    { detailName: 'Opis', detailData: data?.description }
  ];
  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/warehouse" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton href={`/warehouse/${id}`}>Edytuj</UIButton>
        </UIPanel>
      }
    >
      <UIDetails details={details} header={data?.name} />

      <UITable columns={columns} data={data?.devices ?? []} />
    </UICard>
  );
}
