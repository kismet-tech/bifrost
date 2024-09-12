import { FormBlockConfiguration } from "../../models";
import {
  BranchingNodeButtonConfiguration,
  BranchingNodeFormBlockConfiguration,
} from "../../models/BranchingNodeFormBlockConfiguration";

interface RenderableBrancingNodeProps {
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
}

export function RenderableBrancingNode({
  branchingNodeFormBlockConfiguration,
  handleUpdateFormState,
  pushFormFieldConfigurationStack,
  handleSubmitForm,
}: RenderableBrancingNodeProps) {
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
    };

  return branchingNodeFormBlockConfiguration.buttons.map((button, index) => {
    return (
      <button
        onClick={handleButtonClick({
          branchingNodeButtonConfiguration: button,
        })}
        key={index}
      >
        {button.label}
      </button>
    );
  });
}
