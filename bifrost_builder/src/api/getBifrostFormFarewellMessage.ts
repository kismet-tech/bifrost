import { Api } from ".";

interface GetBifrostFormFarewellMessageProps {
  hotelId: string;
  bifrostTravelerId: string;
  formData: Record<string, string>;
}

export const getBifrostFormFarewellMessage = async ({
  hotelId,
  bifrostTravelerId,
  formData,
}: GetBifrostFormFarewellMessageProps): Promise<{ farewellText: string }> => {
  console.log("CALLING getBifrostFormFarewellMessage");

  const response = await Api.post(
    `/Bifrost/GetBifrostFormFarewellMessage`,
    {
      hotelId,
      bifrostTravelerId,
      formData,
    },
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const farewellText = response.data.success.farewellText;

  console.log(`farewellText: ${farewellText}`);
  return { farewellText };
};
