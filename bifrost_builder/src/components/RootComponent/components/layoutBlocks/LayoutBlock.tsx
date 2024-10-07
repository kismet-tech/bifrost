import {
  BlockType,
  LayoutBlockConfiguration,
  LayoutBlockType,
  UIBlockConfiguration,
} from "@/models/configuration";
import { UIBlock } from "../uiBlocks/UIBlock";
import { RowLayoutBlock } from "./RowLayoutBlock";
import { ColumnLayoutBlock } from "./ColumnLayoutBlock";

interface LayoutBlockProps {
  layoutBlockConfiguration: LayoutBlockConfiguration;
}

export function LayoutBlock({
  layoutBlockConfiguration: { childConfigurations },
}: LayoutBlockProps) {
  return childConfigurations.map(
    (
      childConfiguration: UIBlockConfiguration | LayoutBlockConfiguration,
      index: number
    ) => {
      if (childConfiguration.blockType === BlockType.UI_BLOCK) {
        return <UIBlock key={index} />;
      } else {
        if (childConfiguration.layoutBlockType === LayoutBlockType.ROWS) {
          return (
            <RowLayoutBlock
              key={index}
              rowsLayoutBlockConfiguration={childConfiguration}
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
