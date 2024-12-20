import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { cookies } from 'next/headers';
import { ResponseAPI, Service } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
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
  const response = await fetch(`${url}/service/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return null;

  const data: ResponseAPI<Service> = await response.json();
  return data.data ?? null;
}

export default async function RentalsDetailsPage({ params }: DetailsProps) {
  const { id } = params;
  const data = await fetchData(id);

  const details = [
    {
      detailName: 'Nazwa urządzenia',
      detailData: data?.device.warehouseId.name
    },
    {
      detailName: 'SKU',
      detailData: data?.device.warehouseId.skuNumber
    },
    {
      detailName: 'Numer seryjny',
      detailData: data?.device.serialNumber
    },
    {
      detailName: 'Lokalizacja',
      detailData: data?.device.location
    },
    {
      detailName: 'Koszt naprawy',
      detailData: formatCurrency(data?.repairPrice)
    },
    {
      detailName: 'Data przyjęcia',
      detailData: formatDateTime(data?.returnDate)
    },
    {
      detailName: 'Data zakończenia serwisu',
      detailData: formatDateTime(data?.serviceDate)
    },
    {
      detailName: 'Status',
      detailData: dashIfEmpty(data?.status)
    },
    {
      detailName: 'Osoba serwisująca',
      detailData: `${data?.servicePerson!.firstName} ${data?.servicePerson!.lastName}`
    },
    {
      detailName: 'Utworzono',
      detailData: formatDateTime(data?.createdAt)
    },
    {
      detailName: 'Zaktualizowano',
      detailData: formatDateTime(data?.updatedAt)
    },
    {
      detailName: 'Opis urządzenia',
      detailData: dashIfEmpty(data?.device.description)
    },
    {
      detailName: 'Opis serwisu',
      detailData: dashIfEmpty(data?.description)
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/service" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton href={`/service/${id}`} icon="PencilIcon">
            Edytuj
          </UIButton>
        </UIPanel>
      }
    >
      <UIDetails header={data?._id} details={details} />
    </UICard>
  );
}
