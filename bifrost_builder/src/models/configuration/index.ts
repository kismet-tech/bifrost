//////////////////////////////////////////////////
// Base
//////////////////////////////////////////////////

import { ThemeVariables } from "@/models/configuration/themes";
import { ScreenPointer } from "./ScreenPointer";

export enum BlockType {
  LAYOUT_BLOCK = "LAYOUT_BLOCK",
  UI_BLOCK = "UI_BLOCK",
}

export interface BaseUIBlockConfiguration {
  blockType: BlockType.UI_BLOCK;
}

export interface BaseLayoutBlockConfiguration {
  blockType: BlockType.LAYOUT_BLOCK;
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
  DATE_RANGE_PICKER = "DATE_RANGE_PICKER",
  RANGE_SLIDER = "RANGE_SLIDER",
  EXPANDABLE_CARD_SELECTOR = "EXPANDABLE_CARD_SELECTOR",

  // Buttons
  BUTTON = "BUTTON",
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

export interface DateRangePickerUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.DATE_RANGE_PICKER;
  label?: string;

  startCalendarDateKeyName: string;
  endCalendarDateKeyName: string;

  autocomplete?: string;
}

export interface RangeSliderInputUIBlockConfiguration
  extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.RANGE_SLIDER;

  label: string;
  rangeMin: number;
  rangeMax: number;
  valueMinKeyName: string;
  valueMaxKeyName: string;

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
}

export interface ButtonUIBlockConfiguration extends BaseUIBlockConfiguration {
  uiBlockType: UIBlockType.BUTTON;

  label: string;

  keyName?: string;
  keyValue?: string;

  submitsForm: boolean;

  pointer?: ScreenPointer;
}

export type UIBlockConfiguration =
  | HeaderUIBlockConfiguration
  | SubheaderUIBlockConfiguration
  | SmartGreetingSubheaderUIBlockConfiguration
  | SmartFarewellUISubheaderUIBlockConfiguration
  | TextInputUIBlockConfiguration
  | TextAreaInputUIBlockConfiguration
  | SelectInputUIBlockConfiguration
  | DateRangePickerUIBlockConfiguration
  | RangeSliderInputUIBlockConfiguration
  | ExpandableCardSelectorUIBlockConfiguration
  | ButtonUIBlockConfiguration;

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
  rows: (UIBlockConfiguration | LayoutBlockConfiguration)[];
}

export interface ColumnsLayoutBlockConfiguration
  extends BaseLayoutBlockConfiguration {
  layoutBlockType: LayoutBlockType.COLUMNS;
  columns: (UIBlockConfiguration | LayoutBlockConfiguration)[];
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

  keyPath: string;
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
