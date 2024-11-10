import { cookies } from 'next/headers';
import { Device, Rental, ResponseAPI, Warehouse } from '@/src/types';
import Form from './form';

type EventsFormProps = {
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

async function fetchAvailableDevices() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;

  const response = await fetch(`${url}/rental/available-devices`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });
  if (!response.ok) return [];

  const data: ResponseAPI<Device[]> = await response.json();
  return data.data ?? [];
}

export default async function RentalsForm({ params }: EventsFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;
  const availableDevices = await fetchAvailableDevices();

  return <Form id={id} isEdit={isEdit} rentalsData={data} availableDevices={availableDevices} />;
}
