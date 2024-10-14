import { BifrostKeyPathAndCondition } from "@/models/configuration/bifrostKeyPathCondition";
import { BifrostFormData } from "@/models/configuration/formData";
import { doesFormDataMatchOnKeyPathCondition } from ".";

interface DoesFormDataMatchOnKeyPathAndConditionProps {
  condition: BifrostKeyPathAndCondition;
  formData: BifrostFormData;
}

export const doesFormDataMatchOnKeyPathAndCondition = ({
  condition: { AND },
  formData,
}: DoesFormDataMatchOnKeyPathAndConditionProps): boolean => {
  return AND.every((condition) =>
    doesFormDataMatchOnKeyPathCondition({ condition, formData })
  );
};
