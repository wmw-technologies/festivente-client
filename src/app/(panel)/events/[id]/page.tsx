import { cookies } from 'next/headers';
import { ResponseAPI, Event, Option, Employee, Pagination } from '@/src/types';
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

async function fetchEmployees() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/employee/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Employee>> = await response.json();
  return (data.data?.items ?? []).map((role) => ({
    text: `${role.firstName} ${role.lastName}`,
    value: role._id
  })) as Option[];
}

export default async function EventsForm({ params }: EventsFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;
  const employees = await fetchEmployees();

  return <Form id={id} isEdit={isEdit} data={data} employees={employees} />;
}
