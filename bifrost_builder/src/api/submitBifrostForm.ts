import { BifrostFormData } from "@/models/configuration/formData";
import { Api } from ".";

interface SubmitBifrostFormProps {
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  formData: BifrostFormData;
}

export const submitBifrostForm = async ({
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  formData,
}: SubmitBifrostFormProps) => {
  return await Api.post(
    `/Bifrost/SubmitBifrostForm`,
    {
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      formData,
    },
    {}
  );
};
