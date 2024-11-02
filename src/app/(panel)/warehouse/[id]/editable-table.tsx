'use client';

import { useFieldArray, UseFormRegister, FieldErrors } from 'react-hook-form';
import styles from './editable-table.module.scss';
import { Control } from 'react-hook-form';
import { Schema } from './form';
import UIInput from '@/src/components/UI/Input';
import UIButton from '@/src/components/UI/Button';
import { UIDropdown, UIDropdownItem } from '@/src/components/UI/Dropdown';
import UIGroup from '@/src/components/UI/Group';

interface EditableTableProps {
  register: UseFormRegister<Schema>;
  errors: FieldErrors<Schema>;
  control: Control<Schema>;
}

const defaultEmptyItem = {
  serialNumber: '',
  location: '',
  description: ''
};

export default function EditableTable({ register, errors, control }: EditableTableProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const handleAddItem = () => {
    append(defaultEmptyItem);
  };

  return (
    <>
      <table className={`${styles.table} mb-3`}>
        <thead className={styles.thead}>
          <tr>
            <th>Numer seryjny</th>
            <th>Opis</th>
            <th>Lokalizacja</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <UIGroup error={errors.items?.[index]?.serialNumber} nospace>
                  <UIInput
                    type="text"
                    placeholder="Wprowadź numer seryjny"
                    {...register(`items.${index}.serialNumber`)}
                  />
                </UIGroup>
              </td>
              <td>
                <UIGroup error={errors.items?.[index]?.location} nospace>
                  <UIInput type="text" placeholder="Wprowadź opis" {...register(`items.${index}.location`)} />
                </UIGroup>
              </td>
              <td>
                <UIGroup error={errors.items?.[index]?.description} nospace>
                  <UIInput type="text" placeholder="Wprowadź lokalizację" {...register(`items.${index}.description`)} />
                </UIGroup>
              </td>
              <td>
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

      <UIButton type="button" variant="black" onClick={handleAddItem}>
        Dodaj urządzenie
      </UIButton>
    </>
  );
}
