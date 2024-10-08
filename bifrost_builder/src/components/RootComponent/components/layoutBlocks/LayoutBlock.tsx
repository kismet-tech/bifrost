import {
  BlockType,
  LayoutBlockConfiguration,
  LayoutBlockType,
  UIBlockConfiguration,
} from "@/models/configuration";
import { UIBlock } from "../uiBlocks/UIBlock";
import { RowLayoutBlock } from "./RowLayoutBlock";
import { ColumnLayoutBlock } from "./ColumnLayoutBlock";
import { BifrostFormData } from "@/models/configuration/formData";

interface LayoutBlockProps {
  layoutBlockConfiguration: LayoutBlockConfiguration;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  handleSetFormData: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function LayoutBlock({
  layoutBlockConfiguration: { childConfigurations },
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  registerBifrostFormInput,
  handleSubmitFormData,
}: LayoutBlockProps) {
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
            formData={formData}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            handleSetFormData={handleSetFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
          />
        );
      } else {
        if (childConfiguration.layoutBlockType === LayoutBlockType.ROWS) {
          return (
            <RowLayoutBlock
              key={index}
              rowsLayoutBlockConfiguration={childConfiguration}
              formData={formData}
              hotelId={hotelId}
              bifrostTravelerId={bifrostTravelerId}
              handleSetFormData={handleSetFormData}
              registerBifrostFormInput={registerBifrostFormInput}
              handleSubmitFormData={handleSubmitFormData}
            />
          );
        } else if (
          childConfiguration.layoutBlockType === LayoutBlockType.COLUMNS
        ) {
          <ColumnLayoutBlock
            key={index}
            columnsLayoutBlockConfiguration={childConfiguration}
          />;
        }
      }
    }
  );
}
