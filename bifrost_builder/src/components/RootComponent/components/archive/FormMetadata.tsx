import { useEffect } from "react";
import { MetadataBlockConfiguration } from "../../models";

export interface FormMetadataProps {
  configuration: MetadataBlockConfiguration;
  handleUpdateFormState: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
}

export function FormMetadata({
  configuration,
  handleUpdateFormState,
}: FormMetadataProps) {
  const { keyName, keyValue } = configuration;

  useEffect(() => {
    handleUpdateFormState({ keyName, keyValue });
  }, [handleUpdateFormState, keyName, keyValue]);

  return <></>;
}
