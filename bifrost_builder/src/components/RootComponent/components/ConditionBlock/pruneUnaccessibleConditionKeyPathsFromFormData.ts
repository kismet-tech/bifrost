import {
  BifrostFormData,
  BifrostKeyPath,
  BifrostKeyPathElement,
} from "@/models/configuration/formData";
import { ArraySet } from "@/utilities/core/ArraySet";
import { ConditionOutcome } from "./ConditionBlock";
import { deepClone } from "@/utilities/core/deepClone";
import { deleteValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/deleteValueFromBifrostFormDataByKeyPath";
import { deepEqual } from "@/utilities/core/deepEqual";

interface PruneUnaccessibleConditionKeyPathsFromFormDataProps {
  conditionOutcomes: ConditionOutcome[];
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
}

export const pruneUnaccessibleConditionKeyPathsFromFormData = ({
  conditionOutcomes,
  setFormData,
}: PruneUnaccessibleConditionKeyPathsFromFormDataProps) => {
  const arraySetOfUnaccessibleConditionKeyPaths =
    new ArraySet<BifrostKeyPathElement>();
  conditionOutcomes.forEach(({ conditionIsTrue, keyPathsInConditionPath }) => {
    if (!conditionIsTrue) {
      keyPathsInConditionPath.forEach(
        (keyPathInConditionPath: BifrostKeyPath) => {
          arraySetOfUnaccessibleConditionKeyPaths.add(keyPathInConditionPath);
        }
      );
    }
  });

  conditionOutcomes.forEach(({ conditionIsTrue, keyPathsInConditionPath }) => {
    if (conditionIsTrue) {
      keyPathsInConditionPath.forEach(
        (keyPathInConditionPath: BifrostKeyPath) => {
          arraySetOfUnaccessibleConditionKeyPaths.delete(
            keyPathInConditionPath
          );
        }
      );
    }
  });

  setFormData((previousFormData: BifrostFormData) => {
    let updatedFormData: BifrostFormData = deepClone(previousFormData);

    arraySetOfUnaccessibleConditionKeyPaths
      .toArray()
      .forEach((unaccessibleConditionKeyPath) => {
        updatedFormData = deleteValueFromBifrostFormDataByKeyPath({
          keyPath: unaccessibleConditionKeyPath,
          formData: updatedFormData,
        });
      });

    if (!deepEqual(previousFormData, updatedFormData)) {
      return updatedFormData;
    } else {
      return previousFormData;
    }
  });
};
