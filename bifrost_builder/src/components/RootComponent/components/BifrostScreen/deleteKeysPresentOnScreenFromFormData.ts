import { ScreenConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { getKeyPathsFromBifrostScreen } from "./getKeyPathsFromBifrostScreen";
import { deleteValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/deleteValueFromBifrostFormDataByKeyPath";
import { deepClone } from "@/utilities/core/deepClone";
import { deepEqual } from "@/utilities/core/deepEqual";

interface DeleteKeysPresentOnScreenFromFormDataProps {
  poppedScreenConfiguration: ScreenConfiguration;
  setFormData: React.Dispatch<React.SetStateAction<BifrostFormData>>;
}

export const deleteKeysPresentOnScreenFromFormData = ({
  poppedScreenConfiguration,
  setFormData,
}: DeleteKeysPresentOnScreenFromFormDataProps) => {
  setFormData((previousFormData) => {
    const { keyPaths: deletedKeyPaths } = getKeyPathsFromBifrostScreen({
      configuration: poppedScreenConfiguration,
    });

    let updatedFormData: BifrostFormData = deepClone(previousFormData);

    deletedKeyPaths.forEach((deletedKeyPath) => {
      updatedFormData = deleteValueFromBifrostFormDataByKeyPath({
        formData: updatedFormData,
        keyPath: deletedKeyPath,
      });

      delete previousFormData[deletedKeyPath.join(".")];
    });

    if (!deepEqual(previousFormData, updatedFormData)) {
      return updatedFormData;
    } else {
      return previousFormData;
    }
  });
};
