import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';

export default async function Service() {
  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/events" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
        </UIPanel>
      }
    >
      <div>szczegóły</div>
    </UICard>
  );
}
