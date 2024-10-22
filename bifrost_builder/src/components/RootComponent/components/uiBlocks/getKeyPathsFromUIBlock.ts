import { UIBlockConfiguration, UIBlockType } from "@/models/configuration";
import { BifrostKeyPath } from "@/models/configuration/formData";
import { getKeyPathsFromAlternativeDateSuggestionUIBlock } from "./compositeUIBlocks/AlternativeDateSuggestionUIBlock/getKeyPathsFromAlternativeDateSuggestionUIBlock";
import { getKeyPathsFromTextInputUIBlock } from "./inputBlocks/TextInputUIBlock/getKeyPathsFromTextInputUIBlock";
import { getKeyPathsFromDateRangePickerUIBlock } from "./inputBlocks/DateRangePickerUIBlock/getKeyPathsFromDateRangePickerUIBlock";
import { getKeyPathsFromExpandableCardSelectorUIBlock } from "./inputBlocks/ExpandableCardSelectorUIBlock/getKeyPathsFromExpandableCardSelectorUIBlock";
import { getKeyPathsFromRangeSliderInputUIBlock } from "./inputBlocks/RangeSliderInputUIBlock/getKeyPathsFromRangeSliderInputUIBlock";
import { getKeyPathsFromSelectInputUIBlock } from "./inputBlocks/SelectInputUIBlock/getKeyPathsFromSelectInputUIBlock";
import { getKeyPathsFromTextAreaInputUIBlock } from "./inputBlocks/TextAreaInputUIBlock/getKeyPathsFromSelectInputUIBlock";
import { getKeyPathsFromButtonUIBlock } from "./ButtonUIBlock/getKeyPathsFromButtonUIBlock";

interface GetKeyPathsFromUIBlockProps {
  configuration: UIBlockConfiguration;
  blockKeyPath: BifrostKeyPath;
}

export const getKeyPathsFromUIBlock = ({
  configuration,
  blockKeyPath,
}: GetKeyPathsFromUIBlockProps): {
  keyPaths: BifrostKeyPath[];
} => {
  if (configuration.uiBlockType === UIBlockType.ALTERNATIVE_DATE_SUGGESTION) {
    return getKeyPathsFromAlternativeDateSuggestionUIBlock({
      configuration,
    });
  } else if (configuration.uiBlockType === UIBlockType.DATE_RANGE_PICKER) {
    return getKeyPathsFromDateRangePickerUIBlock({
      configuration,
      blockKeyPath,
    });
  } else if (
    configuration.uiBlockType === UIBlockType.EXPANDABLE_CARD_SELECTOR
  ) {
    return getKeyPathsFromExpandableCardSelectorUIBlock({
      configuration,
      blockKeyPath,
    });
  } else if (configuration.uiBlockType === UIBlockType.RANGE_SLIDER) {
    return getKeyPathsFromRangeSliderInputUIBlock({
      configuration,
      blockKeyPath,
    });
  } else if (configuration.uiBlockType === UIBlockType.SELECT_INPUT) {
    return getKeyPathsFromSelectInputUIBlock({
      configuration,
      blockKeyPath,
    });
  } else if (configuration.uiBlockType === UIBlockType.TEXT_AREA_INPUT) {
    return getKeyPathsFromTextAreaInputUIBlock({
      configuration,
      blockKeyPath,
    });
  } else if (configuration.uiBlockType === UIBlockType.TEXT_INPUT) {
    return getKeyPathsFromTextInputUIBlock({
      configuration,
      blockKeyPath,
    });
  } else if (configuration.uiBlockType === UIBlockType.BUTTON) {
    return getKeyPathsFromButtonUIBlock({
      configuration,
      blockKeyPath,
    });
  }
  return { keyPaths: [] };
};
