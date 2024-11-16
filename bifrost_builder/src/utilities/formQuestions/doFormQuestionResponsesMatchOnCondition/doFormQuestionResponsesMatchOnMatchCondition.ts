import { CalendarDateRange } from "@/models/CalendarDateRange";
import { FormQuestionResponseMatchCondition } from "@/models/formQuestions/formQuestionResponseCondition";
import {
  FormQuestionResponseType,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";

interface DoFormQuestionResponsesMatchOnMatchConditionProps {
  condition: FormQuestionResponseMatchCondition;
  formQuestionsWithResponses: FormQuestionWithResponse[];
}

export const doFormQuestionResponsesMatchOnMatchCondition = ({
  condition: { questionWithResponse },
  formQuestionsWithResponses,
}: DoFormQuestionResponsesMatchOnMatchConditionProps): boolean => {
  const maybeAnsweredQuestionWithResponse:
    | FormQuestionWithResponse
    | undefined = formQuestionsWithResponses.find(
    (answeredQuestionWithResponse) =>
      answeredQuestionWithResponse.formQuestionId ===
      questionWithResponse.formQuestionId
  );

  if (!maybeAnsweredQuestionWithResponse) {
    return false;
  }

  if (
    maybeAnsweredQuestionWithResponse.responseType ===
    FormQuestionResponseType.STRING
  ) {
    return (
      maybeAnsweredQuestionWithResponse.response ===
      questionWithResponse.response
    );
  } else if (
    maybeAnsweredQuestionWithResponse.responseType ===
    FormQuestionResponseType.CALENDAR_DATE_RANGE
  ) {
    return (
      maybeAnsweredQuestionWithResponse.response.startCalendarDate ===
        (questionWithResponse.response as CalendarDateRange)
          .startCalendarDate &&
      maybeAnsweredQuestionWithResponse.response.endCalendarDate ===
        (questionWithResponse.response as CalendarDateRange).endCalendarDate
    );
  } else if (
    maybeAnsweredQuestionWithResponse.responseType ===
    FormQuestionResponseType.ARRAY_OF_CALENDAR_DATE_RANGES
  ) {
    return (
      maybeAnsweredQuestionWithResponse.response.every(
        (answeredCalendarDateRange) =>
          (questionWithResponse.response as CalendarDateRange[]).some(
            (questionCalendarDateRange) =>
              answeredCalendarDateRange.startCalendarDate ===
                questionCalendarDateRange.startCalendarDate &&
              answeredCalendarDateRange.endCalendarDate ===
                questionCalendarDateRange.endCalendarDate
          )
      ) &&
      maybeAnsweredQuestionWithResponse.response.length ===
        (questionWithResponse.response as CalendarDateRange[]).length
    );
  } else {
    throw new Error("Invalid response type");
  }
};
