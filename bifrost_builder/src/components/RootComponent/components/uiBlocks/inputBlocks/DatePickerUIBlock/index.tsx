import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { CalendarDate } from "@/models/CalendarDate";
import { DatePickerUIBlockConfiguration } from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { deepEqual } from "@/utilities/core/deepEqual";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { useEffect, useState } from "react";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { DatePicker } from "@/components/ui/date-picker";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";

interface DatePickerUIBlockProps {
  configuration: DatePickerUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  keyPath: BifrostKeyPath;
  onChange: ({ calendarDate }: { calendarDate?: CalendarDate }) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function DatePickerUIBlock({
  configuration: { label, calendarDateKeyName, smartFill },
  hotelId,
  formData,
  keyPath,
  onChange,
  registerBifrostFormInput,
}: DatePickerUIBlockProps) {
  const [localCalendarDate, setLocalCalendarDate] = useState<
    CalendarDate | undefined
  >(undefined);

  // Attempt to Prefill Field Using Prior Responses
  useEffect(() => {
    async function prefillKismetCalendarDateFieldUsingPriorResponses() {
      const { targetKeyCalendarDateValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData,
          targetKeyName: calendarDateKeyName,
          targetValueType: PrefilledBifrostFormValueType.CALENDAR_DATE,
        });

      const existingKeyValue = getValueFromBifrostFormDataByKeyPath({
        formData,
        keyPath: [...keyPath, calendarDateKeyName],
      });

      if (!existingKeyValue && targetKeyCalendarDateValue) {
        setLocalCalendarDate(
          (
            previousCalendarDate: CalendarDate | undefined
          ): CalendarDate | undefined => {
            onChange({
              calendarDate: previousCalendarDate,
            });

            if (!deepEqual(previousCalendarDate, targetKeyCalendarDateValue)) {
              return targetKeyCalendarDateValue;
            }
            return previousCalendarDate;
          }
        );
      }
    }

    if (smartFill) {
      prefillKismetCalendarDateFieldUsingPriorResponses();
    }
  }, []);

  const onChangeLocalCalendarDate = (nativeDate: Date | undefined) => {
    if (!nativeDate) return;

    const calendarDate: CalendarDate | undefined = nativeDate
      ? convertNativeDateToLocalCalendarDate(nativeDate)
      : undefined;

    setLocalCalendarDate(
      (
        previousLocalCalendarDateRange: CalendarDate | undefined
      ): CalendarDate | undefined => {
        onChange({
          calendarDate,
        });

        if (previousLocalCalendarDateRange) {
          registerBifrostFormInput();
        }

        if (!deepEqual(previousLocalCalendarDateRange, calendarDate)) {
          return calendarDate;
        } else {
          return previousLocalCalendarDateRange;
        }
      }
    );
  };

  return (
    <FormField>
      <FormLabel htmlFor={`kismet_${calendarDateKeyName}`}>{label}</FormLabel>

      <DatePicker
        nativeDate={
          localCalendarDate
            ? convertLocalCalendarDateToNativeDate(localCalendarDate)
            : undefined
        }
        setNativeDate={onChangeLocalCalendarDate}
      />
    </FormField>
  );
}
