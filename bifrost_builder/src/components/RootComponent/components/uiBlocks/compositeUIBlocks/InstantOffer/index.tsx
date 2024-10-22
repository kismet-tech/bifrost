import {
  InstantOfferUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { RenderedInstantOfferSummary } from "./RenderedInstantOfferSummary";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";

interface InstantOfferUIBlockProps {
  configuration: InstantOfferUIBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  renderableInstantOffers: RenderableBifrostInstantBookOffer[];
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

export function InstantOfferUIBlock({
  formData,
  renderableInstantOffers,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
}: InstantOfferUIBlockProps) {
  const userSessionId = getValueFromBifrostFormDataByKeyPath({
    formData,
    keyPath: ["userSessionId"],
  });

  console.log(`InstantOfferUIBlock`);
  console.log(`hotelId: ${hotelId}`);
  console.log(`userSessionId: ${userSessionId}`);
  console.log(`renderableInstantOffers: ${renderableInstantOffers}`);

  return (
    <div>
      <div>Instant Book</div>
      <div className="space-y-4">
        {renderableInstantOffers.map((renderableInstantOffer, index) => {
          return (
            <RenderedInstantOfferSummary
              key={index}
              instantOfferIndex={index}
              renderableInstantOffer={renderableInstantOffer}
              hotelId={hotelId}
              bifrostTravelerId={bifrostTravelerId}
              bifrostFormId={bifrostFormId}
              localFormUserSessionId={localFormUserSessionId}
              userSessionId={userSessionId}
            />
          );
        })}
      </div>
    </div>
  );
}
