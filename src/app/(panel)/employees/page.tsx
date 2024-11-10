import { cookies } from 'next/headers';
import { formatCurrency } from '@/src/utils/format';
import { ResponseAPI, Employee, Pager, Pagination } from '@/src/types';
import { positions } from '@/src/constants';
import { getPager } from '@/src/utils/pager';
import styles from './page.module.scss';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UIHeader from '@/src/components/UI/Header';
import UIBadge from '@/src/components/UI/Badge';
import UIPagination from '@/src/components/UI/Pagination';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

type EmployeesProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function getPositionName(value: string) {
  return positions.find((item) => item.value === value)?.text ?? '';
}

async function fetchData(pager: Pager) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(
    `${url}/employee/list?page=${pager.page}&perPage=${pager.perPage}&sort=${pager.sort}&order=${pager.order}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    }
  );

  if (!response.ok) return [];

  const data: ResponseAPI<Pagination<Employee>> = await response.json();

  pager.total = data.data?.totalRows ?? 0;
  return data.data?.items ?? [];
}

export default async function Employees({ searchParams }: EmployeesProps) {
  const pager = getPager(searchParams);
  const data = await fetchData(pager);

  return (
    <UICard
      header={
        <UIPanel header="Pracownicy">
          <UIButton href="/employees/add" icon="PlusIcon">
            Dodaj pracownika
          </UIButton>
        </UIPanel>
      }
      footer={<UIPagination pager={pager} />}
      background={false}
    >
      {data.length ? (
        <div className={styles.grid}>
          {data.map((item) => (
            <UICard key={item._id}>
              <div className={styles.header}>
                <div>
                  <UIHeader>
                    {item.firstName} {item.lastName}
                  </UIHeader>
                  <UIBadge>{getPositionName(item.position)}</UIBadge>
                </div>
                <UIDropdown icon="EllipsisHorizontalIcon" smaller>
                  <UIDropdownItem href={`/employees/${item._id}`}>Edytuj</UIDropdownItem>
                </UIDropdown>
              </div>
              <div className={styles.info}>
                <div className={styles.group}>
                  <span>Email:</span>
                  <span>{item.email}</span>
                </div>
                {item.phone ? (
                  <div className={styles.group}>
                    <span>Nr tel:.</span>
                    <span>{item.phone}</span>
                  </div>
                ) : null}
                <div className={`${styles.group} ${styles.primary} mark`}>
                  Stawka dzienna: {formatCurrency(item.dailyRate ?? 0)}
                </div>
              </div>
            </UICard>
          ))}
        </div>
      ) : (
        <span className={styles.empty}>Brak dodanych pracowników</span>
      )}
    </UICard>
  );
}
