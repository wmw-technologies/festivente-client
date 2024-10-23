'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Pager from '@/src/utils/pager';
import { Column } from '@/src/types';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UIDropdown from '@/src/components/UI/Dropdown';
import UITable from '@/src/components/UI/Table';
import UIPagination from '@/src/components/UI/Pagination';

export default function Warehouse() {
  const router = useRouter();
  const [pager, setPager] = useState(new Pager(1, 3));

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'ID',
      item: (item: any) => <span>{item.id}</span>
    },
    {
      id: 2,
      header: 'Name',
      item: (item: any) => <span>{item.name}</span>
    },
    {
      id: 3,
      header: 'Producer',
      item: (item: any) => <span>{item.producer}</span>
    },
    {
      id: 4,
      header: 'Serial number',
      item: (item: any) => <span>{item.serialNumber}</span>
    },
    {
      id: 5,
      header: 'Add date',
      item: (item: any) => <span>{item.addDate || '-'}</span>
    },
    {
      id: 6,
      header: 'Category',
      item: (item: any) => <span>{item.category}</span>
    },
    {
      id: 7,
      header: 'Quantity',
      item: (item: any) => <span>{item.quantity}</span>
    },
    {
      id: 8,
      header: 'Value',
      item: (item: any) => <span>{item.value}</span>
    },
    {
      id: 9,
      header: '',
      item: (item: any) => (
        <UIDropdown icon="EllipsisVerticalIcon" smaller>
          <UIDropdown.Item onClick={() => handleEdit(item.id)}>Edytuj</UIDropdown.Item>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  const data = [
    {
      id: 1,
      name: 'Lampa',
      producer: 'Philips',
      serialNumber: '123123',
      addDate: '12.12.2021',
      category: 'Oświetlenie',
      quantity: 10,
      value: '100 PLN'
    },
    {
      id: 2,
      name: 'Głośnik',
      producer: 'Sony',
      serialNumber: '456456',
      addDate: '15.01.2022',
      category: 'Nagłośnienie',
      quantity: 5,
      value: '500 PLN'
    },
    {
      id: 3,
      name: 'Projektor',
      producer: 'Epson',
      serialNumber: '789789',
      addDate: '20.02.2022',
      category: 'Projektory',
      quantity: 3,
      value: '1500 PLN'
    },
    {
      id: 4,
      name: 'Mikrofon',
      producer: 'Shure',
      serialNumber: '101112',
      addDate: '05.03.2022',
      category: 'Nagłośnienie',
      quantity: 15,
      value: '200 PLN'
    },
    {
      id: 5,
      name: 'Kamera',
      producer: 'Canon',
      serialNumber: '131415',
      addDate: '10.04.2022',
      category: 'Kamery',
      quantity: 7,
      value: '2500 PLN'
    },
    {
      id: 6,
      name: 'Statyw',
      producer: 'Manfrotto',
      serialNumber: '161718',
      addDate: '20.05.2022',
      category: 'Akcesoria',
      quantity: 20,
      value: '300 PLN'
    },
    {
      id: 7,
      name: 'Ekran projekcyjny',
      producer: 'Elite Screens',
      serialNumber: '192021',
      addDate: '25.06.2022',
      category: 'Projektory',
      quantity: 5,
      value: '800 PLN'
    },
    {
      id: 8,
      name: 'Mikser dźwięku',
      producer: 'Yamaha',
      serialNumber: '222324',
      addDate: '30.07.2022',
      category: 'Nagłośnienie',
      quantity: 2,
      value: '3500 PLN'
    },
    {
      id: 9,
      name: 'Reflektor sceniczny',
      producer: 'Chauvet',
      serialNumber: '252627',
      addDate: '15.08.2022',
      category: 'Oświetlenie',
      quantity: 8,
      value: '1200 PLN'
    },
    {
      id: 10,
      name: 'Mikser wideo',
      producer: 'Blackmagic Design',
      serialNumber: '282930',
      addDate: '01.09.2022',
      category: 'Wideo',
      quantity: 3,
      value: '4000 PLN'
    }
  ];
  pager.setTotal(data.length);

  function handleAddUser() {
    router.push('/administration/users/add');
  }

  function handleEdit(id: number) {
    router.push(`/administration/users/${id}`);
  }

  return (
    <UICard
      header={
        <UIPanel header="Magazyn">
          <UIButton icon="PlusIcon" onClick={handleAddUser}>
            Dodaj urządzenie
          </UIButton>
        </UIPanel>
      }
      footer={<UIPagination pager={pager} setPager={setPager} />}
      background={false}
    >
      <UITable
        columns={columns}
        data={data.slice((pager.getPage() - 1) * pager.getPerPage(), pager.getPage() * pager.getPerPage())}
      />
    </UICard>
  );
}
