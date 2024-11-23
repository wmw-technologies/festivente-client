'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Device, Rental } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { create, update } from './actions';
import toast from 'react-hot-toast';
import RentWidget from './rent-widget';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';
import UIGroup from '@/src/components/UI/Group';
import UIInput from '@/src/components/UI/Input';
import UITextarea from '@/src/components/UI/Textarea';
import UIDatepicker from '@/src/components/UI/Datepicker';

const schema = z.object({
  clientName: z.string().min(1, 'Nazwa klienta jest wymagana'),
  clientCity: z.string().min(1, 'Miasto jest wymagane'),
  clientStreet: z.string().min(1, 'Ulica jest wymagana'),
  clientPostCode: z.string().regex(/^\d{2}-\d{3}$/, 'Kod pocztowy musi być w formacie XX-XXX'),
  clientPhone: z.string().min(1, 'Numer telefonu jest wymagany'),
  clientEmail: z.string().email('Nieprawidłowy adres e-mail'),
  rentalDate: z.date(),
  returnDate: z.date(),
  devices: z.array(z.string()).min(1, 'W wypożyczeniu musi być przynajmniej jedno urządzenie'),
  inTotal: z
    .number()
    .refine((val) => val >= 0, { message: 'Amount must be positive' })
    .refine((val) => val <= 100000, { message: 'Amount must be less than or equal to 100,000 PLN' }),
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

      if (!response?.ok) throw response;

      router.push('/rentals');
      toast.success(response?.message);
    } catch (ex: any) {
      if (ex.status === 422 || (ex.status === 400 && ex?.errors)) {
        Object.keys(ex?.errors).map((key) => {
          setError(key as any, { message: (ex.errors as any)[key] });
        });

        return;
      }

      toast.error('Wystąpił błąd podczas zapisywania wypożyczenia');
    }
  }

  function init() {
    if (!data) return;

    setValue('clientName', data.clientName);
    setValue('clientPhone', data.clientPhone);
    setValue('rentalDate', new Date(data.rentalDate));
    setValue('returnDate', new Date(data.returnDate));
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
            <UIGroup header="Numer telefonu" error={errors.clientPhone} required>
              <UIInput placeholder="Wprowadź numer telefonu" {...register('clientPhone')} />
            </UIGroup>
            <UIGroup header="Email" error={errors.clientEmail} required>
              <UIInput placeholder="Wprowadź email" {...register('clientEmail')} />
            </UIGroup>
            <UIGroup header="Wartość" error={errors.inTotal} required>
              <UIInput
                type="number"
                placeholder="Wprowadź wartość wypożyczenia"
                {...register('inTotal', { valueAsNumber: true })}
              />
            </UIGroup>
          </div>
          <div className="col-3">
            <UIGroup header="Data wypożyczenia" error={errors.rentalDate} required>
              <UIDatepicker
                name="rentalDate"
                type="datetime"
                placeholder="Wybierz datę wypożyczenia"
                control={control}
              />
            </UIGroup>
            <UIGroup header="Data zwrotu" error={errors.returnDate} required>
              <UIDatepicker name="returnDate" type="datetime" placeholder="Wybierz datę zwrotu" control={control} />
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
            <UIGroup header="Uwagi" error={errors.notes}>
              <UITextarea rows={4} placeholder="Uwagi do wypożyczenia" {...register('notes')} />
            </UIGroup>
          </div>
        </div>

        <RentWidget availableDevices={availableDevices} control={control} errors={errors} setValue={setValue} />
      </form>
    </UICard>
  );
}
