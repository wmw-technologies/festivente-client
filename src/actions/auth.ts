'use server';

import { cookies } from 'next/headers';
import { Schema } from '@/src/app/(auth)/sign-in/page';
import { ResponseAPI } from '../types';

export async function signIn(form: Schema) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${url}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });

  const json: ResponseAPI<any> = await response.json();

  if (response.ok) {
    const accessToken = json.data.access_token;
    const refreshToken = json.data.refresh_token;
    const expiresIn = json.data.expires_in;

    cookies().set('auth', JSON.stringify({ accessToken, refreshToken }), { maxAge: expiresIn, httpOnly: true });
  }

  return {
    ...json,
    status: response.status,
    ok: response.ok
  };
}

export async function signOut() {
  cookies().delete('auth');
}
