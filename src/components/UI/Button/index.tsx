'use client';

import { MouseEvent, ReactNode } from 'react';
import styles from './index.module.scss';
import { Icon } from '@/src/types';
import Link from 'next/link';
import UIIcon from '@/src/components/UI/Icon';

type UIButtonProps = {
  href?: string;
  icon?: Icon;
  variant?: 'gray' | 'black' | 'success';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  form?: string;
  children?: ReactNode;
  onClick?: () => void;
};

function UIButton({ href, type = 'button', icon, variant, disabled, form, children, onClick }: UIButtonProps) {
  const variantClass = variant === 'gray' ? styles.gray : variant === 'success' ? styles.success : styles.black;

  if (href)
    return (
      <Link href={href} className={`${styles.button} ${variantClass}`}>
        {icon && <UIIcon name={icon} smaller />}
        <span>{children}</span>
      </Link>
    );

  return (
    <button
      type={type}
      form={form}
      className={`${styles.button} ${variantClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <UIIcon name={icon} smaller />}
      {children && <span>{children}</span>}
    </button>
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

function UIActionButton({ icon, variant = 'black', active, disabled, smaller, onClick }: UIActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="button"
      className={`${styles.actionButton} ${smaller ? styles.smaller : ''} ${active ? styles.active : ''} ${variant === 'black' ? styles.black : styles.gray}`}
      onClick={onClick}
    >
      <UIIcon name={icon} smaller={smaller} />
    </button>
  );
}

type UIToggleButtonProps = {
  variant?: 'primary' | 'gray';
  isOpened: boolean;
  onClick?: () => void;
};

function UIToggleButton({ variant = 'gray', isOpened, onClick }: UIToggleButtonProps) {
  const variantClass = variant === 'gray' ? styles.gray : styles.primary;

  function handleOnClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    onClick && onClick();
  }

  return (
    <button
      type="button"
      title={isOpened ? 'Zwiń' : 'Rozwiń'}
      className={`${styles.toggleButton} ${variantClass}`}
      onClick={handleOnClick}
    >
      <UIIcon name={isOpened ? 'MinusIcon' : 'PlusIcon'} />
    </button>
  );
}

UIButton.Action = UIActionButton;
UIButton.Toggle = UIToggleButton;

export default UIButton;
