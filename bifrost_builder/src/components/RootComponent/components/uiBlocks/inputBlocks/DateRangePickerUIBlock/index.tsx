import { CalendarDate } from "@/models/CalendarDate";
import { DateRangePickerUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { useEffect, useState } from "react";
import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { DateRange } from "react-day-picker";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";

interface LocalCalendarDateRange {
  startCalendarDate?: CalendarDate;
  endCalendarDate?: CalendarDate;
}

interface DateRangePickerUIBlockProps {
  configuration: DateRangePickerUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  onChange: ({
    startCalendarDate,
    endCalendarDate,
  }: {
    startCalendarDate?: CalendarDate;
    endCalendarDate?: CalendarDate;
  }) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function DateRangePickerUIBlock({
  configuration: { label, startCalendarDateKeyName, endCalendarDateKeyName },
  hotelId,
  formData,
  onChange,
  registerBifrostFormInput,
}: DateRangePickerUIBlockProps) {
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
          formData,
          targetKeyName: startCalendarDateKeyName,
          targetValueType: PrefilledBifrostFormValueType.CALENDAR_DATE,
        });

      if (!formData[startCalendarDateKeyName] && targetKeyCalendarDateValue) {
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
          formData,
          targetKeyName: endCalendarDateKeyName,
          targetValueType: PrefilledBifrostFormValueType.CALENDAR_DATE,
        });

      if (!formData[endCalendarDateKeyName] && targetKeyCalendarDateValue) {
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
