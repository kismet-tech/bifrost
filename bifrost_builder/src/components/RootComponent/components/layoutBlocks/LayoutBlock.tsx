import {
  LayoutBlockConfiguration,
  LayoutBlockType,
  ScreenConfiguration,
} from "@/models/configuration";
import { ColumnLayoutBlock } from "./ColumnLayoutBlock";
import { RowLayoutBlock } from "./RowLayoutBlock";

interface LayoutBlockProps {
  configuration: LayoutBlockConfiguration;
  screenConfigurationStack: ScreenConfiguration[];
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => Promise<void>;
}

export function LayoutBlock({
  configuration,
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: LayoutBlockProps) {
  if (configuration.layoutBlockType === LayoutBlockType.ROWS) {
    return (
      <RowLayoutBlock
        configuration={configuration}
        screenConfigurationStack={screenConfigurationStack}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
      />
    );
  } else if (configuration.layoutBlockType === LayoutBlockType.COLUMNS) {
    return (
      <ColumnLayoutBlock
        columnsLayoutBlockConfiguration={configuration}
        screenConfigurationStack={screenConfigurationStack}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
      />
    );
  } else {
    throw new Error("Invalid layout block type");
  }
}
