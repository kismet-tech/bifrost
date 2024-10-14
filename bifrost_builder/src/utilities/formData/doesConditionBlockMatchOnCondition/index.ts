import {
  BifrostKeyPathCondition,
  BifrostKeyPathConditionType,
} from "@/models/configuration/bifrostKeyPathCondition";
import { BifrostFormData } from "@/models/configuration/formData";
import { doesFormDataMatchOnKeyPathMatchCondition } from "./doesFormDataMatchOnKeyPathMatchCondition";
import { doesFormDataMatchOnKeyPathOrCondition } from "./doesFormDataMatchOnKeyPathOrCondition";
import { doesFormDataMatchOnKeyPathAndCondition } from "./doesFormDataMatchOnKeyPathAndCondition";

interface DoesFormDataMatchOnKeyPathConditionProps {
  condition: BifrostKeyPathCondition;
  formData: BifrostFormData;
}

export const doesFormDataMatchOnKeyPathCondition = ({
  condition,
  formData,
}: DoesFormDataMatchOnKeyPathConditionProps): boolean => {
  if (condition.type === BifrostKeyPathConditionType.MATCH) {
    return doesFormDataMatchOnKeyPathMatchCondition({
      condition,
      formData,
    });
  } else if (condition.type === BifrostKeyPathConditionType.OR) {
    return doesFormDataMatchOnKeyPathOrCondition({
      condition,
      formData,
    });
  } else if (condition.type === BifrostKeyPathConditionType.AND) {
    return doesFormDataMatchOnKeyPathAndCondition({
      condition,
      formData,
    });
  } else {
    throw new Error("Invalid condition type");
  }
};
