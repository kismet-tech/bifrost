import { Api } from ".";

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
  return await Api.post(
    `/Bifrost/GetBifrostFormGreeting`,
    {
      hotelId,
      bifrostTravelerId,
      additionalDetails,
    },
    {}
  );
};
