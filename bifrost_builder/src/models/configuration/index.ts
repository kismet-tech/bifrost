//////////////////////////////////////////////////
// Base
//////////////////////////////////////////////////

import { ThemeVariables } from "@/models/configuration/themes";
import { ScreenPointer } from "./pointers/ScreenPointer";
import { BifrostKeyPath } from "./formData";
import { BifrostKeyPathCondition } from "./bifrostKeyPathCondition";

export enum BlockType {
  LAYOUT_BLOCK = "LAYOUT_BLOCK",
  UI_BLOCK = "UI_BLOCK",
  CONDITION_BLOCK = "CONDITION_BLOCK",
}

export interface BaseUIBlockConfiguration {
  blockType: BlockType.UI_BLOCK;
}

export interface BaseLayoutBlockConfiguration {
  blockType: BlockType.LAYOUT_BLOCK;
}

export interface BaseConditionBlockConfiguration {
  blockType: BlockType.CONDITION_BLOCK;
}

//////////////////////////////////////////////////
// UI Components
//////////////////////////////////////////////////
export enum UIBlockType {
  // Text
  HEADER = "HEADER",
  SUBHEADER = "SUBHEADER",

  SMART_GREETING_SUBHEADER = "SMART_GREETING_SUBHEADER",
  SMART_FAREWELL_SUBHEADER = "SMART_FAREWELL_SUBHEADER",

  // Inputs
  TEXT_INPUT = "TEXT_INPUT",
  TEXT_AREA_INPUT = "TEXT_AREA_INPUT",
  SELECT_INPUT = "SELECT_INPUT",
  DATE_PICKER = "DATE_PICKER",
  DATE_RANGE_PICKER = "DATE_RANGE_PICKER",
  RANGE_SLIDER = "RANGE_SLIDER",
  EXPANDABLE_CARD_SELECTOR = "EXPANDABLE_CARD_SELECTOR",
  TOGGLE_GROUP = "TOGGLE_GROUP",

  // Buttons
  BUTTON = "BUTTON",

  // Complex
  ALTERNATIVE_DATE_SUGGESTION = "ALTERNATIVE_DATE_SUGGESTION",
  SCREEN_NAVIGATOR = "SCREEN_NAVIGATOR",
  INSTANT_OFFER = "INSTANT_OFFER",
}

export interface HeaderUIBlockConfiguration extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.HEADER;
  templateText?: string;
  backupText: string;
}

export interface SubheaderUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.SUBHEADER;
  templateText?: string;
  backupText: string;
}

export interface SmartGreetingSubheaderUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.SMART_GREETING_SUBHEADER;
  formGreetingDataKeyPath: string;
}

export interface SmartFarewellUISubheaderUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.SMART_FAREWELL_SUBHEADER;
}

export interface TextInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.TEXT_INPUT;

  label?: string;
  keyName: string;
  placeholder?: string;
  smartFill?: boolean;
  autocomplete?: string;
  inputType: React.HTMLInputTypeAttribute;
}

export interface TextAreaInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.TEXT_AREA_INPUT;

  label?: string;
  keyName: string;
  placeholder: string;
  autocomplete?: string;
}

export interface SelectInputUIBlockConfigurationOption {
  label: string;
  keyValue: string;
}

export interface SelectInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.SELECT_INPUT;

  label: string;
  keyName: string;
  options: SelectInputUIBlockConfigurationOption[];
  autocomplete?: string;
}

export interface DatePickerUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.DATE_PICKER;
  label?: string;

  calendarDateKeyName: string;

  smartFill?: boolean;
}

export interface DateRangePickerUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.DATE_RANGE_PICKER;
  label?: string;

  startCalendarDateKeyName: string;
  endCalendarDateKeyName: string;

  smartFill?: boolean;
}

export interface RangeSliderInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.RANGE_SLIDER;

  label: string;
  initialRangeMin: number;
  initialRangeMax: number;
  valueMinKeyName: string;
  valueMaxKeyName: string;

  initialStepSize?: number;

  autocomplete?: string;
}

export interface ExpandableSelectionCardUIBlockConfigurationOption {
  imageSrc: string;
  name: string;
  description: string;
}

export interface ExpandableCardSelectorUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.EXPANDABLE_CARD_SELECTOR;

  label: string;
  keyName: string;
  options: ExpandableSelectionCardUIBlockConfigurationOption[];

  smartFill?: boolean;
}

export interface ToggleGroupUIBlockConfigurationOption {
  label: string;
  keyValue: string;
}

export interface ToggleGroupUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.TOGGLE_GROUP;

  label: string;
  keyName: string;
  options: ToggleGroupUIBlockConfigurationOption[];
}

