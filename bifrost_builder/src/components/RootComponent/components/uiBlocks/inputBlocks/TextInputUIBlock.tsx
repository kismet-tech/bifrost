import { TextInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { FormField } from "../styles/FormField";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { FormLabel } from "../styles/FormLabel";
import { Input } from "@/components/ui/input";

interface TextInputUIBlockProps {
  configuration: TextInputUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function TextInputUIBlock({
  configuration,
  hotelId,
  formData,
  onChange,
  registerBifrostFormInput,
}: TextInputUIBlockProps) {
  const [localValue, updateLocalValue] = useState<string>("");

  // Attempt to Prefill Field Using Prior Responses
  useEffect(() => {
    async function prefillKismetFieldUsingPriorResponses() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData,
          targetKeyName: configuration.keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formData[configuration.keyName] && targetKeyStringValue) {
        updateLocalValue(targetKeyStringValue);
        onChange(targetKeyStringValue);
      }
    }

    prefillKismetFieldUsingPriorResponses();
  }, []);

  useEffect(() => {
    if (
      configuration.keyName in formData &&
      typeof formData[configuration.keyName] === "string"
    ) {
      updateLocalValue(formData[configuration.keyName] as string);
    } else {
      updateLocalValue("");
    }
  }, [formData, configuration]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (onChange) {
      onChange(value);
    }

    updateLocalValue(value);
    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`kismet_${configuration.keyName}`}>
        {configuration.label}
      </FormLabel>
      <Input
        onChange={handleOnChange}
        type={configuration.inputType}
        id={`kismet_${configuration.keyName}`}
        placeholder={configuration.placeholder}
        autoComplete={configuration.autocomplete}
        value={localValue}
      />
    </FormField>
  );
}
