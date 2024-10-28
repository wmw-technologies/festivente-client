import { cookies } from 'next/headers';
import { ResponseAPI, Role, Option, WarehouseItem, IndyvidualItem } from '@/src/types';
import Form from './form';

type WarehouseItemsFormProps = {
  params: {
    id: string;
  };
};

// async function fetchData(id: string) {
//   const url = process.env.NEXT_PUBLIC_API_URL;
//   const authCookie = cookies().get('auth')?.value;
//   if (!authCookie) return null;

//   const accessToken = JSON.parse(authCookie).accessToken;
//   const response = await fetch(`${url}/user/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + accessToken
//     }
//   });
//   if (!response.ok) return null;

//   const data: ResponseAPI<User> = await response.json();
//   return data.data ?? null;
// }

const categories: Option[] = [
  {
    text: 'Elektronika',
    value: 'Electronics'
  },
  {
    text: 'Meble',
    value: 'Furniture'
  },
  {
    text: 'Audio',
    value: 'Audio Equipment'
  },
  {
    text: 'Sprzęt oświetleniowy',
    value: 'Lighting Equipment'
  },
  {
    text: 'Sprzęt fotograficzny',
    value: 'Photography Equipment'
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

export default async function WarehouseForm({ params }: WarehouseItemsFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data: WarehouseItem | null = isEdit ? warehouseItems.find((item) => item._id === id) || null : null;

  return <Form id={id} isEdit={isEdit} data={data} categories={categories} />;
}
