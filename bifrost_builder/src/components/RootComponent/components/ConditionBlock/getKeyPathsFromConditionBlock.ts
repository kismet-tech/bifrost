import { ConditionBlockPath } from "@/models/configuration";
import { getKeyPathsFromLayoutBlock } from "../layoutBlocks/getKeyPathsFromLayoutBlock";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromConditionBlockProps {
  conditionBlockPath: ConditionBlockPath;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromConditionBlockPath = ({
  conditionBlockPath: { layout },
  blockKeyPath,
}: GetKeyPathsFromConditionBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return getKeyPathsFromLayoutBlock({
    configuration: layout,
    blockKeyPath,
  });
};
