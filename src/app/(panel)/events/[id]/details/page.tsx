import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { cookies } from 'next/headers';
import { ResponseAPI, Event, Column, Employee } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
import UIDetails from '@/src/components/UI/Details';
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
  const response = await fetch(`${url}/event/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return null;

  const data: ResponseAPI<Event> = await response.json();
  return data.data ?? null;
}

export default async function RentalsDetailsPage({ params }: DetailsProps) {
  const { id } = params;
  const data = await fetchData(id);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Imię',
      item: (item: Employee) => <span>{item.firstName}</span>
    },
    {
      id: 2,
      header: 'Nazwisko',
      item: (item: Employee) => <span>{item.lastName}</span>
    },
    {
      id: 3,
      header: 'Email',
      item: (item: Employee) => <span>{item.email}</span>
    },
    {
      id: 4,
      header: 'Telefon',
      item: (item: Employee) => <span>{item.phone}</span>
    },
    {
      id: 5,
      header: 'Rola',
      item: (item: Employee) => <span>{item.position}</span>
    },
    {
      id: 6,
      header: 'Stawka dzienna',
      item: (item: Employee) => <span>{item.dailyRate}</span>
    }
  ];

  const details = [
    { detailName: 'Nazwa klienta', detailData: data?.clientName },
    { detailName: 'Email klienta', detailData: data?.clientEmail },
    { detailName: 'Telefon klienta', detailData: data?.clientPhone },
    { detailName: 'Data', detailData: formatDateTime(data?.date) },
    { detailName: 'Lokalizacja', detailData: data?.location },
    { detailName: 'Budżet', detailData: formatCurrency(data?.budget) },
    { detailName: 'Przewidywana ilość godzin', detailData: dashIfEmpty(data?.estimatedHours) },
    { detailName: 'Prawdziwa ilość godzin', detailData: dashIfEmpty(data?.actualHours) },
    { detailName: 'Status', detailData: data?.status },
    { detailName: 'Utworzono', detailData: formatDateTime(data?.createdAt) },
    { detailName: 'Zaktualizowano', detailData: formatDateTime(data?.updatedAt) },
    { detailName: 'Notatki', detailData: dashIfEmpty(data?.notes) },
    { detailName: 'Opis', detailData: dashIfEmpty(data?.description) }
  ];

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
      <UIDetails header={data?.eventName} details={details} />

      <UITable columns={columns} data={data?.assignedEmployees ?? []} />
    </UICard>
  );
}
