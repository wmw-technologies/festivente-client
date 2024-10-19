import { cloneElement, ReactNode, useState, Children, isValidElement, ReactElement } from 'react';
import styles from './index.module.scss';
import Tippy, { TippyProps } from '@tippyjs/react/headless';
import UIIcon from '@/src/components/UI/Icon';

type UISelectProps = {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
};

export default function UISelect({ type = 'text', placeholder }: UISelectProps) {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <Tippy
      placement={'bottom'}
      interactive
      maxWidth={350}
      visible={visible}
      offset={[0, 6]}
      render={(attrs) => (
        <div className={styles.selectDropdown} {...attrs}>
          asdasd
          {/* {Children.toArray(children)
          .filter(isValidElement)
          .map((child) => cloneElement(child as ReactElement<{ hide?: () => void }>, { hide }))} */}
        </div>
      )}
      onClickOutside={hide}
    >
      <div className={styles.selectContainer}>
        <div className={styles.select} onClick={show}>
          <span>testtt</span>
          <button className={`${styles.arrowButton} ${visible ? styles.active : ''}`} type="button">
            <UIIcon name="ChevronUpDownIcon" smaller />
          </button>
        </div>
      </div>
    </Tippy>
  );
}
