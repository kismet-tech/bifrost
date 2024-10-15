import { ToggleGroupUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromToggleGroupUIBlockProps {
  configuration: ToggleGroupUIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromToggleGroupUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromToggleGroupUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return {
    keyPaths: [[...blockKeyPath, configuration.keyName]],
  };
};
