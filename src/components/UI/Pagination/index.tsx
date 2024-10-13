import UIButton from '../Button';
import styles from './index.module.scss';

type UIPaginationProps = {
  data: {
    id: number;
    login: string;
    name: string;
    surname: string;
    email: string;
  }[];
  current: number;
  onChange: (page: number) => void;
};

export default function UIPagination({ data, current, onChange }: UIPaginationProps) {
  const recordsPerPage = 5;
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handlePrev = () => {
    if (current > 1) onChange(current - 1);
  };

  const handleNext = () => {
    if (current < totalPages) onChange(current + 1);
  };
  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={handlePrev} disabled={current === 1}>
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`${current === page ? styles.active : ''} ${styles.button}`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button className={styles.button} onClick={handleNext} disabled={current === totalPages}>
        Next
      </button>
    </div>
  );
}
