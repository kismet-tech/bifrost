import { TextAreaInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromTextAreaInputUIBlockProps {
  configuration: TextAreaInputUIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromTextAreaInputUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromTextAreaInputUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return {
    keyPaths: [[...blockKeyPath, configuration.keyName]],
  };
};
