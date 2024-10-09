import {
  ScreenConfiguration,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { HeaderUIBlock } from "./textBlocks/HeaderUIBlock";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { SubheaderUIBlock } from "./textBlocks/SubheaderUIBlock";
import { SmartGreetingSubheaderUIBlock } from "./textBlocks/SmartGreetingSubheaderUIBlock";
import { SmartFarewellSubheaderUIBlock } from "./textBlocks/SmartFarewellSubheaderUIBlock";
import { TextInputUIBlock } from "./inputBlocks/TextInputUIBlock";
import { TextAreaInputUIBlock } from "./inputBlocks/TextAreaInputUIBlock";
import { SelectInputUIBlock } from "./inputBlocks/SelectInputUIBlock";
import { DateRangePickerUIBlock } from "./inputBlocks/DateRangePickerUIBlock";
import { CalendarDate } from "@/models/CalendarDate";
import { RangeSliderInputUIBlock } from "./inputBlocks/RangeSliderInputUIBlock";
import { ExpandableCardSelectorUIBlock } from "./inputBlocks/ExpandableCardSelectorUIBlock";
import { ButtonUIBlock } from "./ButtonUIBlock";
import { AlternativeDateSuggestionUIBlock } from "./AlternativeDateSuggestionUIBlock";

export interface UIBlockProps {
  configuration: UIBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  handleSetFormData: ({
    keyPath,
    keyValue,
  }: {
    keyPath: BifrostKeyPath;
    keyValue: BifrostFormDataValue;
  }) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function UIBlock({
  configuration,
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  handleSubmitFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
}: UIBlockProps) {
  if (configuration.uiBlockType === UIBlockType.HEADER) {
    return <HeaderUIBlock configuration={configuration} formData={formData} />;
  } else if (configuration.uiBlockType === UIBlockType.SUBHEADER) {
    return (
      <SubheaderUIBlock configuration={configuration} formData={formData} />
    );
  } else if (
    configuration.uiBlockType === UIBlockType.SMART_GREETING_SUBHEADER
  ) {
    return (
      <SmartGreetingSubheaderUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        bifrostTravelerId={bifrostTravelerId}
      />
    );
  } else if (
    configuration.uiBlockType === UIBlockType.SMART_FAREWELL_SUBHEADER
  ) {
    return (
      <SmartFarewellSubheaderUIBlock
        hotelId={hotelId}
        formData={formData}
        bifrostTravelerId={bifrostTravelerId}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.TEXT_INPUT) {
    return (
      <TextInputUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        onChange={(keyValue: string) => {
          handleSetFormData({
            keyPath: [...keyPath, configuration.keyName],
            keyValue,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
        keyPath={keyPath}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.TEXT_AREA_INPUT) {
    return (
      <TextAreaInputUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        onChange={(keyValue: string) => {
          handleSetFormData({
            keyPath: [...keyPath, configuration.keyName],
            keyValue,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.SELECT_INPUT) {
    return (
      <SelectInputUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        onChange={(keyValue: string) => {
          handleSetFormData({
            keyPath: [...keyPath, configuration.keyName],
            keyValue,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.DATE_RANGE_PICKER) {
    return (
      <DateRangePickerUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        onChange={({
          startCalendarDate,
          endCalendarDate,
        }: {
          startCalendarDate?: CalendarDate;
          endCalendarDate?: CalendarDate;
        }) => {
          handleSetFormData({
            keyPath: [...keyPath, configuration.startCalendarDateKeyName],
            keyValue: JSON.stringify(startCalendarDate),
          });

          handleSetFormData({
            keyPath: [...keyPath, configuration.endCalendarDateKeyName],
            keyValue: JSON.stringify(endCalendarDate),
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.RANGE_SLIDER) {
    return (
      <RangeSliderInputUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        onChange={({ min, max }) => {
          handleSetFormData({
            keyPath: [...keyPath, configuration.valueMinKeyName],
            keyValue: min?.toString() ?? "",
          });
          handleSetFormData({
            keyPath: [...keyPath, configuration.valueMaxKeyName],
            keyValue: max?.toString() ?? "",
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    configuration.uiBlockType === UIBlockType.EXPANDABLE_CARD_SELECTOR
  ) {
    return (
      <ExpandableCardSelectorUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        onChange={(selectedCardName) => {
          handleSetFormData({
            keyPath: [...keyPath, configuration.keyName],
            keyValue: selectedCardName,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.BUTTON) {
    return (
      <ButtonUIBlock
        configuration={configuration}
        keyPath={keyPath}
        handleSetFormData={handleSetFormData}
        handleSubmitFormData={handleSubmitFormData}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        hotelId={hotelId}
        formData={formData}
      />
    );
  } else if (
    configuration.uiBlockType === UIBlockType.ALTERNATIVE_DATE_SUGGESTION
  ) {
    return (
      <AlternativeDateSuggestionUIBlock
        configuration={configuration}
        keyPath={keyPath}
        handleSetFormData={handleSetFormData}
        handleSubmitFormData={handleSubmitFormData}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        hotelId={hotelId}
        formData={formData}
      />
    );
  } else {
    return <></>;
  }
}
