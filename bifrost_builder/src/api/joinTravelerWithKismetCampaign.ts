import { joinTravelerWithKismetCampaignUrl } from "@/config";
import axios from "axios";

interface JoinTravelerWithKismetCampaignProps {
  campaignUnitId: string;
  bifrostTravelerId: string;
}

export const joinTravelerWithKismetCampaign = async ({
  campaignUnitId,
  bifrostTravelerId,
}: JoinTravelerWithKismetCampaignProps) => {
  return await axios.post(
    joinTravelerWithKismetCampaignUrl,
    {
      campaignUnitId,
      bifrostTravelerId,
    },
    {}
  );
};
