import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { Column, Device, Rental, ResponseAPI } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
import UITable from '@/src/components/UI/Table';

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

  const response = await fetch(`${url}/rental/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });
  if (!response.ok) return null;

  const data: ResponseAPI<Rental> = await response.json();
  return data.data ?? null;
}

const columns: Array<Column> = [
  {
    id: 1,
    header: 'Nazwa urządzenia',
    item: (item: Device) => <span>{item.warehouseId.name}</span>,
    sort: 'name'
  },
  {
    id: 2,
    header: 'SKU:',
    item: (item: Device) => <span>{dashIfEmpty(String(item.warehouseId.skuNumber))}</span>,
    sort: 'skuNumber'
  },
  {
    id: 3,
    header: 'Numer seryjny',
    item: (item: Device) => <span>{dashIfEmpty(item.serialNumber)}</span>,
    sort: 'serialNumber'
  },
  {
    id: 4,
    header: 'Lokalizacja',
    item: (item: Device) => <span>{item.location}</span>,
    sort: 'location'
  },
  {
    id: 5,
    header: 'Ostatnia aktualizacja',
    item: (item: Device) => <span>{formatDateTime(item.updatedAt)}</span>,
    sort: 'updatedAt'
  },
  {
    id: 6,
    header: 'Dodane przez',
    item: (item: Device) => (
      <span>{dashIfEmpty(`${item.warehouseId.createdBy.first_name} ${item.warehouseId.createdBy.last_name}`)}</span>
    )
  },
  {
    id: 7,
    header: 'Opis',
    item: (item: Device) => <span>{dashIfEmpty(item.description)}</span>
  }
];

export default async function RentalsDetailsPage({ params }: DetailsProps) {
  const { id } = params;
  const data = await fetchData(id);
  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/rentals" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
        </UIPanel>
      }
    >
      <div className={styles['details-container']}>
        <h2>{data?._id}</h2>
        <div className={styles.details}>
          <div>
            <span>Nazwa klienta</span>
            <p>{data?.clientName}</p>
          </div>
        </div>
      </div>
      <UITable columns={columns} data={data?.devices ?? []} />
    </UICard>
  );
}
