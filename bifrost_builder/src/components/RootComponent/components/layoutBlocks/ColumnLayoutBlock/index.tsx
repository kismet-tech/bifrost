import {
  BlockType,
  ColumnsLayoutBlockConfiguration,
  ConditonBlockConfiguration,
  LayoutBlockConfiguration,
  ScreenConfiguration,
  UIBlockConfiguration,
} from "@/models/configuration";
import { UIBlock } from "../../uiBlocks/UIBlock";
import { LayoutBlock } from "../LayoutBlock";
import { ConditionBlock } from "../../ConditionBlock/ConditionBlock";

export interface ColumnLayoutBlockProps {
  columnsLayoutBlockConfiguration: ColumnsLayoutBlockConfiguration;
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
