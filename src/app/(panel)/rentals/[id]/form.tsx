'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Device, Rental } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import toast from 'react-hot-toast';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UITextarea from '@/src/components/UI/Textarea';
import RentWidget from './rent-widget';
import { methodOfPayments } from '@/src/constants';
import UISelect from '@/src/components/UI/Select';

const schema = z.object({
  clientName: z.string().min(1, 'Nazwa klienta jest wymagana'),
  clientNip: z.string().optional(),
  clientCity: z.string().min(1, 'Miasto jest wymagane'),
  clientStreet: z.string().min(1, 'Ulica jest wymagana'),
  clientPostCode: z.string().regex(/^\d{2}-\d{3}$/, 'Kod pocztowy musi być w formacie XX-XXX'),
  clientPhone: z.string().min(1, 'Numer telefonu jest wymagany'),
  clientEmail: z.string().email('Nieprawidłowy adres e-mail'),
  rentalDate: z.string().date().min(1, 'Data wypożyczenia jest wymagana'),
  returnDate: z.string().date().min(1, 'Data zwrotu jest wymagana'),
  devices: z.array(z.string()).min(1, 'W wypożyczeniu musi być przynajmniej jedno urządzenie'),
  inTotal: z
    .number()
    .refine((val) => val >= 0, { message: 'Amount must be positive' })
    .refine((val) => val <= 100000, { message: 'Amount must be less than or equal to 100,000 PLN' }),
  discount: z.number().min(0, 'Minimum 0%').max(100, 'Maksimum 100%').optional(),
  methodOfPayment: z.string().optional().nullable(),
  notes: z.string().optional()
});

export type Schema = z.infer<typeof schema>;

type FormProps = {
  isEdit: boolean;
  data: Rental | null;
  availableDevices: Device[];
  id: string;
};

export default function Form({ id, isEdit, data, availableDevices }: FormProps) {
  const router = useRouter();
  const title = isEdit ? `Formularz edycji wypożyczenia: ${data?.clientName}` : 'Formularz dodawania wypożyczenia';

  const {
    register,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    setValue,
    setError,
    handleSubmit
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(form: Schema) {
    try {
      const response = !isEdit ? await create(form) : await update(id, form);

      if (response?.ok) {
        router.push('/rentals');
        toast.success(response?.message);
      } else {
        if (response?.errors) {
          Object.keys(response?.errors).map((key) => {
            setError(key as any, { message: (response?.errors as any)[key] });
          });
        }
      }
    } catch (error) {
      toast.error('Error saving the device');
    }
  }

  function init() {
    if (!data) return;

    setValue('clientName', data.clientName);
    setValue('clientPhone', data.clientPhone);
    setValue('rentalDate', data.rentalDate.split('T')[0]);
    setValue('returnDate', data.returnDate.split('T')[0]);
    setValue('inTotal', data.inTotal);
    setValue('clientCity', data.clientCity);
    setValue('clientStreet', data.clientStreet);
    setValue('clientPostCode', data.clientPostCode);
    setValue('clientEmail', data.clientEmail);
    setValue('notes', data.notes);
    setValue(
      'devices',
      data.devices.map((device) => device._id)
    );
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UICard
      header={
        <UIPanel header={title}>
          <UIButton href="/rentals" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
          <UIButton
            type="submit"
            form="rentals-form"
            loading={isSubmitting}
            disabled={!isValid && isSubmitted}
            icon="CheckCircleIcon"
            variant="black"
          >
            Zapisz
          </UIButton>
        </UIPanel>
      }
    >
      <form id="rentals-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-3">
            <UIGroup header="Nazwa klienta" error={errors.clientName} required>
              <UIInput placeholder="Wprowadź nazwę" {...register('clientName')} />
            </UIGroup>
            <UIGroup header="NIP" error={errors.clientNip}>
              <UIInput placeholder="Wprowadź NIP" {...register('clientNip')} />
            </UIGroup>
            <UIGroup header="Numer telefonu" error={errors.clientPhone} required>
              <UIInput placeholder="Wprowadź numer telefonu" {...register('clientPhone')} />
            </UIGroup>
            <UIGroup header="Email" error={errors.clientEmail} required>
              <UIInput placeholder="Wprowadź email" {...register('clientEmail')} />
            </UIGroup>
          </div>
          <div className="col-3">
            <UIGroup header="Data wypożyczenia" error={errors.rentalDate} required>
              <UIInput type="date" {...register('rentalDate')} />
            </UIGroup>
            <UIGroup header="Data zwrotu" error={errors.returnDate} required>
              <UIInput type="date" {...register('returnDate')} />
            </UIGroup>
            <UIGroup header="Wartość" error={errors.inTotal} required>
              <UIInput
                type="number"
                placeholder="Wprowadź wartość wypożyczenia"
                {...register('inTotal', { valueAsNumber: true })}
              />
            </UIGroup>
            <UIGroup header="Procent rabatu" error={errors.discount}>
              <UIInput type="number" placeholder="Wprowadź rabat" {...register('discount', { valueAsNumber: true })} />
            </UIGroup>
          </div>
          <div className="col-3">
            <UIGroup header="Miasto" error={errors.clientCity} required>
              <UIInput placeholder="Wprowadź miasto" {...register('clientCity')} />
            </UIGroup>
            <UIGroup header="Ulica" error={errors.clientStreet} required>
              <UIInput placeholder="Wprowadź ulice" {...register('clientStreet')} />
            </UIGroup>
            <UIGroup header="Kod pocztowy" error={errors.clientPostCode} required>
              <UIInput placeholder="Wprowadź kod pocztowy" {...register('clientPostCode')} />
            </UIGroup>
          </div>
          <div className="col-3">
            <UIGroup header="Sposób płatności" error={errors.methodOfPayment}>
              <UISelect
                name="methodOfPayment"
                placeholder="Metoda płatności"
                options={methodOfPayments}
                control={control}
              />
            </UIGroup>
            <UIGroup header="Uwagi" error={errors.notes}>
              <UITextarea rows={3} placeholder="Uwagi do wypożyczenia" {...register('notes')} />
            </UIGroup>
          </div>
        </div>

        <RentWidget availableDevices={availableDevices} control={control} errors={errors} setValue={setValue} />
      </form>
    </UICard>
  );
}
