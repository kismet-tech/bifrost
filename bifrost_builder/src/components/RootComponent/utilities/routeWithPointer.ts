import { determineIfBifrostTravelerRequiresAnEventSpace } from "@/api/determineIfBifrostTravelerRequiresAnEventSpace";
import { determineIfRoomsAreAvailableForBifrostTravelerOnDates } from "@/api/determineIfRoomsAreAvailableForBifrostTravelerOnDates";
import { ScreenConfiguration } from "@/models/configuration";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import {
  ScreenPointer,
  ScreenPointerType,
} from "@/models/configuration/ScreenPointer";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";

interface routeWithPointerProps {
  pointer: ScreenPointer;
  hotelId: string;
  formData: BifrostFormData;
  handleSetFormData: ({
    keyPath,
    keyValue,
  }: {
    keyPath: BifrostKeyPath;
    keyValue: BifrostFormDataValue;
  }) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
}

export const routeWithPointer = async ({
  pointer,
  hotelId,
  formData,
  handleSetFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
}: routeWithPointerProps) => {
  if (pointer.type === ScreenPointerType.DIRECT) {
    pushScreenConfigurationStack(pointer.screenConfiguration);
  } else if (pointer.type === ScreenPointerType.BACK) {
    popRightscreenConfigurationStack();
  } else if (
    pointer.type === ScreenPointerType.BRANCH_BY_EVENT_SPACE_REQUIREMENT
  ) {
    const { isEventSpaceRequired } =
      await determineIfBifrostTravelerRequiresAnEventSpace({
        hotelId,
        formData,
      });

    if (isEventSpaceRequired) {
      pushScreenConfigurationStack(
        pointer.eventSpaceIsRequiredScreenConfiguration
      );
    } else {
      pushScreenConfigurationStack(
        pointer.eventSpaceIsNotRequiredScreenConfiguration
      );
    }
  } else if (
    pointer.type === ScreenPointerType.BRANCH_BY_ROOM_AVAILABILITY_ON_DATES
  ) {
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
      pushScreenConfigurationStack(
        pointer.roomsAreAvailableScreenConfiguration
      );
    } else {
      if (alternativeStartCalendarDate && alternativeEndCalendarDate) {
        handleSetFormData({
          keyPath: pointer.alternativeStartCalendarDateKeyPath,
          keyValue: alternativeStartCalendarDate,
        });

        handleSetFormData({
          keyPath: pointer.alternativeEndCalendarDateKeyPath,
          keyValue: alternativeEndCalendarDate,
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
  }
};
