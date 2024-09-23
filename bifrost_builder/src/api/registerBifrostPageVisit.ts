import { Api } from ".";

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
  await Api.post(
    `/Bifrost/RegisterBifrostPageVisit`,
    {
      hotelId,
      url,
      referrerUrl,
      bifrostTravelerId,
    },
    {}
  );
};
