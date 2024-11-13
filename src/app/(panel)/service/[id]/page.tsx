import { cookies } from 'next/headers';
import { ResponseAPI, Service, Pagination, Employee, Device, Option } from '@/src/types';
import Form from './form';

type ServiceFormProps = {
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
  return (data.data?.items ?? []).map((item) => ({
    text: `${item.firstName} ${item.lastName}`,
    value: item._id
  })) as Option[];
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

  return (data.data ?? []).map((item) => ({
    text: `${item.warehouseId?.name} - ${item.warehouseId?.skuNumber} | ${item.serialNumber}`,
    value: item._id
  })) as Option[];
}

export default async function ServiceForm({ params }: ServiceFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;
  const employees = await fetchEmployees();
  const availableDevices = await fetchAvailableDevices();

  return <Form id={id} isEdit={isEdit} data={data} employees={employees} devices={availableDevices} />;
}
