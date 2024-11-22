import { MouseEvent } from 'react';
import { useController, Control } from 'react-hook-form';
import './index.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { pl } from 'date-fns/locale/pl';
import UIIcon from '@/src/components/UI/Icon';

registerLocale('pl', pl);

type UIDatepickerProps = {
  name: string;
  type?: 'date' | 'datetime';
  placeholder?: string;
  control: Control<any>;
};

export default function UICard({ name, type = 'date', placeholder, control }: UIDatepickerProps) {
  const { field } = useController({
    control,
    name
  });

  function handleClearValue(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    field.onChange(undefined);
  }

  return (
    <div className="datepicker">
      <DatePicker
        wrapperClassName="datepicker-wrapper"
        className="datepicker-input"
        selected={field.value}
        locale={'pl'}
        dateFormat={type === 'datetime' ? 'dd.MM.YYYY, HH:mm' : 'dd.MM.YYYY'}
        placeholderText={placeholder}
        showTimeSelect={type === 'datetime'}
        onChange={(date) => field.onChange(date)}
      />
      <div className="buttons">
        {field.value != null ? (
          <div className="clear-button" onClick={(e) => handleClearValue(e)}>
            <UIIcon name="XCircleIcon" smaller />
          </div>
        ) : null}
        <UIIcon name="CalendarDaysIcon" />
      </div>
    </div>
  );
}
