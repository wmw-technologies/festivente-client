import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { cookies } from 'next/headers';
import { Column, ResponseAPI, Transport, Vehicle } from '@/src/types';
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
  const response = await fetch(`${url}/transport/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return null;

  const data: ResponseAPI<Transport> = await response.json();
  return data.data ?? null;
}

export default async function RentalsDetailsPage({ params }: DetailsProps) {
  const { id } = params;
  const data = await fetchData(id);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Marka',
      item: (item: Vehicle) => <span>{item.brand}</span>
    },
    {
      id: 2,
      header: 'Model',
      item: (item: Vehicle) => <span>{item.model}</span>
    },
    {
      id: 3,
      header: 'Numer rejestracyjny',
      item: (item: Vehicle) => <span>{item.registrationNumber}</span>
    },
    {
      id: 4,
      header: 'Cena za km',
      item: (item: Vehicle) => <span>{item.pricePerKm}</span>
    },
    {
      id: 5,
      header: 'Data przeglądu',
      item: (item: Vehicle) => <span>{formatDateTime(item.inspectionDate)}</span>
    },
    {
      id: 6,
      header: 'Data ubezpieczenia',
      item: (item: Vehicle) => <span>{formatDateTime(item.insuranceDate)}</span>
    }
  ];

  const details = [
    { detailName: 'Nazwa imprezy', detailData: data?.event.eventName },
    { detailName: 'Rodzaj pojazdu', detailData: data?.vehicleType },
    { detailName: 'Kierowca', detailData: `${data?.driver.firstName} ${data?.driver.lastName}` },
    { detailName: 'Kontakt do kierwocy', detailData: `tel:${data?.driver.phone}; mail:${data?.driver.email}` },
    { detailName: 'Czas wyjazdu', detailData: formatDateTime(data?.departureTime) },
    { detailName: 'Czas przybycia', detailData: formatDateTime(data?.arrivalTime) },
    { detailName: 'Miesjce wyjazdu', detailData: data?.event.location },
    { detailName: 'Miejsce docelowe', detailData: data?.event.location },
    { detailName: 'Status', detailData: data?.event.status },
    { detailName: 'Utworzono', detailData: formatDateTime(data?.createdAt) },
    { detailName: 'Zaktualizowano', detailData: formatDateTime(data?.updatedAt) },
    { detailName: 'Opis', detailData: dashIfEmpty(data?.notes) }
  ];

  console.log(data?.vehicleDetails);

  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/transport" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton href={`/events/${data?.event._id}/details`}>Szczegóły wydarzenia</UIButton>
        </UIPanel>
      }
    >
      <UIDetails header={data?._id} details={details} />

      {/* <UITable columns={columns} data={data?.vehicleDetails ?? []} /> */}
    </UICard>
  );
}
