'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ResponseAPI, Device } from '@/src/types';
import { Schema } from '@/src/app/(panel)/rentals/[id]/form';

export async function create(form: Schema) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return;

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/rental/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify(form)
  });

  const json: ResponseAPI<any> = await response.json();

  revalidatePath('/rentals');

  return {
    ...json,
    status: response.status,
    ok: response.ok
  };
}

export async function update(id: string, form: Schema) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return;

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/rental/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify(form)
  });

  const json: ResponseAPI<any> = await response.json();

  revalidatePath('/rentals');

  return {
    ...json,
    status: response.status,
    ok: response.ok
  };
}

export async function availableDevices(rentalDate: Date, returnDate: Date) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];
  const accessToken = JSON.parse(authCookie).accessToken;

  const response = await fetch(`${url}/rental/available-devices?rentalDate=${rentalDate}&returnDate=${returnDate}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];
  const data: ResponseAPI<Device[]> = await response.json();
  return data.data ?? [];
}

export async function changeStatusToPaid(id: string) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];
  const accessToken = JSON.parse(authCookie).accessToken;

  const response = await fetch(`${url}/rental/change-status-to-paid/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  const json: ResponseAPI<any> = await response.json();

  revalidatePath(`/rentals/${id}/details`);

  return {
    ...json,
    status: response.status,
    ok: response.ok
  };
}
