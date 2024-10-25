'use client';

import { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import UIButton from '@/src/components/UI/Button';

type UIAccordionProps = {
  variant?: 'primary' | 'gray';
  header: ReactNode;
  children: ReactNode;
};

export default function UIAccordion({ variant, header, children }: UIAccordionProps) {
  const [isOpened, setIsOpened] = useState(false);
  const variantClass = variant === 'primary' ? styles.primary : styles.gray;

  function handleClick() {
    setIsOpened((prev) => !prev);
  }

  return (
    <div className={`${styles.accordion} ${variantClass}`}>
      <div className={styles.accordionHeader}>
        <div className={styles.header}>{header}</div>
        <UIButton.Toggle variant={variant} isOpened={isOpened} onClick={handleClick} />
      </div>
      <div className={`${styles.accordionBody} ${isOpened ? styles.opened : ''}`}>
        <div className={styles.content}>
          <div className={styles.padding}>{children}</div>
        </div>
      </div>
    </div>
  );
}
