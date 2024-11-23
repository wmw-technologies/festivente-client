'use client';

import { FieldErrors, useFieldArray, UseFormRegister, UseFormResetField, UseFormTrigger } from 'react-hook-form';
import { useEffect } from 'react';
import styles from './editable-table.module.scss';
import { Control } from 'react-hook-form';
import UIInput from '@/src/components/UI/Input';
import UIButton from '@/src/components/UI/Button';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UIGroup from '@/src/components/UI/Group';
import { Schema } from './form';
import UITextarea from '@/src/components/UI/Textarea';

interface EditableTableProps {
  register: UseFormRegister<Schema>;
  resetField: UseFormResetField<Schema>;
  trigger: UseFormTrigger<Schema>;
  errors: FieldErrors<Schema>;
  control: Control<Schema>;
  isSerialTracked?: boolean;
  isSubmitted: boolean;
}

const defaultEmptyItem = {
  serialNumber: '',
  location: '',
  description: ''
};

export default function EditableTable({
  register,
  resetField,
  trigger,
  errors,
  control,
  isSerialTracked,
  isSubmitted
}: EditableTableProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'devices'
  });

  useEffect(() => {
    if (!isSerialTracked) {
      fields.forEach((_, index) => {
        resetField(`devices.${index}.serialNumber`);
      });
    }

    if (isSubmitted) {
      trigger('devices');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSerialTracked, fields]);

  const handleAddItem = () => {
    append(defaultEmptyItem);
  };

  return (
    <>
      <table className={`${styles.table} mb-4`}>
        <thead className={styles.thead}>
          <tr>
            {isSerialTracked && <th>Numer urządzenia *</th>}
            <th>Lokalizacja *</th>
            <th>Opis </th>
            <th style={{ width: 64 }}></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {fields.map((field, index) => (
            <tr key={field.id}>
              {isSerialTracked && (
                <td>
                  <UIGroup error={errors.devices?.[index]?.serialNumber} nospace>
                    <UIInput
                      placeholder="Wprowadź numer seryjny"
                      type="text"
                      {...register(`devices.${index}.serialNumber`)}
                    />
                  </UIGroup>
                </td>
              )}
              <td>
                <UIGroup error={errors.devices?.[index]?.location} nospace>
                  <UIInput placeholder="Wprowadź lokalizację" type="text" {...register(`devices.${index}.location`)} />
                </UIGroup>
              </td>
              <td>
                <UIGroup error={errors.devices?.[index]?.description} nospace>
                  <UITextarea placeholder="Wprowadź opis" rows={1} {...register(`devices.${index}.description`)} />
                </UIGroup>
              </td>
              <td style={{ width: 64 }}>
                <UIDropdown icon="EllipsisHorizontalIcon" smaller>
                  <UIDropdownItem onClick={() => remove(index)}>Usuń</UIDropdownItem>
                </UIDropdown>
              </td>
            </tr>
          ))}
          {fields.length === 0 && (
            <tr>
              <td colSpan={isSerialTracked ? 4 : 3} className={styles.empty}>
                Dodaj urządzenie, aby zobaczyć listę
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <UIButton type="button" variant="black" onClick={handleAddItem}>
        Dodaj urządzenie
      </UIButton>
    </>
  );
}
