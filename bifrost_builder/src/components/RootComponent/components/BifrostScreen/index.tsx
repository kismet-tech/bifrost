import { ScreenConfiguration } from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";
import { BifrostScreenFooter } from "./BifrostScreenFooter";

interface BifrostScreenProps {
  screenConfiguration: ScreenConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  screenConfigurationStack: ScreenConfiguration[];
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => Promise<void>;
}

export function BifrostScreen({
  screenConfiguration: { layout, metadata: screenMetadata },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  setFormData,
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: BifrostScreenProps) {
  console.log(`BifrostScreen screenMetadata`);
  console.log(`${JSON.stringify(screenMetadata)}`);

  return (
    <div className="flex flex-col gap-4 m-[0_auto] w-full p-4 md:!max-w-[50vw] md:!p-8">
      <LayoutBlock
        configuration={layout}
        keyPath={keyPath}
        formData={formData}
        screenMetadata={screenMetadata || {}}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        bifrostFormId={bifrostFormId}
        localFormUserSessionId={localFormUserSessionId}
        setFormData={setFormData}
        screenConfigurationStack={screenConfigurationStack}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
      />

      <BifrostScreenFooter />
    </div>
  );
}
