import {
  LayoutBlockConfiguration,
  LayoutBlockType,
  ScreenConfiguration,
} from "@/models/configuration";
import { ColumnLayoutBlock } from "./ColumnLayoutBlock";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { RowLayoutBlock } from "./RowLayoutBlock";
import { InputTableLayoutBlock } from "./InputTableLayoutBlock";

interface LayoutBlockProps {
  configuration: LayoutBlockConfiguration;
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

export function LayoutBlock({
  configuration,
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  setFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: LayoutBlockProps) {
  if (configuration.layoutBlockType === LayoutBlockType.ROWS) {
    return (
      <RowLayoutBlock
        configuration={configuration}
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
    );
  } else if (configuration.layoutBlockType === LayoutBlockType.COLUMNS) {
    return (
      <ColumnLayoutBlock
        columnsLayoutBlockConfiguration={configuration}
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
    );
  } else if (configuration.layoutBlockType === LayoutBlockType.INPUT_TABLE) {
    return (
      <InputTableLayoutBlock
        configuration={configuration}
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
    );
  } else {
    throw new Error("Invalid layout block type");
  }
}
