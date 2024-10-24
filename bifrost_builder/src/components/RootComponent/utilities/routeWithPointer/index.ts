import { determineIfBifrostTravelerRequiresAnEventSpace } from "@/api/determineIfBifrostTravelerRequiresAnEventSpace";
import { ScreenConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import {
  ScreenPointer,
  ScreenPointerType,
} from "@/models/configuration/pointers/ScreenPointer";
import { routeBranchByRoomAvailabilityOnDates } from "./routeBranchByRoomAvailabilityOnDates";
import { routeBranchByInstantOfferAvailability } from "./routeBranchByInstantOfferAvailability";
import {
  BifrostSessionDataKey,
  BifrostSessionDataValue,
} from "@/models/configuration/bifrostSessionData";

interface routeWithPointerProps {
  pointer: ScreenPointer;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  formData: BifrostFormData;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  mutateBifrostSessionData: ({
    key,
    value,
  }: {
    key: BifrostSessionDataKey;
    value: BifrostSessionDataValue;
  }) => void;
}

export const routeWithPointer = async ({
  pointer,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  formData,
  setFormData,
  handleSubmitFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  mutateBifrostSessionData,
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
    await routeBranchByRoomAvailabilityOnDates({
      pointer,
      hotelId,
      formData,
      setFormData,
      handleSubmitFormData,
      pushScreenConfigurationStack,
      popRightscreenConfigurationStack,
    });
  } else if (
    pointer.type ===
    ScreenPointerType.SUBMIT_FORM_AND_BRANCH_BY_INSTANT_OFFER_AVAILABILITY
  ) {
    await routeBranchByInstantOfferAvailability({
      pointer,
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      formData,
      setFormData,
      handleSubmitFormData,
      pushScreenConfigurationStack,
      popRightscreenConfigurationStack,
      mutateBifrostSessionData,
    });
  }
};
