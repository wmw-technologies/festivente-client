import { Column } from '@/src/types';
import styles from './index.module.scss';

type UITableProps = {
  columns: Array<Column>;
  data: Array<unknown>;
  noHeader?: boolean;
};

export default function UITable({ columns, data, noHeader }: UITableProps) {
  return (
    <table className={styles.table}>
      {!noHeader && (
        <thead className={styles.thead}>
          <tr>
            {columns.map((column) => (
              <th key={column.id} style={{ width: column.width }}>
                <span>{column.header}</span>
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
      </tbody>
    </table>
  );
}
