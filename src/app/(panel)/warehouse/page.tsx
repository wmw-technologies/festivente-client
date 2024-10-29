'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Pager from '@/src/utils/pager';
import { Column, IndyvidualItem, WarehouseItem } from '@/src/types';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UITable from '@/src/components/UI/Table';
import UIPagination from '@/src/components/UI/Pagination';

export default function Warehouse() {
  const router = useRouter();
  const [pager, setPager] = useState(new Pager(1, 3));

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Nazwa',
      item: (item: any) => <span>{item.name}</span>
    },
    {
      id: 2,
      header: 'Producent',
      item: (item: any) => <span>{item.manufacturer}</span>
    },
    {
      id: 3,
      header: 'SKU',
      item: (item: any) => <span>{item.skuNumber}</span>
    },
    {
      id: 4,
      header: 'Kategoria',
      item: (item: any) => <span>{item.category}</span>
    },
    {
      id: 5,
      header: 'Ilość',
      item: (item: any) => <span>{item.quantity}</span>
    },
    {
      id: 6,
      header: 'Wartość wynajmu',
      item: (item: any) => <span>{item.rentalValue}</span>
    },
    {
      id: 8,
      header: '',
      item: (item: any) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem onClick={() => handleEditItem(item._id)}>Edytuj</UIDropdownItem>
          <UIDropdownItem href={`/warehouse/${item._id}/items-list`}>Lista urządzeń</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  const warehouseIndyvidualItems: IndyvidualItem[] = [
    {
      _id: '1',
      name: 'Projektor',
      serialNumber: 'SN123456',
      skuNumber: 'PROJ-EPX41',
      rentalValue: 1500,
      location: 'Magazyn A',
      warrantyEndDate: new Date('2023-12-31'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-01-15'),
      modificationDate: new Date('2022-06-20'),
      warehouseItemID: '1'
    },
    {
      _id: '2',
      name: 'Projektor',
      serialNumber: 'SN123457',
      skuNumber: 'PROJ-EPX41',
      rentalValue: 1500,
      location: 'Magazyn A',
      warrantyEndDate: new Date('2023-12-31'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-01-15'),
      modificationDate: new Date('2022-06-20'),
      warehouseItemID: '1'
    },
    {
      _id: '3',
      name: 'Projektor',
      serialNumber: 'SN123458',
      skuNumber: 'PROJ-EPX41',
      rentalValue: 1500,
      location: 'Magazyn A',
      warrantyEndDate: new Date('2023-12-31'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-01-15'),
      modificationDate: new Date('2022-06-20'),
      warehouseItemID: '1'
    },
    {
      _id: '4',
      name: 'Laptop',
      serialNumber: 'SN123459',
      skuNumber: 'LAP-DXPS15',
      rentalValue: 2500,
      location: 'Magazyn B',
      warrantyEndDate: new Date('2023-12-31'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-02-10'),
      modificationDate: new Date('2022-07-15'),
      warehouseItemID: '2'
    },
    {
      _id: '5',
      name: 'Laptop',
      serialNumber: 'SN123460',
      skuNumber: 'LAP-DXPS15',
      rentalValue: 2500,
      location: 'Magazyn B',
      warrantyEndDate: new Date('2023-12-31'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-02-10'),
      modificationDate: new Date('2022-07-15'),
      warehouseItemID: '2'
    },
    {
      _id: '6',
      name: 'Laptop',
      serialNumber: 'SN123461',
      skuNumber: 'LAP-DXPS15',
      rentalValue: 2500,
      location: 'Magazyn B',
      warrantyEndDate: new Date('2023-12-31'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-02-10'),
      modificationDate: new Date('2022-07-15'),
      warehouseItemID: '2'
    },
    {
      _id: '7',
      name: 'Laptop',
      serialNumber: 'SN123344',
      skuNumber: 'LAP-DXPS15',
      rentalValue: 2500,
      location: 'Magazyn B',
      warrantyEndDate: new Date('2023-12-31'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-02-10'),
      modificationDate: new Date('2022-07-15'),
      warehouseItemID: '2'
    },
    {
      _id: '8',
      name: 'Laptop',
      serialNumber: 'SN123469',
      skuNumber: 'LAP-DXPS15',
      rentalValue: 2500,
      location: 'Magazyn B',
      warrantyEndDate: new Date('2023-12-31'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-02-10'),
      modificationDate: new Date('2022-07-15'),
      warehouseItemID: '2'
    },
    {
      _id: '9',
      name: 'Krzesło',
      serialNumber: 'SN123470',
      skuNumber: 'CHAIR-HMAERON',
      rentalValue: 500,
      location: 'Magazyn C',
      warrantyEndDate: new Date('2025-01-01'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-03-05'),
      modificationDate: new Date('2022-08-10'),
      warehouseItemID: '3'
    },
    {
      _id: '10',
      name: 'Krzesło',
      serialNumber: 'SN123471',
      skuNumber: 'CHAIR-HMAERON',
      rentalValue: 500,
      location: 'Magazyn C',
      warrantyEndDate: new Date('2025-01-01'),
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-03-05'),
      modificationDate: new Date('2022-08-10'),
      warehouseItemID: '3'
    }
  ];

  const warehouseItems: WarehouseItem[] = [
    {
      _id: '1',
      name: 'Projektor',
      manufacturer: 'Epson',
      model: 'EB-X41',
      quantity: 3,
      skuNumber: 'PROJ-EPX41',
      rentalValue: 1500,
      category: 'Elektronika',
      description: 'Projektor multimedialny do prezentacji i projekcji filmów',
      status: 'Dosępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-01-15'),
      modificationDate: new Date('2022-06-20'),
      indyvidualItems: warehouseIndyvidualItems
    },
    {
      _id: '2',
      name: 'Laptop',
      manufacturer: 'Dell',
      model: 'XPS 15',
      quantity: 5,
      skuNumber: 'LAP-DXPS15',
      rentalValue: 2500,
      category: 'Elektronika',
      description: '',
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-02-10'),
      modificationDate: new Date('2022-07-15'),
      indyvidualItems: warehouseIndyvidualItems
    },
    {
      _id: '3',
      name: 'Krzesło',
      manufacturer: 'Herman Miller',
      model: 'Aeron',
      quantity: 2,
      skuNumber: 'CHAIR-HMAERON',
      rentalValue: 500,
      category: 'Meble',
      description: 'Fotel biurowy ergonomiczny z regulacją wysokości i podłokietnikami',
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-03-05'),
      modificationDate: new Date('2022-08-10'),
      indyvidualItems: warehouseIndyvidualItems
    },
    {
      _id: '4',
      name: 'Kamera',
      manufacturer: 'Canon',
      model: 'EOS 5D Mark IV',
      quantity: 0,
      skuNumber: 'CAM-CAN5D4',
      rentalValue: 3000,
      category: 'Sprzęt fotograficzny',
      description: 'Profesjonalna lustrzanka cyfrowa do zdjęć i filmów w jakości 4K',
      status: 'Dostępny',
      addedBy: '671a8fc05ba1b74ebde742b9',
      insertionDate: new Date('2022-04-01'),
      modificationDate: new Date('2022-09-15')
    }
  ];

  pager.setTotal(warehouseItems.length);

  function handleAddItem() {
    router.push('/warehouse/add');
  }

  function handleEditItem(id: number) {
    console.log(id);
    router.push(`/warehouse/${id}`);
  }

  return (
    <UICard
      header={
        <UIPanel header="Magazyn">
          <UIButton icon="PlusIcon" onClick={handleAddItem}>
            Dodaj urządzenie
          </UIButton>
        </UIPanel>
      }
      footer={<UIPagination pager={pager} setPager={setPager} />}
      background={false}
    >
      <UITable
        columns={columns}
        data={warehouseItems.slice((pager.getPage() - 1) * pager.getPerPage(), pager.getPage() * pager.getPerPage())}
      />
    </UICard>
  );
}
