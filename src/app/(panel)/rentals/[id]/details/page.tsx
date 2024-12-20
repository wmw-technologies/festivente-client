import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { cookies } from 'next/headers';
import { Column, Device, Rental, ResponseAPI } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
import ConfirmPayment from './confirm-payment';
import UITable from '@/src/components/UI/Table';
import UIDetails from '@/src/components/UI/Details';

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
    item: (item: Device) => <span>{item.warehouseId.name}</span>
  },
  {
    id: 2,
    header: 'SKU',
    item: (item: Device) => <span>{dashIfEmpty(String(item.warehouseId.skuNumber))}</span>
  },
  {
    id: 3,
    header: 'Numer seryjny',
    item: (item: Device) => <span>{dashIfEmpty(item.serialNumber)}</span>
  },
  {
    id: 4,
    header: 'Lokalizacja',
    item: (item: Device) => <span>{item.location}</span>
  },
  {
    id: 5,
    header: 'Ostatnia aktualizacja',
    item: (item: Device) => <span>{formatDateTime(item.updatedAt)}</span>
  },
  {
    id: 6,
    header: 'Dodane przez',
    item: (item: Device) => (
      <span>{`${item.warehouseId.createdBy.first_name} ${item.warehouseId.createdBy.last_name}`}</span>
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
  const details = [
    { detailName: 'Nazwa klienta', detailData: data?.clientName },
    { detailName: 'Miasto', detailData: data?.clientCity },
    { detailName: 'Ulica', detailData: data?.clientStreet },
    { detailName: 'Kod pocztowy', detailData: data?.clientPostCode },
    { detailName: 'Email klienta', detailData: data?.clientEmail },
    { detailName: 'Telefon klienta', detailData: data?.clientPhone },
    { detailName: 'Wartość', detailData: formatCurrency(data?.inTotal ?? 0) },
    { detailName: 'Data wypożyczenia', detailData: formatDateTime(data?.rentalDate) },
    { detailName: 'Forma płatności', detailData: data?.paymentForm },
    { detailName: 'Wypożyczenie opłacone', detailData: data?.isPaid ? 'Tak' : 'Nie' },
    { detailName: 'Data zwrotu', detailData: formatDateTime(data?.returnDate) },
    { detailName: 'Data dodania', detailData: formatDateTime(data?.createdAt) },
    { detailName: 'Data ostatniej aktualizacji', detailData: formatDateTime(data?.updatedAt) },
    {
      detailName: 'Dodane przez',
      detailData: `${data?.createdBy.first_name} ${data?.createdBy.last_name}`
    },
    { detailName: 'Status', detailData: data?.status },
    { detailName: 'Opis', detailData: data?.notes }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/rentals" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton href={`/rentals/${id}`} icon="PencilIcon">
            Edytuj
          </UIButton>
          {!data?.isPaid ? <ConfirmPayment id={id} /> : null}
        </UIPanel>
      }
    >
      <UIDetails header={data?._id} details={details} />
      <UITable columns={columns} data={data?.devices ?? []} />
    </UICard>
  );
}
