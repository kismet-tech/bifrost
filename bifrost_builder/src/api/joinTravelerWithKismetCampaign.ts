import { Api } from ".";

interface JoinTravelerWithKismetCampaignProps {
  campaignUnitId: string;
  bifrostTravelerId: string;
}

export const joinTravelerWithKismetCampaign = async ({
  campaignUnitId,
  bifrostTravelerId,
}: JoinTravelerWithKismetCampaignProps) => {
  return await Api.post(
    `/Bifrost/JoinTravelerWithKismetCampaign`,
    {
      campaignUnitId,
      bifrostTravelerId,
    },
    {}
  );
};
