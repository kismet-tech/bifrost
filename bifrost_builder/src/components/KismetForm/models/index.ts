import { BranchingNodeFormBlockConfiguration } from "./BranchingNodeFormBlockConfiguration";

export enum FormBlockType {
  //////////////////////////////////////////////////
  // Text
  //////////////////////////////////////////////////
  HEADER = "HEADER",
  SUBHEADER = "SUBHEADER",

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

export type FormBlockConfiguration =
  | TextInputFormBlockConfiguration
  | TextAreaInputFormBlockConfiguration
  | SelectInputFormBlockConfiguration
  | HeaderBlockConfiguration
  | SubheaderBlockConfiguration
  | BranchingNodeFormBlockConfiguration
  | ReturnToPreviousBranchButtonConfiguration;

export interface BifrostConfiguration {
  formBlocks: FormBlockConfiguration[];
}
