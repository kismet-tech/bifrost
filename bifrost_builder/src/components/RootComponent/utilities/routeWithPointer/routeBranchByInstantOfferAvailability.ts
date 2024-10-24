import { maybeGetInstantBookOffers } from "@/api/maybeGetInstantBookOffers";
import { submitBifrostForm } from "@/api/submitBifrostForm";
import { BifrostSessionDataKeys } from "@/contexts/bifrostSessionDataKeys";
import { ScreenConfiguration } from "@/models/configuration";
import {
  BifrostSessionDataKey,
  BifrostSessionDataValue,
} from "@/models/configuration/bifrostSessionData";
import { BifrostFormData } from "@/models/configuration/formData";
import { SubmitFormAndBranchByInstantOfferAvailabilityScreenPointer } from "@/models/configuration/pointers/ScreenPointer";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";

interface RouteBranchByInstantOfferAvailabilityProps {
  pointer: SubmitFormAndBranchByInstantOfferAvailabilityScreenPointer;
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

export const routeBranchByInstantOfferAvailability = async ({
  pointer,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  formData,
  setFormData,
  pushScreenConfigurationStack,
  mutateBifrostSessionData,
}: RouteBranchByInstantOfferAvailabilityProps) => {
  // trigger some before API call action

  try {
    const { userSessionId } = await submitBifrostForm({
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      formData,
    });

    mutateBifrostSessionData({
      key: BifrostSessionDataKeys.userSessionId,
      value: userSessionId,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).userSessionId = userSessionId;

    mutateFormDataAtKeyPath({
      mutations: [
        {
          keyPath: ["userSessionId"],
          keyValue: userSessionId,
        },
      ],
      setFormData,
    });

    console.log(`userSessionId: ${userSessionId}`);

    const { instantBookOffers: maybeInstantBookOffers } =
      await maybeGetInstantBookOffers({
        hotelId,
        bifrostTravelerId,
        bifrostFormId,
        localFormUserSessionId,
        formData,
        userSessionId,
      });

    console.log("maybeInstantBookOffers");
    console.log(JSON.stringify(maybeInstantBookOffers, null, 4));

    if (maybeInstantBookOffers.length === 0) {
      console.log("PUSHING instantOfferIsNotAvailableScreenConfiguration");

      pushScreenConfigurationStack(
        pointer.instantOfferIsNotAvailableScreenConfiguration
      );
    } else {
      console.log("PUSHING instantOfferIsAvailableScreenConfiguration");

      console.log(
        JSON.stringify(
          {
            ...pointer.instantOfferIsAvailableScreenConfiguration,
            metadata: {
              ...pointer.instantOfferIsAvailableScreenConfiguration.metadata,
              instantBookOffers: maybeInstantBookOffers,
            },
          },
          null,
          4
        )
      );

      mutateBifrostSessionData({
        key: BifrostSessionDataKeys.instantBookOffers,
        value: maybeInstantBookOffers,
      });

      pushScreenConfigurationStack({
        ...pointer.instantOfferIsAvailableScreenConfiguration,
        metadata: {
          ...pointer.instantOfferIsAvailableScreenConfiguration.metadata,
          instantBookOffers: maybeInstantBookOffers,
          userSessionId,
        },
      });
    }
  } catch (error) {
    console.log(error);

    console.log("PUSHING instantOfferIsNotAvailableScreenConfiguration");

    pushScreenConfigurationStack(
      pointer.instantOfferIsNotAvailableScreenConfiguration
    );
  }
};
