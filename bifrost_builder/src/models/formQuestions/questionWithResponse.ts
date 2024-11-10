import { CalendarDateRange } from "@/models/CalendarDateRange";
import { FormQuestionGroup } from "./formQuestion";
import { CalendarDate } from "../CalendarDate";

export type BagOfQuestions = FormQuestionGroup[];

export type FormQuestionId = string;

export enum QuestionResponseType {
  STRING = "STRING",
  CALENDAR_DATE = "CALENDAR_DATE",
  CALENDAR_DATE_RANGE = "CALENDAR_DATE_RANGE",
  ARRAY_OF_CALENDAR_DATE_RANGES = "ARRAY_OF_CALENDAR_DATE_RANGES",
}

export interface BaseQuestionWithResponse {
  formQuestionId: FormQuestionId;
}

export interface QuestionWithStringResponse extends BaseQuestionWithResponse {
  responseType: QuestionResponseType.STRING;

  response: string;
}

export interface QuestionWithCalendarDateResponse
  extends BaseQuestionWithResponse {
  responseType: QuestionResponseType.CALENDAR_DATE;

  response: CalendarDate;
}

export interface QuestionWithCalendarDateRangeResponse
  extends BaseQuestionWithResponse {
  responseType: QuestionResponseType.CALENDAR_DATE_RANGE;

  response: CalendarDateRange;
}

export interface QuestionWithArrayOfCalendarDatesResponse
  extends BaseQuestionWithResponse {
  responseType: QuestionResponseType.ARRAY_OF_CALENDAR_DATE_RANGES;

  response: CalendarDateRange[];
}

export type QuestionWithResponse =
  | QuestionWithStringResponse
  | QuestionWithCalendarDateResponse
  | QuestionWithCalendarDateRangeResponse
  | QuestionWithArrayOfCalendarDatesResponse;
