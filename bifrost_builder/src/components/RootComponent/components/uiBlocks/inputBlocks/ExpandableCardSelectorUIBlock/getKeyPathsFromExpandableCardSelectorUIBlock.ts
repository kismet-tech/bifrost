import { ExpandableCardSelectorUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromExpandableCardSelectorUIBlockProps {
  configuration: ExpandableCardSelectorUIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromExpandableCardSelectorUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromExpandableCardSelectorUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return {
    keyPaths: [[...blockKeyPath, configuration.keyName]],
  };
};
