import { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { Icon } from '@/src/types';
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
    <Tippy
      placement={placement}
      interactive
      maxWidth={350}
      visible={visible}
      offset={[0, 6]}
      render={(attrs) => (
        <div className={styles.dropdownBody} {...attrs}>
          {children}
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
  );
}

type UIDropdownItemProps = {
  children: ReactNode;
  onClick?: () => void;
};

function UIDropdownItem({ children, onClick }: UIDropdownItemProps) {
  return (
    <div className={styles.dropdownItem} onClick={onClick}>
      {children}
    </div>
  );
}

UIDropdown.Item = UIDropdownItem;

export default UIDropdown;
