import {
  BifrostFormData,
  BifrostFormDataPrimitiveValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { writeValueToBifrostFormDataByKeyPath } from "./writeValueToBifrostFormDataByKeyPath";
import { deepEqual } from "../core/deepEqual";
import { deepClone } from "../core/deepClone";

interface FormDataMutation {
  keyPath: BifrostKeyPath;
  keyValue: BifrostFormDataPrimitiveValue;
}

interface MutateFormDataAtKeyPathProps {
  mutations: FormDataMutation[];
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
}

export const mutateFormDataAtKeyPath = ({
  mutations,
  setFormData,
}: MutateFormDataAtKeyPathProps) => {
  setFormData((previousFormState: BifrostFormData) => {
    let updatedFormState: BifrostFormData = deepClone(previousFormState);

    mutations.forEach(({ keyPath, keyValue }) => {
      updatedFormState = writeValueToBifrostFormDataByKeyPath({
        formData: updatedFormState,
        keyPath,
        updatedKeyValue: keyValue,
      });
    });

    if (!deepEqual(previousFormState, updatedFormState)) {
      return updatedFormState;
    }

    return previousFormState;
  });
};
