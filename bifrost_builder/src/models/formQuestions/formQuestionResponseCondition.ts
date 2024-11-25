import {
  FormQuestionId,
  FormQuestionWithResponse,
} from "./questionWithResponse";

export enum FormQuestionResponseConditionType {
  NOT_NULL = "NOT_NULL",
  MATCH = "MATCH",
  NOT = "NOT",
  AND = "AND",
  OR = "OR",
}

export interface BaseFormQuestionResponseCondition {
  type: FormQuestionResponseConditionType;
}

export interface FormQuestionResponseMatchCondition
  extends BaseFormQuestionResponseCondition {
  type: FormQuestionResponseConditionType.MATCH;
  questionWithResponse: FormQuestionWithResponse;
}

export interface FormQuestionResponseNotNullCondition
  extends BaseFormQuestionResponseCondition {
  type: FormQuestionResponseConditionType.NOT_NULL;
  formQuestionId: FormQuestionId;
}

export interface FormQuestionResponseNotCondition
  extends BaseFormQuestionResponseCondition {
  type: FormQuestionResponseConditionType.NOT;
  NOT: FormQuestionResponseCondition;
}

export interface FormQuestionResponseAndCondition
  extends BaseFormQuestionResponseCondition {
  type: FormQuestionResponseConditionType.AND;
  AND: FormQuestionResponseCondition[];
}

export interface FormQuestionResponseOrCondition
  extends BaseFormQuestionResponseCondition {
  type: FormQuestionResponseConditionType.OR;
  OR: FormQuestionResponseCondition[];
}

export type FormQuestionResponseCondition =
  | FormQuestionResponseMatchCondition
  | FormQuestionResponseNotNullCondition
  | FormQuestionResponseNotCondition
  | FormQuestionResponseAndCondition
  | FormQuestionResponseOrCondition;