export interface ButtonUIBlockConfiguration extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.BUTTON;

  label: string;

  keyName?: string;
  keyValue?: string;

  hasToggle?: boolean;
  submitsForm: boolean;

  screenPointer?: ScreenPointer;
}

export interface AlternativeDateSuggestionUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.ALTERNATIVE_DATE_SUGGESTION;

  startCalendarDateKeyPath: BifrostKeyPath;
  endCalendarDateKeyPath: BifrostKeyPath;

  alternativeStartCalendarDateKeyPath: BifrostKeyPath;
  alternativeEndCalendarDateKeyPath: BifrostKeyPath;

  acceptAlternativeDatesLabel: string;
  rejectAlternativeDatesLabel: string;

  acceptedAlternativeDatesScreenPointer: ScreenPointer;
  rejectedAlternativeDatesScreenPointer: ScreenPointer;
}

export interface ScreenNavigatorUIBlockConditionPath {
  condition: BifrostKeyPathCondition;
  screenPointer: ScreenPointer;
  submitsForm?: boolean;
  forwardPathLabel: string;
}

export interface ScreenNavigatorUIBlockSkipPath {
  pointer: ScreenPointer;
  submitsForm?: boolean;
}

export interface ScreenNavigatorUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.SCREEN_NAVIGATOR;
  skipPath?: {
    pointer: ScreenPointer;
    submitsForm?: boolean;
  };

  paths: ScreenNavigatorUIBlockConditionPath[];
}

export interface InstantOfferUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.INSTANT_OFFER;
}

export type UIBlockConfiguration =
  | HeaderUIBlockConfiguration
  | SubheaderUIBlockConfiguration
  | SmartGreetingSubheaderUIBlockConfiguration
  | SmartFarewellUISubheaderUIBlockConfiguration
  | TextInputUIBlockConfiguration
  | TextAreaInputUIBlockConfiguration
  | SelectInputUIBlockConfiguration
  | DatePickerUIBlockConfiguration
  | DateRangePickerUIBlockConfiguration
  | RangeSliderInputUIBlockConfiguration
  | ExpandableCardSelectorUIBlockConfiguration
  | ToggleGroupUIBlockConfiguration
  | ButtonUIBlockConfiguration
  | AlternativeDateSuggestionUIBlockConfiguration
  | ScreenNavigatorUIBlockConfiguration
  | InstantOfferUIBlockConfiguration;

//////////////////////////////////////////////////
// Condition Block
//////////////////////////////////////////////////

export interface ConditionBlockPath {
  condition: BifrostKeyPathCondition;
  layout: LayoutBlockConfiguration;
}

export interface ConditonBlockConfiguration
  extends BaseConditionBlockConfiguration {
  paths: ConditionBlockPath[];
}

//////////////////////////////////////////////////
// Layout Components
//////////////////////////////////////////////////
export enum LayoutBlockType {
  ROWS = "ROWS",
  COLUMNS = "COLUMNS",
  INPUT_TABLE = "INPUT_TABLE",
}

export interface RowsLayoutBlockConfiguration
  extends BaseLayoutBlockConfiguration {
  layoutBlockType: LayoutBlockType.ROWS;
  rows: (
    | UIBlockConfiguration
    | LayoutBlockConfiguration
    | ConditonBlockConfiguration
  )[];
}

export interface ColumnsLayoutBlockConfiguration
  extends BaseLayoutBlockConfiguration {
  layoutBlockType: LayoutBlockType.COLUMNS;
  columns: (
    | UIBlockConfiguration
    | LayoutBlockConfiguration
    | ConditonBlockConfiguration
  )[];
}

export interface InputTableLayoutBlockColumnConfiguration {
  columnHeader: {
    columnHeaderText: string;
  };
  inputCell: UIBlockConfiguration;
}

export interface InputTableLayoutBlockConfiguration
  extends BaseLayoutBlockConfiguration {
  layoutBlockType: LayoutBlockType.INPUT_TABLE;

  keyName: string;
  columns: InputTableLayoutBlockColumnConfiguration[];
}

export type LayoutBlockConfiguration =
  | RowsLayoutBlockConfiguration
  | ColumnsLayoutBlockConfiguration
  | InputTableLayoutBlockConfiguration;

//////////////////////////////////////////////////
// Screen
//////////////////////////////////////////////////

export interface ScreenConfiguration {
  metadata?: Record<string, string>;
  layout: LayoutBlockConfiguration;
}

//////////////////////////////////////////////////
// Application
//////////////////////////////////////////////////

export interface BifrostConfiguration {
  hotelId: string;
  bifrostFormId: string;
  rootScreenConfiguration?: ScreenConfiguration;
  themeVariables?: ThemeVariables;
}
