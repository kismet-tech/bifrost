import {
  BlockType,
  ColumnsLayoutBlockConfiguration,
  LayoutBlockConfiguration,
  ScreenConfiguration,
  UIBlockConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { UIBlock } from "../uiBlocks/UIBlock";
import { LayoutBlock } from "./LayoutBlock";

export interface ColumnLayoutBlockProps {
  columnsLayoutBlockConfiguration: ColumnsLayoutBlockConfiguration;
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

export function ColumnLayoutBlock({
  columnsLayoutBlockConfiguration: { columns: childConfigurations },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: ColumnLayoutBlockProps) {
  const children = childConfigurations.map(
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

  return <div className="flex flex-wrap gap-4 [&>*]:flex-1">{children}</div>;
}
