import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { cookies } from 'next/headers';
import { ResponseAPI, Transport } from '@/src/types';
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

  const details = [{ detailName: 'Nazwa imprezy', detailData: data?.event.eventName }];

  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/transport" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
        </UIPanel>
      }
    >
      <UIDetails header={data?._id} details={details} />
    </UICard>
  );
}
