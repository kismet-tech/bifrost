import {
  BifrostFormData,
  BifrostFormDataPrimitiveValue,
  BifrostFormDataValue,
  BifrostKeyPath,
  BifrostKeyPathElement,
} from "@/models/configuration/formData";
import { deepClone } from "../core/deepClone";

interface WriteValueToBifrostFormDataByKeyPathProps {
  formData: BifrostFormData;
  keyPath: BifrostKeyPath;
  updatedKeyValue: BifrostFormDataPrimitiveValue;
}

export const writeValueToBifrostFormDataByKeyPath = ({
  formData,
  keyPath,
  updatedKeyValue,
}: WriteValueToBifrostFormDataByKeyPathProps): BifrostFormData => {
  // Clone the formData deeply to avoid mutating the original object
  const updatedFormData: BifrostFormData = deepClone(formData);

  // Reference to traverse the formData object
  let pointer: BifrostFormDataValue = updatedFormData;

  keyPath.forEach((keyName: BifrostKeyPathElement, index: number) => {
    const isLastKeyNameInWrittenKeyPath = index === keyPath.length - 1;

    if (typeof pointer !== "object") {
      throw new Error("Invalid key path received");
    }

    // If it's the last key in the path, set the updatedKeyValue
    if (isLastKeyNameInWrittenKeyPath) {
      (pointer as BifrostFormData)[keyName] = updatedKeyValue;
    } else {
      const nextKeyName = keyPath[index + 1];

      if ((pointer as BifrostFormData)[keyName] === undefined) {
        (pointer as BifrostFormData)[keyName] =
          typeof nextKeyName === "number" ? [] : {};
      }

      // Move to the next level in the path
      pointer = (pointer as BifrostFormData)[keyName];
    }
  });

  return updatedFormData;
};
