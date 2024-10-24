import {
  InstantOfferUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { BifrostSessionDataKeys } from "@/contexts/bifrostSessionDataKeys";
import { useBifrostSessionData } from "@/contexts/useBifrostSessionData";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import {
  ReservedKismetFormKeyNames,
  ReservedKismetFormKeyValues,
} from "@/getBifrostConfiguration/reservedKismetFormKeys";
import { SinglePayerPresentationOfInstantOffers } from "./SinglePayerPresentationOfInstantOffers";
import { SplitPayerPresentationOfInstantOffers } from "./SplitPayerPresentationOfInstantOffers";

interface InstantOfferUIBlockProps {
  configuration: InstantOfferUIBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  screenConfigurationStack: ScreenConfiguration[];
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function PresentationOfInstantOffersUIBlock({
  formData,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
}: InstantOfferUIBlockProps) {
  const { getBifrostSessionDataAtKey } = useBifrostSessionData();

  const userSessionId: string = getBifrostSessionDataAtKey({
    key: BifrostSessionDataKeys.userSessionId,
  }) as unknown as string;
  const renderableInstantOffers = getBifrostSessionDataAtKey({
    key: BifrostSessionDataKeys.instantBookOffers,
  }) as RenderableBifrostInstantBookOffer[];

  const guestPaySeparately: boolean =
    getValueFromBifrostFormDataByKeyPath({
      formData,
      keyPath: [ReservedKismetFormKeyNames.HOW_IS_PAYMENT_SPLIT],
    }) === ReservedKismetFormKeyValues.GUESTS_PAY_SEPARATELY;

  if (guestPaySeparately) {
    return (
      <SplitPayerPresentationOfInstantOffers
        renderableInstantOffers={renderableInstantOffers}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        bifrostFormId={bifrostFormId}
        localFormUserSessionId={localFormUserSessionId}
        userSessionId={userSessionId}
      />
    );
  } else {
    return (
      <SinglePayerPresentationOfInstantOffers
        renderableInstantOffers={renderableInstantOffers}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        bifrostFormId={bifrostFormId}
        localFormUserSessionId={localFormUserSessionId}
        userSessionId={userSessionId}
      />
    );
  }
}
