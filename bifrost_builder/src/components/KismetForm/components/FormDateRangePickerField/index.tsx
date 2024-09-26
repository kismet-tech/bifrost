import { CalendarDate } from "@/models/CalendarDate";
import { DateRangePickerFormBlockConfiguration } from "../../models";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";
import { FormField } from "../FormField";
import { FormLabel } from "../FormLabel";

interface LocalCalendarDateRange {
  startCalendarDate?: CalendarDate;
  endCalendarDate?: CalendarDate;
}

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
  configuration,
  onChange,
  registerBifrostFormInput,
}: FormDateRangePickerFieldProps) {
  const [localCalendarDateRange, setLocalCalendarDateRange] =
    useState<LocalCalendarDateRange>({
      startCalendarDate: undefined,
      endCalendarDate: undefined,
    });

  const onChangeLocalCalendarDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange) return;

    setLocalCalendarDateRange(
      (previousLocalCalendarDateRange): LocalCalendarDateRange => {
        const updatedLocalCalendarDateRange: LocalCalendarDateRange = {
          startCalendarDate: dateRange.from
            ? convertNativeDateToLocalCalendarDate(dateRange.from)
            : previousLocalCalendarDateRange.startCalendarDate,
          endCalendarDate: dateRange.to
            ? convertNativeDateToLocalCalendarDate(dateRange.to)
            : previousLocalCalendarDateRange.endCalendarDate,
        };

        if (
          updatedLocalCalendarDateRange.startCalendarDate &&
          updatedLocalCalendarDateRange.endCalendarDate
        ) {
          onChange({
            startCalendarDate: updatedLocalCalendarDateRange.startCalendarDate,
            endCalendarDate: updatedLocalCalendarDateRange.endCalendarDate,
          });
          registerBifrostFormInput();
        }

        return updatedLocalCalendarDateRange;
      }
    );
  };

  return (
    <FormField>
      <FormLabel
        htmlFor={`kismet_${configuration.startCalendarDateKeyName}_${configuration.endCalendarDateKeyName}`}
      >
        {configuration.label}
      </FormLabel>

      <DateRangePicker
        dateRange={{
          from: localCalendarDateRange.startCalendarDate
            ? convertLocalCalendarDateToNativeDate(
                localCalendarDateRange.startCalendarDate
              )
            : undefined,
          to: localCalendarDateRange.endCalendarDate
            ? convertLocalCalendarDateToNativeDate(
                localCalendarDateRange.endCalendarDate
              )
            : undefined,
        }}
        setDateRange={onChangeLocalCalendarDateRange}
      />
    </FormField>
  );
}
