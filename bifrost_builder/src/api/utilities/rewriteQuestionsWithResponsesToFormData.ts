/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  potentialDatesQuestionKnollcroftV3,
  selectedDatesQuestionKnollcroftV3,
  undecidedDateDetailsQuestionKnollcroftV3,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";
import { splitPaymentQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface RewriteQuestionsWithResponsesToFormDataProps {
  questionsWithResponses: QuestionWithResponse[];
}

export const rewriteQuestionsWithResponsesToFormData = ({
  questionsWithResponses,
}: RewriteQuestionsWithResponsesToFormDataProps): Record<string, any> => {
  const formData: Record<string, any> = questionsWithResponses.reduce(
    (
      accum: Record<string, any>,
      questionWithResponse: QuestionWithResponse
    ): Record<string, any> => {
      return {
        ...accum,
        [questionWithResponse.formQuestionId]: questionWithResponse.response,
      };
    },
    {}
  );

  // Handle Single Date
  if (
    questionsWithResponses.some(
      (q) =>
        q.formQuestionId === selectedDatesQuestionKnollcroftV3.formQuestionId
    )
  ) {
    const response = questionsWithResponses.find(
      (q) =>
        q.formQuestionId === selectedDatesQuestionKnollcroftV3.formQuestionId
    )!.response as CalendarDateRange;

    formData.start_calendar_date = response.startCalendarDate;
    formData.end_calendar_date = response.endCalendarDate;
  }

  // Handle Multiple Dates
  if (
    questionsWithResponses.some(
      (q) =>
        q.formQuestionId === potentialDatesQuestionKnollcroftV3.formQuestionId
    )
  ) {
    const response = questionsWithResponses.find(
      (q) =>
        q.formQuestionId === potentialDatesQuestionKnollcroftV3.formQuestionId
    )!.response as CalendarDateRange[];

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

  if (
    questionsWithResponses.some(
      (q) =>
        q.formQuestionId ===
        undecidedDateDetailsQuestionKnollcroftV3.formQuestionId
    )
  ) {
    const response = questionsWithResponses.find(
      (q) =>
        q.formQuestionId ===
        undecidedDateDetailsQuestionKnollcroftV3.formQuestionId
    )!.response as string;

    formData["factors of consideration for date selection"] = response;
  }

  // Handle Split Payment
  const splitPaymentResponse: string = questionsWithResponses.find(
    (q) => q.formQuestionId === splitPaymentQuestionKnollcroftV3.formQuestionId
  )!.response as string;
  formData.split_payment = splitPaymentResponse;

  return formData;
};
