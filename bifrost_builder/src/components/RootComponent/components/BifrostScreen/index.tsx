import { ScreenConfiguration } from "@/models/configuration";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";

interface BifrostScreenProps {
  screenConfiguration: ScreenConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  handleSetFormData: ({
    keyPath,
    keyValue,
  }: {
    keyPath: BifrostKeyPath;
    keyValue: BifrostFormDataValue;
  }) => void;
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
  handleSetFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: BifrostScreenProps) {
  return (
    <div className="flex flex-col gap-4 m-[0_auto] w-full p-4 md:!w-[50vw] md:!p-8">
      <LayoutBlock
        layoutBlockConfiguration={layout}
        keyPath={keyPath}
        formData={formData}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        handleSetFormData={handleSetFormData}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
      />
    </div>
  );
}
