import { cookies } from 'next/headers';
import { ResponseAPI, Role, Option, WarehouseItem } from '@/src/types';
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

const warehouseData: WarehouseItem[] = [
  {
    _id: '1',
    name: 'Projektor',
    manufacturer: 'Epson',
    model: 'EB-X41',
    quantity: 3,
    serialNumbers: ['SN123456', 'SN123457', 'SN123458'],
    skuNumber: 'PROJ-EPX41',
    rentalValue: 1500,
    location: 'Magazyn A',
    warrantyEndDate: new Date('2023-12-31'),
    category: 'Elektronika',
    description: 'Projektor multimedialny do prezentacji i projekcji filmów',
    status: 'Dosępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-01-15'),
    modificationDate: new Date('2022-06-20')
  },
  {
    _id: '2',
    name: 'Laptop',
    manufacturer: 'Dell',
    model: 'XPS 15',
    quantity: 5,
    serialNumbers: ['SN223456', 'SN223457', 'SN223458', 'SN223459', 'SN223460'],
    skuNumber: 'LAP-DXPS15',
    rentalValue: 2500,
    location: 'Magazyn B',
    warrantyEndDate: new Date('2024-05-15'),
    category: 'Elektronika',
    description: '',
    status: 'Dostępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-02-10'),
    modificationDate: new Date('2022-07-15')
  },
  {
    _id: '3',
    name: 'Krzesło',
    manufacturer: 'Herman Miller',
    model: 'Aeron',
    quantity: 10,
    serialNumbers: [],
    skuNumber: 'CHAIR-HMAERON',
    rentalValue: 500,
    location: 'Magazyn C',
    warrantyEndDate: new Date('2025-01-01'),
    category: 'Meble',
    description: 'Fotel biurowy ergonomiczny z regulacją wysokości i podłokietnikami',
    status: 'Dostępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-03-05'),
    modificationDate: new Date('2022-08-10')
  },
  {
    _id: '4',
    name: 'Kamera',
    manufacturer: 'Canon',
    model: 'EOS 5D Mark IV',
    quantity: 4,
    serialNumbers: ['SN323456', 'SN323457', 'SN323458', 'SN323459'],
    skuNumber: 'CAM-CAN5D4',
    rentalValue: 3000,
    location: 'Magazyn D',
    warrantyEndDate: new Date('2023-11-20'),
    category: 'Sprzęt fotograficzny',
    description: 'Profesjonalna lustrzanka cyfrowa do zdjęć i filmów w jakości 4K',
    status: 'Dostępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-04-01'),
    modificationDate: new Date('2022-09-15')
  },
  {
    _id: '5',
    name: 'Mikrofon',
    manufacturer: 'Shure',
    model: 'SM58',
    quantity: 20,
    serialNumbers: [],
    skuNumber: 'MIC-SHSM58',
    rentalValue: 100,
    location: 'Magazyn E',
    warrantyEndDate: new Date('2024-07-10'),
    category: 'Audio',
    description: 'Dynamiczny mikrofon wokalowy do występów na żywo i nagrywania',
    status: 'Dostępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-05-12'),
    modificationDate: new Date('2022-10-20')
  },
  {
    _id: '6',
    name: 'Głośnik',
    manufacturer: 'Bose',
    model: 'L1 Compact',
    quantity: 6,
    serialNumbers: ['SN423456', 'SN423457', 'SN423458', 'SN423459', 'SN423460', 'SN423461'],
    skuNumber: 'SPK-BOL1C',
    rentalValue: 1200,
    location: 'Magazyn F',
    warrantyEndDate: new Date('2023-09-30'),
    category: 'Audio',
    description: 'System nagłośnieniowy z głośnikiem liniowym i mikserem audio',
    status: 'Dostępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-06-18'),
    modificationDate: new Date('2022-11-25')
  },
  {
    _id: '7',
    name: 'Oświetlenie LED',
    manufacturer: 'Neewer',
    model: 'LED Softbox',
    quantity: 8,
    serialNumbers: ['SN523456', 'SN523457', 'SN523458', 'SN523459', 'SN523460', 'SN523461', 'SN523462', 'SN523463'],
    skuNumber: 'LIGHT-NEELED',
    rentalValue: 800,
    location: 'Magazyn G',
    warrantyEndDate: new Date('2024-03-15'),
    category: 'Sprzęt oświetleniowy',
    description: 'Zestaw oświetleniowy LED z regulacją temperatury barwowej i mocy światła',
    status: 'Dostępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-07-22'),
    modificationDate: new Date('2022-12-30')
  },
  {
    _id: '8',
    name: 'Tripod',
    manufacturer: 'Manfrotto',
    model: 'MT190XPRO4',
    quantity: 15,
    serialNumbers: [
      'SN623456',
      'SN623457',
      'SN623458',
      'SN623459',
      'SN623460',
      'SN623461',
      'SN623462',
      'SN623463',
      'SN623464',
      'SN623465',
      'SN623466',
      'SN623467',
      'SN623468',
      'SN623469',
      'SN623470'
    ],
    skuNumber: 'TRIP-MT190',
    rentalValue: 200,
    location: 'Magazyn H',
    warrantyEndDate: new Date('2023-08-25'),
    category: 'Sprzęt fotograficzny',
    description: 'Professional tripod for cameras and camcorders',
    status: 'Dostępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-08-30'),
    modificationDate: new Date('2023-01-10')
  },
  {
    _id: '9',
    name: 'Mikser dźwięku',
    manufacturer: 'Yamaha',
    model: 'MG10XU',
    quantity: 7,
    serialNumbers: ['SN723456', 'SN723457', 'SN723458', 'SN723459', 'SN723460', 'SN723461', 'SN723462'],
    skuNumber: 'MIX-YAMG10',
    rentalValue: 600,
    location: 'Magazyn I',
    warrantyEndDate: new Date('2024-02-20'),
    category: 'Audio',
    description: 'Kompaktowy mikser dźwięku z interfejsem USB i efektami cyfrowymi',
    status: 'Dostępny',
    addedBy: '671a8fc05ba1b74ebde742b9',
    insertionDate: new Date('2022-09-15'),
    modificationDate: new Date('2023-02-05')
  }
];

export default async function AdministrationUsersForm({ params }: WarehouseItemsFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data: WarehouseItem | null = isEdit ? warehouseData.find((item) => item._id === id) || null : null;

  return <Form id={id} isEdit={isEdit} data={data} categories={categories} />;
}
