import { CalendarDateRange } from "@/models/CalendarDateRange";
import { FormQuestionGroup } from "./formQuestion";
import { CalendarDate } from "../CalendarDate";

export type BagOfQuestions = FormQuestionGroup[];

export type FormQuestionId = string;

export enum FormQuestionResponseType {
  STRING = "STRING",
  CALENDAR_DATE = "CALENDAR_DATE",
  CALENDAR_DATE_RANGE = "CALENDAR_DATE_RANGE",
  ARRAY_OF_CALENDAR_DATE_RANGES = "ARRAY_OF_CALENDAR_DATE_RANGES",
}

export interface BaseFormQuestionWithResponse {
  formQuestionId: FormQuestionId;
}

export interface FormQuestionWithStringResponse
  extends BaseFormQuestionWithResponse {
  responseType: FormQuestionResponseType.STRING;

  response: string;
}

export interface FormQuestionWithCalendarDateResponse
  extends BaseFormQuestionWithResponse {
  responseType: FormQuestionResponseType.CALENDAR_DATE;

  response: CalendarDate;
}

export interface FormQuestionWithCalendarDateRangeResponse
  extends BaseFormQuestionWithResponse {
  responseType: FormQuestionResponseType.CALENDAR_DATE_RANGE;

  response: CalendarDateRange;
}

export interface FormQuestionWithArrayOfCalendarDatesResponse
  extends BaseFormQuestionWithResponse {
  responseType: FormQuestionResponseType.ARRAY_OF_CALENDAR_DATE_RANGES;

  response: CalendarDateRange[];
}

export type FormQuestionWithResponse =
  | FormQuestionWithStringResponse
  | FormQuestionWithCalendarDateResponse
  | FormQuestionWithCalendarDateRangeResponse
  | FormQuestionWithArrayOfCalendarDatesResponse;
