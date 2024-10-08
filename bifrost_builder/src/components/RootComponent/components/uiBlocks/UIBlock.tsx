import { UIBlockConfiguration, UIBlockType } from "@/models/configuration";
import { HeaderUIBlock } from "./textBlocks/HeaderUIBlock";
import { BifrostFormData } from "@/models/configuration/formData";
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

export interface UIBlockProps {
  configuration: UIBlockConfiguration;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  handleSetFormData: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function UIBlock({
  configuration,
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  registerBifrostFormInput,
  handleSubmitFormData,
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
            keyName: configuration.keyName,
            keyValue,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
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
            keyName: configuration.keyName,
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
            keyName: configuration.keyName,
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
            keyName: configuration.startCalendarDateKeyName,
            keyValue: JSON.stringify(startCalendarDate),
          });

          handleSetFormData({
            keyName: configuration.endCalendarDateKeyName,
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
            keyName: configuration.valueMinKeyName,
            keyValue: min?.toString() ?? "",
          });
          handleSetFormData({
            keyName: configuration.valueMaxKeyName,
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
            keyName: configuration.keyName,
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
        handleSetFormData={handleSetFormData}
        handleSubmitFormData={handleSubmitFormData}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else {
    return <></>;
  }
}
