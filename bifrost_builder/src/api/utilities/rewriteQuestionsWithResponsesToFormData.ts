/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  potentialDatesQuestionKnollcroftV3,
  selectedDatesQuestionKnollcroftV3,
  undecidedDateDetailsQuestionKnollcroftV3,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";
import { splitPaymentQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface RewriteQuestionsWithResponsesToFormDataProps {
  questionsWithResponses: FormQuestionWithResponse[];
}

export const rewriteQuestionsWithResponsesToFormData = ({
  questionsWithResponses,
}: RewriteQuestionsWithResponsesToFormDataProps): Record<string, any> => {
  const formData: Record<string, any> = questionsWithResponses.reduce(
    (
      accum: Record<string, any>,
      questionWithResponse: FormQuestionWithResponse
    ): Record<string, any> => {
      return {
        ...accum,
        [questionWithResponse.formQuestionId]: questionWithResponse.response,
      };
    },
    {}
  );

  // Handle Single Date
  const maybeSelectedDatesQuestionWithResponse:
    | FormQuestionWithResponse
    | undefined = questionsWithResponses.find(
    (q) => q.formQuestionId === selectedDatesQuestionKnollcroftV3.formQuestionId
  );

  if (maybeSelectedDatesQuestionWithResponse) {
    const response: CalendarDateRange =
      maybeSelectedDatesQuestionWithResponse.response as CalendarDateRange;

    formData.start_calendar_date = response.startCalendarDate;
    formData.end_calendar_date = response.endCalendarDate;
  }

  // Handle Multiple Dates
  const maybeDateOptionsQuestionWithResponse:
    | FormQuestionWithResponse
    | undefined = questionsWithResponses.find(
    (q) =>
      q.formQuestionId === potentialDatesQuestionKnollcroftV3.formQuestionId
  );

  if (maybeDateOptionsQuestionWithResponse) {
    const response =
      maybeDateOptionsQuestionWithResponse.response as CalendarDateRange[];

    formData.potential_dates = response.map(
      (calendarDateRange: CalendarDateRange) => {
        return {
          start_calendar_date: calendarDateRange.startCalendarDate,
          end_calendar_date: calendarDateRange.endCalendarDate,
        };
      }
    );
  }

  // Handle Unknown Dates
  const maybeUndecidedDateDetailsQuestionWithResponse:
    | FormQuestionWithResponse
    | undefined = questionsWithResponses.find(
    (q) =>
      q.formQuestionId ===
      undecidedDateDetailsQuestionKnollcroftV3.formQuestionId
  );

  if (maybeUndecidedDateDetailsQuestionWithResponse) {
    const response =
      maybeUndecidedDateDetailsQuestionWithResponse.response as string;

    formData["factors of consideration for date selection"] = response;
  }

  // Handle Split Payment
  const maybeSplitPaymentQuestionWithResponse:
    | FormQuestionWithResponse
    | undefined = questionsWithResponses.find(
    (q) => q.formQuestionId === splitPaymentQuestionKnollcroftV3.formQuestionId
  );
  if (maybeSplitPaymentQuestionWithResponse) {
    formData.split_payment = JSON.stringify(
      maybeSplitPaymentQuestionWithResponse.response
    );
  }

  return formData;
};
