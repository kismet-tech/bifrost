import {
  ScreenConfiguration,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { HeaderUIBlock } from "./textBlocks/HeaderUIBlock";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { SubheaderUIBlock } from "./textBlocks/SubheaderUIBlock";
import { SmartGreetingSubheaderUIBlock } from "./textBlocks/SmartGreetingSubheaderUIBlock";
import { SmartFarewellSubheaderUIBlock } from "./textBlocks/SmartFarewellSubheaderUIBlock";
import { TextAreaInputUIBlock } from "./inputBlocks/TextAreaInputUIBlock";
import { SelectInputUIBlock } from "./inputBlocks/SelectInputUIBlock";
import { DateRangePickerUIBlock } from "./inputBlocks/DateRangePickerUIBlock";
import { CalendarDate } from "@/models/CalendarDate";
import { RangeSliderInputUIBlock } from "./inputBlocks/RangeSliderInputUIBlock";
import { ExpandableCardSelectorUIBlock } from "./inputBlocks/ExpandableCardSelectorUIBlock";
import { ButtonUIBlock } from "./ButtonUIBlock";
import { TextInputUIBlock } from "./inputBlocks/TextInputUIBlock";
import { AlternativeDateSuggestionUIBlock } from "./AlternativeDateSuggestionUIBlock";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";
import { ScreenNavigator } from "./ScreenNavigator";
import { writeValueToBifrostFormDataByKeyPath } from "@/utilities/formData/writeValueToBifrostFormDataByKeyPath";
import { deepEqual } from "@/utilities/core/deepEqual";
import { deepClone } from "@/utilities/core/deepClone";
import { DatePickerUIBlock } from "./inputBlocks/DatePickerUIBlock";

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
          setFormData((previousFormState: BifrostFormData) => {
            let updatedFormState: BifrostFormData = deepClone(formData);

            updatedFormState = writeValueToBifrostFormDataByKeyPath({
              formData: updatedFormState,
              keyPath: [...keyPath, configuration.startCalendarDateKeyName],
              updatedKeyValue: startCalendarDate,
            });

            updatedFormState = writeValueToBifrostFormDataByKeyPath({
              formData: updatedFormState,
              keyPath: [...keyPath, configuration.endCalendarDateKeyName],
              updatedKeyValue: endCalendarDate,
            });

            if (!deepEqual(previousFormState, updatedFormState)) {
              return updatedFormState;
            }

            return previousFormState;
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
          setFormData((previousFormState: BifrostFormData) => {
            let updatedFormState: BifrostFormData = deepClone(formData);

            updatedFormState = writeValueToBifrostFormDataByKeyPath({
              formData: updatedFormState,
              keyPath: [...keyPath, configuration.calendarDateKeyName],
              updatedKeyValue: calendarDate,
            });

            if (!deepEqual(previousFormState, updatedFormState)) {
              return updatedFormState;
            }

            return previousFormState;
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
