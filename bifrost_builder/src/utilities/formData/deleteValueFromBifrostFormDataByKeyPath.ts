/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { deepClone } from "../core/deepClone";

interface DeleteValueFromBifrostFormDataByKeyPathProps {
  formData: BifrostFormData;
  keyPath: BifrostKeyPath;
}

export const deleteValueFromBifrostFormDataByKeyPath = ({
  formData,
  keyPath,
}: DeleteValueFromBifrostFormDataByKeyPathProps): BifrostFormData => {
  // Clone the formData deeply to avoid mutating the original object
  const updatedFormData = deepClone(formData);

  // Reference to traverse the cloned formData object
  let currentLevel: any = updatedFormData;

  keyPath.forEach((key, index) => {
    const isLastKey = index === keyPath.length - 1;

    // If it's the last key in the path, delete the key from the object/array
    if (isLastKey) {
      if (Array.isArray(currentLevel)) {
        currentLevel.splice(key as number, 1); // Remove the array element by index
      } else if (typeof currentLevel === "object" && key in currentLevel) {
        delete currentLevel[key]; // Remove the property from the object
      }
    } else {
      // Move to the next level in the path, if it exists
      if (currentLevel[key] !== undefined) {
        currentLevel = currentLevel[key];
      } else {
        // If the path does not exist, there's nothing to delete, so return
        return updatedFormData;
      }
    }
  });

  return updatedFormData;
};
