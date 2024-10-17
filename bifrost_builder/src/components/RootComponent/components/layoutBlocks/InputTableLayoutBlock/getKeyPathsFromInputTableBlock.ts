import {
  BlockType,
  InputTableLayoutBlockColumnConfiguration,
  InputTableLayoutBlockConfiguration,
} from "@/models/configuration";
import {
  BifrostKeyPath,
  BifrostKeyPathElement,
} from "@/models/configuration/formData";
import { ArraySet } from "@/utilities/core/ArraySet";
import { getKeyPathsFromUIBlock } from "../../uiBlocks/getKeyPathsFromUIBlock";

interface GetKeyPathsFromInputTableBlockProps {
  configuration: InputTableLayoutBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromInputTableBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromInputTableBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  const keyPathsSet: ArraySet<BifrostKeyPathElement> =
    configuration.columns.reduce(
      (
        acc: ArraySet<BifrostKeyPathElement>,
        columnConfiguration: InputTableLayoutBlockColumnConfiguration
      ) => {
        if (columnConfiguration.inputCell.blockType === BlockType.UI_BLOCK) {
          const { keyPaths: rowKeyPaths } = getKeyPathsFromUIBlock({
            configuration: columnConfiguration.inputCell,
            blockKeyPath: [...blockKeyPath, configuration.keyName],
          });

          rowKeyPaths.forEach((keyPath) => {
            acc.add(keyPath);
          });
        }

        return acc;
      },
      new ArraySet<BifrostKeyPathElement>()
    );

  return { keyPaths: keyPathsSet.toArray() };
};
