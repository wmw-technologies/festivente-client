// 'use client';

import { ReactNode } from 'react';
import styles from './index.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Icon } from '@/src/types';
import UIButton from '@/src/components/UI/Button';

type UIDropdownProps = {
  icon: Icon;
  children: ReactNode;
};

function UIDropdown({ icon, children }: UIDropdownProps) {
  return (
    <Tippy
      trigger="click"
      placement="bottom-end"
      interactive
      maxWidth={350}
      offset={[0, 8]}
      render={(attrs) => (
        <div className={styles.dropdownBody} {...attrs}>
          {children}
        </div>
      )}
    >
      <div>
        <UIButton.Action icon={icon} />
      </div>
    </Tippy>
  );
}

type UIDropdownItemProps = {
  children: ReactNode;
};

function UIDropdownItem({ children }: UIDropdownItemProps) {
  return <div className={styles.dropdownItem}>{children}</div>;
}

UIDropdown.Item = UIDropdownItem;

export default UIDropdown;
