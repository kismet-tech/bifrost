import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";

interface GetValueFromBifrostFormDataByKeyPathProps {
  formData: BifrostFormData;
  keyPath: BifrostKeyPath;
}

export const getValueFromBifrostFormDataByKeyPath = ({
  formData,
  keyPath,
}: GetValueFromBifrostFormDataByKeyPathProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return keyPath.reduce((acc: any, key: string | number) => {
    if (acc && (typeof key === "number" || key in acc)) {
      return acc[key];
    }
    return undefined;
  }, formData);
};
