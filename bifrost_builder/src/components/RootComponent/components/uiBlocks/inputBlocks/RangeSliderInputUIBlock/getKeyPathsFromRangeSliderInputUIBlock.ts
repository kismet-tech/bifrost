import { RangeSliderInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromRangeSliderInputUIBlockProps {
  configuration: RangeSliderInputUIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromRangeSliderInputUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromRangeSliderInputUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return {
    keyPaths: [
      [...blockKeyPath, configuration.valueMinKeyName],
      [...blockKeyPath, configuration.valueMaxKeyName],
    ],
  };
};
