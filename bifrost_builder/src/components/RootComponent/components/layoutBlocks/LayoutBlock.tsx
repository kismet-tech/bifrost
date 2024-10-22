import {
  LayoutBlockConfiguration,
  LayoutBlockType,
  ScreenConfiguration,
  ScreenMetadata,
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
  screenMetadata: ScreenMetadata;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
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
  keyPath,
  formData,
  screenMetadata,
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
}: LayoutBlockProps) {
  console.log(`LayoutBlock screenMetadata`);
  console.log(`${JSON.stringify(screenMetadata)}`);

  if (configuration.layoutBlockType === LayoutBlockType.ROWS) {
    return (
      <RowLayoutBlock
        configuration={configuration}
        keyPath={keyPath}
        formData={formData}
        screenMetadata={screenMetadata}
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
    );
  } else if (configuration.layoutBlockType === LayoutBlockType.COLUMNS) {
    return (
      <ColumnLayoutBlock
        columnsLayoutBlockConfiguration={configuration}
        keyPath={keyPath}
        formData={formData}
        screenMetadata={screenMetadata}
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
    );
  } else if (configuration.layoutBlockType === LayoutBlockType.INPUT_TABLE) {
    return (
      <InputTableLayoutBlock
        configuration={configuration}
        keyPath={keyPath}
        formData={formData}
        screenMetadata={screenMetadata}
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
    );
  } else {
    throw new Error("Invalid layout block type");
  }
}
