'use client';

import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import UIHeader from '@/src/components/UI/Header';

type Detail = {
  detailName: string;
  detailData: string | number | undefined;
};

type DetailsComponentProps = {
  details: Detail[];
  header: string | undefined;
};

export default function UIDetails({ details, header }: DetailsComponentProps) {
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detailsContainer = detailsRef.current;
    if (detailsContainer) {
      const items = Array.from(detailsContainer.children) as HTMLElement[];
      items.forEach((item) => item.classList.remove(styles['details__item--no-border']));

      let rowTopOffset = items[0]?.offsetTop;
      items.forEach((item, index) => {
        if (item.offsetTop !== rowTopOffset) {
          items[index - 1].classList.add(styles['details__item--no-border']);
          rowTopOffset = item.offsetTop;
        }
      });
      items[items.length - 1].classList.add(styles['details__item--no-border']);
      detailsContainer.style.visibility = 'visible';
    }
  }, [details]);

  return (
    <div className={styles['details-container']}>
      <UIHeader>{header}</UIHeader>
      <div className={styles.details} ref={detailsRef}>
        {details.map((detail, index) => (
          <div className={styles.details__item} key={index}>
            <span className={styles.header}>{detail.detailName}:</span>
            <p>{detail.detailData}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
