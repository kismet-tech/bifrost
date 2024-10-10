import { ScreenConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";

interface DeleteKeysPresentOnScreenFromFormDataProps {
  poppedScreenConfiguration: ScreenConfiguration;
  setFormData: React.Dispatch<React.SetStateAction<BifrostFormData>>;
}

export const deleteKeysPresentOnScreenFromFormData = ({
  //   poppedScreenConfiguration,
  setFormData,
}: DeleteKeysPresentOnScreenFromFormDataProps) => {
  setFormData((previousFormData) => {
    return previousFormData;
  });
};
