import { ButtonUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromButtonUIBlockProps {
  configuration: ButtonUIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromButtonUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromButtonUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  if (!configuration.keyName) {
    return {
      keyPaths: [[]],
    };
  }

  return {
    keyPaths: [[...blockKeyPath, configuration.keyName]],
  };
};
