import { Button } from "@/components/ui/button";
import { ButtonUIBlockConfiguration } from "@/models/configuration";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface ButtonUIBlockProps {
  configuration: ButtonUIBlockConfiguration;
  handleSetFormData: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
  handleSubmitFormData: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ButtonUIBlock({
  configuration: { keyName, keyValue, label, submitsForm },
  handleSetFormData,
  handleSubmitFormData,
  registerBifrostFormInput,
}: ButtonUIBlockProps) {
  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (keyName && keyValue) {
      handleSetFormData({
        keyName,
        keyValue,
      });
    }

    if (submitsForm) {
      handleSubmitFormData();
    }

    registerBifrostFormInput();
  };

  return (
    <Wrapper>
      <Button onClick={handleButtonClick}>{label}</Button>
    </Wrapper>
  );
}
