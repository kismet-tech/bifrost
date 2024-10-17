import { BifrostKeyPathMatchCondition } from "@/models/configuration/bifrostKeyPathCondition";
import { BifrostFormData } from "@/models/configuration/formData";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";

interface DoesFormDataMatchOnKeyPathMatchConditionProps {
  condition: BifrostKeyPathMatchCondition;
  formData: BifrostFormData;
}

export const doesFormDataMatchOnKeyPathMatchCondition = ({
  condition: { conditionKeyPath, conditionKeyValue },
  formData,
}: DoesFormDataMatchOnKeyPathMatchConditionProps): boolean => {
  const keyValue = getValueFromBifrostFormDataByKeyPath({
    keyPath: conditionKeyPath,
    formData,
  });

  if (keyValue === undefined || keyValue === null) {
    return false;
  } else {
    if (conditionKeyValue === undefined) {
      return true;
    }

    return conditionKeyValue === keyValue;
  }
};
