import styles from './index.module.scss';
import UIIcon from '@/src/components/UI/Icon';

type UITableProps = {
  isOpen: boolean;
  variant?: 'gray' | 'blue';
};

export default function UITable({ isOpen }: UITableProps) {
  return (
    <button type="button" title={isOpen ? 'Rozwiń' : 'Zwiń'} className={styles.button}>
      <UIIcon name={isOpen ? 'PlusIcon' : 'MinusIcon'} />
    </button>
  );
}
