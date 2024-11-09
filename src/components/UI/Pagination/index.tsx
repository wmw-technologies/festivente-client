'use client';

import React from 'react';
import { Pager } from '@/src/types';
import { ALLOWED_PER_PAGE } from '@/src/utils/pager';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';
import UIIcon from '@/src/components/UI/Icon';

type UIPaginationProps = {
  pager: Pager;
};

const MAX_PAGES_TO_SHOW = 3;

export default function UIPagination({ pager }: UIPaginationProps) {
  const router = useRouter();
  const totalPages = Math.ceil(pager.total / pager.perPage);

  const getPageRange = () => {
    const currentPage = pager.page;
    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
    let endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);

    if (endPage - startPage < MAX_PAGES_TO_SHOW - 1) {
      startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  const handleChangePage = (page: number) => {
    router.push(`?page=${page}&perPage=${pager.perPage}&sort=${pager.sort}&order=${pager.order}`);
  };

  const handleRowsPerPageChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    router.push(`?page=1&perPage=${value}&sort=${pager.sort}&order=${pager.order}`);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles['pagination__set-page']}>
        <button className={styles.button} disabled={pager.page === 1} onClick={() => handleChangePage(pager.page - 1)}>
          <UIIcon name="ArrowLeftIcon" />
        </button>
        {startPage !== 1 ? (
          <div className={styles.dots}>
            <UIIcon name="EllipsisHorizontalIcon" smaller />
          </div>
        ) : (
          ''
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            className={`${pager.page === page ? styles.active : ''} ${styles.button}`}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </button>
        ))}
        {endPage !== totalPages ? (
          <div className={styles.dots}>
            <UIIcon name="EllipsisHorizontalIcon" smaller />
          </div>
        ) : (
          ''
        )}
        <button
          className={styles.button}
          disabled={pager.page === totalPages}
          onClick={() => handleChangePage(pager.page + 1)}
        >
          <UIIcon name="ArrowRightIcon" />
        </button>
      </div>
      <div className={styles['pagination__set-rows']}>
        <span className={styles.perPage}>
          Ilość stron: {startPage} &ndash; {endPage} z {totalPages}
        </span>
        <select value={pager.perPage} className={styles.pagination__select} onChange={handleRowsPerPageChange}>
          {ALLOWED_PER_PAGE.map((perPage) => (
            <option key={perPage} value={perPage}>
              {perPage}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
