import { BranchingNodeFormBlockConfiguration } from "./BranchingNodeFormBlockConfiguration";

export enum FormBlockType {
  //////////////////////////////////////////////////
  // Text
  //////////////////////////////////////////////////
  HEADER = "HEADER",
  SUBHEADER = "SUBHEADER",

  SMART_GREETING_SUBHEADER = "SMART_GREETING_SUBHEADER",

  //////////////////////////////////////////////////
  // Inputs
  //////////////////////////////////////////////////
  TEXT_INPUT = "TEXT_INPUT",
  SELECT_INPUT = "SELECT_INPUT",
  TEXT_AREA_INPUT = "TEXT_AREA_INPUT",

  //////////////////////////////////////////////////
  // Other
  //////////////////////////////////////////////////
  BRANCHING_NODE = "BRANCHING_NODE",
  RETURN_TO_PREVIOUS_BRANCH_BUTTON = "RETURN_TO_PREVIOUS_BRANCH_BUTTON",

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

export interface ReturnToPreviousBranchButtonConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON;

  label: string;
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
  | HeaderBlockConfiguration
  | SubheaderBlockConfiguration
  | SmartGreetingSubheaderBlockConfiguration
  | BranchingNodeFormBlockConfiguration
  | ReturnToPreviousBranchButtonConfiguration
  | MetadataBlockConfiguration;

export interface BifrostConfiguration {
  hotelId: string;
  bifrostFormId: string;
  formBlocks: FormBlockConfiguration[];
}
