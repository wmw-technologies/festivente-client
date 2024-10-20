import UIDropdown from '../Dropdown';
import UIIcon from '@/src/components/UI/Icon';
import styles from './index.module.scss';
import Pager from '@/src/utils/pager';

type UIPaginationProps = {
  pager: Pager;
  setPager: (pager: Pager) => void;
};

export default function UIPagination({ pager, setPager }: UIPaginationProps) {
  const totalPages = Math.ceil(pager.getTotal() / pager.getPerPage());
  const maxPagesToShow = 3;

  const getPageRange = () => {
    const currentPage = pager.getPage();
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  const handleRowsPerPageChange = (newPerPage: number) => {
    pager.setPerPage(newPerPage);
    setPager(new Pager(1, newPerPage, pager.getSort(), pager.getOrder()));
  };

  return (
    <div className={styles.pagination}>
      <div className={styles['pagination__set-page']}>
        <button
          className={styles.button}
          onClick={() =>
            setPager(new Pager(pager.getPage() - 1, pager.getPerPage(), pager.getSort(), pager.getOrder()))
          }
          disabled={pager.getPage() === 1}
        >
          <UIIcon name={'ArrowLeftIcon'} />
        </button>
        {startPage !== 1 ? '...' : ''}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            className={`${pager.getPage() === page ? styles.active : ''} ${styles.button}`}
            onClick={() => setPager(new Pager(page, pager.getPerPage(), pager.getSort(), pager.getOrder()))}
          >
            {page}
          </button>
        ))}
        {endPage !== totalPages ? '...' : ''}
        <button
          className={styles.button}
          onClick={() =>
            setPager(new Pager(pager.getPage() + 1, pager.getPerPage(), pager.getSort(), pager.getOrder()))
          }
          disabled={pager.getPage() === totalPages}
        >
          <UIIcon name={'ArrowRightIcon'} />
        </button>
      </div>
      <div className={styles['pagination__set-rows']}>
        <span className={styles.perPage}>Ilość wierszy:</span>
        <UIDropdown icon="ArrowDownIcon" smaller>
          <UIDropdown.Item onClick={() => handleRowsPerPageChange(3)}>3</UIDropdown.Item>
          <UIDropdown.Item onClick={() => handleRowsPerPageChange(5)}>5</UIDropdown.Item>
          <UIDropdown.Item onClick={() => handleRowsPerPageChange(15)}>15</UIDropdown.Item>
        </UIDropdown>
      </div>
    </div>
  );
}
