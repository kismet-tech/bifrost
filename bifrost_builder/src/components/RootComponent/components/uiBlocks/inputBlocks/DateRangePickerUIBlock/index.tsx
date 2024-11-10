import { CalendarDate } from "@/models/CalendarDate";
import { DateRangePickerUIBlockConfiguration } from "@/models/configuration";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

interface LocalCalendarDateRange {
  startCalendarDate?: CalendarDate;
  endCalendarDate?: CalendarDate;
}

interface DateRangePickerUIBlockProps {
  configuration: DateRangePickerUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function DateRangePickerUIBlock({
  configuration: { label, formQuestionId },
  registerBifrostFormInput,
}: DateRangePickerUIBlockProps) {
  const [localCalendarDateRange, setLocalCalendarDateRange] =
    useState<LocalCalendarDateRange>({
      startCalendarDate: undefined,
      endCalendarDate: undefined,
    });

  const {
    setResponseToQuestion,
    maybeGetQuestionWithResponseByFormQuestionId,
  } = useBifrostFormState();

  const maybeQuestionWithResponse =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId: formQuestionId,
    });

  const maybeQuestionResponse: CalendarDateRange | undefined =
    (maybeQuestionWithResponse?.response as unknown as CalendarDateRange) ||
    undefined;

  useEffect(() => {
    if (maybeQuestionResponse) {
      setLocalCalendarDateRange((): LocalCalendarDateRange => {
        const updatedLocalCalendarDateRange: LocalCalendarDateRange = {
          startCalendarDate: maybeQuestionResponse.startCalendarDate,
          endCalendarDate: maybeQuestionResponse.endCalendarDate,
        };

        return updatedLocalCalendarDateRange;
      });
    }
  }, [maybeQuestionResponse]);

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
          setResponseToQuestion({
            questionWithResponse: {
              formQuestionId: formQuestionId,
              responseType: QuestionResponseType.CALENDAR_DATE_RANGE,
              response: {
                startCalendarDate:
                  updatedLocalCalendarDateRange.startCalendarDate,
                endCalendarDate: updatedLocalCalendarDateRange.endCalendarDate,
              },
            },
          });

          registerBifrostFormInput();
        }

        return updatedLocalCalendarDateRange;
      }
    );
  };

  return (
    <FormField>
      <FormLabel htmlFor={`kismet_${formQuestionId}`}>{label}</FormLabel>

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
