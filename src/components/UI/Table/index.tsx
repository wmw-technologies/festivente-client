import { ReactNode } from 'react';
import styles from './index.module.scss';
// import UIIcon from '@/src/components/UI/Icon';

interface Column {
  id: number;
  header: any;
  item: (item: unknown, index: number) => ReactNode;
  // width?: string;
}

type UITableProps = {
  columns: Array<Column>;
  data: Array<unknown>;
  // sort?: boolean;
};

export default function UITable({ columns, data }: UITableProps) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>
              {/* <button type="button" className="flex items-center outline-none"> */}
              <span>{column.header}</span>
              {/* <BaseIcon v-if="item.sort" name="ArrowDownCircleIcon" class="ml-2" smaller /> */}
              {/* </button> */}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.id}>{column.item(item, index)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
