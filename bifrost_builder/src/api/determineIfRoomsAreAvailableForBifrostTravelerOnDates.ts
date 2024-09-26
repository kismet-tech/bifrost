import { CalendarDate } from "@/models/CalendarDate";
import { Api } from ".";

interface DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesProps {
  hotelId: string;
  formData: Record<string, string>;
}

export const determineIfRoomsAreAvailableForBifrostTravelerOnDates = async ({
  hotelId,
  formData,
}: DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesProps): Promise<{
  roomsAreAvailable: boolean;
  alternativeStartCalendarDate?: CalendarDate;
  alternativeEndCalendarDate?: CalendarDate;
}> => {
  const response = await Api.post(
    `/Bifrost/DetermineIfRoomsAreAvailableForBifrostTravelerOnDates`,
    {
      hotelId,
      formData,
    },
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error?.reason ?? "Unknown error");
    return { roomsAreAvailable: true };
  }
  const roomsAreAvailable: boolean = response.data.success.roomsAreAvailable;
  const alternativeStartCalendarDate: CalendarDate =
    response.data.success.alternativeStartCalendarDate;
  const alternativeEndCalendarDate: CalendarDate =
    response.data.success.alternativeEndCalendarDate;

  return {
    roomsAreAvailable,
    alternativeStartCalendarDate,
    alternativeEndCalendarDate,
  };
};
