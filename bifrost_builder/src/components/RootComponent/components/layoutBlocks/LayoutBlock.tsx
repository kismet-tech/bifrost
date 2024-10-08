import {
  LayoutBlockConfiguration,
  LayoutBlockType,
  ScreenConfiguration,
} from "@/models/configuration";
import { RowLayoutBlock } from "./RowLayoutBlock";
import { ColumnLayoutBlock } from "./ColumnLayoutBlock";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { TableInputBlock } from "../TableInputBlock";

interface LayoutBlockProps {
  layoutBlockConfiguration: LayoutBlockConfiguration;
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

export function LayoutBlock({
  layoutBlockConfiguration,
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: LayoutBlockProps) {
  if (layoutBlockConfiguration.layoutBlockType === LayoutBlockType.ROWS) {
    return (
      <RowLayoutBlock
        rowsLayoutBlockConfiguration={layoutBlockConfiguration}
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
    );
  } else if (
    layoutBlockConfiguration.layoutBlockType === LayoutBlockType.COLUMNS
  ) {
    return (
      <ColumnLayoutBlock
        columnsLayoutBlockConfiguration={layoutBlockConfiguration}
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
    );
  } else if (
    layoutBlockConfiguration.layoutBlockType === LayoutBlockType.INPUT_TABLE
  ) {
    return (
      <TableInputBlock
        configuration={layoutBlockConfiguration}
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
    );
  }
}
