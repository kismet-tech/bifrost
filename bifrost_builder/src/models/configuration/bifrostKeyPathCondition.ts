import { BifrostKeyPath } from "./formData";

export enum BifrostKeyPathConditionType {
  MATCH = "MATCH",
  NOT = "NOT",
  AND = "AND",
  OR = "OR",
}

export interface BifrostKeyPathMatchCondition {
  type: BifrostKeyPathConditionType.MATCH;
  conditionKeyPath: BifrostKeyPath;
  conditionKeyValue?: string;
}

export interface BifrostKeyPathNotCondition {
  type: BifrostKeyPathConditionType.NOT;
  conditionKeyPath: BifrostKeyPath;
  notConditionKeyValue?: string;
}

export interface BifrostKeyPathAndCondition {
  type: BifrostKeyPathConditionType.AND;
  AND: BifrostKeyPathCondition[];
}

export interface BifrostKeyPathOrCondition {
  type: BifrostKeyPathConditionType.OR;
  OR: BifrostKeyPathCondition[];
}

export type BifrostKeyPathCondition =
  | BifrostKeyPathMatchCondition
  | BifrostKeyPathNotCondition
  | BifrostKeyPathAndCondition
  | BifrostKeyPathOrCondition;
