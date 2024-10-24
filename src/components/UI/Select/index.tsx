'use client';

import { useState, useRef, useImperativeHandle, forwardRef, MouseEvent, ChangeEventHandler, useEffect } from 'react';
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
  const [value, setValue] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const selectRef = useRef<HTMLSelectElement>(null);
  useImperativeHandle(ref, () => selectRef.current!);

  function handleClick(e?: MouseEvent) {
    e?.preventDefault();
    visible ? hide() : show();
  }

  function handleSelectOption(e: MouseEvent, item?: Option) {
    e.preventDefault();
    e.stopPropagation();

    if (!selectRef.current) return;

    const value = item?.value ?? '';
    const text = item?.text ?? '';

    selectRef.current.value = value;
    selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    setValue(value);
    setText(text);

    hide();
  }

  useEffect(() => {
    const value = selectRef.current?.value ?? '';
    const text = options.find((item) => item.value === value)?.text ?? null;

    setValue(value);
    setText(text);
  }, []);

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
                <div
                  key={index}
                  className={`${styles.selectDropdownItem} ${item.value === value ? styles.active : ''}`}
                  onClick={(e) => handleSelectOption(e, item)}
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
                <div className={styles.button} onClick={handleSelectOption}>
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
      <select
        ref={selectRef}
        className={styles.hideSelect}
        name={name}
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e);
        }}
      >
        <option value=""></option>
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
