/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { deepClone } from "../core/deepClone";

interface WriteValueToBifrostFormDataByKeyPathProps {
  formData: BifrostFormData;
  keyPath: BifrostKeyPath;
  updatedKeyValue: BifrostFormDataValue;
}

export const writeValueToBifrostFormDataByKeyPath = ({
  formData,
  keyPath,
  updatedKeyValue,
}: WriteValueToBifrostFormDataByKeyPathProps): BifrostFormData => {
  // Clone the formData deeply to avoid mutating the original object
  const updatedFormData = deepClone(formData);

  // Reference to traverse the formData object
  let currentLevel: any = updatedFormData;

  keyPath.forEach((key, index) => {
    const isLastKey = index === keyPath.length - 1;

    // If it's the last key in the path, set the updatedKeyValue
    if (isLastKey) {
      currentLevel[key] = updatedKeyValue;
    } else {
      const nextKey = keyPath[index + 1];
      const isNextKeyNumber = typeof nextKey === "number";

      // If the current key is a number, ensure current level is an array
      if (typeof key === "number") {
        if (!Array.isArray(currentLevel)) {
          currentLevel = [];
        }
      }

      // Initialize the next level if it doesn't exist
      if (currentLevel[key] === undefined) {
        currentLevel[key] = isNextKeyNumber ? [] : {};
      }

      // Move to the next level in the path
      currentLevel = currentLevel[key];
    }
  });

  return updatedFormData;
};
