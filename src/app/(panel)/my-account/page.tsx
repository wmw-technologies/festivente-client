import { Column } from '@/src/types';
import UIHeader from '@/src/components/UI/Header';
import UITable from '@/src/components/UI/Table';

export default function MyAccount() {
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
      content: 'test'
    },
    {
      id: 2,
      header: 'Imię',
      content: 'Test'
    },
    {
      id: 3,
      header: 'Nazwisko',
      content: 'Nazwisko test'
    },
    {
      id: 4,
      header: 'Email',
      content: 'test@test.pl'
    }
  ];

  return (
    <>
      <UIHeader>Moje konto</UIHeader>
      <UITable columns={columns} data={data} noHeader />
    </>
  );
}
