'use client';

import { useState, MouseEvent } from 'react';
import { useController, Control } from 'react-hook-form';
import styles from './index.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Option } from '@/src/types';
import UIIcon from '@/src/components/UI/Icon';
import UIBadge from '@/src/components/UI/Badge';

type UISelectProps = {
  name: string;
  placeholder?: string;
  multiselect?: boolean;
  options: Option[];
  control: Control<any>;
};

export default function UISelect({ name, placeholder, multiselect, options = [], control }: UISelectProps) {
  const { field } = useController({
    control,
    name
  });

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const value: string[] | string | undefined = field.value;

  function getSelectedText(value: string | string[] | undefined) {
    return options.find((item) => item.value === value)?.text;
  }

  function handleClick(e?: MouseEvent) {
    e?.preventDefault();
    visible ? hide() : show();
  }

  function handleClearValue(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    field.onChange(undefined);
  }

  function handleSelectValue(e: MouseEvent, item: Option) {
    e.preventDefault();

    const value = item.value;

    if (multiselect) {
      const values = Array.isArray(field.value) ? field.value : [];
      const index = values.indexOf(value);

      if (index === -1) field.onChange([...values, value]);
    } else {
      field.onChange(value);
    }

    hide();
  }

  function handleRemoveOption(value: string) {
    if (Array.isArray(field.value)) {
      field.onChange(field.value.filter((v) => v !== value));
    }
  }

  function activeOption(value: string) {
    if (multiselect) {
      return Array.isArray(field.value) && field.value.includes(value) ? styles.active : '';
    } else {
      return field.value === value ? styles.active : '';
    }
  }

  return (
    <div className={`${styles.selectContainer} ${visible ? 'active' : ''}`}>
      <input type="hidden" />
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
                className={`${styles.selectDropdownItem} ${activeOption(item.value)}`}
                onClick={(e) => handleSelectValue(e, item)}
              >
                {item.text}
              </div>
            ))}
            {options.length === 0 && (
              <div className={`${styles.selectDropdownItem} ${styles.noOption}`}>Brak opcji</div>
            )}
          </div>
        )}
        onClickOutside={hide}
        onMount={(instance) => {
          const width = instance.reference.clientWidth;
          instance.popper.style.width = width + 'px';
        }}
      >
        <div className={`${styles.select} ${visible ? styles.active : ''}`} onClick={handleClick}>
          {multiselect ? (
            <>
              {Array.isArray(value) && value.length ? (
                <div className={styles.multiselect}>
                  {value.map((v, i) => (
                    <UIBadge variant="primary" key={v} onClick={() => handleRemoveOption(v)}>
                      {getSelectedText(v)}
                    </UIBadge>
                  ))}
                </div>
              ) : (
                <span className={styles.placeholder}>{placeholder}</span>
              )}
            </>
          ) : (
            <>
              {value ? (
                <span>{getSelectedText(value)}</span>
              ) : (
                <span className={styles.placeholder}>{placeholder}</span>
              )}
            </>
          )}

          <div className={styles.buttons}>
            {value && !multiselect ? (
              <div className={styles.button} onClick={handleClearValue}>
                <UIIcon name="XCircleIcon" smaller />
              </div>
            ) : null}
            <div className={`${styles.button} ${styles.arrows}`}>
              <UIIcon name="ChevronUpDownIcon" smaller />
            </div>
          </div>
        </div>
      </Tippy>
    </div>
  );
}
