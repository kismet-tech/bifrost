import { ScreenConfiguration } from "@/models/configuration";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";
import { BifrostScreenFooter } from "./BifrostScreenFooter";

interface BifrostScreenProps {
  screenConfiguration: ScreenConfiguration;
  screenConfigurationStack: ScreenConfiguration[];
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => Promise<void>;
}

export function BifrostScreen({
  screenConfiguration: { layout },
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: BifrostScreenProps) {
  return (
    <div className="flex flex-col gap-4 m-[0_auto] w-full p-4 md:!max-w-[50vw] md:!p-8">
      <LayoutBlock
        configuration={layout}
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
