import { Column, Pager } from '@/src/types';
import styles from './index.module.scss';
import Link from 'next/link';
import UIIcon from '@/src/components/UI/Icon';

type UITableProps = {
  columns: Array<Column>;
  pager?: Pager;
  data: Array<unknown>;
  noHeader?: boolean;
};

export default function UITable({ columns, pager, data, noHeader }: UITableProps) {
  function href(_sort: string) {
    if (pager == null) return '';

    const order = pager.sort === _sort && pager.order === 'ASC' ? 'DESC' : 'ASC';
    const sort = _sort;

    return `?page=${pager.page}&perPage=${pager.perPage}&sort=${sort}&order=${order}`;
  }

  function activeClass(column: Column) {
    if (pager == null) return '';

    if (pager.sort === column.sort) {
      if (pager.order === 'ASC') return `${styles.active} ${styles.rotate}`;

      return styles.active;
    }

    return '';
  }

  return (
    <table className={styles.table}>
      {!noHeader && (
        <thead className={styles.thead}>
          <tr>
            {columns.map((column) => (
              <th key={column.id} style={{ width: column.width }}>
                {column.sort ? (
                  <Link href={href(column.sort)} className={`${styles.sortButton} ${activeClass(column)}`}>
                    <span>{column.header}</span>
                    <div className={styles.arrow}>
                      <UIIcon name="ArrowDownCircleIcon" smaller />
                    </div>
                  </Link>
                ) : (
                  <span>{column.header}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={styles.tbody}>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.id} style={{ width: column.width }}>
                {column.item(item, index)}
              </td>
            ))}
          </tr>
        ))}
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length} className={styles.empty}>
              Brak danych
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
