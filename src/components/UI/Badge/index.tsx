import { ReactNode, MouseEvent } from 'react';
import styles from './index.module.scss';
import UIIcon from '@/src/components/UI/Icon';

type UIBadgeProps = {
  variant?: 'primary' | 'secondary' | 'success';
  children: ReactNode;
  onClick?: () => void;
};

export default function UIBadge({ variant = 'primary', children, onClick }: UIBadgeProps) {
  const classVariant =
    variant === 'primary' ? styles.primary : variant === 'secondary' ? styles.secondary : styles.success;

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    onClick && onClick();
  }

  return (
    <div className={`${styles.badge} ${classVariant}`}>
      {children}
      {onClick ? (
        <div className={styles.clear} onClick={handleClick}>
          <UIIcon name="XCircleIcon" smaller />
        </div>
      ) : null}
    </div>
  );
}
