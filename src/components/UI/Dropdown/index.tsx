'use client';

import { cloneElement, ReactNode, useState, Children, isValidElement, ReactElement } from 'react';
import styles from './index.module.scss';
import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { Icon } from '@/src/types';
import Link from 'next/link';
import UIButton from '@/src/components/UI/Button';

type UIDropdownProps = {
  icon: Icon;
  variant?: 'gray' | 'black';
  smaller?: boolean;
  placement?: TippyProps['placement'];
  children: ReactNode;
};

function UIDropdown({ icon, variant = 'black', smaller, placement = 'bottom-end', children }: UIDropdownProps) {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <div>
      <Tippy
        placement={placement}
        interactive
        maxWidth={350}
        visible={visible}
        offset={[0, 6]}
        render={(attrs) => (
          <div className={styles.dropdownBody} {...attrs}>
            {Children.toArray(children)
              .filter(isValidElement)
              .map((child) => cloneElement(child as ReactElement<{ hide?: () => void }>, { hide }))}
          </div>
        )}
        onClickOutside={hide}
      >
        <div>
          <UIButton.Action
            icon={icon}
            variant={variant}
            active={visible}
            smaller={smaller}
            onClick={visible ? hide : show}
          />
        </div>
      </Tippy>
    </div>
  );
}

type UIDropdownItemProps = {
  href?: string;
  children: ReactNode;
  hide?: () => void;
  onClick?: () => void;
};

function UIDropdownItem({ href, children, hide, onClick }: UIDropdownItemProps) {
  function handleClick() {
    onClick?.();
    hide?.();
  }

  if (href)
    return (
      <Link href={href} className={styles.dropdownItem}>
        <span>{children}</span>
      </Link>
    );

  return (
    <div className={styles.dropdownItem} onClick={handleClick}>
      {children}
    </div>
  );
}

export { UIDropdown, UIDropdownItem };
