import { Api } from ".";

interface DetermineIfBifrostTravelerRequiresAnEventSpaceProps {
  hotelId: string;
  formData: Record<string, string>;
}

export const determineIfBifrostTravelerRequiresAnEventSpace = async ({
  hotelId,
  formData,
}: DetermineIfBifrostTravelerRequiresAnEventSpaceProps): Promise<{
  isEventSpaceRequired: boolean;
}> => {
  const response = await Api.post(
    `/Bifrost/DetermineIfBifrostTravelerRequiresAnEventSpace`,
    {
      hotelId,
      formData,
    },
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error?.reason ?? "Unknown error");
    return { isEventSpaceRequired: false };
  }
  const isEventSpaceRequired = response.data.success.isEventSpaceRequired;

  return { isEventSpaceRequired };
};
