'use client';

import UIButton from '@/src/components/UI/Button';

type ConfirmPaymentProps = {
  id: string;
};

export default function ConfirmPayment({ id }: ConfirmPaymentProps) {
  function handleClick() {
    console.log('clicked');
  }

  return (
    <UIButton icon="CurrencyDollarIcon" variant="black" onClick={handleClick}>
      Zmień status na opłacone
    </UIButton>
  );
}
