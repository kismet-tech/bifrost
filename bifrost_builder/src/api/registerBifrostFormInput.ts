import { BifrostFormData } from "@/models/configuration/formData";
import { Api } from ".";

interface RegisterBifrostFormInputProps {
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  formData: BifrostFormData;
}

export const registerBifrostFormInput = async ({
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  formData,
}: RegisterBifrostFormInputProps) => {
  await Api.post(
    `/Bifrost/RegisterBifrostFormInput`,
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
