'use client';

import { changeStatusToPaid } from '../actions';
import toast from 'react-hot-toast';
import UIButton from '@/src/components/UI/Button';

type ConfirmPaymentProps = {
  id: string;
};

export default function ConfirmPayment({ id }: ConfirmPaymentProps) {
  async function handleClick() {
    const response = (await changeStatusToPaid(id)) as any;

    toast.success(response?.message);
  }

  return (
    <UIButton icon="CurrencyDollarIcon" variant="black" onClick={handleClick}>
      Zmień status na opłacone
    </UIButton>
  );
}
