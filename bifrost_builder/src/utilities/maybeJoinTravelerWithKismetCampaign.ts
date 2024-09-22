import { joinTravelerWithKismetCampaign } from "@/api/joinTravelerWithKismetCampaign";

export interface MaybeJoinTravelerWithKismetCampaignProps {
  bifrostTravelerId: string;
}

const CAMPAIGN_UNIT_ID_URL_QUERY_KEY = "campaignUnitId";

export const maybeJoinTravelerWithKismetCampaign = async ({
  bifrostTravelerId,
}: MaybeJoinTravelerWithKismetCampaignProps): Promise<void> => {
  const url = new URL(window.location.href);

  const maybeCampaignUnitId: string | undefined =
    url.searchParams.get(CAMPAIGN_UNIT_ID_URL_QUERY_KEY) || undefined;

  if (maybeCampaignUnitId) {
    const campaignUnitId = maybeCampaignUnitId;

    joinTravelerWithKismetCampaign({
      campaignUnitId,
      bifrostTravelerId,
    });
  }
};
