'use client';

import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIDetails from '@/src/components/UI/Details';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UITable from '@/src/components/UI/Table';
import UIPanel from '@/src/components/UI/Panel';
import { Column, Device, Rental, Warehouse } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
import React from 'react';

type DetailsProps = {
  id: string;
  data: Warehouse | null;
  rentals: Rental[][];
};

export default function Details({ id, data, rentals }: DetailsProps) {
  const findRentalWithDevice = (deviceID: string) => {
    const rental = rentals.flat().find((rental) => rental.devices.some((device) => device._id === deviceID));
    console.log(rental?._id);
    if (rental) {
      window.location.href = `/rentals/${rental._id}/details`;
    }
  };

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Id urządzenia',
      item: (item: Device) => <span>{item._id}</span>
    },
    {
      id: 2,
      header: 'Id wynajmu',
      item: (item: Device) => <span>{dashIfEmpty(String(item.rentalId))}</span>
    },
    {
      id: 3,
      header: 'Lokalizacja',
      item: (item: Device) => <span>{item.location}</span>
    },
    {
      id: 4,
      header: 'Numer seryjny',
      item: (item: Device) => <span>{dashIfEmpty(item.serialNumber)}</span>
    },
    {
      id: 5,
      header: 'Ostatnia aktualizacja',
      item: (item: Device) => <span>{formatDateTime(item.updatedAt)}</span>
    },
    {
      id: 6,
      header: 'Opis',
      item: (item: Device) => <span>{dashIfEmpty(item.description)}</span>
    },
    {
      id: 7,
      header: '',
      item: (item: Device) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem onClick={() => findRentalWithDevice(item._id)}>Do wypożyczenia</UIDropdownItem>
          <UIDropdownItem>Do serwisu</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  const details = [
    { detailName: 'Producent', detailData: data?.manufacturer },
    { detailName: 'SKU', detailData: data?.skuNumber },
    { detailName: 'Kategoria', detailData: data?.category },
    { detailName: 'Wartość wynajmu za dzień', detailData: formatCurrency(data?.rentalValue ?? 0) },
    { detailName: 'Dodane przez', detailData: `${data?.createdBy.first_name} ${data?.createdBy.last_name}` },
    { detailName: 'Data dodania', detailData: formatDateTime(data?.createdAt) },
    { detailName: 'Data ostatniej aktualizacji', detailData: formatDateTime(data?.updatedAt) },
    { detailName: 'Opis', detailData: data?.description }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/warehouse" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton href={`/warehouse/${id}`}>Edytuj</UIButton>
        </UIPanel>
      }
    >
      <UIDetails details={details} header={data?.name} />

      <UITable columns={columns} data={data?.devices ?? []} />
    </UICard>
  );
}
