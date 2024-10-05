import { ReactNode } from 'react';
import styles from './index.module.scss';
import { Icon } from '@/src/types';
import UIIcon from '@/src/components/UI/Icon';

type UIButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  icon?: Icon;
  children?: ReactNode;
  onClick?: () => void;
};

function UIButton({ type = 'button', icon, children, onClick }: UIButtonProps) {
  return (
    <div className={styles.containerButton} onClick={onClick}>
      <button type={type} className={styles.button}>
        {icon && <UIIcon name={icon} smaller />}
        <span>{children}</span>
      </button>
    </div>
  );
}

type UIActionButtonProps = {
  icon: Icon;
  variant?: 'gray' | 'black';
  active?: boolean;
  disabled?: boolean;
  smaller?: boolean;
  onClick?: () => void;
};

function UIActionButton({ icon, variant = 'black', disabled, smaller, onClick }: UIActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="button"
      className={`${styles.actionButton} ${variant === 'black' ? styles.black : styles.gray}`}
      onClick={onClick}
    >
      <UIIcon name={icon} smaller={smaller} />
    </button>
  );
}

type UIToggleButtonProps = {
  isOpen: boolean;
  variant?: 'gray' | 'blue';
};

function UIToggleButton({ isOpen }: UIToggleButtonProps) {
  return (
    <button type="button" title={isOpen ? 'Rozwiń' : 'Zwiń'} className={styles.toggleButton}>
      <UIIcon name={isOpen ? 'PlusIcon' : 'MinusIcon'} />
    </button>
  );
}

UIButton.Action = UIActionButton;
UIButton.Toggle = UIToggleButton;

export default UIButton;
