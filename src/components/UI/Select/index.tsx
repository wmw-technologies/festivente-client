'use client';

import {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  MouseEvent,
  ChangeEventHandler,
  FocusEventHandler
} from 'react';
import styles from './index.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Option } from '@/src/types';
import UIIcon from '@/src/components/UI/Icon';

type UISelectProps = {
  name?: string;
  placeholder?: string;
  options: Option[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const UISelect = forwardRef<HTMLSelectElement, UISelectProps>(function UISelect(
  { name, placeholder, options = [], onChange },
  ref
) {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const selectRef = useRef<HTMLSelectElement>(null);
  useImperativeHandle(ref, () => selectRef.current!);
  const value = selectRef.current?.value;
  const text = options.find((item) => item.value === value)?.text;

  function handleClick(e?: MouseEvent) {
    e?.preventDefault();
    visible ? hide() : show();
  }

  function handleSelectOption(e: MouseEvent, item: Option) {
    e.preventDefault();

    if (!selectRef.current) return;

    selectRef.current.value = item.value;
    selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));

    hide();
  }

  return (
    <>
      <div className={`${styles.selectContainer} ${visible ? 'active' : ''}`}>
        <Tippy
          placement={'bottom-start'}
          interactive
          visible={visible}
          offset={[0, 6]}
          render={(attrs) => (
            <div className={styles.selectDropdown} tabIndex={-1} {...attrs}>
              {options.map((item, index) => (
                <div key={index} className={styles.selectDropdownItem} onClick={(e) => handleSelectOption(e, item)}>
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
            {text ? text : <span className={styles.placeholder}>{placeholder}</span>}
            <button className={`${styles.arrowButton}`} type="button">
              <UIIcon name="ChevronUpDownIcon" smaller />
            </button>
          </div>
        </Tippy>
      </div>
      <select ref={selectRef} className={styles.hideSelect} name={name} onChange={onChange}>
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
});

export default UISelect;
