'use server';

import { cookies } from 'next/headers';

export async function signIn(form: any) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${url}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    const json = await response.json();

    if (response.ok) {
      const accessToken = json.data.session.access_token;
      const refreshToken = json.data.session.refresh_token;
      const expiresIn = json.data.session.expires_in;

      cookies().set('auth', JSON.stringify({ accessToken, refreshToken }), { maxAge: expiresIn, httpOnly: true });
    }

    return {
      message: json.message,
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    console.log('error', error);
  }
}

export async function signOut() {
  cookies().delete('auth');
}
