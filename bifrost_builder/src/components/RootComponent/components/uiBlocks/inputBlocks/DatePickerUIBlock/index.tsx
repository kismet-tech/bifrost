import { CalendarDate } from "@/models/CalendarDate";
import { DatePickerUIBlockConfiguration } from "@/models/configuration";

import { deepEqual } from "@/utilities/core/deepEqual";
import { useEffect, useState } from "react";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { DatePicker } from "@/components/ui/date-picker";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

interface DatePickerUIBlockProps {
  configuration: DatePickerUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function DatePickerUIBlock({
  configuration: { label, formQuestionId },
  registerBifrostFormInput,
}: DatePickerUIBlockProps) {
  const [localCalendarDate, setLocalCalendarDate] = useState<
    CalendarDate | undefined
  >(undefined);

  const {
    setResponseToQuestion,
    maybeGetQuestionWithResponseByFormQuestionId,
  } = useBifrostFormState();

  const maybeQuestionWithResponse =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId,
    });

  const maybeQuestionResponse: CalendarDate | undefined =
    maybeQuestionWithResponse?.response as CalendarDate;

  useEffect(() => {
    if (maybeQuestionResponse) {
      setLocalCalendarDate(maybeQuestionResponse);
    } else {
      setLocalCalendarDate(undefined);
    }
  }, [maybeQuestionResponse]);

  const onChangeLocalCalendarDate = (nativeDate: Date | undefined) => {
    if (!nativeDate) return;

    const calendarDate: CalendarDate | undefined = nativeDate
      ? convertNativeDateToLocalCalendarDate(nativeDate)
      : undefined;

    setLocalCalendarDate(
      (
        previousLocalCalendarDateRange: CalendarDate | undefined
      ): CalendarDate | undefined => {
        if (calendarDate) {
          setResponseToQuestion({
            questionWithResponse: {
              formQuestionId,
              responseType: QuestionResponseType.CALENDAR_DATE,
              response: calendarDate,
            },
          });
        }

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
      <FormLabel htmlFor={`kismet_${formQuestionId}`}>{label}</FormLabel>

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
