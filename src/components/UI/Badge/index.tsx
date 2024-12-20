import { ReactNode, MouseEvent } from 'react';
import styles from './index.module.scss';
import UIIcon from '@/src/components/UI/Icon';

type UIBadgeProps = {
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  children: ReactNode;
  onClick?: () => void;
};

export default function UIBadge({ variant = 'primary', children, onClick }: UIBadgeProps) {
  const classVariant = styles[variant];

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    onClick && onClick();
  }

  return (
    <div className={`${styles.badge} ${classVariant}`}>
      <span>{children}</span>
      {onClick ? (
        <div className={styles.clear} onClick={handleClick}>
          <UIIcon name="XCircleIcon" smaller />
        </div>
      ) : null}
    </div>
  );
}
