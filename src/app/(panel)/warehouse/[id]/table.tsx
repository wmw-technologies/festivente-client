'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { use, useEffect, useState } from 'react';
import styles from './table.module.scss';
import { z } from 'zod';
import { WarehouseItemType } from '@/src/types';
import toast from 'react-hot-toast';
import { useController, Control } from 'react-hook-form';
// import { updateInventoryItems } from '@/src/app/(panel)/warehouse/[id]/actions';
import UIInput from '@/src/components/UI/Input';
import UIButton from '@/src/components/UI/Button';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UIGroup from '@/src/components/UI/Group';

interface EditableTableProps {
  register: any;
  setValue: any;
  resetField: any;
  trigger: any;
  errors: any;
  control: Control<any>;
  isSerialTracked?: boolean;
  // control: control: Control<any>;;
  // data: WarehouseItemType[];
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

// export default function EditableTable({ data }: EditableTableProps) {
export default function EditableTable({
  register,
  setValue,
  resetField,
  trigger,
  errors,
  control,
  isSerialTracked
}: EditableTableProps) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'items' // unique name for your Field Array,
  });

  useEffect(() => {
    if (!isSerialTracked) {
      fields.forEach((field, index) => {
        resetField(`items.${index}.serialNumber`);
      });
    }
    trigger('items');
  }, [isSerialTracked, fields]);

  const handleAddItem = () => {
    append(defaultEmptyItem);
    trigger('items');
  };

  return (
    <>
      {fields.length > 0 && (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {isSerialTracked && <th>Numer seryjny</th>}
              <th>Lokalizacja</th>
              <th>Opis</th>
              {/* <th>Status</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {fields.map((field, index) => (
              <tr key={field.id}>
                {isSerialTracked && (
                  <td>
                    <UIGroup noErrorMargin className={styles.UIGroup} error={errors.items?.[index]?.serialNumber}>
                      <UIInput type="text" {...register(`items.${index}.serialNumber`)} />
                    </UIGroup>
                  </td>
                )}
                <td>
                  <UIGroup noErrorMargin className={styles.UIGroup} error={errors.items?.[index]?.location}>
                    <UIInput type="text" {...register(`items.${index}.location`)} />
                  </UIGroup>
                </td>
                <td>
                  <UIGroup error={errors.items?.[index]?.description}>
                    <UIInput type="text" {...register(`items.${index}.description`)} />
                  </UIGroup>
                </td>
                <td>
                  <UIDropdown icon="EllipsisHorizontalIcon" smaller>
                    <UIDropdownItem onClick={() => remove(index)}>Usuń</UIDropdownItem>
                  </UIDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles['add-button-constainer']}>
        <UIButton type="button" variant="black" onClick={handleAddItem}>
          Dodaj urządzenie
        </UIButton>
      </div>
    </>
  );
}
