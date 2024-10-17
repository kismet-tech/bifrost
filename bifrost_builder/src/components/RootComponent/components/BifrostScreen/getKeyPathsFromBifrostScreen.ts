import { ScreenConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";
import { getKeyPathsFromLayoutBlock } from "../layoutBlocks/getKeyPathsFromLayoutBlock";

interface GetKeyPathsFromBifrostScreenProps {
  configuration: ScreenConfiguration;
}

export const getKeyPathsFromBifrostScreen = ({
  configuration,
}: GetKeyPathsFromBifrostScreenProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return getKeyPathsFromLayoutBlock({
    configuration: configuration.layout,
    blockKeyPath: [],
  });
};
