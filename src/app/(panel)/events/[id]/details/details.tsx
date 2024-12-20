'use client';

import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIDetails from '@/src/components/UI/Details';
import UIPanel from '@/src/components/UI/Panel';
import UITable from '@/src/components/UI/Table';
import { getStatus } from '../../utils';
import { Column, Employee, Event } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';
import { exportToExcel } from '@/src/utils/globalFunctions';

type DetailsProps = {
  id: string;
  data: Event | null;
};

export default function Details({ id, data }: DetailsProps) {
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

  const details = [
    { detailName: 'Nazwa klienta', detailData: data?.clientName },
    { detailName: 'Email klienta', detailData: data?.clientEmail },
    { detailName: 'Telefon klienta', detailData: data?.clientPhone },
    { detailName: 'Data', detailData: formatDateTime(data?.date) },
    { detailName: 'Lokalizacja', detailData: data?.location },
    { detailName: 'Budżet', detailData: formatCurrency(data?.budget) },
    { detailName: 'Przewidywana ilość godzin', detailData: dashIfEmpty(data?.estimatedHours) },
    { detailName: 'Prawdziwa ilość godzin', detailData: dashIfEmpty(data?.actualHours) },
    { detailName: 'Status', detailData: getStatus(data?.status!) },
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
          {data?.status === 'Confirmed' ? <UIButton href={`/events/${id}`}>Edytuj</UIButton> : null}
          <UIButton type="button" variant="black" onClick={() => exportToExcel(details, 'Wydarzenie')}>
            Eksport do excel
          </UIButton>
        </UIPanel>
      }
    >
      <UIDetails header={data?.eventName} details={details} />

      <UITable columns={columns} data={data?.assignedEmployees ?? []} />
    </UICard>
  );
}
