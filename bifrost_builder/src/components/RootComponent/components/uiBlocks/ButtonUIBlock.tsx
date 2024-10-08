import { Button } from "@/components/ui/button";
import {
  ButtonUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { ScreenPointerType } from "@/models/configuration/ScreenPointer";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface ButtonUIBlockProps {
  configuration: ButtonUIBlockConfiguration;
  keyPath: BifrostKeyPath;
  handleSetFormData: ({
    keyPath,
    keyValue,
  }: {
    keyPath: BifrostKeyPath;
    keyValue: BifrostFormDataValue;
  }) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ButtonUIBlock({
  configuration: { keyName, keyValue, label, submitsForm, pointer },
  keyPath,
  handleSetFormData,
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
      handleSetFormData({
        keyPath: [...keyPath, keyName],
        keyValue,
      });
    }

    if (submitsForm) {
      handleSubmitFormData();
    }

    if (pointer) {
      if (pointer.type === ScreenPointerType.DIRECT) {
        pushScreenConfigurationStack(pointer.screenConfiguration);
      } else if (pointer.type === ScreenPointerType.BACK) {
        popRightscreenConfigurationStack();
      }
    }

    registerBifrostFormInput();
  };

  return (
    <Wrapper>
      <Button onClick={handleButtonClick}>{label}</Button>
    </Wrapper>
  );
}
