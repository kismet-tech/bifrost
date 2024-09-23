import { getOrCreateBifrostTravelerIdUrl } from "@/config";
import axios from "axios";

export const getOrCreateBifrostTravelerId = async (): Promise<{
  bifrostTravelerId: string;
}> => {
  const response = await axios.post<{
    success: { bifrostTravelerId: string };
  }>(getOrCreateBifrostTravelerIdUrl, {}, {});

  const bifrostTravelerId: string = response.data.success.bifrostTravelerId;

  return { bifrostTravelerId };
};
