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
  const response = await Api.post<
    | {
        success?: { isEventSpaceRequired: boolean };
      }
    | {
        error?: { reason: string };
      }
  >(
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
  } else {
    if (!("success" in response.data)) {
      return { isEventSpaceRequired: false };
    }
    const isEventSpaceRequired: boolean =
      response.data.success?.isEventSpaceRequired ?? false;

    return { isEventSpaceRequired };
  }
};
