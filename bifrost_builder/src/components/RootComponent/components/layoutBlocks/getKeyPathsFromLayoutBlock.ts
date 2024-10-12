import {
  LayoutBlockConfiguration,
  LayoutBlockType,
} from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";
import { getKeyPathsFromRowLayoutBlock } from "./RowLayoutBlock/getKeyPathsFromRowLayoutBlock";
import { getKeyPathsFromColumnLayoutBlock } from "./ColumnLayoutBlock/getKeyPathsFromColumnLayoutBlock";
import { getKeyPathsFromInputTableBlock } from "./InputTableLayoutBlock/getKeyPathsFromInputTableBlock";

interface GetKeyPathsFromLayoutBlockProps {
  configuration: LayoutBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromLayoutBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromLayoutBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  if (configuration.layoutBlockType === LayoutBlockType.ROWS) {
    return getKeyPathsFromRowLayoutBlock({ configuration, blockKeyPath });
  } else if (configuration.layoutBlockType === LayoutBlockType.COLUMNS) {
    return getKeyPathsFromColumnLayoutBlock({ configuration, blockKeyPath });
  } else if (configuration.layoutBlockType === LayoutBlockType.INPUT_TABLE) {
    return getKeyPathsFromInputTableBlock({ configuration, blockKeyPath });
  } else {
    throw new Error("Invalid layout block type");
  }
};
