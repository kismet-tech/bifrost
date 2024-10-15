import { CalendarDate } from "../CalendarDate";

export type BifrostKeyPathElement = string | number;
export type BifrostKeyPath = BifrostKeyPathElement[];

export type BifrostFormDataPrimitiveValue =
  | string
  | number
  | boolean
  | CalendarDate
  | undefined;

export type BifrostFormDataArrayValue = Array<
  BifrostFormDataPrimitiveValue | BifrostFormData
>;

export type BifrostFormDataValue =
  | BifrostFormDataPrimitiveValue
  | BifrostFormData
  | BifrostFormDataArrayValue;

export interface BifrostFormData {
  [key: string]: BifrostFormDataValue;
}
