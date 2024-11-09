import { cookies } from 'next/headers';
import { Column } from '@/src/types';
import { ResponseAPI, Role, Pager } from '@/src/types';
import { getPager } from '@/src/utils/pager';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UITable from '@/src/components/UI/Table';
import UIPagination from '@/src/components/UI/Pagination';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type EventsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function fetchData(pager: Pager) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  return [];

  // const accessToken = JSON.parse(authCookie).accessToken;
  // const response = await fetch(`${url}/role/list`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + accessToken
  //   }
  // });

  // if (!response.ok) return [];

  // const data: ResponseAPI<Role[]> = await response.json();

  // return data.data ?? [];
}

export default async function Events({ searchParams }: EventsProps) {
  const pager = getPager(searchParams);
  const data = await fetchData(pager);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Nazwa',
      item: (item) => <span>{(item as Role).name}</span>,
      sort: 'name'
    },
    {
      id: 2,
      header: '',
      item: (item: any) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/events/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Lista wydarzeń">
          <UIButton href="/events/add" icon="PlusIcon">
            Dodaj wydarzenie
          </UIButton>
        </UIPanel>
      }
      footer={<UIPagination pager={pager} />}
      background={false}
    >
      <UITable columns={columns} pager={pager} data={data} />
    </UICard>
  );
}
