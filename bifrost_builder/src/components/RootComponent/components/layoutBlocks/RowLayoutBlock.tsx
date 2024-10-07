import {
  BlockType,
  LayoutBlockConfiguration,
  RowsLayoutBlockConfiguration,
  UIBlockConfiguration,
} from "@/models/configuration";
import { UIBlock } from "../uiBlocks/UIBlock";
import { LayoutBlock } from "./LayoutBlock";

export interface RowLayoutBlockProps {
  rowsLayoutBlockConfiguration: RowsLayoutBlockConfiguration;
}

export function RowLayoutBlock({
  rowsLayoutBlockConfiguration: { childConfigurations },
}: RowLayoutBlockProps) {
  return childConfigurations.map(
    (
      childConfiguration: UIBlockConfiguration | LayoutBlockConfiguration,
      index: number
    ) => {
      if (childConfiguration.blockType === BlockType.UI_BLOCK) {
        return <UIBlock key={index} />;
      } else {
        return (
          <LayoutBlock
            key={index}
            layoutBlockConfiguration={childConfiguration}
          />
        );
      }
    }
  );
}
