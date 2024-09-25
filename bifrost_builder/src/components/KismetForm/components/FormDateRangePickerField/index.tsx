import { CalendarDate } from "@/models/CalendarDate";
import { DateRangePickerFormBlockConfiguration } from "../../models";

export interface FormDateRangePickerFieldProps {
  configuration: DateRangePickerFormBlockConfiguration;
  formState: Record<string, string>;
  onChange: ({
    startCalendarDate,
    endCalendarDate,
  }: {
    startCalendarDate?: CalendarDate;
    endCalendarDate?: CalendarDate;
  }) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function FormDateRangePickerField({
  onChange,
  registerBifrostFormInput,
}: FormDateRangePickerFieldProps) {
  const handleOnChangeStartCalendarDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [year, month, day] = event.target.value.split("-").map(Number);
    const startCalendarDate: CalendarDate = { year, month, day };
    onChange({ startCalendarDate });

    registerBifrostFormInput();
  };

  const handleOnChangeEndCalendarDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [year, month, day] = event.target.value.split("-").map(Number);
    const endCalendarDate: CalendarDate = { year, month, day };
    onChange({ endCalendarDate });

    registerBifrostFormInput();
  };

  return (
    <div>
      <div>
        Start:
        <input onChange={handleOnChangeStartCalendarDate} type="date" />
        End:
        <input onChange={handleOnChangeEndCalendarDate} type="date" />
      </div>
    </div>
  );
}
