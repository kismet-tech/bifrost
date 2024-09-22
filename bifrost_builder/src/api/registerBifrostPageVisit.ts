import { registerBifrostPageVisitUrl } from "@/config";
import axios from "axios";

interface RegisterBifrostPageVisitProps {
  hotelId: string;
  url: string;
  referrerUrl?: string;
  bifrostTravelerId: string;
}

export const registerBifrostPageVisit = async ({
  hotelId,
  url,
  referrerUrl,
  bifrostTravelerId,
}: RegisterBifrostPageVisitProps) => {
  await axios.post(
    registerBifrostPageVisitUrl,
    {
      hotelId,
      url,
      referrerUrl,
      bifrostTravelerId,
    },
    {}
  );
};
