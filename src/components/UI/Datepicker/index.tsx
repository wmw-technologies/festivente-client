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
  onChange?: (date: Date) => void;
};

export default function UICard({ name, type = 'date', placeholder, control, onChange }: UIDatepickerProps) {
  const { field } = useController({
    control,
    name
  });

  function handleClearValue(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    field.onChange(undefined);
  }

  function handleChange(date: Date | null) {
    field.onChange(date);
    if (onChange && date) onChange(date);
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
        onChange={(date) => handleChange(date)}
        popperProps={{
          strategy: 'fixed'
        }}
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
