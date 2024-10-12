import { DateRangePickerUIBlockConfiguration } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";

interface GetKeyPathsFromDateRangePickerUIBlockProps {
  configuration: DateRangePickerUIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromDateRangePickerUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromDateRangePickerUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  return {
    keyPaths: [
      [...blockKeyPath, configuration.startCalendarDateKeyName],
      [...blockKeyPath, configuration.endCalendarDateKeyName],
    ],
  };
};
