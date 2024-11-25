import {
  ScreenConfiguration,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { AlternativeDateSuggestionUIBlock } from "./compositeUIBlocks/AlternativeDateSuggestionUIBlock";
import { ButtonUIBlock } from "./ButtonUIBlock";
import { ScreenNavigator } from "./compositeUIBlocks/ScreenNavigator";
import { DatePickerUIBlock } from "./inputBlocks/DatePickerUIBlock";
import { DateRangePickerUIBlock } from "./inputBlocks/DateRangePickerUIBlock";
import { ExpandableCardSelectorUIBlock } from "./inputBlocks/ExpandableCardSelectorUIBlock";
import { RangeSliderInputUIBlock } from "./inputBlocks/RangeSliderInputUIBlock";
import { SelectInputUIBlock } from "./inputBlocks/SelectInputUIBlock";
import { TextAreaInputUIBlock } from "./inputBlocks/TextAreaInputUIBlock";
import { TextInputUIBlock } from "./inputBlocks/TextInputUIBlock";
import { ToggleGroupUIBlock } from "./inputBlocks/ToggleGroupUIBlock";
import { HeaderUIBlock } from "./textBlocks/HeaderUIBlock";
import { SmartFarewellSubheaderUIBlock } from "./textBlocks/SmartFarewellSubheaderUIBlock";
import { SmartGreetingSubheaderUIBlock } from "./textBlocks/SmartGreetingSubheaderUIBlock";
import { SubheaderUIBlock } from "./textBlocks/SubheaderUIBlock";
import { PresentationOfInstantOffersUIBlock } from "./compositeUIBlocks/PresentationOfInstantOffers";
import { ItinerarySummaryHeaderUIBlock } from "./ItinerarySummaryHeaderUIBlock";
import { MultiDateRangePickerUIBlock } from "./inputBlocks/MultiDateRangePickerUIBlock";

export interface UIBlockProps {
  configuration: UIBlockConfiguration;
  handleSubmitFormData: () => Promise<void>;
  screenConfigurationStack: ScreenConfiguration[];
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function UIBlock({
  configuration,
  handleSubmitFormData,
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
}: UIBlockProps) {
  if (configuration.uiBlockType === UIBlockType.HEADER) {
    return <HeaderUIBlock configuration={configuration} />;
  } else if (configuration.uiBlockType === UIBlockType.SUBHEADER) {
    return <SubheaderUIBlock configuration={configuration} />;
  } else if (
    configuration.uiBlockType === UIBlockType.SMART_GREETING_SUBHEADER
  ) {
    return <SmartGreetingSubheaderUIBlock configuration={configuration} />;
  } else if (
    configuration.uiBlockType === UIBlockType.SMART_FAREWELL_SUBHEADER
  ) {
    return <SmartFarewellSubheaderUIBlock />;
  } else if (configuration.uiBlockType === UIBlockType.TEXT_INPUT) {
    return (
      <TextInputUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.TEXT_AREA_INPUT) {
    return (
      <TextAreaInputUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.SELECT_INPUT) {
    return (
      <SelectInputUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.DATE_RANGE_PICKER) {
    return (
      <DateRangePickerUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    configuration.uiBlockType === UIBlockType.MULTI_DATE_RANGE_PICKER
  ) {
    return (
      <MultiDateRangePickerUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.DATE_PICKER) {
    return (
      <DatePickerUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.RANGE_SLIDER) {
    return (
      <RangeSliderInputUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    configuration.uiBlockType === UIBlockType.EXPANDABLE_CARD_SELECTOR
  ) {
    return (
      <ExpandableCardSelectorUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.TOGGLE_GROUP) {
    return (
      <ToggleGroupUIBlock
        configuration={configuration}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.BUTTON) {
    return (
      <ButtonUIBlock
        configuration={configuration}
        handleSubmitFormData={handleSubmitFormData}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    configuration.uiBlockType === UIBlockType.ALTERNATIVE_DATE_SUGGESTION
  ) {
    return (
      <AlternativeDateSuggestionUIBlock
        configuration={configuration}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.SCREEN_NAVIGATOR) {
    return (
      <ScreenNavigator
        configuration={configuration}
        screenConfigurationStack={screenConfigurationStack}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.INSTANT_OFFER) {
    return <PresentationOfInstantOffersUIBlock />;
  } else if (
    configuration.uiBlockType === UIBlockType.ITINERARY_SUMMARY_HEADER
  ) {
    return (
      <ItinerarySummaryHeaderUIBlock
        configuration={configuration}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
      />
    );
  } else {
    return <></>;
  }
}
