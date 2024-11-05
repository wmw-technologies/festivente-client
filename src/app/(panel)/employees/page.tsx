import { cookies } from 'next/headers';
import { formatCurrency } from '@/src/utils/format';
import { ResponseAPI, Employee } from '@/src/types';
import { positions } from '@/src/constants';
import styles from './page.module.scss';
import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UIHeader from '@/src/components/UI/Header';
import UIBadge from '@/src/components/UI/Badge';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';

function getPositionName(value: string) {
  return positions.find((item) => item.value === value)?.text ?? '';
}

async function fetchData() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const authCookie = cookies().get('auth')?.value;
  if (!authCookie) return [];

  const accessToken = JSON.parse(authCookie).accessToken;
  const response = await fetch(`${url}/employees/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (!response.ok) return [];

  const data: ResponseAPI<Employee[]> = await response.json();

  return data.data ?? [];
}

export default async function Employees() {
  const data = await fetchData();

  return (
    <UICard
      header={
        <UIPanel header="Pracownicy">
          <UIButton href="/employees/add" icon="PlusIcon">
            Dodaj pracownika
          </UIButton>
        </UIPanel>
      }
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
