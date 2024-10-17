import {
  BifrostKeyPathConditionType,
  BifrostKeyPathNotCondition,
} from "@/models/configuration/bifrostKeyPathCondition";
import { BifrostFormData } from "@/models/configuration/formData";
import { doesFormDataMatchOnKeyPathMatchCondition } from "./doesFormDataMatchOnKeyPathMatchCondition";

interface DoesFormDataMatchOnKeyPathNotConditionProps {
  condition: BifrostKeyPathNotCondition;
  formData: BifrostFormData;
}

export const doesFormDataMatchOnKeyPathNotCondition = ({
  condition: { conditionKeyPath, notConditionKeyValue },
  formData,
}: DoesFormDataMatchOnKeyPathNotConditionProps): boolean => {
  return !doesFormDataMatchOnKeyPathMatchCondition({
    condition: {
      type: BifrostKeyPathConditionType.MATCH,
      conditionKeyPath,
      conditionKeyValue: notConditionKeyValue,
    },
    formData,
  });
};
