'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
  errors: any;
  control: Control<any>;
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
export default function EditableTable({ register, errors, control }: EditableTableProps) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'items' // unique name for your Field Array,
  });

  const handleAddItem = () => {
    append(defaultEmptyItem);
  };

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Numer seryjny</th>
            <th>Opis</th>
            <th>Lokalizacja</th>
            {/* <th>Status</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <UIGroup error={errors.items?.[index]?.serialNumber}>
                  <UIInput type="text" {...register(`items.${index}.serialNumber`)} />
                </UIGroup>
              </td>
              <td>
                <UIGroup error={errors.items?.[index]?.location}>
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
                  <UIDropdownItem onClick={() => remove(index)}>Szczegóły</UIDropdownItem>
                </UIDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <UIButton type="button" variant="black" onClick={handleAddItem}>
          Dodaj urządzenie
        </UIButton>
      </div>
    </>
  );
}
