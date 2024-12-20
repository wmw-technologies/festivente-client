'use client';

import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIDetails from '@/src/components/UI/Details';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UITable from '@/src/components/UI/Table';
import UIPanel from '@/src/components/UI/Panel';
import { Column, Device, Rental, Service, Warehouse } from '@/src/types';
import { dashIfEmpty, formatCurrency, formatDateTime } from '@/src/utils/format';

type DetailsProps = {
  id: string;
  data: Warehouse | null;
  rentals: Rental[];
  services: Service[];
};

export default function Details({ id, data, rentals, services }: DetailsProps) {
  const findDeviceInRentals = (deviceId: string) => {
    return rentals.find((rental) => rental.devices.some((rentalDevice) => rentalDevice._id === deviceId))?._id;
  };

  const findDeviceInServices = (deviceId: string) => {
    return services.find((service) => service.device._id === deviceId)?._id;
  };

  const columns: Array<Column> = [
    {
      id: 1,
      header: 'Id urządzenia',
      item: (item: Device) => <span>{item._id}</span>
    },
    {
      id: 2,
      header: 'Lokalizacja',
      item: (item: Device) => <span>{item.location}</span>
    },
    {
      id: 3,
      header: 'Numer seryjny',
      item: (item: Device) => <span>{dashIfEmpty(item.serialNumber)}</span>
    },
    {
      id: 4,
      header: 'Ostatnia aktualizacja',
      item: (item: Device) => <span>{formatDateTime(item.updatedAt)}</span>
    },
    {
      id: 5,
      header: 'Opis',
      item: (item: Device) => <span>{dashIfEmpty(item.description)}</span>
    },
    {
      id: 6,
      header: '',
      item: (item: Device) =>
        findDeviceInRentals(item._id) || findDeviceInServices(item._id) ? (
          <UIDropdown icon="EllipsisHorizontalIcon" smaller>
            {findDeviceInRentals(item._id) && (
              <UIDropdownItem href={`/rentals/${findDeviceInRentals(item._id)}/details`}>
                Do wypożyczenia
              </UIDropdownItem>
            )}
            {findDeviceInServices(item._id) && (
              <UIDropdownItem href={`/service/${findDeviceInServices(item._id)}/details`}>Do serwisu</UIDropdownItem>
            )}
          </UIDropdown>
        ) : null,
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
          <UIButton href={`/warehouse/${id}`} icon="PencilSquareIcon">
            Edytuj
          </UIButton>
        </UIPanel>
      }
    >
      <UIDetails details={details} header={data?.name} />

      <UITable columns={columns} data={data?.devices ?? []} />
    </UICard>
  );
}
