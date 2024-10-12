import {
  BlockType,
  ConditonBlockConfiguration,
  LayoutBlockConfiguration,
  RowsLayoutBlockConfiguration,
  UIBlockConfiguration,
} from "@/models/configuration";
import {
  BifrostKeyPath,
  BifrostKeyPathElement,
} from "@/models/configuration/formData";
import { ArraySet } from "@/utilities/core/ArraySet";
import { getKeyPathsFromUIBlock } from "../../uiBlocks/getKeyPathsFromUIBlock";
import { getKeyPathsFromLayoutBlock } from "../getKeyPathsFromLayoutBlock";
import { getKeyPathsFromConditionBlockPath } from "../../ConditionBlock/getKeyPathsFromConditionBlock";

interface GetKeyPathsFromRowLayoutBlockProps {
  configuration: RowsLayoutBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromRowLayoutBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromRowLayoutBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  const keyPathsSet: ArraySet<BifrostKeyPathElement> =
    configuration.rows.reduce(
      (
        acc: ArraySet<BifrostKeyPathElement>,
        rowConfiguration:
          | UIBlockConfiguration
          | LayoutBlockConfiguration
          | ConditonBlockConfiguration
      ) => {
        if (rowConfiguration.blockType === BlockType.UI_BLOCK) {
          const { keyPaths: rowKeyPaths } = getKeyPathsFromUIBlock({
            configuration: rowConfiguration,
            blockKeyPath,
          });

          rowKeyPaths.forEach((keyPath) => {
            acc.add(keyPath);
          });
        } else if (rowConfiguration.blockType === BlockType.LAYOUT_BLOCK) {
          const { keyPaths: rowKeyPaths } = getKeyPathsFromLayoutBlock({
            configuration: rowConfiguration,
            blockKeyPath,
          });

          rowKeyPaths.forEach((keyPath) => {
            acc.add(keyPath);
          });
        } else if (rowConfiguration.blockType === BlockType.CONDITION_BLOCK) {
          rowConfiguration.paths.forEach((path) => {
            const { keyPaths: rowKeyPaths } = getKeyPathsFromConditionBlockPath(
              {
                conditionBlockPath: path,
                blockKeyPath,
              }
            );

            rowKeyPaths.forEach((keyPath) => {
              acc.add(keyPath);
            });
          });
        }
        return acc;
      },
      new ArraySet<BifrostKeyPathElement>()
    );

  return { keyPaths: keyPathsSet.toArray() };
};
