import { CalendarDate } from "@/models/CalendarDate";
import {
  ScreenConfiguration,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";
import { AlternativeDateSuggestionUIBlock } from "./AlternativeDateSuggestionUIBlock";
import { ButtonUIBlock } from "./ButtonUIBlock";
import { ScreenNavigator } from "./ScreenNavigator";
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

export interface UIBlockProps {
  configuration: UIBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => void;
  screenConfigurationStack: ScreenConfiguration[];
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
  setFormData,
  handleSubmitFormData,
  screenConfigurationStack,
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
          mutateFormDataAtKeyPath({
            mutations: [
              {
                keyPath: [...keyPath, configuration.keyName],
                keyValue,
              },
            ],
            setFormData,
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
          mutateFormDataAtKeyPath({
            mutations: [
              { keyPath: [...keyPath, configuration.keyName], keyValue },
            ],
            setFormData,
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
          mutateFormDataAtKeyPath({
            mutations: [
              {
                keyPath: [...keyPath, configuration.keyName],
                keyValue,
              },
            ],
            setFormData,
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
          mutateFormDataAtKeyPath({
            mutations: [
              {
                keyPath: [...keyPath, configuration.startCalendarDateKeyName],
                keyValue: startCalendarDate,
              },
              {
                keyPath: [...keyPath, configuration.endCalendarDateKeyName],
                keyValue: endCalendarDate,
              },
            ],
            setFormData,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
        keyPath={keyPath}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.DATE_PICKER) {
    return (
      <DatePickerUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        onChange={({ calendarDate }: { calendarDate?: CalendarDate }) => {
          mutateFormDataAtKeyPath({
            mutations: [
              {
                keyPath: [...keyPath, configuration.calendarDateKeyName],
                keyValue: calendarDate,
              },
            ],
            setFormData,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
        keyPath={keyPath}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.RANGE_SLIDER) {
    return (
      <RangeSliderInputUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        onChange={({ min, max }) => {
          mutateFormDataAtKeyPath({
            mutations: [
              {
                keyPath: [...keyPath, configuration.valueMinKeyName],
                keyValue: min?.toString() ?? "",
              },
              {
                keyPath: [...keyPath, configuration.valueMaxKeyName],
                keyValue: max?.toString() ?? "",
              },
            ],
            setFormData,
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
        keyPath={keyPath}
        formData={formData}
        onChange={(selectedCardName) => {
          mutateFormDataAtKeyPath({
            mutations: [
              {
                keyPath: [...keyPath, configuration.keyName],
                keyValue: selectedCardName,
              },
            ],
            setFormData,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.TOGGLE_GROUP) {
    return (
      <ToggleGroupUIBlock
        configuration={configuration}
        hotelId={hotelId}
        formData={formData}
        keyPath={keyPath}
        onChange={(keyValue: string | undefined) => {
          mutateFormDataAtKeyPath({
            mutations: [
              {
                keyPath: [...keyPath, configuration.keyName],
                keyValue,
              },
            ],
            setFormData,
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
        setFormData={setFormData}
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
        setFormData={setFormData}
        handleSubmitFormData={handleSubmitFormData}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        hotelId={hotelId}
        formData={formData}
      />
    );
  } else if (configuration.uiBlockType === UIBlockType.SCREEN_NAVIGATOR) {
    return (
      <ScreenNavigator
        configuration={configuration}
        keyPath={keyPath}
        formData={formData}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        setFormData={setFormData}
        handleSubmitFormData={handleSubmitFormData}
        screenConfigurationStack={screenConfigurationStack}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else {
    return <></>;
  }
}
