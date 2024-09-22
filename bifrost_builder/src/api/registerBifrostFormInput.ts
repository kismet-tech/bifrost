import { registerBifrostFormInputUrl } from "@/config";
import axios from "axios";

interface RegisterBifrostFormInputProps {
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  formData: Record<string, string>;
}

export const registerBifrostFormInput = async ({
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  formData,
}: RegisterBifrostFormInputProps) => {
  await axios.post(
    registerBifrostFormInputUrl,
    {
      hotelId: hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      formData,
    },
    {}
  );
};
