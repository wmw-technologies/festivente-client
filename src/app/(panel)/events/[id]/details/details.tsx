'use client';

import styles from './details.module.scss';
import UIBadge from '@/src/components/UI/Badge';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIDetails from '@/src/components/UI/Details';
import UIPanel from '@/src/components/UI/Panel';
import UITable from '@/src/components/UI/Table';
import { Column, Employee, Event, Transport } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
import { exportToExcel } from '@/src/utils/globalFunctions';
import { useEffect, useState } from 'react';
import { getStatus, getStatusVariant } from '../../../rentals/utis';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type DetailsProps = {
  id: string;
  data: Event | null;
  transport: Transport[];
};

export default function Details({ id, data, transport }: DetailsProps) {
  const [transportData, setTransportData] = useState<Transport[]>(transport);

  useEffect(() => {
    const transportsInEvent = transport.filter((item) => item.event._id === id);
    setTransportData(transportsInEvent);
  }, [transport]);

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Imię',
      item: (item: Employee) => <span>{item.firstName}</span>
    },
    {
      id: 2,
      header: 'Nazwisko',
      item: (item: Employee) => <span>{item.lastName}</span>
    },
    {
      id: 3,
      header: 'Email',
      item: (item: Employee) => <span>{item.email}</span>
    },
    {
      id: 4,
      header: 'Telefon',
      item: (item: Employee) => <span>{item.phone}</span>
    },
    {
      id: 5,
      header: 'Rola',
      item: (item: Employee) => <span>{item.position}</span>
    },
    {
      id: 6,
      header: 'Stawka dzienna',
      item: (item: Employee) => <span>{item.dailyRate}</span>
    }
  ];

  const TransportColumns: Array<Column> = [
    {
      id: 1,
      header: 'Odjazd',
      item: (item: Transport) => <span>{formatDateTime(item.departureTime)}</span>
    },
    {
      id: 2,
      header: 'Przyjazd',
      item: (item: Transport) => <span>{formatDateTime(item.arrivalTime)}</span>
    },
    {
      id: 3,
      header: 'Skąd',
      item: (item: Transport) => <span>{item.departureLocation}</span>
    },
    {
      id: 4,
      header: 'Dokąd',
      item: (item: Transport) => <span>{item.destinationLocation}</span>
    },
    {
      id: 5,
      header: 'Kontakt (numer telefonu)',
      item: (item: Transport) => <span>{dashIfEmpty(item.phoneNumber)}</span>
    },
    {
      id: 6,
      header: 'Status',
      item: (item: Transport) => <UIBadge variant={getStatusVariant(item.status)}>{getStatus(item.status)}</UIBadge>
    },
    {
      id: 7,
      header: '',
      item: (item: Transport) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/transport/${item._id}/details`}>Szczegóły</UIDropdownItem>
          <UIDropdownItem href={`/transport/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  const details = [
    { detailName: 'Nazwa klienta', detailData: data?.clientName },
    { detailName: 'Email klienta', detailData: data?.clientEmail },
    { detailName: 'Telefon klienta', detailData: data?.clientPhone },
    { detailName: 'Data', detailData: formatDateTime(data?.date) },
    { detailName: 'Lokalizacja', detailData: data?.location },
    { detailName: 'Budżet', detailData: formatCurrency(data?.budget) },
    { detailName: 'Przewidywana ilość godzin', detailData: dashIfEmpty(data?.estimatedHours) },
    { detailName: 'Prawdziwa ilość godzin', detailData: dashIfEmpty(data?.actualHours) },
    { detailName: 'Status', detailData: data?.status },
    { detailName: 'Utworzono', detailData: formatDateTime(data?.createdAt) },
    { detailName: 'Zaktualizowano', detailData: formatDateTime(data?.updatedAt) },
    { detailName: 'Notatki', detailData: dashIfEmpty(data?.notes) },
    { detailName: 'Opis', detailData: dashIfEmpty(data?.description) }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/events" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton href={`/events/${id}`} icon="PencilSquareIcon">
            Edytuj
          </UIButton>
          <UIButton
            icon="TableCellsIcon"
            type="button"
            variant="black"
            onClick={() => exportToExcel(details, 'Wydarzenie')}
          >
            Eksport do excel
          </UIButton>
        </UIPanel>
      }
    >
      <UIDetails header={data?.eventName} details={details} />
      <h2 className={styles['table-header']}>Tabela pracownicy:</h2>
      <UITable columns={columns} data={data?.assignedEmployees ?? []} />
      <h2 className={styles['table-header']}>Tabela transport:</h2>
      <UITable columns={TransportColumns} data={transportData} />
    </UICard>
  );
}
