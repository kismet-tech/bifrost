import {
  BlockType,
  LayoutBlockConfiguration,
  RowsLayoutBlockConfiguration,
  UIBlockConfiguration,
} from "@/models/configuration";
import { UIBlock } from "../uiBlocks/UIBlock";
import { LayoutBlock } from "./LayoutBlock";
import { BifrostFormData } from "@/models/configuration/formData";

export interface RowLayoutBlockProps {
  rowsLayoutBlockConfiguration: RowsLayoutBlockConfiguration;
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

export function RowLayoutBlock({
  rowsLayoutBlockConfiguration: { childConfigurations },
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
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
            formData={formData}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            handleSetFormData={handleSetFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
          />
        );
      } else {
        return (
          <LayoutBlock
            key={index}
            layoutBlockConfiguration={childConfiguration}
            formData={formData}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            handleSetFormData={handleSetFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
          />
        );
      }
    }
  );
}
