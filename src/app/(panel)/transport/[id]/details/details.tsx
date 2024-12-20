'use client';

import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import { Column, Transport, Vehicle } from '@/src/types';
import { dashIfEmpty, formatDateTime } from '@/src/utils/format';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UIDetails from '@/src/components/UI/Details';
import UITable from '@/src/components/UI/Table';
import { exportToExcel } from '@/src/utils/globalFunctions';

type DetailsProps = {
  id: string;
  data: Transport | null;
};

export default function Details({ id, data }: DetailsProps) {
  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Marka',
      item: (item: Vehicle) => <span>{item.brand}</span>
    },
    {
      id: 2,
      header: 'Model',
      item: (item: Vehicle) => <span>{item.model}</span>
    },
    {
      id: 3,
      header: 'Numer rejestracyjny',
      item: (item: Vehicle) => <span>{item.registrationNumber}</span>
    },
    {
      id: 4,
      header: 'Cena za km',
      item: (item: Vehicle) => <span>{item.pricePerKm}</span>
    },
    {
      id: 5,
      header: 'Data przeglądu',
      item: (item: Vehicle) => <span>{formatDateTime(item.inspectionDate)}</span>
    },
    {
      id: 6,
      header: 'Data ubezpieczenia',
      item: (item: Vehicle) => <span>{formatDateTime(item.insuranceDate)}</span>
    },
    {
      id: 7,
      header: '',
      item: (item: Vehicle) => (
        <UIDropdown icon="EllipsisHorizontalIcon" smaller>
          <UIDropdownItem href={`/vehicles/${item._id}/details`}>Szczegóły</UIDropdownItem>
          <UIDropdownItem href={`/vehicles/${item._id}`}>Edytuj</UIDropdownItem>
        </UIDropdown>
      ),
      width: 36
    }
  ];

  const details = [
    { detailName: 'Nazwa imprezy', detailData: data?.event.eventName },
    // { detailName: 'Rodzaj pojazdu', detailData: data?.vehicleType },
    // { detailName: 'Kierowca', detailData: `${data?.driver.firstName} ${data?.driver.lastName}` },
    { detailName: 'Kontakt do kierwocy', detailData: `tel:${data?.phoneNumber}` },
    { detailName: 'Czas wyjazdu', detailData: formatDateTime(data?.departureTime) },
    { detailName: 'Czas przybycia', detailData: formatDateTime(data?.arrivalTime) },
    { detailName: 'Miesjce wyjazdu', detailData: data?.event.location },
    { detailName: 'Miejsce docelowe', detailData: data?.event.location },
    { detailName: 'Status', detailData: data?.event.status },
    { detailName: 'Utworzono', detailData: formatDateTime(data?.createdAt) },
    { detailName: 'Zaktualizowano', detailData: formatDateTime(data?.updatedAt) },
    { detailName: 'Opis', detailData: dashIfEmpty(data?.notes) }
  ];

  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/transport" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton href={`/transport/${id}`} icon="PencilSquareIcon">
            Edytuj
          </UIButton>
          <UIButton href={`/events/${data?.event._id}/details`}>Szczegóły wydarzenia</UIButton>
          <UIButton onClick={() => exportToExcel(details, 'Transport')}>Eksportuj do Excel</UIButton>
        </UIPanel>
      }
    >
      <UIDetails header={data?._id} details={details} />

      <UITable columns={columns} data={data?.vehicles ?? []} />
    </UICard>
  );
}
