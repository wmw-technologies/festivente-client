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

interface EditableTableProps {
  register: UseFormRegister<Schema>;
  resetField: UseFormResetField<Schema>;
  trigger: UseFormTrigger<Schema>;
  errors: FieldErrors<Schema>;
  control: Control<Schema>;
  isSerialTracked?: boolean;
  isSubmitted: boolean;
}

// const defaultEmptyItem: WarehouseItemType = {
const defaultEmptyItem = {
  // _id: '',
  // description: '',
  // // addedBy: '',
  // location: '',
  // serialNumbers: '',
  // status: 'available',
  // updatedAt: new Date(),
  // createdAt: new Date()

  // serialNumber: z.string().min(1),
  // location: z.string().min(1),
  // description: z.string().optional()
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
    name: 'items'
  });

  useEffect(() => {
    if (!isSerialTracked) {
      fields.forEach((field, index) => {
        resetField(`items.${index}.serialNumber`);
      });
    }
    if (isSubmitted) {
      trigger('items');
    }
  }, [isSerialTracked, fields]);

  const handleAddItem = () => {
    append(defaultEmptyItem);
  };

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {isSerialTracked && <th>Numer seryjny</th>}
            <th>Lokalizacja</th>
            <th>Opis</th>
            {/* <th>Status</th> */}
            <th style={{ width: 64 }}></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {fields.map((field, index) => (
            <tr key={field.id}>
              {isSerialTracked && (
                <td>
                  <UIGroup noErrorMargin nospace className={styles.UIGroup} error={errors.items?.[index]?.serialNumber}>
                    <UIInput type="text" {...register(`items.${index}.serialNumber`)} />
                  </UIGroup>
                </td>
              )}
              <td>
                <UIGroup noErrorMargin nospace className={styles.UIGroup} error={errors.items?.[index]?.location}>
                  <UIInput type="text" {...register(`items.${index}.location`)} />
                </UIGroup>
              </td>
              <td>
                <UIGroup nospace error={errors.items?.[index]?.description}>
                  <UIInput type="text" {...register(`items.${index}.description`)} />
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
              <td colSpan={4} className={styles.empty}>
                Dodaj urządzenie, aby zobaczyć listę
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles['add-button-constainer']}>
        <UIButton type="button" variant="black" onClick={handleAddItem}>
          Dodaj urządzenie
        </UIButton>
      </div>
    </>
  );
}
