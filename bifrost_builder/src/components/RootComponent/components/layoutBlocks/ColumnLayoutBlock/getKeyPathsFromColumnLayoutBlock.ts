import {
  BlockType,
  ColumnsLayoutBlockConfiguration,
  ConditonBlockConfiguration,
  LayoutBlockConfiguration,
  UIBlockConfiguration,
} from "@/models/configuration";
import {
  BifrostKeyPath,
  BifrostKeyPathElement,
} from "@/models/configuration/formData";
import { ArraySet } from "@/utilities/core/ArraySet";
import { getKeyPathsFromConditionBlockPath } from "../../ConditionBlock/getKeyPathsFromConditionBlock";
import { getKeyPathsFromLayoutBlock } from "../getKeyPathsFromLayoutBlock";
import { getKeyPathsFromUIBlock } from "../../uiBlocks/getKeyPathsFromUIBlock";

interface GetKeyPathsFromColumnLayoutBlockProps {
  configuration: ColumnsLayoutBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromColumnLayoutBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromColumnLayoutBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  const keyPathsSet: ArraySet<BifrostKeyPathElement> =
    configuration.columns.reduce(
      (
        acc: ArraySet<BifrostKeyPathElement>,
        columnConfiguration:
          | UIBlockConfiguration
          | LayoutBlockConfiguration
          | ConditonBlockConfiguration
      ) => {
        if (columnConfiguration.blockType === BlockType.UI_BLOCK) {
          const { keyPaths: rowKeyPaths } = getKeyPathsFromUIBlock({
            configuration: columnConfiguration,
            blockKeyPath,
          });

          rowKeyPaths.forEach((keyPath) => {
            acc.add(keyPath);
          });
        } else if (columnConfiguration.blockType === BlockType.LAYOUT_BLOCK) {
          const { keyPaths: rowKeyPaths } = getKeyPathsFromLayoutBlock({
            configuration: columnConfiguration,
            blockKeyPath,
          });

          rowKeyPaths.forEach((keyPath) => {
            acc.add(keyPath);
          });
        } else if (
          columnConfiguration.blockType === BlockType.CONDITION_BLOCK
        ) {
          columnConfiguration.paths.forEach((path) => {
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
