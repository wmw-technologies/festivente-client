import { cookies } from 'next/headers';
import { Column } from '@/src/types';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';

async function fetchData() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return null;

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/user/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data: any = await response.json();

  // return data;
  return [] as any;
}

export default async function AdministrationRoles() {
  const data = await fetchData();

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'ID',
      item: (item: any) => <span>{item.id}</span>
    },
    {
      id: 2,
      header: 'Nazwa',
      item: (item: any) => <span>{item.login}</span>
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Lista roli">
          <UIButton href="/administration/roles/add" icon="PlusIcon">
            Dodaj rolę
          </UIButton>
        </UIPanel>
      }
      background={false}
    >
      <UITable columns={columns} data={data} />
    </UICard>
  );
}
