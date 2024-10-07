import { CalendarDate } from "@/models/CalendarDate";
import { DateRangePickerFormBlockConfiguration } from "../../../models";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";
import { FormField } from "../../FormField";
import { FormLabel } from "../../FormLabel";
import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";

interface LocalCalendarDateRange {
  startCalendarDate?: CalendarDate;
  endCalendarDate?: CalendarDate;
}

export interface FormDateRangePickerFieldProps {
  configuration: DateRangePickerFormBlockConfiguration;
  hotelId: string;
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
  configuration: { label, startCalendarDateKeyName, endCalendarDateKeyName },
  hotelId,
  formState,
  onChange,
  registerBifrostFormInput,
}: FormDateRangePickerFieldProps) {
  const [localCalendarDateRange, setLocalCalendarDateRange] =
    useState<LocalCalendarDateRange>({
      startCalendarDate: undefined,
      endCalendarDate: undefined,
    });

  // Attempt to Prefill Field Using Prior Responses
  useEffect(() => {
    async function prefillKismetStartCalendarDateFieldUsingPriorResponses() {
      const { targetKeyCalendarDateValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData: formState,
          targetKeyName: startCalendarDateKeyName,
          targetValueType: PrefilledBifrostFormValueType.CALENDAR_DATE,
        });

      if (!formState[startCalendarDateKeyName] && targetKeyCalendarDateValue) {
        setLocalCalendarDateRange(
          (previousLocalCalendarDateRange): LocalCalendarDateRange => {
            const updatedLocalCalendarDateRange: LocalCalendarDateRange = {
              startCalendarDate: targetKeyCalendarDateValue,
              endCalendarDate: previousLocalCalendarDateRange.endCalendarDate,
            };

            onChange({
              startCalendarDate:
                updatedLocalCalendarDateRange.startCalendarDate,
              endCalendarDate: updatedLocalCalendarDateRange.endCalendarDate,
            });

            return updatedLocalCalendarDateRange;
          }
        );
      }
    }

    async function prefillKismetEndCalendarDateFieldUsingPriorResponses() {
      const { targetKeyCalendarDateValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData: formState,
          targetKeyName: endCalendarDateKeyName,
          targetValueType: PrefilledBifrostFormValueType.CALENDAR_DATE,
        });

      if (!formState[endCalendarDateKeyName] && targetKeyCalendarDateValue) {
        setLocalCalendarDateRange(
          (previousLocalCalendarDateRange): LocalCalendarDateRange => {
            const updatedLocalCalendarDateRange: LocalCalendarDateRange = {
              startCalendarDate:
                previousLocalCalendarDateRange.startCalendarDate,
              endCalendarDate: targetKeyCalendarDateValue,
            };

            onChange({
              startCalendarDate:
                updatedLocalCalendarDateRange.startCalendarDate,
              endCalendarDate: updatedLocalCalendarDateRange.endCalendarDate,
            });

            return updatedLocalCalendarDateRange;
          }
        );
      }
    }

    prefillKismetStartCalendarDateFieldUsingPriorResponses();
    prefillKismetEndCalendarDateFieldUsingPriorResponses();
  }, []);

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
        htmlFor={`kismet_${startCalendarDateKeyName}_${endCalendarDateKeyName}`}
      >
        {label}
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
