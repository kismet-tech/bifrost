import { getBifrostFormGreetingUrl } from "@/config";
import axios from "axios";

interface GetBifrostFormGreetingProps {
  hotelId: string;
  bifrostTravelerId: string;
  additionalDetails: string;
}

export const getBifrostFormGreeting = async ({
  hotelId,
  bifrostTravelerId,
  additionalDetails,
}: GetBifrostFormGreetingProps) => {
  return await axios.post(
    getBifrostFormGreetingUrl,
    {
      hotelId,
      bifrostTravelerId,
      additionalDetails,
    },
    {}
  );
};
