import { TextInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromTextInputUIBlockProps {
  configuration: TextInputUIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromTextInputUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromTextInputUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return { keyPaths: [[...blockKeyPath, configuration.keyName]] };
};
