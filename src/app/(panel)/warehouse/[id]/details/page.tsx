import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { Column, Device, ResponseAPI, Warehouse } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
import UITable from '@/src/components/UI/Table';

type WarehouseDetailsProps = {
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
    item: (item: Device) => <span>{item._id}</span>,
    sort: '_id'
  },
  {
    id: 2,
    header: 'Id wynajmu',
    item: (item: Device) => <span>{dashIfEmpty(String(item.rentalId))}</span>,
    sort: 'rentalId'
  },
  {
    id: 3,
    header: 'Lokalizacja',
    item: (item: Device) => <span>{item.location}</span>,
    sort: 'location'
  },
  {
    id: 4,
    header: 'Numer seryjny',
    item: (item: Device) => <span>{dashIfEmpty(item.serialNumber)}</span>,
    sort: 'serialNumber'
  },
  {
    id: 5,
    header: 'Opis',
    item: (item: Device) => <span>{dashIfEmpty(item.description)}</span>
  },
  {
    id: 6,
    header: 'Ostatnia aktualizacja',
    item: (item: Device) => <span>{formatDateTime(item.updatedAt)}</span>,
    sort: 'updatedAt'
  }
];

export default async function WarehouseDetailsPage({ params }: WarehouseDetailsProps) {
  const { id } = params;
  const data = await fetchData(id);
  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/events" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
        </UIPanel>
      }
    >
      <div className={styles.details}>
        <h2>{data?.name}</h2>
        <p>
          <strong>Producent:</strong> {data?.manufacturer}
        </p>
        <p>
          <strong>SKU:</strong> {data?.skuNumber}
        </p>
        <p>
          <strong>Kategoria:</strong> {data?.category}
        </p>
        <p>
          <strong>Wartość wynajmu za dzień:</strong> {formatCurrency(data?.rentalValue ?? 0)}
        </p>
        <p>
          <strong>Dodane przez:</strong> {data?.createdBy.first_name} {data?.createdBy.last_name}
        </p>
        <p>
          <strong>Data dodania:</strong> {formatDateTime(data?.createdAt)}
        </p>
        <p>
          <strong>Data ostatniej aktualizacji:</strong> {formatDateTime(data?.updatedAt)}
        </p>
        <p>
          <strong>Status:</strong> {data?.status}
        </p>
        <p>
          <strong>Opis:</strong> {data?.description}
        </p>
      </div>
      <UITable columns={columns} data={data?.devices ?? []} />
    </UICard>
  );
}
