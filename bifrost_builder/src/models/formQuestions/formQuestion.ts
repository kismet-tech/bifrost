import { FormQuestionResponseCondition } from "./formQuestionResponseCondition";
import { FormQuestionId } from "./questionWithResponse";

export enum FormQuestionType {
  TEXT_INPUT = "TEXT_INPUT",
  TEXT_AREA = "TEXT_AREA",
  SELECT = "SELECT",
  DATE_PICKER = "DATE_PICKER",
  DATE_RANGE_PICKER = "DATE_RANGE_PICKER",
  MULTI_DATE_RANGE_PICKER = "MULTI_DATE_RANGE_PICKER",
  SELECT_AMONGST_BUTTONS = "SELECT_AMONGST_BUTTONS",
}

export interface BaseFormQuestion {
  type: FormQuestionType;
  formQuestionId: FormQuestionId;
  priority: number;
  conditionalUpon?: FormQuestionResponseCondition;
}

export interface TextInputFormQuestion extends BaseFormQuestion {
  type: FormQuestionType.TEXT_INPUT;
  label: string;
  placeholder?: string;
}

export interface TextAreaFormQuestion extends BaseFormQuestion {
  type: FormQuestionType.TEXT_AREA;
  label: string;
  placeholder?: string;
}

export interface SelectAmongstButtonsFormQuestionOption {
  label: string;
}

export interface SelectAmongstButtonsFormQuestion extends BaseFormQuestion {
  type: FormQuestionType.SELECT_AMONGST_BUTTONS;
  label?: string;
  options: SelectAmongstButtonsFormQuestionOption[];
}

export interface DateRangePickerFormQuestion extends BaseFormQuestion {
  type: FormQuestionType.DATE_RANGE_PICKER;
  label: string;
}

export interface MultiDateRangePickerFormQuestion extends BaseFormQuestion {
  type: FormQuestionType.MULTI_DATE_RANGE_PICKER;
  label: string;
}

export type FormQuestion =
  | TextInputFormQuestion
  | TextAreaFormQuestion
  | SelectAmongstButtonsFormQuestion
  | DateRangePickerFormQuestion
  | MultiDateRangePickerFormQuestion;

export interface FormQuestionGroup {
  formQuestions: FormQuestion[];
}
