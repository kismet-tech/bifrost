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
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function BifrostScreen({
  screenConfiguration: { layout },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  setFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: BifrostScreenProps) {
  return (
    <div className="flex flex-col gap-4 m-[0_auto] w-full p-4 md:!w-[50vw] md:!p-8">
      <LayoutBlock
        configuration={layout}
        keyPath={keyPath}
        formData={formData}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        setFormData={setFormData}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
      />

      <BifrostScreenFooter />
    </div>
  );
}
