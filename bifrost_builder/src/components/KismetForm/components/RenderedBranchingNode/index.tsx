import styled from "styled-components";
import { FormBlockConfiguration } from "../../models";
import {
  BranchingNodeButtonConfiguration,
  BranchingNodeFormBlockConfiguration,
} from "../../models/BranchingNodeFormBlockConfiguration";
import { FormButton } from "../FormButton";

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
  const handleButtonClick =
    ({
      branchingNodeButtonConfiguration,
    }: {
      branchingNodeButtonConfiguration: BranchingNodeButtonConfiguration;
    }): React.MouseEventHandler<HTMLButtonElement> =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      pushFormFieldConfigurationStack(
        branchingNodeButtonConfiguration.branchFormBlocks
      );

      handleUpdateFormState({
        keyName: branchingNodeFormBlockConfiguration.keyName,
        keyValue: branchingNodeButtonConfiguration.keyValue,
      });

      if (branchingNodeButtonConfiguration.submitsForm) {
        handleSubmitForm();
      }

      registerBifrostFormInput();
    };

  return (
    <ButtonWrapper>
      {branchingNodeFormBlockConfiguration.buttons.map((button, index) => (
        <FormButton
          onClick={handleButtonClick({
            branchingNodeButtonConfiguration: button,
          })}
          key={index}
        >
          {button.label}
        </FormButton>
      ))}
    </ButtonWrapper>
  );
}
