'use client';

import { Column } from '@/src/types';
import { useAuth } from '@/src/context/auth';
import UITable from '@/src/components/UI/Table';
import UIPanel from '@/src/components/UI/Panel';
import UICard from '@/src/components/UI/Card';

export default function MyAccount() {
  const auth = useAuth();

  const columns: Array<Column> = [
    {
      id: 1,
      item: (item: any) => <span className="mark">{item.header}</span>,
      width: 250
    },
    {
      id: 2,
      item: (item: any) => <span>{item.content}</span>
    }
  ];

  const data = [
    {
      id: 1,
      header: 'Nazwa użytkownika',
      content: '-'
    },
    {
      id: 2,
      header: 'Imię',
      content: '-'
    },
    {
      id: 3,
      header: 'Nazwisko',
      content: '-'
    },
    {
      id: 4,
      header: 'Email',
      content: auth?.email
    }
  ];

  return (
    <UICard header={<UIPanel header="Moje konto" />} background={false}>
      <UITable columns={columns} data={data} noHeader />
    </UICard>
  );
}
