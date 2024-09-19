import styled from "styled-components";
import { FormBlockConfiguration } from "../../models";
import {
  BranchingNodeButtonConfiguration,
  BranchingNodeFormBlockConfiguration,
} from "../../models/BranchingNodeFormBlockConfiguration";
import { Button } from "@/components/ui/button";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface RenderableBranchingNodeProps {
  branchingNodeFormBlockConfiguration: BranchingNodeFormBlockConfiguration;
  handleUpdateFormState: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
  pushFormFieldConfigurationStack: (
    formBlockConfigurations: FormBlockConfiguration[]
  ) => void;
  handleSubmitForm: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function RenderableBrancingNode({
  branchingNodeFormBlockConfiguration,
  handleUpdateFormState,
  pushFormFieldConfigurationStack,
  handleSubmitForm,
  registerBifrostFormInput,
}: RenderableBranchingNodeProps) {
  const { keyName } = branchingNodeFormBlockConfiguration;

  const handleButtonClick =
    ({
      branchingNodeButtonConfiguration: {
        keyValue,
        branchFormBlocks,
        submitsForm,
      },
    }: {
      branchingNodeButtonConfiguration: BranchingNodeButtonConfiguration;
    }): React.MouseEventHandler<HTMLButtonElement> =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      pushFormFieldConfigurationStack(branchFormBlocks);

      if (keyName && keyValue) {
        handleUpdateFormState({
          keyName,
          keyValue,
        });
      }

      if (submitsForm) {
        handleSubmitForm();
      }

      registerBifrostFormInput();
    };

  return (
    <ButtonWrapper>
      {branchingNodeFormBlockConfiguration.buttons.map((button, index) => (
        <Button
          onClick={handleButtonClick({
            branchingNodeButtonConfiguration: button,
          })}
          key={index}
        >
          {button.label}
        </Button>
      ))}
    </ButtonWrapper>
  );
}
