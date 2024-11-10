import { CalendarDate } from "@/models/CalendarDate";
import { Api } from ".";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { rewriteQuestionsWithResponsesToFormData } from "./utilities/rewriteQuestionsWithResponsesToFormData";

export enum PrefilledBifrostFormValueType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  CALENDAR_DATE = "CALENDAR_DATE",
}

interface AttemptToPrefillKismetFieldUsingPriorResponsesProps {
  hotelId: string;
  questionWithResponse: QuestionWithResponse;
  questionsWithResponses: QuestionWithResponse[];

  targetValueType: PrefilledBifrostFormValueType;
}

interface AttemptToPrefillKismetFieldUsingPriorResponsesResponse {
  targetKeyNumberValue?: number;
  targetKeyStringValue?: string;
  targetKeyBooleanValue?: boolean;
  targetKeyCalendarDateValue?: CalendarDate;
}

export const attemptToPrefillKismetFieldUsingPriorResponses = async ({
  hotelId,
  questionWithResponse,
  questionsWithResponses,
  targetValueType,
}: AttemptToPrefillKismetFieldUsingPriorResponsesProps): Promise<AttemptToPrefillKismetFieldUsingPriorResponsesResponse> => {
  console.log(`Attempting to prefill Kismet field using prior responses`);
  console.log(`targetValueType: ${targetValueType}`);

  const formData = rewriteQuestionsWithResponsesToFormData({
    questionsWithResponses,
  });

  const response = await Api.post(
    `/Bifrost/AttemptToPrefillKismetFieldUsingPriorResponses`,
    {
      hotelId,
      targetKeyName: questionWithResponse.formQuestionId,
      targetValueType,
      formData,
    },
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error?.reason ?? "Unknown error");
    return {};
  }

  const targetKeyNumberValue: number | undefined =
    response.data.success.targetKeyNumberValue;

  const targetKeyStringValue: string | undefined =
    response.data.success.targetKeyStringValue;

  const targetKeyBooleanValue: boolean | undefined =
    response.data.success.targetKeyBooleanValue;

  const targetKeyCalendarDateValue: CalendarDate | undefined =
    response.data.success.targetKeyCalendarDateValue;

  console.log("response.data.success", response.data.success);

  return {
    targetKeyNumberValue,
    targetKeyStringValue,
    targetKeyBooleanValue,
    targetKeyCalendarDateValue,
  };
};
