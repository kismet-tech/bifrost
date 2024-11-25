//////////////////////////////////////////////////
// Base
//////////////////////////////////////////////////

import { ThemeVariables } from "@/models/configuration/themes";
import { ScreenPointer } from "./pointers/ScreenPointer";
import { FormQuestionId } from "../formQuestions/questionWithResponse";
import { FormQuestionResponseCondition } from "../formQuestions/formQuestionResponseCondition";

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
  MULTI_DATE_RANGE_PICKER = "MULTI_DATE_RANGE_PICKER",
  RANGE_SLIDER = "RANGE_SLIDER",
  EXPANDABLE_CARD_SELECTOR = "EXPANDABLE_CARD_SELECTOR",
  TOGGLE_GROUP = "TOGGLE_GROUP",

  // Buttons
  BUTTON = "BUTTON",

  // COMPOSITE
  ALTERNATIVE_DATE_SUGGESTION = "ALTERNATIVE_DATE_SUGGESTION",
  SCREEN_NAVIGATOR = "SCREEN_NAVIGATOR",
  INSTANT_OFFER = "INSTANT_OFFER",
  ITINERARY_SUMMARY_HEADER = "ITINERARY_SUMMARY_HEADER",
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
  additionalDetailsFormQuestionId: FormQuestionId;
}

export interface SmartFarewellUISubheaderUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.SMART_FAREWELL_SUBHEADER;
}

export interface TextInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.TEXT_INPUT;

  formQuestionId: FormQuestionId;

  label?: string;
  placeholder?: string;
  smartFill?: boolean;
  autocomplete?: string;
  inputType: React.HTMLInputTypeAttribute;
}

export interface TextAreaInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.TEXT_AREA_INPUT;

  formQuestionId: FormQuestionId;

  label?: string;
  placeholder: string;
  autocomplete?: string;

  smartFill?: boolean;
}

export interface SelectInputUIBlockConfigurationOption {
  label: string;
  keyValue: string;
}

export interface SelectInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.SELECT_INPUT;

  formQuestionId: FormQuestionId;

  label: string;
  options: SelectInputUIBlockConfigurationOption[];
  autocomplete?: string;
}

export interface DatePickerUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.DATE_PICKER;
  label?: string;

  formQuestionId: FormQuestionId;

  smartFill?: boolean;
}

export interface DateRangePickerUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.DATE_RANGE_PICKER;
  label?: string;

  formQuestionId: FormQuestionId;

  smartFill?: boolean;
}

export interface MultiDateRangePickerUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.MULTI_DATE_RANGE_PICKER;
  label?: string;

  formQuestionId: FormQuestionId;

  smartFill?: boolean;
}

export interface RangeSliderInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.RANGE_SLIDER;

  label: string;
  initialRangeMin: number;
  initialRangeMax: number;
  formQuestionId: FormQuestionId;

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
  formQuestionId: FormQuestionId;
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

  formQuestionId: FormQuestionId;

  label?: string;
  options: ToggleGroupUIBlockConfigurationOption[];
  smartFill?: boolean;
}

export interface ButtonUIBlockConfiguration extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.BUTTON;

  label: string;

  formQuestionId?: FormQuestionId;
  formQuestionResponse?: string;

  submitsForm?: boolean;

  screenPointer?: ScreenPointer;
}

export interface AlternativeDateSuggestionUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.ALTERNATIVE_DATE_SUGGESTION;

  formQuestionId: FormQuestionId;

  acceptAlternativeDatesLabel: string;
  rejectAlternativeDatesLabel: string;

  acceptedAlternativeDatesScreenPointer: ScreenPointer;
  rejectedAlternativeDatesScreenPointer: ScreenPointer;
}

export interface ScreenNavigatorUIBlockConditionPath {
  condition: FormQuestionResponseCondition;
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
    skipLabel?: string;
  };

  paths: ScreenNavigatorUIBlockConditionPath[];
}

export interface InstantOfferUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.INSTANT_OFFER;
}

export enum ItinerarySummaryHeaderUIBlockFieldIcon {
  BUILDING = "BUILDING",
  CALENDAR = "CALENDAR",
  BELL = "BELL",
}

export interface ItinerarySummaryHeaderUIBlockField {
  icon: ItinerarySummaryHeaderUIBlockFieldIcon;
  template: string;

  updateDataLabel: string;
  formQuestionId?: FormQuestionId;
}

export interface ItinerarySummaryHeaderUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.ITINERARY_SUMMARY_HEADER;

  fields: ItinerarySummaryHeaderUIBlockField[];
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
  | MultiDateRangePickerUIBlockConfiguration
  | RangeSliderInputUIBlockConfiguration
  | ExpandableCardSelectorUIBlockConfiguration
  | ToggleGroupUIBlockConfiguration
  | ButtonUIBlockConfiguration
  | AlternativeDateSuggestionUIBlockConfiguration
  | ScreenNavigatorUIBlockConfiguration
  | InstantOfferUIBlockConfiguration
  | ItinerarySummaryHeaderUIBlockConfiguration;

//////////////////////////////////////////////////
// Condition Block
//////////////////////////////////////////////////

export interface ConditionBlockPath {
  condition: FormQuestionResponseCondition;
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

export type LayoutBlockConfiguration =
  | RowsLayoutBlockConfiguration
  | ColumnsLayoutBlockConfiguration;

//////////////////////////////////////////////////
// Screen
//////////////////////////////////////////////////

export interface ScreenConfiguration {
  formQuestionIds: FormQuestionId[];
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
