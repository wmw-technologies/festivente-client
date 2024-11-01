import { cookies } from 'next/headers';
import { ResponseAPI, Role } from '@/src/types';
import Form from './form';

type EventsFormProps = {
  params: {
    id: string;
  };
};

async function fetchData(id: string) {
  // const url = process.env.NEXT_PUBLIC_API_URL;
  // const authCookie = cookies().get('auth')?.value;
  // if (!authCookie) return null;

  // const accessToken = JSON.parse(authCookie).accessToken;
  // const response = await fetch(`${url}/role/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + accessToken
  //   }
  // });

  // if (!response.ok) return null;

  // const data: ResponseAPI<Role> = await response.json();
  // return data.data ?? null;

  return null;
}

export default async function RentalsForm({ params }: EventsFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;

  return <Form id={id} isEdit={isEdit} data={data} />;
}
