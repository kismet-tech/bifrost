import { submitBifrostFormUrl } from "@/config";
import axios from "axios";

interface SubmitBifrostFormProps {
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  formData: Record<string, string>;
}

export const submitBifrostForm = async ({
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  formData,
}: SubmitBifrostFormProps) => {
  return await axios.post(
    submitBifrostFormUrl,
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
