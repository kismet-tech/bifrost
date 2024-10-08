import {
  BlockType,
  LayoutBlockConfiguration,
  RowsLayoutBlockConfiguration,
  ScreenConfiguration,
  UIBlockConfiguration,
} from "@/models/configuration";
import { UIBlock } from "../uiBlocks/UIBlock";
import { LayoutBlock } from "./LayoutBlock";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";

export interface RowLayoutBlockProps {
  rowsLayoutBlockConfiguration: RowsLayoutBlockConfiguration;
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

export function RowLayoutBlock({
  rowsLayoutBlockConfiguration: { rows: childConfigurations },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: RowLayoutBlockProps) {
  return childConfigurations.map(
    (
      childConfiguration: UIBlockConfiguration | LayoutBlockConfiguration,
      index: number
    ) => {
      if (childConfiguration.blockType === BlockType.UI_BLOCK) {
        return (
          <UIBlock
            key={index}
            configuration={childConfiguration}
            keyPath={keyPath}
            formData={formData}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            handleSetFormData={handleSetFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
            pushScreenConfigurationStack={pushScreenConfigurationStack}
            popRightscreenConfigurationStack={popRightscreenConfigurationStack}
          />
        );
      } else {
        return (
          <LayoutBlock
            key={index}
            layoutBlockConfiguration={childConfiguration}
            keyPath={keyPath}
            formData={formData}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            handleSetFormData={handleSetFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
            pushScreenConfigurationStack={pushScreenConfigurationStack}
            popRightscreenConfigurationStack={popRightscreenConfigurationStack}
          />
        );
      }
    }
  );
}
