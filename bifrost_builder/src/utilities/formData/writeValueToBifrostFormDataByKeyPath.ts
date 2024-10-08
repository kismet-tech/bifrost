import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";

interface WriteValueToBifrostFormDataByKeyPathProps {
  formData: BifrostFormData;
  keyPath: BifrostKeyPath;
  updatedKeyValue: BifrostFormDataValue;
}

export const writeValueToBifrostFormDataByKeyPath = ({
  formData,
  keyPath,
  updatedKeyValue,
}: WriteValueToBifrostFormDataByKeyPathProps): {
  updatedFormData: BifrostFormData;
} => {
  const [currentKey, ...remainingKeys] = keyPath;

  const updatedFormData: BifrostFormData = structuredClone(formData);

  if (remainingKeys.length === 0) {
    updatedFormData[currentKey] = updatedKeyValue;
  } else {
    const nestedFormData: BifrostFormData | BifrostFormData[] = formData[
      currentKey as string
    ] as BifrostFormData | BifrostFormData[];

    if (Array.isArray(nestedFormData)) {
      const { updatedFormDataArray: updatedNestedFormDataArray } =
        writeValueToBifrostFormDataArrayByKeyPath({
          formDataArray: formData[currentKey as string] as BifrostFormData[],
          keyPath: remainingKeys,
          updatedKeyValue: updatedKeyValue,
        });

      updatedFormData[currentKey] = updatedNestedFormDataArray;
    } else {
      const { updatedFormData: updatedNestedFormData } =
        writeValueToBifrostFormDataByKeyPath({
          formData: formData[currentKey as string] as BifrostFormData,
          keyPath: remainingKeys,
          updatedKeyValue: updatedKeyValue,
        });

      updatedFormData[currentKey] = updatedNestedFormData;
    }
  }

  return { updatedFormData };
};

interface WriteValueToBifrostFormDataArrayByKeyPathProps {
  formDataArray: BifrostFormData[];
  keyPath: BifrostKeyPath;
  updatedKeyValue: BifrostFormDataValue;
}

const writeValueToBifrostFormDataArrayByKeyPath = ({
  formDataArray,
  keyPath,
  updatedKeyValue,
}: WriteValueToBifrostFormDataArrayByKeyPathProps): {
  updatedFormDataArray: BifrostFormData[];
} => {
  const [currentKey, ...remainingKeys] = keyPath;

  const updatedFormDataArray: BifrostFormData[] = structuredClone([
    ...formDataArray,
  ]);

  const nestedFormData: BifrostFormData | BifrostFormData[] = formDataArray[
    currentKey as number
  ] as BifrostFormData;

  const { updatedFormData } = writeValueToBifrostFormDataByKeyPath({
    formData: nestedFormData,
    keyPath: remainingKeys,
    updatedKeyValue: updatedKeyValue,
  });

  updatedFormDataArray[currentKey as number] = updatedFormData;

  return { updatedFormDataArray };
};
