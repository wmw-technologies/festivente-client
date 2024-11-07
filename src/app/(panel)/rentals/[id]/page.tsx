import { cookies } from 'next/headers';
import { Rental, ResponseAPI, Warehouse } from '@/src/types';
import Form from './form';

type EventsFormProps = {
  params: {
    id: string;
  };
};

type FetchDataType = {
  rentals: Rental | null;
  warehouseList: Warehouse[] | [];
};

async function fetchData(id?: string): Promise<FetchDataType> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return { rentals: null, warehouseList: [] };

  const accessToken = JSON.parse(authCookie).accessToken;
  let rentalsData: ResponseAPI<Rental> | null = null;

  if (id) {
    const rentalsResponse = await fetch(`${url}/rentals/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    });
    if (!rentalsResponse.ok) return { rentals: null, warehouseList: [] };
    rentalsData = await rentalsResponse.json();
  }

  const warehouseListResponse = await fetch(`${url}/warehouse/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!warehouseListResponse.ok) return { rentals: null, warehouseList: [] };

  const warehouseListData: ResponseAPI<Warehouse[]> = await warehouseListResponse.json();
  return {
    rentals: rentalsData?.data ?? null,
    warehouseList: warehouseListData.data ?? []
  };
}

export default async function RentalsForm({ params }: EventsFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : await fetchData();

  const allDevices = data.warehouseList.flatMap((warehouse) => warehouse.devices);

  return <Form id={id} isEdit={isEdit} rentalsData={data.rentals} warehouseListDevices={allDevices} />;
}
