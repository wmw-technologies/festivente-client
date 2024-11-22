import UICard from '@/src/components/UI/Card';
import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';

export default async function VehiclesDetails() {
  return (
    <UICard
      header={
        <UIPanel header="Szczegóły">
          <UIButton href="/vehicles" icon="ArrowLongLeftIcon" variant="gray">
            Powrót
          </UIButton>
        </UIPanel>
      }
    >
      <div>szczegóły</div>
    </UICard>
  );
}
