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
  let pointer: any = updatedFormData;

  keyPath.forEach((keyName, index) => {
    const isLastKeyNameInDeletedKeyPath: boolean = index === keyPath.length - 1;

    if (pointer === undefined) {
      return;
    }

    // If it's the last key in the path, delete the key from the object/array
    if (isLastKeyNameInDeletedKeyPath) {
      if (Array.isArray(pointer)) {
        pointer.splice(keyName as number, 1); // Remove the array element by index
      } else if (typeof pointer === "object" && keyName in pointer) {
        delete pointer[keyName]; // Remove the property from the object
      }
    } else {
      // Move to the next level in the path
      pointer = pointer[keyName];
    }
  });

  return updatedFormData;
};
