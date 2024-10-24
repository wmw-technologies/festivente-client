'use client';

import { Column } from '@/src/types';
import { useAuth } from '@/src/context/auth';
import UITable from '@/src/components/UI/Table';
import UIPanel from '@/src/components/UI/Panel';
import UICard from '@/src/components/UI/Card';
import UIBadge from '@/src/components/UI/Badge';

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
      item: (item: any) => <>{item.id === 5 ? <UIBadge>{item.content}</UIBadge> : item.content}</>
    }
  ];

  const data = [
    {
      id: 1,
      header: 'Imię',
      content: auth?.first_name || '-'
    },
    {
      id: 2,
      header: 'Nazwisko',
      content: auth?.last_name || '-'
    },
    {
      id: 3,
      header: 'Email',
      content: auth?.email
    },
    {
      id: 4,
      header: 'Numer telefonu',
      content: auth?.phone || '-'
    },
    {
      id: 5,
      header: 'Rola',
      content: auth?.role.name || '-'
    }
  ];

  return (
    <UICard header={<UIPanel header="Moje konto" />} background={false}>
      <UITable columns={columns} data={data} noHeader />
    </UICard>
  );
}
