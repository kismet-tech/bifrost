import { CalendarDate } from "@/models/CalendarDate";
import { Api } from ".";
import { BifrostFormData } from "@/models/configuration/formData";

export enum PrefilledBifrostFormValueType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  CALENDAR_DATE = "CALENDAR_DATE",
}

interface AttemptToPrefillKismetFieldUsingPriorResponsesProps {
  hotelId: string;
  formData: BifrostFormData;

  targetKeyName: string;
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
  targetKeyName,
  targetValueType,
  formData,
}: AttemptToPrefillKismetFieldUsingPriorResponsesProps): Promise<AttemptToPrefillKismetFieldUsingPriorResponsesResponse> => {
  console.log(`Attempting to prefill Kismet field using prior responses`);
  console.log(`targetKeyName: ${targetKeyName}`);
  console.log(`targetValueType: ${targetValueType}`);
  console.log(`formData: ${JSON.stringify(formData, null, 4)}`);

  if (formData[targetKeyName] !== undefined) {
    return {};
  }

  const response = await Api.post(
    `/Bifrost/AttemptToPrefillKismetFieldUsingPriorResponses`,
    {
      hotelId,
      targetKeyName,
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
