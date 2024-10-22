import {
  BlockType,
  ColumnsLayoutBlockConfiguration,
  ConditonBlockConfiguration,
  LayoutBlockConfiguration,
  ScreenConfiguration,
  ScreenMetadata,
  UIBlockConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { UIBlock } from "../../uiBlocks/UIBlock";
import { LayoutBlock } from "../LayoutBlock";
import { ConditionBlock } from "../../ConditionBlock/ConditionBlock";

export interface ColumnLayoutBlockProps {
  columnsLayoutBlockConfiguration: ColumnsLayoutBlockConfiguration;
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

export function ColumnLayoutBlock({
  columnsLayoutBlockConfiguration: { columns: childConfigurations },
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
}: ColumnLayoutBlockProps) {
  const children = childConfigurations.map(
    (
      childConfiguration:
        | UIBlockConfiguration
        | LayoutBlockConfiguration
        | ConditonBlockConfiguration,
      index: number
    ) => {
      if (childConfiguration.blockType === BlockType.UI_BLOCK) {
        return (
          <UIBlock
            key={index}
            configuration={childConfiguration}
            keyPath={keyPath}
            formData={formData}
            screenMetadata={screenMetadata}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            bifrostFormId={bifrostFormId}
            localFormUserSessionId={localFormUserSessionId}
            setFormData={setFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
            screenConfigurationStack={screenConfigurationStack}
            pushScreenConfigurationStack={pushScreenConfigurationStack}
            popRightscreenConfigurationStack={popRightscreenConfigurationStack}
          />
        );
      } else if (childConfiguration.blockType === BlockType.LAYOUT_BLOCK) {
        return (
          <LayoutBlock
            key={index}
            configuration={childConfiguration}
            keyPath={keyPath}
            formData={formData}
            screenMetadata={screenMetadata}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            bifrostFormId={bifrostFormId}
            localFormUserSessionId={localFormUserSessionId}
            setFormData={setFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
            screenConfigurationStack={screenConfigurationStack}
            pushScreenConfigurationStack={pushScreenConfigurationStack}
            popRightscreenConfigurationStack={popRightscreenConfigurationStack}
          />
        );
      } else if (childConfiguration.blockType === BlockType.CONDITION_BLOCK) {
        return (
          <div key={index}>
            <ConditionBlock
              configuration={childConfiguration}
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
              popRightscreenConfigurationStack={
                popRightscreenConfigurationStack
              }
              registerBifrostFormInput={registerBifrostFormInput}
              handleSubmitFormData={handleSubmitFormData}
            />
          </div>
        );
      } else {
        throw new Error("Invalid block type");
      }
    }
  );

  return <div className="flex flex-wrap gap-4 [&>*]:flex-1">{children}</div>;
}
