import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";
import { Button } from "@/components/ui/button";
import {
  ButtonUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface ButtonUIBlockProps {
  configuration: ButtonUIBlockConfiguration;
  hotelId: string;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ButtonUIBlock({
  configuration: {
    keyName,
    keyValue,
    label,
    submitsForm,
    screenPointer: pointer,
  },
  hotelId,
  keyPath,
  formData,
  setFormData,
  handleSubmitFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
}: ButtonUIBlockProps) {
  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (keyName && keyValue) {
      mutateFormDataAtKeyPath({
        mutations: [
          {
            keyPath: [...keyPath, keyName],
            keyValue,
          },
        ],
        setFormData,
      });
    }

    if (submitsForm) {
      handleSubmitFormData();
    }

    if (pointer) {
      routeWithPointer({
        pointer,
        hotelId,
        formData,
        setFormData,
        handleSubmitFormData,
        pushScreenConfigurationStack,
        popRightscreenConfigurationStack,
      });
    }

    registerBifrostFormInput();
  };

  return (
    <Wrapper>
      <Button onClick={handleButtonClick}>{label}</Button>
    </Wrapper>
  );
}
