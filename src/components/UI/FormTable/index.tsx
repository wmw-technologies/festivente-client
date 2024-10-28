import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the IndyvidualItem interface
export interface IndyvidualItem {
  _id: string;
  name: string;
  serialNumber?: string;
  skuNumber: string;
  rentalValue: number;
  location: string;
  warrantyEndDate?: Date;
  status: string;
  addedBy: string;
  insertionDate: Date;
  modificationDate: Date;
  warehouseItemID: string;
}

// Define the Zod schema for validation
const indyvidualItemSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, 'Name is required'),
  serialNumber: z.string().optional(),
  skuNumber: z.string().min(1, 'SKU Number is required'),
  rentalValue: z.number(),
  location: z.string().min(1, 'Location is required'),
  warrantyEndDate: z.date().optional(),
  status: z.string(),
  addedBy: z.string(),
  insertionDate: z.date(),
  modificationDate: z.date(),
  warehouseItemID: z.string()
});

type IndyvidualItemFormValues = z.infer<typeof indyvidualItemSchema>;

interface EditableTableProps {
  columns: Array<{ header: string; accessor: keyof IndyvidualItem }>;
  data: IndyvidualItem[];
}

const EditableTable: React.FC<EditableTableProps> = ({ columns, data }) => {
  const { register, handleSubmit, control } = useForm<IndyvidualItemFormValues>({
    resolver: zodResolver(indyvidualItemSchema)
  });

  const onSubmit = (values: IndyvidualItemFormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((col) => (
                <td key={col.accessor}>
                  {col.accessor === 'name' ||
                  col.accessor === 'serialNumber' ||
                  col.accessor === 'skuNumber' ||
                  col.accessor === 'location' ||
                  col.accessor === 'warrantyEndDate' ? (
                    <Controller
                      name={col.accessor as keyof IndyvidualItemFormValues}
                      control={control}
                      defaultValue={item[col.accessor]}
                      render={({ field }) => (
                        <input
                          {...field}
                          type={col.accessor === 'warrantyEndDate' ? 'date' : 'text'}
                          value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                        />
                      )}
                    />
                  ) : (
                    <span>
                      {item[col.accessor] instanceof Date
                        ? (item[col.accessor] as Date).toISOString().split('T')[0]
                        : String(item[col.accessor])}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditableTable;
