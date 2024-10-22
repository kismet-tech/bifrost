import { determineIfRoomsAreAvailableForBifrostTravelerOnDates } from "@/api/determineIfRoomsAreAvailableForBifrostTravelerOnDates";
import { ScreenConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { BranchByRoomAvailabilityOnDatesScreenPointer } from "@/models/configuration/pointers/ScreenPointer";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";

interface RouteBranchByRoomAvailabilityOnDatesProps {
  pointer: BranchByRoomAvailabilityOnDatesScreenPointer;
  hotelId: string;
  formData: BifrostFormData;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
}

export const routeBranchByRoomAvailabilityOnDates = async ({
  pointer,
  hotelId,
  formData,
  setFormData,
  pushScreenConfigurationStack,
}: RouteBranchByRoomAvailabilityOnDatesProps) => {
  const startCalendarDate = getValueFromBifrostFormDataByKeyPath({
    formData,
    keyPath: pointer.startCalendarDateKeyPath,
  });

  const endCalendarDate = getValueFromBifrostFormDataByKeyPath({
    formData,
    keyPath: pointer.endCalendarDateKeyPath,
  });

  if (!endCalendarDate || !startCalendarDate) {
    console.log(
      "Missing endCalendarDate or startCalendarDate | Pushing roomsAreAvailableBranchFormBlocks"
    );
    pushScreenConfigurationStack(
      pointer.roomsAreNotAvailableAndAlternativesAreNotAvailableScreenConfiguration
    );
  }

  const {
    roomsAreAvailable,
    alternativeStartCalendarDate,
    alternativeEndCalendarDate,
  } = await determineIfRoomsAreAvailableForBifrostTravelerOnDates({
    hotelId,
    startCalendarDate,
    endCalendarDate,
    formData,
  });

  if (roomsAreAvailable) {
    console.log("Pushing roomsAreAvailableBranchFormBlocks");
    pushScreenConfigurationStack(pointer.roomsAreAvailableScreenConfiguration);
  } else {
    if (alternativeStartCalendarDate && alternativeEndCalendarDate) {
      mutateFormDataAtKeyPath({
        mutations: [
          {
            keyPath: pointer.alternativeStartCalendarDateKeyPath,
            keyValue: alternativeStartCalendarDate,
          },
          {
            keyPath: pointer.alternativeEndCalendarDateKeyPath,
            keyValue: alternativeEndCalendarDate,
          },
        ],
        setFormData,
      });

      console.log(
        "Pushing roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks"
      );
      pushScreenConfigurationStack(
        pointer.roomsAreNotAvailableButAlternativesAreAvailableScreenConfiguration
      );
    } else {
      console.log(
        "Pushing roomsAreNotAvailableBranchAndNoAlternativesAreAvailableFormBlocks"
      );
      pushScreenConfigurationStack(
        pointer.roomsAreNotAvailableAndAlternativesAreNotAvailableScreenConfiguration
      );
    }
  }
};
