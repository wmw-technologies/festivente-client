import { Column } from '@/src/types';
import UIHeader from '@/src/components/UI/Header';
import UITable from '@/src/components/UI/Table';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';

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
    <UICard header={<UIPanel header="Moje konto" />} background={false}>
      <UITable columns={columns} data={data} noHeader />
    </UICard>
  );
}
