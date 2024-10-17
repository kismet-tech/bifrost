import {
  BlockType,
  ConditonBlockConfiguration,
  LayoutBlockConfiguration,
  RowsLayoutBlockConfiguration,
  ScreenConfiguration,
  UIBlockConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { UIBlock } from "../../uiBlocks/UIBlock";
import { LayoutBlock } from "../LayoutBlock";
import { ConditionBlock } from "../../ConditionBlock/ConditionBlock";

export interface RowLayoutBlockProps {
  configuration: RowsLayoutBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  screenConfigurationStack: ScreenConfiguration[];
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function RowLayoutBlock({
  configuration: { rows: childConfigurations },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  setFormData,
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: RowLayoutBlockProps) {
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
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
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
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
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
          <ConditionBlock
            key={index}
            configuration={childConfiguration}
            keyPath={keyPath}
            formData={formData}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            setFormData={setFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
            screenConfigurationStack={screenConfigurationStack}
            pushScreenConfigurationStack={pushScreenConfigurationStack}
            popRightscreenConfigurationStack={popRightscreenConfigurationStack}
          />
        );
      } else {
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          `Unsupported block type: ${(childConfiguration as any).blockType}`
        );
      }
    }
  );

  return <div className="flex flex-col gap-4">{children}</div>;
}
