'use client';

import { useState, MouseEvent } from 'react';
import { useController, Control } from 'react-hook-form';
import styles from './index.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Option } from '@/src/types';
import UIIcon from '@/src/components/UI/Icon';

type UISelectProps = {
  name: string;
  placeholder?: string;
  options: Option[];
  control: Control<any>;
};

export default function UISelect({ name, placeholder, options = [], control }: UISelectProps) {
  const { field } = useController({
    control,
    name
  });

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const value = field.value;
  const text = options.find((item) => item.value === value)?.text;

  function handleClick(e?: MouseEvent) {
    e?.preventDefault();
    visible ? hide() : show();
  }

  function handleClearValue(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    field.onChange(null);
  }

  function handleSelectValue(e: MouseEvent, item: Option) {
    e.preventDefault();
    field.onChange(item.value);
    hide();
  }

  return (
    <div className={`${styles.selectContainer} ${visible ? 'active' : ''}`}>
      <Tippy
        placement={'bottom-start'}
        interactive
        visible={visible}
        offset={[0, 6]}
        render={(attrs) => (
          <div className={`${styles.selectDropdown} scroll-y`} tabIndex={-1} {...attrs}>
            {options.map((item, index) => (
              <div
                key={index}
                className={`${styles.selectDropdownItem} ${item.value === value ? styles.active : ''}`}
                onClick={(e) => handleSelectValue(e, item)}
              >
                {item.text}
              </div>
            ))}
          </div>
        )}
        onClickOutside={hide}
        onMount={(instance) => {
          const width = instance.reference.clientWidth;
          instance.popper.style.width = width + 'px';
        }}
      >
        <div className={`${styles.select} ${visible ? styles.active : ''}`} onClick={handleClick}>
          {value ? <span>{text}</span> : <span className={styles.placeholder}>{placeholder}</span>}

          <div className={styles.buttons}>
            {value && (
              <div className={styles.button} onClick={handleClearValue}>
                <UIIcon name="XMarkIcon" smaller />
              </div>
            )}
            <div className={`${styles.button} ${styles.arrows}`}>
              <UIIcon name="ChevronUpDownIcon" smaller />
            </div>
          </div>
        </div>
      </Tippy>
    </div>
  );
}
