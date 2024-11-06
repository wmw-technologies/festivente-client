import { cookies } from 'next/headers';
import { ResponseAPI, Pagination, User, Role, Option } from '@/src/types';
import Form from './form';

type AdministrationUsersFormProps = {
  params: {
    id: string;
  };
};

async function fetchData(id: string) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return null;

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });
  if (!response.ok) return null;

  const data: ResponseAPI<User> = await response.json();
  return data.data ?? null;
}

async function fetchRoles() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/role/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Role>> = await response.json();
  return (data.data?.items ?? []).map((role) => ({
    text: role.name,
    value: role._id
  })) as Option[];
}

export default async function AdministrationUsersForm({ params }: AdministrationUsersFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;
  const roles = await fetchRoles();

  return <Form id={id} isEdit={isEdit} data={data} roles={roles} />;
}
