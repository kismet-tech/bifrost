import {
  PrefilledBifrostFormValueType,
  attemptToPrefillKismetFieldUsingPriorResponses,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { ChangeEventHandler, useEffect, useState } from "react";
import { TextInputFormBlockConfiguration } from "../../models";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { Input } from "@/components/ui/input";

export interface FormTextFieldProps {
  configuration: TextInputFormBlockConfiguration;
  hotelId: string;
  formState: Record<string, string>;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function FormTextField({
  configuration,
  hotelId,
  formState,
  onChange,
  registerBifrostFormInput,
}: FormTextFieldProps) {
  const [localValue, updateLocalValue] = useState<string>("");

  // Attempt to Prefill Field Using Prior Responses
  useEffect(() => {
    async function prefillKismetFieldUsingPriorResponses() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData: formState,
          targetKeyName: configuration.keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formState[configuration.keyName] && targetKeyStringValue) {
        updateLocalValue(targetKeyStringValue);
        onChange(targetKeyStringValue);
      }
    }

    prefillKismetFieldUsingPriorResponses();
  }, []);

  useEffect(() => {
    if (configuration.keyName in formState) {
      updateLocalValue(formState[configuration.keyName]);
    } else {
      updateLocalValue("");
    }
  }, [formState, configuration]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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
