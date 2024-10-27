'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ResponseAPI } from '@/src/types';
import { Schema } from '@/src/app/(panel)/administration/users/[id]/change-password/page';

export async function changePassword(id: string, form: Schema) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return;

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/user/update-password/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify(form)
  });

  const json: ResponseAPI = await response.json();

  revalidatePath('/administration/users');

  return {
    ...json,
    status: response.status,
    ok: response.ok
  };
}
