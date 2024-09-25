'use client';

import { useState } from 'react';
import styles from './index.module.scss';
import UIIcon from '@/src/components/UI/Icon';

export default function SystemBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  function handleClick() {
    setIsBannerVisible(false);
  }

  if (!isBannerVisible) return null;

  return (
    <div className={styles.banner}>
      <p>Nowa wersja Festivente 0.0.1 już dostępna!</p>
      <button type="button" className={styles.bannerButton} aria-label="close-button" onClick={handleClick}>
        <UIIcon name={'XMarkIcon'} smaller />
      </button>
    </div>
  );
}
