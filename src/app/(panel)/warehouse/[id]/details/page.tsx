import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { Column, Device, ResponseAPI, Warehouse } from '@/src/types';
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
    header: 'Ostatnia aktualizacja',
    item: (item: Device) => <span>{formatDateTime(item.updatedAt)}</span>,
    sort: 'updatedAt'
  },
  {
    id: 6,
    header: 'Opis',
    item: (item: Device) => <span>{dashIfEmpty(item.description)}</span>
  }
];

export default async function WarehouseDetailsPage({ params }: DetailsProps) {
  const { id } = params;
  const data = await fetchData(id);
  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/warehouse" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
        </UIPanel>
      }
    >
      <div className={styles['details-container']}>
        <h2>{data?.name}</h2>
        <div className={styles.details}>
          <div>
            <span>Producent:</span>
            <p>{data?.manufacturer}</p>
          </div>
          <div>
            <span>SKU:</span>
            <p> {data?.skuNumber}</p>
          </div>
          <div>
            <span>Kategoria:</span> <p>{data?.category}</p>
          </div>
          <div>
            <span>Wartość wynajmu za dzień:</span> <p>{formatCurrency(data?.rentalValue ?? 0)}</p>
          </div>
          <div>
            <span>Dodane przez:</span>
            <p>
              {data?.createdBy.first_name} {data?.createdBy.last_name}
            </p>
          </div>
          <div>
            <span>Data dodania:</span> <p>{formatDateTime(data?.createdAt)}</p>
          </div>
          <div>
            <span>Data ostatniej aktualizacji:</span> <p>{formatDateTime(data?.updatedAt)}</p>
          </div>
          <div>
            <span>Status:</span>
            <p> {data?.status}</p>
          </div>
          <div>
            <span>Opis:</span> <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <UITable columns={columns} data={data?.devices ?? []} />
    </UICard>
  );
}
