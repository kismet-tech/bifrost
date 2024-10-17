import { SelectInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromSelectInputUIBlockProps {
  configuration: SelectInputUIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromSelectInputUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromSelectInputUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return {
    keyPaths: [[...blockKeyPath, configuration.keyName]],
  };
};
