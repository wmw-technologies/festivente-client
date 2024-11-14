'use client';

import { useAuth } from '@/src/context/auth';
import UICard from '@/src/components/UI/Card';
import UIHeader from '@/src/components/UI/Header';
import { formatDate } from '@/src/utils/format';

export default function Dashboard() {
  const auth = useAuth();

  return (
    <div>
      <UICard variant="primary">
        <UIHeader margin={false}>
          Cześć {auth?.first_name} {auth?.last_name}
        </UIHeader>
        <span>Dzisiaj jest: {formatDate(new Date().toDateString())}</span>
      </UICard>
    </div>
  );
}
