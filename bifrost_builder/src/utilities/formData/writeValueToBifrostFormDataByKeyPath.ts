/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
  BifrostKeyPathElement,
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
  let pointer: any = updatedFormData;

  keyPath.forEach((keyName: BifrostKeyPathElement, index: number) => {
    const isLastKeyNameInWrittenKeyPath = index === keyPath.length - 1;

    // If it's the last key in the path, set the updatedKeyValue
    if (isLastKeyNameInWrittenKeyPath) {
      pointer[keyName] = updatedKeyValue;
    } else {
      const nextKeyName = keyPath[index + 1];

      if (pointer[keyName] === undefined) {
        pointer[keyName] = typeof nextKeyName === "number" ? [] : {};
      }

      // Move to the next level in the path
      pointer = pointer[keyName];
    }
  });

  return updatedFormData;
};
