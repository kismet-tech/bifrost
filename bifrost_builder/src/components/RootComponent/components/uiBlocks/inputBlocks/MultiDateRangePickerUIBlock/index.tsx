import { CalendarDate } from "@/models/CalendarDate";
import { MultiDateRangePickerUIBlockConfiguration } from "@/models/configuration";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { setElementOfArray } from "@/utilities/core/setElementOfArray";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import {
  FormQuestionResponseType,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";

interface LocalCalendarDateRange {
  startCalendarDate?: CalendarDate;
  endCalendarDate?: CalendarDate;
}

interface MultiDateRangePickerUIBlockProps {
  configuration: MultiDateRangePickerUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function MultiDateRangePickerUIBlock({
  configuration: { label, formQuestionId: questionId },
  registerBifrostFormInput,
}: MultiDateRangePickerUIBlockProps) {
  const [localCalendarDateRanges, setLocalCalendarDateRanges] = useState<
    LocalCalendarDateRange[]
  >([
    {
      startCalendarDate: undefined,
      endCalendarDate: undefined,
    },
  ]);

  const {
    setResponseToQuestion,
    maybeGetQuestionWithResponseByFormQuestionId,
  } = useBifrostFormState();

  const maybeQuestionWithResponse: FormQuestionWithResponse | undefined =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId: questionId,
    });

  const maybeQuestionResponse: CalendarDateRange[] | undefined = useMemo(() => {
    return (maybeQuestionWithResponse?.response as CalendarDateRange[]) || [];
  }, [maybeQuestionWithResponse]);

  console.log(`maybeQuestionResponse`);
  console.log(maybeQuestionResponse);

  useEffect(() => {
    if (maybeQuestionResponse) {
      setLocalCalendarDateRanges((): LocalCalendarDateRange[] => {
        let updatedLocalCalendarDateRanges: LocalCalendarDateRange[];

        if (maybeQuestionResponse.length === 0) {
          updatedLocalCalendarDateRanges = [
            { startCalendarDate: undefined, endCalendarDate: undefined },
          ];
        } else {
          updatedLocalCalendarDateRanges = maybeQuestionResponse;

          const lastElement =
            updatedLocalCalendarDateRanges[
              updatedLocalCalendarDateRanges.length - 1
            ];

          if (lastElement.startCalendarDate && lastElement.endCalendarDate) {
            updatedLocalCalendarDateRanges.push({
              startCalendarDate: undefined,
              endCalendarDate: undefined,
            });
          }
        }
        return updatedLocalCalendarDateRanges;
      });
    }
  }, [maybeQuestionResponse]);

  const onChangeLocalCalendarDateRange =
    (index: number) => (dateRange: DateRange | undefined) => {
      if (!dateRange) return;

      const updatedStartCalendarDate: CalendarDate | undefined = dateRange.from
        ? convertNativeDateToLocalCalendarDate(dateRange.from)
        : undefined;

      const updatedEndCalendarDate: CalendarDate | undefined = dateRange.to
        ? convertNativeDateToLocalCalendarDate(dateRange.to)
        : undefined;

      setLocalCalendarDateRanges(
        (previousLocalCalendarDateRanges): LocalCalendarDateRange[] => {
          console.log(
            `previousLocalCalendarDateRanges: ${JSON.stringify(
              previousLocalCalendarDateRanges,
              null,
              4
            )}`
          );

          const updatedLocalCalendarDateRange: LocalCalendarDateRange = {
            startCalendarDate: updatedStartCalendarDate,
            endCalendarDate: updatedEndCalendarDate,
          };

          console.log(
            `updatedLocalCalendarDateRange 1: ${JSON.stringify(
              updatedLocalCalendarDateRange,
              null,
              4
            )}`
          );

          let updatedLocalCalendarDateRanges: LocalCalendarDateRange[] =
            setElementOfArray({
              array: previousLocalCalendarDateRanges,
              index,
              updatedValue: updatedLocalCalendarDateRange,
            });

          console.log(
            `updatedLocalCalendarDateRanges 2: ${JSON.stringify(
              updatedLocalCalendarDateRanges,
              null,
              4
            )}`
          );

          updatedLocalCalendarDateRanges =
            updatedLocalCalendarDateRanges.filter(
              (dateRange: LocalCalendarDateRange) =>
                dateRange.startCalendarDate || dateRange.endCalendarDate
            );

          console.log(
            `updatedLocalCalendarDateRanges 3: ${JSON.stringify(
              updatedLocalCalendarDateRanges,
              null,
              4
            )}`
          );

          if (
            updatedLocalCalendarDateRanges.every(
              (dateRange: LocalCalendarDateRange) =>
                dateRange.startCalendarDate && dateRange.endCalendarDate
            )
          ) {
            setResponseToQuestion({
              questionWithResponse: {
                formQuestionId: questionId,
                responseType:
                  FormQuestionResponseType.ARRAY_OF_CALENDAR_DATE_RANGES,
                response: (
                  updatedLocalCalendarDateRanges as CalendarDateRange[]
                ).filter(
                  (localCalendarDateRange) =>
                    localCalendarDateRange.startCalendarDate &&
                    localCalendarDateRange.endCalendarDate
                ),
              },
            });

            registerBifrostFormInput();
          }

          const lastElement =
            updatedLocalCalendarDateRanges[
              updatedLocalCalendarDateRanges.length - 1
            ];

          if (
            !lastElement ||
            (!!lastElement.startCalendarDate && !!lastElement.endCalendarDate)
          ) {
            console.log("HIT IN HEREEEE");

            updatedLocalCalendarDateRanges.push({
              startCalendarDate: undefined,
              endCalendarDate: undefined,
            });
          }

          console.log(
            `updatedLocalCalendarDateRanges 4: ${JSON.stringify(
              updatedLocalCalendarDateRanges,
              null,
              4
            )}`
          );

          return updatedLocalCalendarDateRanges;
        }
      );
    };

  console.log("localCalendarDateRanges");
  console.log(JSON.stringify(localCalendarDateRanges, null, 4));

  return (
    <FormField>
      <FormLabel htmlFor={`kismet_${questionId}`}>{label}</FormLabel>
      {localCalendarDateRanges.map(
        (localCalendarDateRange: LocalCalendarDateRange, index: number) => {
          return (
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
              setDateRange={onChangeLocalCalendarDateRange(index)}
            />
          );
        }
      )}
    </FormField>
  );
}
