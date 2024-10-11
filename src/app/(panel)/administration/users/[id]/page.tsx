import UIPanel from '@/src/components/UI/Panel';
import UIButton from '@/src/components/UI/Button';
import UICard from '@/src/components/UI/Card';

export default function AdministrationUsersForm() {
  return (
    <UICard
      header={
        <UIPanel header="Formularz dodawania użytkownika">
          <UIButton icon="ArrowLongLeftIcon" variant="black">
            Powrót
          </UIButton>
          <UIButton icon="CheckIcon" variant="success">
            Zapisz
          </UIButton>
        </UIPanel>
      }
    >
      asdasd
    </UICard>
  );
}
