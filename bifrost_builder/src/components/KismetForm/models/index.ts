import { AlternativeDateSuggestionFormBlockConfiguration } from "./AlternativeDateSuggestionFormBlockConfiguration";
import { AreRoomsAvailableOnDatesSmartBranchingNodeFormBlockConfiguration } from "./AreRoomsAvailableOnDatesBranchingNodeFormBlockConfiguration";
import { BranchingNodeFormBlockConfiguration } from "./BranchingNodeFormBlockConfiguration";
import { IsEventSpaceRequiredSmartBranchingNodeFormBlockConfiguration } from "./IsEventSpaceRequiredSmartBranchingNodeFormBlockConfiguration";

export enum FormBlockType {
  //////////////////////////////////////////////////
  // Text
  //////////////////////////////////////////////////
  HEADER = "HEADER",
  SUBHEADER = "SUBHEADER",

  SMART_GREETING_SUBHEADER = "SMART_GREETING_SUBHEADER",
  SMART_FAREWELL_SUBHEADER = "SMART_FAREWELL_SUBHEADER",

  //////////////////////////////////////////////////
  // Inputs
  //////////////////////////////////////////////////
  TEXT_INPUT = "TEXT_INPUT",
  SELECT_INPUT = "SELECT_INPUT",
  TEXT_AREA_INPUT = "TEXT_AREA_INPUT",
  DATE_RANGE_PICKER = "DATE_RANGE_PICKER",
  RANGE_SLIDER = "RANGE_SLIDER",
  EXPANDABLE_SELECTION_CARDS = "EXPANDABLE_SELECTION_CARDS",

  //////////////////////////////////////////////////
  // Branching Nodes
  //////////////////////////////////////////////////
  BRANCHING_NODE = "BRANCHING_NODE",
  RETURN_TO_PREVIOUS_BRANCH_BUTTON = "RETURN_TO_PREVIOUS_BRANCH_BUTTON",

  IS_EVENT_SPACE_REQUIRED_SMART_BRANCHING_NODE = "IS_EVENT_SPACE_REQUIRED_SMART_BRANCHING_NODE",
  ARE_ROOMS_AVAILABLE_ON_DATES_SMART_BRANCHING_NODE = "ARE_ROOMS_AVAILABLE_ON_DATES_SMART_BRANCHING_NODE",

  ALTERNATIVE_DATE_SUGGESTION_FORM_BLOCK = "ALTERNATIVE_DATE_SUGGESTION_FORM_BLOCK",

  //////////////////////////////////////////////////
  // Other
  //////////////////////////////////////////////////

  GUEST_SOCIAL_MEDIA_LOGIN = "GUEST_SOCIAL_MEDIA_LOGIN",
  METADATA = "METADATA",
}

export interface HeaderBlockConfiguration extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.HEADER;
  templateText?: string;
  backupText: string;
}

export interface SubheaderBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.SUBHEADER;
  templateText?: string;
  backupText: string;
}

export interface SmartGreetingSubheaderBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.SMART_GREETING_SUBHEADER;
}

export interface SmartFarewellSubheaderBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.SMART_FAREWELL_SUBHEADER;
}

export interface BaseFormFieldConfiguration {
  formBlockType: FormBlockType;
}

export interface TextInputFormBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.TEXT_INPUT;

  label: string;
  keyName: string;
  placeholder?: string;
  autocomplete?: string;
  inputType: React.HTMLInputTypeAttribute;
}

export interface TextAreaInputFormBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.TEXT_AREA_INPUT;

  label: string;
  keyName: string;
  placeholder: string;
}

export interface SelectInputFormBlockConfigurationOption {
  label: string;
  keyValue: string;
}

export interface SelectInputFormBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.SELECT_INPUT;

  label: string;
  keyName: string;
  options: SelectInputFormBlockConfigurationOption[];
}

export interface DateRangePickerFormBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.DATE_RANGE_PICKER;
  label: string;

  startCalendarDateKeyName: string;
  endCalendarDateKeyName: string;
}

export interface RangeSliderInputConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.RANGE_SLIDER;

  label: string;
  rangeMin: number;
  rangeMax: number;
  valueMinKeyName: string;
  valueMaxKeyName: string;
}

export interface ExpandableSelectionCardOption {
  imageSrc: string;
  name: string;
  description: string;
}

export interface ExpandableSelectionCardsConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.EXPANDABLE_SELECTION_CARDS;

  label: string;
  keyName: string;
  options: ExpandableSelectionCardOption[];
}

export interface ReturnToPreviousBranchButtonConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON;

  label: string;
}

export interface HeaderBlockConfiguration extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.HEADER;
  templateText?: string;
  backupText: string;
}

export interface GuestSocialMediaLoginFieldConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.GUEST_SOCIAL_MEDIA_LOGIN;

  includeFacebook?: boolean;
}

export interface MetadataBlockConfiguration extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.METADATA;

  keyName: string;
  keyValue: string;
}

export type FormBlockConfiguration =
  | TextInputFormBlockConfiguration
  | TextAreaInputFormBlockConfiguration
  | SelectInputFormBlockConfiguration
  | DateRangePickerFormBlockConfiguration
  | RangeSliderInputConfiguration
  | ExpandableSelectionCardsConfiguration
  | HeaderBlockConfiguration
  | SubheaderBlockConfiguration
  | SmartGreetingSubheaderBlockConfiguration
  | SmartFarewellSubheaderBlockConfiguration
  | BranchingNodeFormBlockConfiguration
  | ReturnToPreviousBranchButtonConfiguration
  | IsEventSpaceRequiredSmartBranchingNodeFormBlockConfiguration
  | AreRoomsAvailableOnDatesSmartBranchingNodeFormBlockConfiguration
  | AlternativeDateSuggestionFormBlockConfiguration
  | GuestSocialMediaLoginFieldConfiguration
  | MetadataBlockConfiguration;

export const unrenderableFormBlockTypes: FormBlockType[] = [
  FormBlockType.IS_EVENT_SPACE_REQUIRED_SMART_BRANCHING_NODE,
  FormBlockType.ARE_ROOMS_AVAILABLE_ON_DATES_SMART_BRANCHING_NODE,
];

export interface BifrostConfiguration {
  hotelId: string;
  bifrostFormId: string;
  formBlocks: FormBlockConfiguration[];
}
