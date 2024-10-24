// import { cookies } from 'next/headers';
import Form from './form';

type AdministrationUsersFormProps = {
  params: {
    id: string;
  };
};

async function fetchData(id: string) {
  try {
    // const url = process.env.NEXT_PUBLIC_API_URL;
    // const authCookie = cookies().get('auth')?.value;
    // if (!authCookie) return null;
    // const accessToken = JSON.parse(authCookie).accessToken;
    // const response = await fetch(`${url}/user/me`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + accessToken
    //   }
    // });
    // if (!response.ok) return null;
    // const data: any = await response.json();
    // // console.log('data', data);
    // return data;
  } catch {
    return null;
  }
}

export default async function AdministrationUsersForm({ params }: AdministrationUsersFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;

  return <Form isEdit={isEdit} data={data} />;
}
