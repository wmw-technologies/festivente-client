import { cookies } from 'next/headers';
import { ResponseAPI, Warehouse } from '@/src/types';
import Form from './form';

type WarehouseItemsFormProps = {
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

export default async function WarehouseForm({ params }: WarehouseItemsFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;

  return <Form id={id} isEdit={isEdit} data={data} />;
}
