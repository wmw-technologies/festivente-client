'use server';

import { cookies } from 'next/headers';
import { Schema } from '@/src/app/(panel)/administration/roles/[id]/form';

export async function create(form: Schema & { permissions: string[] }) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const authCookie = cookies().get('auth')?.value;
    if (!authCookie) return;

    const accessToken = JSON.parse(authCookie).accessToken;
    const response = await fetch(`${url}/role/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(form)
    });

    const json = await response.json();

    return {
      ...json,
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    console.log('error', error);
  }
}

export async function update(id: string, form: Schema & { permissions: string[] }) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const authCookie = cookies().get('auth')?.value;
    if (!authCookie) return;

    const accessToken = JSON.parse(authCookie).accessToken;
    const response = await fetch(`${url}/role/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(form)
    });

    const json = await response.json();

    return {
      ...json,
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    console.log('error', error);
  }
}
