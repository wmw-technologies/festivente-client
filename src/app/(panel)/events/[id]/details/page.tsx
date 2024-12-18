import { cookies } from 'next/headers';
import { ResponseAPI, Event } from '@/src/types';
import Details from './details';

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

  return <Details id={id} data={data} />;
}
