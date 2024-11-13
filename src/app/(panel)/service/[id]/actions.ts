'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ResponseAPI } from '@/src/types';
import { Schema } from '@/src/app/(panel)/service/[id]/form';

export async function create(form: Schema) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return;

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/service/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify(form)
  });

  const json: ResponseAPI<any> = await response.json();

  revalidatePath('/service');

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
  const response = await fetch(`${url}/service/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify(form)
  });

  const json: ResponseAPI<any> = await response.json();

  revalidatePath('/service');

  return {
    ...json,
    status: response.status,
    ok: response.ok
  };
}
