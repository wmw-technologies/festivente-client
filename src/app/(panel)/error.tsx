'use client';

import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <UICard header={<UIPanel header="Error"></UIPanel>} background={false}>
      {error.message}
    </UICard>
  );
}
