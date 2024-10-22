import { AlternativeDateSuggestionUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromAlternativeDateSuggestionUIBlockProps {
  configuration: AlternativeDateSuggestionUIBlockConfiguration;
}

export const getKeyPathsFromAlternativeDateSuggestionUIBlock = ({
  configuration,
}: GetKeyPathsFromAlternativeDateSuggestionUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return {
    keyPaths: [
      configuration.startCalendarDateKeyPath,
      configuration.endCalendarDateKeyPath,
      configuration.alternativeStartCalendarDateKeyPath,
      configuration.alternativeEndCalendarDateKeyPath,
    ],
  };
};
