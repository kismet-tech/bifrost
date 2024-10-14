import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { writeValueToBifrostFormDataByKeyPath } from "./writeValueToBifrostFormDataByKeyPath";
import { deepEqual } from "../core/deepEqual";

interface MutateFormDataAtKeyPathProps {
  keyPath: BifrostKeyPath;
  keyValue: BifrostFormDataValue;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
}

export const mutateFormDataAtKeyPath = ({
  keyPath,
  keyValue,
  setFormData,
}: MutateFormDataAtKeyPathProps) => {
  setFormData((previousFormState: BifrostFormData) => {
    const updatedFormState = writeValueToBifrostFormDataByKeyPath({
      formData: previousFormState,
      keyPath,
      updatedKeyValue: keyValue,
    });

    if (!deepEqual(previousFormState, updatedFormState)) {
      return updatedFormState;
    }

    return previousFormState;
  });
};
