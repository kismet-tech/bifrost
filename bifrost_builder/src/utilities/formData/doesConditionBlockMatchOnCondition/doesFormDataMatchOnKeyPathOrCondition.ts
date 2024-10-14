import { BifrostKeyPathOrCondition } from "@/models/configuration/bifrostKeyPathCondition";
import { BifrostFormData } from "@/models/configuration/formData";
import { doesFormDataMatchOnKeyPathCondition } from ".";

interface DoesFormDataMatchOnKeyPathOrConditionProps {
  condition: BifrostKeyPathOrCondition;
  formData: BifrostFormData;
}

export const doesFormDataMatchOnKeyPathOrCondition = ({
  condition: { OR },
  formData,
}: DoesFormDataMatchOnKeyPathOrConditionProps): boolean => {
  return OR.some((condition) =>
    doesFormDataMatchOnKeyPathCondition({ condition, formData })
  );
};
