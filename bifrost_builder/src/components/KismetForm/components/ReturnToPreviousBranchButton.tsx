import { ReturnToPreviousBranchButtonConfiguration } from "../models";

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
    <>
      <button onClick={onClick}>
        {returnToPreviousBranchButtonConfiguration.label}
      </button>
    </>
  );
}
