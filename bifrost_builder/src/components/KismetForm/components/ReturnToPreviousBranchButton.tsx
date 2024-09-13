import { ReturnToPreviousBranchButtonConfiguration } from "../models";
import { FormButton } from "./FormButton";

interface ReturnToPreviousBranchButtonProps {
  returnToPreviousBranchButtonConfiguration: ReturnToPreviousBranchButtonConfiguration;
  popRightFormFieldConfigurationStack: () => void;
}

export function ReturnToPreviousBranchButton({
  returnToPreviousBranchButtonConfiguration,
  popRightFormFieldConfigurationStack,
}: ReturnToPreviousBranchButtonProps) {
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    popRightFormFieldConfigurationStack();
  };

  return (
    <FormButton onClick={onClick}>
      {returnToPreviousBranchButtonConfiguration.label}
    </FormButton>
  );
}
