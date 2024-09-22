import { getOrCreateBifrostTravelerIdUrl } from "@/config";
import axios from "axios";

export const getOrCreateBifrostTravelerId = async (): Promise<{
  bifrostTravelerId: string;
}> => {
  const response = await axios.post<{ bifrostTravelerId: string }>(
    getOrCreateBifrostTravelerIdUrl,
    {},
    {}
  );

  return response.data;
};
