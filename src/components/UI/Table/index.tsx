import { Column } from '@/src/types';
import styles from './index.module.scss';
import UIIcon from '@/src/components/UI/Icon';

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
                {column.sortable ? (
                  <button type="button" className={styles.sortButton}>
                    <span>{column.header}</span>
                    <UIIcon name="ArrowDownCircleIcon" smaller />
                  </button>
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
