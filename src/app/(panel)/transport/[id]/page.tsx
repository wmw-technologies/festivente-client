import { cookies } from 'next/headers';
import { ResponseAPI, Pagination, Employee, Event, Transport, Option, Vehicle } from '@/src/types';
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

async function fetchEvents() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/event/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Event>> = await response.json();
  return (data.data?.items ?? []).map((role) => ({
    text: role.eventName,
    value: role._id
  })) as Option[];
}

async function fetchVechicle() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/vehicle/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Vehicle>> = await response.json();
  return (data.data?.items ?? []).map((vehicle) => ({
    text: `${vehicle.brand} ${vehicle.model} (${vehicle.registrationNumber})`,
    value: vehicle._id
  })) as Option[];
}

export default async function TransportForm({ params }: EventsFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;
  const employees = await fetchEmployees();
  const events = await fetchEvents();
  const vehicles = await fetchVechicle();

  return <Form id={id} isEdit={isEdit} data={data} vehicles={vehicles} employees={employees} events={events} />;
}
